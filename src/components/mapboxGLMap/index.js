import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'
import * as LineUtils from './lineUtils'
import * as DataConstants from '../../utils/dataConstants'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import TooltipContents from '../tooltip'
import * as DataUtils from '../../utils/dataUtils'
import * as AppMode from '../../utils/appMode'

import '../../styles/Map.css'

const DEFAULT_RADIUS = 10
const BIG_RADIUS = 20

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker

const MapboxGLMap = ({ trace, setIsLoading, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, mode, setTrace, resetTrace }) => {
    const [map, setMap] = useState(null)
    const [boundingObject, setBoundingObject] = useState(null)
    const mapContainer = useRef(null)
    const [prevLineId, setPrevLineId] = useState(null)
    const [nextLineId, setNextLineId] = useState(null)

    // todo refactor
    const drawAndZoomLines = () => {
        const {
            prevNode,
            nextNode,
        } = MapUtils.getPrevAndNextNodes(trace, selectedNode)

        let newPrevLineId, newNextLineId

        if (prevNode) {
            newPrevLineId = LineUtils.drawArcBetweenNodes(map, prevNode, selectedNode)
        }
        if (nextNode) {
            newNextLineId = LineUtils.drawArcBetweenNodes(map, selectedNode, nextNode)
        }

        // delete any arcs that are not currently drawn
        if (prevLineId !== newPrevLineId && prevLineId !== newNextLineId) {
            LineUtils.clearArcsForId(map, prevLineId)
        }
        if (nextLineId !== newPrevLineId && nextLineId !== newNextLineId) {
            LineUtils.clearArcsForId(map, nextLineId)
        }

        // update our ids
        setPrevLineId(newPrevLineId)
        setNextLineId(newNextLineId)

        // update the bounding box to include current, prev and next
        const nodes = [selectedNode]
        if (prevNode) {
            nodes.push(prevNode)
        }
        if (nextNode) {
            nodes.push(nextNode)
        }
        const boundingObjectNew = MapUtils.getBoudingObjectForTraceList(nodes)
        setBoundingObject(boundingObjectNew)

        // return the prev and next for reference
        return {
            nodes,
        }
    }

    const clearAllLines = () => {
        if (!map)
            return

        // clear any previous ids
        LineUtils.clearArcsForId(map, prevLineId)
        LineUtils.clearArcsForId(map, nextLineId)

        // clear the ids
        setPrevLineId(null)
        setNextLineId(null)
    }

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
        }
    }, [map])

    // here is where we do our data join for trace points
    useEffect(() => {
        if (map && trace) {
            // do a data join on all the trace points with d3
            d3.select('.map-svg')
                .selectAll('circle')
                .data(trace, d => d.hash)
                .join(
                    enter => enter
                        .append('circle')
                        .attr('id', MapUtils.uniqueCircleId)
                        .attr('class', MapUtils.circleClass)
                        .attr('r', DEFAULT_RADIUS)
                        .style('fill', 'steelblue')
                        .style('opacity', d => {
                            if (selectedNode && DataUtils.nodesAreEqual(d, selectedNode)) {
                                return 1
                            } else if (selectedNode && !DataUtils.nodesAreEqual(d, selectedNode)) {
                                return 0.5
                            } else {
                                return 1
                            }
                        })
                        .on('click', (e, d) => setSelectedNode(d))
                        .on('mouseover', (e, d) => {
                            setHoveredNode(d)
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

            // update bounding box with the initial view
            const boundingObjectNew = MapUtils.getBoudingObjectForTraceList(trace)
            setBoundingObject(boundingObjectNew)
        }
    }, [map, trace])

    // THE PURPOSE OF THIS EFFECT IS TO ZOOM ON THE MAP
    // WE RE-ZOOM WHEN:
    // 1. BOUNDING BOX CHANGES
    // 2. SELECTED NODE BECOMES NULL 
    // listen for changes in the bounding box
    useEffect(() => {
        if (map && boundingObject) {
            MapUtils.zoomMapToBoundingObject(map, boundingObject)

            // always clear the tooltip and hovered node in this case
            setTimeout(() => MapUtils.hideTooltip(() => setHoveredNode(null)), 500)
        }
    }, [map, boundingObject])

    // listen for changes in the selected node
    // IF GENERAL NON TRACE MODE
    //     IF SELECTED NODE NON NULL, ZOOM TO IT AND MAKE IT RED
    //     ELSE, RESET TO ALL POINTS AND MAKE ALL POINTS BLUE
    // IF TRACE MODE
    //     MAKE IT GREEN, ALL OTHERS PURPLE
    useEffect(() => {
        if (mode === AppMode.SELECTED && selectedNode) {
            // handle colors
            // make other circles not red, and less opaque
            MapUtils.resetAllCircleColors()
                .style('opacity', 0.5)

            // make this circle red and dark
            const id = `#${MapUtils.uniqueCircleId(selectedNode)}`
            d3.select(id)
                .transition()
                .duration(500)
                .style('fill', 'red')
                .style('opacity', 1)
                .attr('r', DEFAULT_RADIUS)

            // draw it over all other circles
            MapUtils.bringCircleWithIdToFront(id)

            // update bounding box
            const boundingObjectNew = MapUtils.getBoudingObjectForTraceList([selectedNode])
            setBoundingObject(boundingObjectNew)
        } else if ((mode === AppMode.DEFAULT || mode === AppMode.SEARCHING || mode === AppMode.TRACE_STATS) && trace) {
            // reset the bounding box to original trace points
            const boundingObjectNew = MapUtils.getBoudingObjectForTraceList(trace)
            setBoundingObject(boundingObjectNew)

            // also clear the color
            MapUtils.resetAllCircleColors()
                .attr('r', DEFAULT_RADIUS)
        } else if (mode === AppMode.TRACING) {
            // if we have selected the root node, we need to be sure to zoom to original trace
            if (selectedNode[DataConstants.ID_KEY_NAME] === DataConstants.ROOT_ACT_ID) {
                const boundingObjectNew = MapUtils.getBoudingObjectForTraceList(trace)
                setBoundingObject(boundingObjectNew)
            }

            // set up our lines
            const {
                nodes,
            } = drawAndZoomLines()

            // update circle colors
            d3.selectAll('.circle')
                .filter(d => nodes.indexOf(d) === -1)
                .transition()
                .duration(500)
                .style('fill', 'purple')
                .style('opacity', 0)
                .attr('r', DEFAULT_RADIUS)

            d3.selectAll('.circle')
                .filter(d => (nodes.indexOf(d) > -1 && d.hash !== selectedNode.hash))
                .transition()
                .duration(500)
                .style('fill', 'purple')
                .style('opacity', 1)
                .attr('r', DEFAULT_RADIUS)

            // make the selected node bigger and green
            const id = `#${MapUtils.uniqueCircleId(selectedNode)}`

            d3.select(id)
                .transition()
                .duration(500)
                .style('fill', 'green')
                .attr('r', BIG_RADIUS) // TODO add this back if we want
                .style('opacity', 1)

            // draw it over all other circles
            MapUtils.bringCircleWithIdToFront(id)

        }
    }, [mode, selectedNode, trace])

    // listen for changes in the mode state
    // re-filter the trace list as needed
    useEffect(() => {
        if (mode === AppMode.TRACING) {
            // filter on the current node
            const traceNew = DataUtils.filterTraceListForNode(trace, selectedNode)
            setTrace(traceNew)
            return
        }

        // non-trace mode - clear all lines
        clearAllLines()

        if (mode === AppMode.DEFAULT) {
            // reset trace back to original data array
            resetTrace()
        } else if (mode === AppMode.SEARCHING) {
            // do nothing, this should be handled by the search bar
        } else if (mode === AppMode.SELECTED) {
            // reset trace back to original data array
            resetTrace()
        } else if (mode === AppMode.TRACE_STATS) {
            // do nothing
        }
    }, [mode])

    return <div ref={el => (mapContainer.current = el)} className='map-container-div'>
        {
            mode !== AppMode.TRACING ? (
                <div className='map-tooltip' style={{ 'opacity': 0 }}>
                    <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
                </div>
            ) : null
        }
    </div>
}

export default MapboxGLMap
