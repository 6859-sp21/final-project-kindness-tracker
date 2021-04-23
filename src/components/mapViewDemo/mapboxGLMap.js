import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'

import '../../styles/Map.css'

const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
}

const US_CENTER_LAT = 39.8283
const US_CENTER_LNG = -98.5795
const INITIAL_ZOOM = 3.75

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'

const MapboxGLMap = ({ data, selectedNode, setSelectedNode }) => {
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    const dataProc = (data || []).map((d, i) => ({
        ...d,
        index: i
    }))
    
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
            console.log('one')
            initializeMap({ setMap, mapContainer })
        }
    }, [map])

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
            const project = ({ CenterLon, CenterLat }) => {
                return map.project(new mapboxgl.LngLat(CenterLon, CenterLat))
            }

            // write function to generate ID of circle
            const uniqueCircleId = d => `circle-${d.index}`

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

                    // fly there!
                    map.flyTo({
                        center: [
                            d.CenterLon - .27,
                            d.CenterLat,
                        ],
                        zoom: 9, // TODO cofigure this zoom amount
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });

                    // set the selected node and callback the parent
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
            console.log('three')
            map.flyTo({
                center: [
                    US_CENTER_LNG - .27,
                    US_CENTER_LAT,
                ],
                zoom: INITIAL_ZOOM,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
            MapUtils.resetAllCircleColors()
        }
    }, [map, data, selectedNode])

    return <div ref={el => (mapContainer.current = el)} style={styles}>
        <div className="map-tooltip" style={{ "opacity": 0 }}>
                <p>Tooltip contents will go here.</p>
            </div>
    </div>
}

export default MapboxGLMap
