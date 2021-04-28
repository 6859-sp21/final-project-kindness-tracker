import * as d3 from 'd3'
import mapboxgl from "mapbox-gl"
import * as DataConstants from '../../utils/dataConstants'

const initializeMap = ({ setMap, mapContainer }) => {
    const myMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-100, 40],
        zoom: 3,
    })

    // immediately center based on the bounding box of our data points
    // zoomMapToBoundingObject(myMap, boundingObject)

    myMap.on("load", () => {
        setMap(myMap)
        // setBoundingObject(boundingObject)
    })
}

const zoomMapToBoundingObject = (map, boundingObject) => {
    const { topRight, bottomLeft } = boundingObject
    map.fitBounds([
        [bottomLeft.lng, bottomLeft.lat],
        [topRight.lng, topRight.lat]
    ]);
}

const showTooltip = (e, d) => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition()
        .duration(0)
        .style('opacity', 0.8)
        .style('left', `${e.pageX + 50}px`)
        .style('top', `${e.pageY - 50}px`)
}

const hideTooltip = (callback) => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition().duration(500)
        .style("opacity", 0)
        .on('end', callback)
}

const resetAllCircleColors = () => {
    return d3.selectAll('.circle')
        .transition()
        .duration(500)
        .style('fill', 'steelblue')
        .style('z-index', 0)
}

const clearAllEventHandlers = (selection) => {
    selection
        .on('mouseover', null)
        .on('mousemove', null)
        .on('mouseout', null)
        .on('click', null)
}

// write function to generate ID of circle
const uniqueCircleId = d => `circle-${d.index}`

// write function to generate class of circle based off id key
const circleClass = d => `circle circle-${d[DataConstants.ID_KEY_NAME]}`

// write function to quickly convert a data array to the fomat for lat lng
const generateLngLatArray = data => data.map(d => ({
    lng: d[DataConstants.CENTER_LNG_KEY_NAME],
    lat: d[DataConstants.CENTER_LAT_KEY_NAME],
}))

// write projection function for map
const projectLngLatToXY = (map, d) => {
    return map.project(
        new mapboxgl.LngLat(d[DataConstants.CENTER_LNG_KEY_NAME], d[DataConstants.CENTER_LAT_KEY_NAME])
    )
}

export {
    initializeMap,
    zoomMapToBoundingObject,
    showTooltip,
    hideTooltip,
    resetAllCircleColors,
    clearAllEventHandlers,
    uniqueCircleId,
    circleClass,
    generateLngLatArray,
    projectLngLatToXY,
}
