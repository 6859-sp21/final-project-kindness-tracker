import * as d3 from 'd3'
import mapboxgl from "mapbox-gl"

const initializeMap = ({ setMap, setBoundingObject, mapContainer, boundingObject }) => {
    const myMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
    })

    // immediately center based on the bounding box of our data points
    zoomMapToBoundingObject(myMap, boundingObject)

    myMap.on("load", () => {
        setMap(myMap)
        setBoundingObject(boundingObject)
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

export {
    initializeMap,
    zoomMapToBoundingObject,
    showTooltip,
    hideTooltip,
    resetAllCircleColors,
    clearAllEventHandlers,
}
