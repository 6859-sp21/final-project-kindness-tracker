import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
// import "mapbox-gl/dist/mapbox-gl.css"
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'
import * as DataConstants from '../../utils/dataConstants'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import TooltipContents from '../tooltip'
import * as DataUtils from '../../utils/dataUtils'

import '../../styles/Map.css'

const POINT_ZOOM = 12
const DEFAULT_RADIUS = 10
const BIG_RADIUS = 30

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ setIsLoading, data, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, isTracing, traceList, setTraceList, traceIndex, setTraceIndex }) => {
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)
    const [boundingObject, setBoundingObject] = useState(null)

    console.log('rendering map')

    // write function to generate ID of circle
    const uniqueCircleId = d => `circle-${d.index}`

    // write function to generate class of circle based off id key
    const circleClass = d => `circle circle-${d[DataConstants.ID_KEY_NAME]}`

    // write function to quickly convert a data array to the fomat for lat lng
    const generateLngLatArray = data => data.map(d => ({
        lng: d[DataConstants.CENTER_LNG_KEY_NAME],
        lat: d[DataConstants.CENTER_LAT_KEY_NAME],
    }))

    const visitNode = (d) => {
        MapUtils.resetAllCircleColors()
            .attr("r", DEFAULT_RADIUS)
            .style('opacity', 1)
            .style('z-index', 0)
    
        // make this circle red
        const circle = d3.select(`#${uniqueCircleId(d)}`)
        circle
            .transition()
            .duration(500)
            .style('fill', 'red')
            .attr("r", DEFAULT_RADIUS)

        map.flyTo({
            center: [
                d[DataConstants.CENTER_LNG_KEY_NAME],
                d[DataConstants.CENTER_LAT_KEY_NAME],
            ],
            zoom: POINT_ZOOM, // TODO cofigure this zoom amount
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        // set the selected node and callback the parent
        // TODO potentially clear any tracing if this node is not in the current trace
        // have to tighten up logic around this...
        setSelectedNode(d)
    }

    const setAllEventHandlers = () => {
        d3.selectAll(".circle")
            .on('mouseover', (e, d) => {
                setHoveredNode(d)
                MapUtils.showTooltip(e, d)
            })
            .on('mousemove', (e, d) => {
                MapUtils.showTooltip(e, d)
            })
            .on('mouseout', (e, d) => {
                MapUtils.hideTooltip(() => setHoveredNode(null))
            })
            .on('click', (e, d) => {
                visitNode(d)
            })
    }

    useEffect(() => {
        if (!map && data) {
            console.log('one')
            // compute bounding object of data for first time
            // get the bounds of our data
            const boundingObjectAll = DataUtils.computeLngLatBoundingBox(
                generateLngLatArray(data), 200
            )
            console.log('obj', boundingObjectAll)
            MapUtils.initializeMap({ setMap, setBoundingObject, mapContainer, boundingObject: boundingObjectAll })
        }
    }, [map, data])

    useEffect(() => {
        if (map && data !== null) {
            console.log('two')
            var container = map.getCanvasContainer()
            var svg = d3
                .select(container)
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("position", "absolute")
                .style("z-index", 2)
                .style('top', 0)
                .style('left', 0)

            // write projection function
            const project = (d) => {
                return map.project(
                    new mapboxgl.LngLat(d[DataConstants.CENTER_LNG_KEY_NAME], d[DataConstants.CENTER_LAT_KEY_NAME])
                )
            }

            var dots = svg
                .selectAll("circle")
                .data(data)
                .enter()
                .append('circle')
                .attr('id', uniqueCircleId)
                .attr('class', circleClass)
                .attr("r", DEFAULT_RADIUS)
                .style("fill", "steelblue")
            
            // add event handlers
            setAllEventHandlers()

            // define render function for mapbox
            const mapRender = () => {
                // project dots
                dots
                    .attr('cx', d => project(d).x)
                    .attr('cy', d => project(d).y)
            }

            map.on('viewreset', mapRender)
            map.on('move', mapRender)
            map.on('moveend', mapRender)

            map.on('load', () => {
                map.resize()
            })

            mapRender()

            // notify that we are done loading
            setIsLoading(false)

            return () => map.remove()
        }
    }, [map, data])

    useEffect(() => {
        // re-fly to center on selectedNode update, as long as we are not tracing
        if (map && data && !selectedNode && boundingObject) {
            console.log('three')
            MapUtils.zoomMapToBoundingObject(map, boundingObject)
            MapUtils.resetAllCircleColors()
                .attr("r", DEFAULT_RADIUS)
                .style('opacity', 1)
                .style('z-index', 0)
            setAllEventHandlers()
        }
    }, [map, data, selectedNode])

    useEffect(() => {
        if (isTracing) {
            console.log('four')
            // TODO move this to a helper function
            const dataFilt = data.filter(d => d[DataConstants.ID_KEY_NAME] == selectedNode[DataConstants.ID_KEY_NAME])
                .sort((a, b) => a.dateTime.toMillis() - b.dateTime.toMillis())
            console.log(dataFilt)

            // Remove all circles that aren't in the given class name, and also disable their events
            const otherCircles = d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] !== selectedNode[DataConstants.ID_KEY_NAME])
                
            otherCircles.transition()
                .duration(500)
                .style('opacity', '0')
                .style('z-index', 0)
            
            MapUtils.clearAllEventHandlers(otherCircles)
            
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] === selectedNode[DataConstants.ID_KEY_NAME])
                .transition()
                .duration(500)
                .style('fill', 'purple')
                .style('z-index', 1)
            
            // re-compute bounding box
            const boundingObjectFilt = DataUtils.computeLngLatBoundingBox(
                generateLngLatArray(dataFilt),
                0.05,
                true
            )
            MapUtils.zoomMapToBoundingObject(map, boundingObjectFilt)

            // set the trace list and index accordingly
            setTraceList(dataFilt)
            const traceIndexNew = dataFilt.map(d => d.index).indexOf(selectedNode.index)
            setTraceIndex(traceIndexNew)
        } else if (selectedNode) {
            console.log('no longer tracing')
            visitNode(selectedNode)
            setAllEventHandlers()
        }
    }, [isTracing, selectedNode])

    useEffect(() => {
        if (map && traceList && traceList.length > 0) {
            console.log('five')

            // also make that node bigger and green
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] == selectedNode[DataConstants.ID_KEY_NAME])
                .transition()
                .duration(500)
                .style('fill', 'purple')
                .attr('r', DEFAULT_RADIUS)

            d3.select(`#${uniqueCircleId(traceList[traceIndex])}`)
                .transition()
                .duration(500)
                .style('fill', 'green')
                .attr('r', BIG_RADIUS)
        }
    }, [traceList, traceIndex])

    return <div ref={el => (mapContainer.current = el)} className="map-container-div">
        <div className="map-tooltip" style={{ "opacity": 0 }}>
            <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
        </div>
    </div>
}

export default React.memo(MapboxGLMap, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data &&
    prevProps.selectedNode === nextProps.selectedNode &&
    prevProps.hoveredNode === nextProps.hoveredNode &&
    prevProps.isTracing === nextProps.isTracing &&
    prevProps.traceList === nextProps.traceList &&
    prevProps.traceIndex === nextProps.traceIndex
})