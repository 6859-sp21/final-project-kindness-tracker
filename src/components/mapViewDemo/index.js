import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import { showTooltip, hideTooltip, selectNode } from './mapUtils'

import '../../styles/Map.css'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

const US_CENTER_LAT = 39.8283
const US_CENTER_LNG = -98.5795

const MapViewDemo = ({ data }) => {
    console.log("Map View Demo Data --> ", data)

    // Make sure we are only rendering the full map when we actually have data
    if (data === null) {
        return null
    }

    // add unique index to each datum
    const dataProc = data.map((d, i) => ({
        ...d,
        index: i
    }))

    const mapContainer = useRef()

    useEffect(() => {
        const map = new mapboxgl.Map({
            'container': 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [US_CENTER_LNG, US_CENTER_LAT],
            zoom: 3.75,
        })

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
            .attr("r", 7)
            .style("fill", "steelblue")
            .on('mouseover', (e, d) => {
                showTooltip(e, d)
            })
            .on('mouseout', (e, d) => {
                hideTooltip()
            })
            .on('click', (e, d) => {
                // make all other circles steelblue
                d3.selectAll('.circle')
                    .transition()
                    .duration(500)
                    .style('fill', 'steelblue')
                
                // make this circle red
                const circle = d3.select(`#${uniqueCircleId(d)}`)
                circle
                    .transition()
                    .duration(500)
                    .style('fill', 'red')
                
                    selectNode(e.target, d)
            })

        // define render function for mapbox
        const render = () => dots 
            .attr('cx', d => project(d).x)
            .attr('cy', d => project(d).y)

        map.on('viewreset', render)
        map.on('move', render)
        map.on('moveend', render)

        map.on('load', () => {
            map.resize()
        })

        render()

        return () => map.remove()
    }, [])

    return (
        <div className="map-container" ref={mapContainer} id='map'>
            <div className="map-tooltip" style={{"opacity": 0}}>
                <p>Bhupi Ghupi</p>
            </div>
        </div>
    )
}

export default MapViewDemo