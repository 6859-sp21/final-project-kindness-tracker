import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'
import * as DataConstants from '../../utils/dataConstants'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import TooltipContents from '../tooltip'
import * as DataUtils from '../../utils/dataUtils'

import '../../styles/Map.css'

const POINT_ZOOM = 12
const POINT_ZOOM_MILES = 1
const DEFAULT_RADIUS = 10
const BIG_RADIUS = 30

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ trace, setIsLoading, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, isTracing, setTrace, resetTrace }) => {
    const [map, setMap] = useState(null)
    const [boundingObject, setBoundingObject] = useState(null)
    const mapContainer = useRef(null)

    // let's init our map first again
    useEffect(() => {
        if (map === null) {
            // need to init the map since it is null
            MapUtils.initializeMap({ setMap, mapContainer })
        } else {
            // also append an svg to the map for later use
            // TODO put this in css
            var container = map.getCanvasContainer()
            d3.select(container)
                .append('svg')
                .attr('class', 'map-svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('position', 'absolute')
                .style('z-index', 2)
                .style('top', 0)
                .style('left', 0)
            
            // also set up map events for re-render
            map.on('viewreset', () => MapUtils.mapRender(map))
            map.on('move', () => MapUtils.mapRender(map))
            map.on('moveend', () => MapUtils.mapRender(map))
            map.on('load', () => map.resize())
        }
    }, [map])

    // here is where we do our data join for trace points
    useEffect(() => {
        if (map && trace) {
            // do a data join on all the trace points with d3
            d3.select('.map-svg')
                .selectAll('circle')
                .data(trace, d => d.index)
                .join(
                    enter => enter
                        .append('circle')
                        .attr('id', MapUtils.uniqueCircleId)
                        .attr('class', MapUtils.circleClass)
                        .attr('r', DEFAULT_RADIUS)
                        .style('fill', 'steelblue')
                        .on('click', (e, d) => setSelectedNode(d))
                        .on('mouseover', (e, d) => {
                            setHoveredNode(d)
                            MapUtils.showTooltip(e, d)
                        })
                        .on('mousemove', (e, d) => {
                            MapUtils.showTooltip(e, d)
                        })
                        .on('mouseout', (e, d) => {
                            MapUtils.hideTooltip(() => setHoveredNode(null))
                        }),
                    update => update,
                    exit => exit.remove()
                )

            // perform initial render
            MapUtils.mapRender(map)

            // also complete loading
            setIsLoading(false)

            // update bounding box
            const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                MapUtils.generateLngLatArray(trace),
                trace.length > 1 ? 0.05 : POINT_ZOOM_MILES,
                trace.length > 1 ? true : false,
                trace.length > 1 ? true : false,
            )
            setBoundingObject(boundingObjectNew)
        }
    }, [map, trace])

    // THE PURPOSE OF THIS EFFECT IS TO ZOOM ON THE MAP
    // WE RE-ZOOM WHEN:
    // 1. BOUNDING BOX CHANGES
    // 2. SELECTED NODE BECOMES NULL 
    // listen for changes in the bounding box
    useEffect(() => {
        if (boundingObject) {
            MapUtils.zoomMapToBoundingObject(map, boundingObject)
        }
    }, [boundingObject])

    // listen for changes in the selected node
    // IF GENERAL NON TRACE MODE
    //     IF SELECTED NODE NON NULL, ZOOM TO IT AND MAKE IT RED
    //     ELSE, RESET TO ALL POINTS AND MAKE ALL POINTS BLUE
    // IF TRACE MODE
    //     IF SELECTED NODE NON NULL, 
    useEffect(() => {
        if (! isTracing) {
            if (selectedNode) {
                // handle colors
                // make other circles not red
                MapUtils.resetAllCircleColors()
                
                // make this circle red
                d3.select(`#${MapUtils.uniqueCircleId(selectedNode)}`)
                    .transition()
                    .duration(500)
                    .style('fill', 'red')
                    .attr('r', DEFAULT_RADIUS)
                
                // update bounding box
                const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                    MapUtils.generateLngLatArray([selectedNode]),
                    POINT_ZOOM_MILES,
                    false,
                    false
                )
                setBoundingObject(boundingObjectNew)
            } else if (trace) {
                // reset the bounding box to original trace points
                const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                    MapUtils.generateLngLatArray(trace),
                    0.05,
                    true
                )
                setBoundingObject(boundingObjectNew)
    
                // also clear the color
                MapUtils.resetAllCircleColors()
            }
        } else {
            // we are tracing - selected node should NEVER be null
            // reset all nodes to the original color
            MapUtils.resetAllCircleColors('purple')
                .attr('r', DEFAULT_RADIUS)
            
            // make the selected node bigger and green
            d3.select(`#${MapUtils.uniqueCircleId(selectedNode)}`)
                .transition()
                .duration(500)
                .style('fill', 'green')
                .attr('r', BIG_RADIUS)
        }
        
    }, [selectedNode, isTracing])

    // listen for changes in the isTracing state
    // if we become tracing, we want to set the trace to the selectedNode's id set
    useEffect(() => {
        if (isTracing) {
            // filter on the current node id key
            const traceNew = trace
                .filter(d => d[DataConstants.ID_KEY_NAME] === selectedNode[DataConstants.ID_KEY_NAME])
                .sort((a, b) => a.dateTime.toMillis() - b.dateTime.toMillis())
            setTrace(traceNew)
        } else {
            // reset trace back to original data array
            resetTrace()
        }
    }, [isTracing])

    return <div ref={el => (mapContainer.current = el)} className='map-container-div'>
        <div className='map-tooltip' style={{ 'opacity': 0 }}>
            <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
        </div>
    </div>
}

export default MapboxGLMap
