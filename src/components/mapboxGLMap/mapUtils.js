import * as d3 from 'd3'

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