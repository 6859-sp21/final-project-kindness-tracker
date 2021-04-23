import * as d3 from 'd3'

const DEFAULT_KINDESS = 'A random act of kindess took place!'

const showTooltip = (e, d) => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition()
        .duration(0)
        .style('opacity', 0.8)
        .style('left', `${e.pageX}px`)
        .style('top', `${e.pageY - 50}px`)

    // also update the text
    const city = d['CITY where act of kindness took place']
    const state = d['STATE']
    const kindness = d['[Optional] Tell us about the act of kindness you received!']
    const kindnessFormatted = kindness || DEFAULT_KINDESS;

    const htmlString = `<p><b>${city}, ${state}</b></p><p>${kindnessFormatted}</p>`

    tooltip.html(htmlString)
}

const hideTooltip = () => {
    const tooltip = d3.select('.map-tooltip')
    tooltip
        .transition().duration(500)
        .style("opacity", 0)
    
    tooltip.html('')
}

export {
    showTooltip,
    hideTooltip
}