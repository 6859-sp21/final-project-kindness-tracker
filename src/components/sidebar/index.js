import React from 'react'
import { Button } from '@material-ui/core'
import '../../styles/Sidebar.css'
import KindnessCard from './kindnessCard'
import LoadingSpinner from './loadingSpinner'
import SidebarInfoCard from './infoCard'
import TraceStepper from './traceStepper'
import DataToggle from './dataToggle'
import TraceStatistics from './traceStatistics'
import * as DataUtils from '../../utils/dataUtils'
import * as AppMode from '../../utils/appMode'

const Sidebar = ({ isLoading, selectedNode, setSelectedNode, clearSelectedNode, mode, setMode, trace, dataUrl, setDataUrl, filterText }) => {
    console.log('rendering sidebar')

    // get a trace count
    let traceCount = 0
    if (selectedNode) {
        const traceFilterList = DataUtils.filterTraceListForNode(trace, selectedNode)
        traceCount = traceFilterList.length - 1
    }
    return (
        <div className="sidebar-flex">
            <h1>😊 Kindness Tracker</h1>
            {
                isLoading ? <LoadingSpinner /> : null
            }
            {
                !isLoading && mode === AppMode.DEFAULT ? <SidebarInfoCard /> : null
            }
            {
                mode === AppMode.SELECTED ? (
                    <div className="sidebar-clear-div">
                        <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} className="sidebar-button-below" onClick={clearSelectedNode}>Clear Selection</Button>
                        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} className="sidebar-button-below" onClick={() => setMode(AppMode.TRACING)}>Trace this Act!</Button>
                        <h1>{traceCount}</h1>
                        <p>{traceCount > 1 ? 'acts' : 'act'} of kindness {traceCount > 1 ? 'are' : 'is'} connected</p>
                    </div>
                ) : null
            }
            { mode === AppMode.SELECTED ? (
                <div className="selected-card-wrapper">
                    <KindnessCard node={selectedNode} />
                </div>
            ) : null
            }
            {
                mode === AppMode.TRACING ? (
                    <div className="trace-stepper-button-exit">
                        <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setMode(AppMode.SELECTED)}>
                            Exit Trace Mode
                        </Button>
                    </div>
                ) : null
            }
            {
                mode === AppMode.TRACE_STATS ? (
                    <div className="trace-stepper-button-exit">
                        <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setMode(AppMode.TRACING)}>
                            Back to Trace Mode
                        </Button>
                    </div>
                ) : null
            }
            {
                mode === AppMode.TRACING ? (
                    <div>
                        <TraceStepper
                            exitTraceMode={() => setMode(AppMode.SELECTED)}
                            trace={trace}
                            selectedNode={selectedNode}
                            setSelectedNode={setSelectedNode}
                        />
                        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} className="sidebar-button-above" onClick={() => setMode(AppMode.TRACE_STATS)}>View Trace Statistics</Button>
                    </div>
                ) : null
            }
            {
                mode === AppMode.TRACE_STATS ? (
                    <TraceStatistics trace={trace} />
                ) : null
            }
            {
                mode === AppMode.SEARCHING && trace.length > 0 ? (
                    <div className="sidebar-clear-div">
                        <h1>{trace.length}</h1>
                        <p>{trace.length > 1 ? 'acts' : 'act'} found for search query "{filterText}".</p>
                        <p>Press Esc to clear.</p>
                    </div>
                ) : null
            }
            <div className="sidebar-bottom-content">
                <div className="data-toggle-outer">
                    <DataToggle
                        dataUrl={dataUrl}
                        setDataUrl={setDataUrl}
                    />
                </div>
                <p className="sidebar-small-text">Christian Moroney, Jackson Bernatchez, Kevin Lyons</p>
                <p className="sidebar-small-text">6.859 Final Project Spring 2021</p>
                <div>
                    <a href="https://github.com/6859-sp21/final-project-kindness-tracker" target="_blank">
                        <img className="sidebar-git-image" src="https://image.flaticon.com/icons/png/512/25/25231.png"></img>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
