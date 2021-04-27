import KindnessCard from './kindessCard'

const TraceStepper = ({ isTracing, setIsTracing, traceList, traceIndex, setTraceIndex }) => {
    console.log('rendering trace')

    if (! isTracing) {
        return null
    }

    // get the node at the given trace index
    // TODO update this logic 
    const node = traceList[traceIndex]

    return (
        <div className="trace-stepper-wrapper">
            <div className="trace-stepper-button-horizontal">
            <button disabled={traceIndex === 0} onClick={() => setTraceIndex(0)}>Earliest</button>
                <button disabled={traceIndex === 0} onClick={() => setTraceIndex(traceIndex - 1)}>Previous</button>
                <button disabled={traceIndex === traceList.length - 1} onClick={() => setTraceIndex(traceIndex + 1)}>Next</button>
                <button disabled={traceIndex === traceList.length - 1} onClick={() => setTraceIndex(traceList.length - 1)}>Latest</button>
            </div>
            <p>{`${traceIndex + 1} / ${traceList.length}`}</p>
            <KindnessCard node={node} />
            <div className="trace-stepper-button-below">
                <button onClick={() => {
                    setIsTracing(false)
                }}>
                    Exit Trace Mode
                </button>
            </div>

        </div>
    )
}

export default TraceStepper
