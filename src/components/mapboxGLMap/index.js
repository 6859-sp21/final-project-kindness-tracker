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

const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
}

const POINT_ZOOM = 12
const DEFAULT_RADIUS = 10
const BIG_RADIUS = 30

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ setIsLoading, data, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, traceNode, traceList, setTraceList, traceIndex }) => {
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    const dataProc = DataUtils.processRawSheetsData(data)

    // write function to generate ID of circle
    const uniqueCircleId = d => `circle-${d.index}`

    // write function to generate class of circle based off id key
    const circleClass = d => `circle circle-${d[DataConstants.ID_KEY_NAME]}`

    // write function to quickly convert a data array to the fomat for lat lng
    const generateLngLatArray = data => data.map(d => ({
        lng: d[DataConstants.CENTER_LNG_KEY_NAME],
        lat: d[DataConstants.CENTER_LAT_KEY_NAME],
    }))

    // get the bounds of our data
    const boundingObject = dataProc ? DataUtils.computeLngLatBoundingBox(
        generateLngLatArray(dataProc), 200
    ) : null

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
                MapUtils.resetAllCircleColors()
    
                // make this circle red
                const circle = d3.select(`#${uniqueCircleId(d)}`)
                circle
                    .transition()
                    .duration(500)
                    .style('fill', 'red')
    
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
            })
    }

    useEffect(() => {
        if (!map && dataProc) {
            MapUtils.initializeMap({ setMap, mapContainer, boundingObject })
        }
    }, [map, dataProc])

    useEffect(() => {
        if (map && data !== null) {
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
                .data(dataProc)
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
        if (map && data && !selectedNode) {
            MapUtils.zoomMapToBoundingObject(map, boundingObject)
            MapUtils.resetAllCircleColors()
                .attr("r", DEFAULT_RADIUS)
                .style('opacity', 1)
            setAllEventHandlers()
        }
    }, [map, data, selectedNode])

    useEffect(() => {
        if (traceNode) {
            const dataFilt = dataProc.filter(d => d[DataConstants.ID_KEY_NAME] == traceNode[DataConstants.ID_KEY_NAME])

            // Remove all circles that aren't in the given class name, and also disable their events
            const otherCircles = d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] !== traceNode[DataConstants.ID_KEY_NAME])
                
            otherCircles.transition()
                .duration(500)
                .style('opacity', '0')
            
            MapUtils.clearAllEventHandlers(otherCircles)
            
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] === traceNode[DataConstants.ID_KEY_NAME])
                .transition()
                .duration(500)
                .style('fill', 'purple')
            
            // re-compute bounding box
            // TODO write logic for ratio-based padding
            const boundingObjectFilt = DataUtils.computeLngLatBoundingBox(
                generateLngLatArray(dataFilt),
                100
            )
            MapUtils.zoomMapToBoundingObject(map, boundingObjectFilt)

            // set the trace list
            setTraceList(dataFilt)
        }
    }, [traceNode])

    useEffect(() => {
        if (map && traceList && traceIndex > -1) {
            // // get the node at the index and fly there!
            // const currentNode = traceList[traceIndex]
            // map.flyTo({
            //     center: [
            //         currentNode[DataConstants.CENTER_LNG_KEY_NAME],
            //         currentNode[DataConstants.CENTER_LAT_KEY_NAME],
            //     ],
            //     zoom: POINT_ZOOM,
            //     essential: true,
            // })

            // also make that node bigger and green
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] == traceNode[DataConstants.ID_KEY_NAME])
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
    }, [traceIndex])

    return <div ref={el => (mapContainer.current = el)} style={styles}>
        <div className="map-tooltip" style={{ "opacity": 0 }}>
            <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
        </div>
    </div>
}

export default MapboxGLMap
