import { Button } from '@material-ui/core'
import * as DataConstants from '../../utils/dataConstants'
import * as DataUtils from '../../utils/dataUtils'
import KindnessCard from '../sidebar/kindnessCard'
import _ from 'lodash'
import * as d3 from 'd3'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Tooltip from '@material-ui/core/Tooltip'
import { useEffect } from 'react'
import { DateTime } from 'luxon'

const StatisticsSidebar = ({ data, setSelectedNode, traceId }) => {
  if (!data) {
    return null
  }

  const numPoints = data.length
  const ids = new Set(data.map(d => d[DataConstants.ID_KEY_NAME]))
  const numIds = ids.size

  // want to get average path length
  // TODO move this code somewhere else to a more common utility location
  const pathLengths = Array.from(ids)
    .filter(id => id !== DataConstants.ROOT_ACT_ID)
    .reduce((map, id) => {
      map[id] = DataUtils.pathLengthMiles(
        DataUtils.filterTraceListForId(data, id)
      )
      return map
    }, {})

  const maxPathLength = Math.max(...Object.values(pathLengths))
  const maxPathId = _.maxBy(_.keys(pathLengths), o => pathLengths[o])
  const averagePathLength = Object.values(pathLengths).reduce((a, b) => a + b, 0) / Object.values(pathLengths).length

  const dataSorted = DataUtils.sortByDate(data)
  const mostRecentNode = dataSorted[dataSorted.length - 1]

  useEffect(() => {
    // clear old svg first
    d3.selectAll('.chart-svg')
      .remove()

    // compute data necessary for line chart
    // need a count of acts per day that is cumulative
    const dates = dataSorted.map(d => d.dateTime)
    const firstDate = dates[0]
    const lastDate = dates[dataSorted.length - 1]
    const diff = lastDate.diff(firstDate, ['days'])
    const diffDays = Math.ceil(diff.days)

    // for each day in the difference, add that to firstDate, then count
    const countPerDay = _.range(diffDays).map(diff => {
      const date = firstDate.plus({ days: diff })
      const filt = dates.filter(dt => dt.startOf("day") <= date.startOf("day"))
      const count = filt.length
      return {
        days: diff,
        count,
      }
    })

    var margin = { top: 30, right: 30, bottom: 50, left: 30 },
      width = 460 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom

    // append the svg object to the body of the page
    var svg = d3.select(".chart-outer")
      .append('svg')
      .attr('class', 'chart-svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

    var x = d3.scaleLinear()
    .domain([0, d3.max(countPerDay, function (d) { return d.days })])
      .range([0, width])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    
    svg.append('text')
      .attr('class', 'axis-label')
      .text(`Days since first act of kindness (${firstDate.toLocaleString(DateTime.DATE_SHORT)})`)
      .attr('x', margin.left + (width - margin.left - margin.right) / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', height + 35)

    svg.append('text')
      .attr('class', 'axis-label')
      .text('# of cumulative acts of kindness over time')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '20px')
      .attr('x', margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', -10)

    var y = d3.scaleLinear()
      .domain([0, d3.max(countPerDay, function (d) { return d.count })])
      .range([height, 0])
    svg.append("g")
      .call(d3.axisLeft(y))

    svg.append("path")
      .datum(countPerDay)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 3.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.days) })
        .y(function (d) { return y(d.count) }))

  }, [data])

  return (
    <div className="summary-stats-inner">
      <div className="summary-stats-flex">
        <div className="summary-stats-row">
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{numPoints}</h1>
            <div className="summary-statistics-info-text">
              <p>total acts</p>
              <Tooltip title={<h2>Total number of acts of kindness in this dataset.</h2>} arrow>
                <ErrorOutlineIcon fontSize="small" />
              </Tooltip>
            </div>
          </div>
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{numIds}</h1>
            <div className="summary-statistics-info-text">
              <p>unique paths (card IDs)</p>
              <Tooltip title={<h2>Total number of unique card IDs that are in distribution. Each card ID creates a "path" where you can pay kindness forward.</h2>} arrow>
                <ErrorOutlineIcon fontSize="small" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="summary-stats-row">
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{maxPathLength.toFixed(1)} miles</h1>
            <div className="summary-statistics-info-text">
              <p>longest path length</p>
              <Tooltip title={<h2>Longest path length that a single act of kindness has travelled. Computed as the sum of distances between adjacent points along a path.</h2>} arrow>
                <ErrorOutlineIcon fontSize="small" />
              </Tooltip>
            </div>
            <Button
              onClick={() => traceId(+maxPathId)}
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </div>
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{averagePathLength.toFixed(1)} miles</h1>
            <p>average path length</p>
          </div>
        </div>
        <div className="summary-stats-row">
          <div className="summary-stats-item-big">
            <div className="summary-stats-kindness-card">
              <KindnessCard node={mostRecentNode} shortMode />
            </div>
          </div>
          <div className="summary-stats-item-small">
            <Button
              onClick={() => setSelectedNode(mostRecentNode)}
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </div>
        </div>
        <div className="chart-outer">
        </div>
      </div>
    </div>
  )
}

export default StatisticsSidebar
