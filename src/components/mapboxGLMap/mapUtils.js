import * as d3 from 'd3'
import mapboxgl from "mapbox-gl"
import * as DataConstants from '../../utils/dataConstants'
import * as DataUtils from '../../utils/dataUtils'

const POINT_ZOOM = 12
const ZOOM_EASE_MILLIS = 3000
const POINT_ZOOM_MILES = 1
const RATIO_PAD = 0.1

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
    ], {
        duration: ZOOM_EASE_MILLIS,
    })
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

const resetAllCircleColors = (fill = 'steelblue') => {
    return d3.selectAll('.circle')
        .transition()
        .duration(500)
        .style('fill', fill)
        .style('opacity', 1)
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

const zoomToDataPoint = (map, d) => {
    map.flyTo({
        center: [
            d[DataConstants.CENTER_LNG_KEY_NAME],
            d[DataConstants.CENTER_LAT_KEY_NAME],
        ],
        zoom: POINT_ZOOM,
        essential: true
    })
}

const mapRender = (map) => {
    d3.selectAll('.circle')
        .attr('cx', d => projectLngLatToXY(map, d).x)
        .attr('cy', d => projectLngLatToXY(map, d).y)
}

const getBoudingObjectForTraceList = (trace) => {
    return DataUtils.computeLngLatBoundingBox(
        generateLngLatArray(trace),
        trace.length > 1 ? RATIO_PAD : POINT_ZOOM_MILES,
        trace.length > 1 ? true : false,
        trace.length > 1 ? true : false,
    )
}

const bringCircleWithIdToFront = (id) => {
    setTimeout(() => {
        d3.select('.map-svg')
            .selectAll('use')
            .remove()

        d3.select('.map-svg')
            .append('use')
            .attr('xlink:href', id)
    }, 500)
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
    zoomToDataPoint,
    mapRender,
    getBoudingObjectForTraceList,
    bringCircleWithIdToFront,
}
