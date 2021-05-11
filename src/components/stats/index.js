import { Button } from '@material-ui/core'
import * as DataConstants from '../../utils/dataConstants'
import * as DataUtils from '../../utils/dataUtils'
import KindnessCard from '../sidebar/kindnessCard'

const StatisticsSidebar = ({ data, setSelectedNode }) => {
  if (!data) {
    return null
  }
  const numPoints = data.length
  const ids = new Set(data.map(d => d[DataConstants.ID_KEY_NAME]))
  const numIds = ids.size

  // want to get average path length
  // TODO move this code somewhere else to a more common utility location
  const pathLengths = Array.from(ids).reduce((map, id) => {
    map[id] = DataUtils.pathLengthMiles(
      data.filter(d => d[DataConstants.ID_KEY_NAME] == id)
    )
    return map
  }, {})

  const maxPathLength = Math.max(...Object.values(pathLengths))
  const averagePathLength = Object.values(pathLengths).reduce((a, b) => a + b, 0) / Object.values(pathLengths).length

  // get most recent act
  const dataSorted = DataUtils.sortByDate(data)
  const mostRecentNode = dataSorted[dataSorted.length - 1]

  return (
    <div className="summary-stats-inner">
      <div className="summary-stats-flex">
        <div className="summary-stats-row">
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{numPoints}</h1>
            <p>total acts</p>
          </div>
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{numIds}</h1>
            <p>unique paths (card IDs)</p>
          </div>
        </div>
        <div className="summary-stats-row">
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{maxPathLength.toFixed(1)}</h1>
            <p>longest path (miles)</p>
          </div>
          <div className="sidebar-clear-div summary-statistics-card summary-stats-item-half">
            <h1>{averagePathLength.toFixed(1)}</h1>
            <p>average path length (miles)</p>
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
