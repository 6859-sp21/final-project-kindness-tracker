import * as turf from '@turf/turf'
import * as DataUtils from '../../utils/dataUtils'

const TraceStatistics = ({ trace }) => {
    console.log('rendering trace stats')

    const traceCount = trace.length
    
    // compute total distance travelled in miles
    const lngLat = DataUtils.generateLngLatArray(trace)
    let distance = 0
    for (let i = 0; i < trace.length - 1; i++) {
        distance += turf.distance(
            turf.point([lngLat[i].lng, lngLat[i].lat]),
            turf.point([lngLat[i + 1].lng, lngLat[i + 1].lat]),
            {
                'units': 'miles'
            },
        )
    }

    // compute total time between first and last act
    const firstDate = trace[0].dateTime
    const lastDate = trace[trace.length - 1].dateTime
    const diffDays = lastDate.diff(firstDate, 'days')
    const { days } = diffDays.toObject()

    return (
        <div className="trace-statistics-inner">
            <div className="sidebar-clear-div">
                <h1>{traceCount}</h1>
                <p>acts of kindness in this trace 😊</p>
                <br></br>
                <h1>{distance.toFixed(1)}</h1>
                <p>total miles travelled 🌍</p>
                <br></br>
                <h1>{days.toFixed(1)}</h1>
                <p>days between first & last act 📅 </p>
            </div>
        </div>
    )
}

export default TraceStatistics