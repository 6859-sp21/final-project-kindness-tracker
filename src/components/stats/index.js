import { Button } from '@material-ui/core'
import * as DataConstants from '../../utils/dataConstants'
import * as DataUtils from '../../utils/dataUtils'
import KindnessCard from '../sidebar/kindnessCard'
import _ from 'lodash'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Tooltip from '@material-ui/core/Tooltip'

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
      </div>
    </div>
  )
}

export default StatisticsSidebar
