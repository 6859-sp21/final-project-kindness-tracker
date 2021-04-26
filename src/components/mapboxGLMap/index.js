import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'
import * as DataConstants from '../../utils/dataConstants'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import '../../styles/Map.css'

const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
}

const US_CENTER_LAT = 39.8283
const US_CENTER_LNG = -98.5795
const INITIAL_ZOOM = 3.75
const POINT_ZOOM = 12

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ data, selectedNode, setSelectedNode, traceNode, traceList, setTraceList, traceIndex }) => {
    console.log("Here is the new Data ==> ", data)
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    const dataProc = (data || []).map((d, i) => ({
        ...d,
        index: i
    }))

    // write function to generate ID of circle
    const uniqueCircleId = d => `circle-${d.index}`

    const initializeMap = ({ setMap, mapContainer }) => {
        const myMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v10",
            center: [US_CENTER_LNG, US_CENTER_LAT],
            zoom: INITIAL_ZOOM,
        })

        myMap.on("load", () => {
            setMap(myMap)
        })
    }

    useEffect(() => {
        if (!map) {
            initializeMap({ setMap, mapContainer })
        }
    }, [map])

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
            const project = ({ CenterLon, CenterLat }) => {
                return map.project(new mapboxgl.LngLat(CenterLon, CenterLat))
            }

            var dots = svg
                .selectAll("circle")
                .data(dataProc)
                .enter()
                .append("circle")
                .attr('class', 'circle')
                .attr('id', uniqueCircleId)
                .attr("r", 10)
                .style("fill", "steelblue")
                .on('mouseover', (e, d) => {
                    MapUtils.showTooltip(e, d)
                })
                .on('mouseout', (e, d) => {
                    MapUtils.hideTooltip()
                })
                .on('click', (e, d) => {
                    MapUtils.resetAllCircleColors()

                    // make this circle red
                    const circle = d3.select(`#${uniqueCircleId(d)}`)
                    circle
                        .transition()
                        .duration(500)
                        .style('fill', 'red')

                    MapUtils.selectNode(e.target, d)

                    map.flyTo({
                        center: [
                            d.CenterLon, d.CenterLat
                        ],
                        zoom: POINT_ZOOM, // TODO cofigure this zoom amount
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });

                    // set the selected node and callback the parent
                    // TODO potentially clear any tracing if this node is not in the current trace
                    // have to tighten up logic around this...
                    setSelectedNode(d)
                })

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

            return () => map.remove()
        }
    }, [map, data])

    useEffect(() => {
        // re-fly to center on selectedNode update
        if (map && data && !selectedNode) {
            map.flyTo({
                center: [
                    US_CENTER_LNG,
                    US_CENTER_LAT,
                ],
                zoom: INITIAL_ZOOM,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
            MapUtils.resetAllCircleColors()
        }
    }, [map, data, selectedNode])

    useEffect(() => {
        if (traceNode) {
            // Filter data
            const dataFilt = dataProc.filter(d => d[DataConstants.ID_KEY_NAME] == traceNode[DataConstants.ID_KEY_NAME])
            
            MapUtils.resetAllCircleColors()
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] == traceNode[DataConstants.ID_KEY_NAME])
                .transition()
                .duration(500)
                .style('fill', 'purple')
            
            // for now, re-fly map
            map.flyTo({
                center: [
                    US_CENTER_LNG,
                    US_CENTER_LAT,
                ],
                zoom: INITIAL_ZOOM,
                essential: true,
            })

            // set the trace list
            setTraceList(dataFilt)
        }
    }, [traceNode])

    useEffect(() => {
        if (map && traceList && traceIndex > -1) {
            // get the node at the index and fly there!
            const currentNode = traceList[traceIndex]
            map.flyTo({
                center: [
                    // currentNode.CenterLon,
                    // currentNode.CenterLat,
                    currentNode.CENTER_LNG_KEY_NAME,
                    currentNode.CENTER_LAT_KEY_NAME,
                ],
                zoom: POINT_ZOOM,
                essential: true,
            })

            // also make that node red
            MapUtils.resetAllCircleColors()
            d3.selectAll('.circle')
                .filter(d => d[DataConstants.ID_KEY_NAME] == traceNode[DataConstants.ID_KEY_NAME])
                .transition()
                .duration(500)
                .style('fill', 'purple')
            d3.select(`#${uniqueCircleId(traceList[traceIndex])}`)
                .transition()
                .duration(500)
                .style('fill', 'green')
        }
    }, [traceIndex])

    return <div ref={el => (mapContainer.current = el)} style={styles}>
        <div className="map-tooltip" style={{ "opacity": 0 }}>
                <p>Tooltip contents will go here.</p>
            </div>
    </div>
}

export default MapboxGLMap
