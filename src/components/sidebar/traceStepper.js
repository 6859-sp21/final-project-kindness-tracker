import * as DataConstants from '../../utils/dataConstants'

const TraceStepper = ({ traceList, traceIndex, setTraceIndex }) => {
    console.log('rendering trace')
    return (
        traceList ? (
            traceList.map((d, i) => {
                return (
                    <p key={i} onClick={() => setTraceIndex(i)} style={{ color: i == traceIndex ? 'blue' : 'white', cursor: 'pointer' }}>
                        {d[DataConstants.ID_KEY_NAME]}
                    </p>
                )
            })
        ) : null
    )
}

export default TraceStepper
