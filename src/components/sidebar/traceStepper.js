import KindnessCard from './kindessCard'
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const TraceStepper = ({ isTracing, setIsTracing, trace, selectedNode, setSelectedNode }) => {
    console.log('rendering trace')

    if (!isTracing) {
        return null
    }

    // find the trace index
    const traceIndex = trace.indexOf(selectedNode)

    const n = trace.length

    return (
        <div className="trace-stepper-wrapper">
            <div className="trace-stepper-button-exit">
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => {
                    setIsTracing(false)
                }}>
                    Exit Trace Mode
                </Button>
            </div>
            <div className="trace-stepper-button-horizontal">
                <Button
                    className="trace-stepper-button"
                    variant="contained"
                    color="primary"
                    disabled={traceIndex === 0}
                    onClick={() => setSelectedNode(trace[0])}
                >
                    First
                </Button>
                <Button
                    className="trace-stepper-button"
                    variant="contained"
                    color="primary"
                    disabled={traceIndex === 0}
                    onClick={() => setSelectedNode(trace[traceIndex - 1])}
                >
                    <ArrowBackIcon />
                </Button>
                <Button
                    className="trace-stepper-button"
                    variant="contained"
                    color="primary"
                    disabled={traceIndex === n - 1}
                    onClick={() => setSelectedNode(trace[traceIndex + 1])}
                >
                    <ArrowForwardIcon />
                </Button>
                <Button
                    className="trace-stepper-button"
                    variant="contained"
                    color="primary"
                    disabled={traceIndex === n - 1}
                    onClick={() => setSelectedNode(trace[n - 1])}
                >
                    Last
                </Button>
            </div>
            <p>{`${traceIndex + 1} / ${trace.length}`}</p>
            <KindnessCard node={selectedNode} />
        </div>
    )
}

export default TraceStepper
