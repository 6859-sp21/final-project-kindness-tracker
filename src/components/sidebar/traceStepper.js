import KindnessCard from './kindnessCard'
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Tooltip from '@material-ui/core/Tooltip'

const TraceStepper = ({ exitTraceMode, trace, selectedNode, setSelectedNode }) => {
    // find the trace index
    const traceIndex = trace.indexOf(selectedNode)

    const n = trace.length

    return (
        <div className="trace-stepper-wrapper">
            <div className="trace-stepper-button-horizontal">
                <Tooltip title={<h2>Go to the first act in this path.</h2>} arrow placement="bottom">
                    <Button
                        className="trace-stepper-button"
                        variant="contained"
                        color="primary"
                        disabled={traceIndex === 0}
                        onClick={() => setSelectedNode(trace[0])}
                    >
                        First
                </Button>
                </Tooltip>
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
                <Tooltip title={<h2>Go to the most recent act in this path.</h2>} arrow placement="bottom">
                    <Button
                        className="trace-stepper-button"
                        variant="contained"
                        color="primary"
                        disabled={traceIndex === n - 1}
                        onClick={() => setSelectedNode(trace[n - 1])}
                    >
                        Last
                </Button>
                </Tooltip>
            </div>
            <p>{`${traceIndex + 1} / ${trace.length}`}</p>
            <KindnessCard node={selectedNode} />
        </div>
    )
}

export default TraceStepper
