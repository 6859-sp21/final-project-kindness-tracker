import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

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
        const project = d => {
            return map.project(new mapboxgl.LngLat(d[0], d[1]))
        }

        // create data, bind circles to that data
        // var latLonData = [[-74.5, 40.05], [-74.45, 40.0], [-74.55, 40.0]] // dummy test data in New Jersey
        var lonLatData = data.map(obj => {
            return [+obj.CenterLon, +obj.CenterLat]
        })

        console.log(lonLatData)

        var dots = svg
            .selectAll("circle")
            .data(lonLatData)
            .enter()
            .append("circle")
            .attr("r", 7)
            .style("fill", "steelblue")

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
        <div className="map-container" ref={mapContainer} id='map'/>
    )
}

export default MapViewDemo
