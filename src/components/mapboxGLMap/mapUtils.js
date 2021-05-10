import * as d3 from 'd3'
import mapboxgl from "mapbox-gl"
import * as DataConstants from '../../utils/dataConstants'
import * as DataUtils from '../../utils/dataUtils'

const POINT_ZOOM = 12
const ZOOM_EASE_MILLIS = 3000
const POINT_ZOOM_MILES = 1
const RATIO_PAD = 0.1

const initializeMap = ({ setMap, mapContainer }) => {
    const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-100, 40],
        zoom: 3,
    })

    map.on("load", () => {
        setMap(map)
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

// write function to generate ID of circle
const uniqueCircleId = d => `circle-${d.index}`

// write function to generate class of circle based off id key
const circleClass = d => `circle circle-${d[DataConstants.ID_KEY_NAME]}`

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
        DataUtils.generateLngLatArray(trace),
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

const getPrevAndNextNodes = (trace, selectedNode) => {
    const traceIndex = trace.indexOf(selectedNode)
    const prevNode = traceIndex > 0 ? trace[traceIndex - 1] : null
    const nextNode = traceIndex < trace.length - 1 ? trace[traceIndex + 1] : null
    return {
        prevNode,
        nextNode,
    }
}

export {
    initializeMap,
    zoomMapToBoundingObject,
    showTooltip,
    hideTooltip,
    resetAllCircleColors,
    uniqueCircleId,
    circleClass,
    projectLngLatToXY,
    zoomToDataPoint,
    mapRender,
    getBoudingObjectForTraceList,
    bringCircleWithIdToFront,
    getPrevAndNextNodes,
}
