import KindnessCard from './kindessCard'
import * as DataConstants from '../../utils/dataConstants'

const TraceStepper = ({ isTracing, setIsTracing, trace, selectedNode, setSelectedNode }) => {
    console.log('rendering trace')

    if (! isTracing) {
        return null
    }

    // find the trace index
    const traceIndex = trace.indexOf(selectedNode)

    const n = trace.length

    return (
        <div className="trace-stepper-wrapper">
            <div className="trace-stepper-button-horizontal">
            <button disabled={traceIndex === 0} onClick={() => setSelectedNode(trace[0])}>Earliest</button>
                <button disabled={traceIndex === 0} onClick={() => setSelectedNode(trace[traceIndex - 1])}>Previous</button>
                <button disabled={traceIndex === n - 1} onClick={() => setSelectedNode(trace[traceIndex + 1])}>Next</button>
                <button disabled={traceIndex === n - 1} onClick={() => setSelectedNode(trace[n - 1])}>Latest</button>
            </div>
            <p>{`${traceIndex + 1} / ${trace.length}`}</p>
            <KindnessCard node={selectedNode} />
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
