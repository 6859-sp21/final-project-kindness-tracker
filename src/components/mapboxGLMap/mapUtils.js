import * as d3 from 'd3'
import * as DataConstants from '../../utils/dataConstants'

const DEFAULT_KINDESS = 'A random act of kindess took place!'

const showTooltip = (e, d) => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition()
        .duration(0)
        .style('opacity', 0.8)
        .style('left', `${e.pageX + 50}px`)
        .style('top', `${e.pageY - 50}px`)

    // also update the text
    const city = d[DataConstants.CITY_KEY_NAME]
    const state = d[DataConstants.STATE_KEY_NAME]
    const kindness = d[DataConstants.KINDNESS_KEY_NAME]
    const kindnessFormatted = kindness || DEFAULT_KINDESS;

    const htmlString = `<p><b>${city}, ${state}</b></p><p>${kindnessFormatted}</p>`

    tooltip.html(htmlString)
}

const hideTooltip = () => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition().duration(500)
        .style("opacity", 0)
}

const selectNode = (target, d) => {
    return
} 

const resetAllCircleColors = () => {
    d3.selectAll('.circle')
        .transition()
        .duration(500)
        .style('fill', 'steelblue')
}

export {
    showTooltip,
    hideTooltip,
    selectNode,
    resetAllCircleColors,
}