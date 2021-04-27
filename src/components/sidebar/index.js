import React from 'react'
import '../../styles/Sidebar.css'
import KindessCard from './kindessCard'
import LoadingSpinner from './loadingSpinner'
import SidebarInfoCard from './infoCard'
import TraceStepper from './traceStepper'

const Sidebar = ({ isLoading, selectedNode, setSelectedNode, setTraceNode, traceList, setTraceList, traceIndex, setTraceIndex }) => {
    console.log('rendering sidebar')
    return (
        <div className="sidebar-flex">
            <h1>Kindess Tracker</h1>
            {
                isLoading ? <LoadingSpinner /> : null
            }
            {
                ! isLoading && ! selectedNode ? <SidebarInfoCard /> : null
            }
            <div className="selected-card-wrapper">
                <KindessCard node={selectedNode} />
            </div>
            {
                selectedNode ? (
                    <button onClick={() => {
                        setSelectedNode(null)
                        setTraceList([])
                        setTraceIndex(-1)
                        setTraceNode(null)
                    }}>Clear Selected Node</button>
                ) : null
            }
            {
                (selectedNode && traceList.length === 0) ? (
                    <button onClick={() => setTraceNode(selectedNode)}>Trace this Act!</button>
                ) : null
            }
            <TraceStepper
                traceList={traceList}
                traceIndex={traceIndex}
                setTraceIndex={setTraceIndex}
            />
        </div>
    )
}

export default React.memo(Sidebar, (prevProps, nextProps) => {
    return (prevProps.isLoading === nextProps.isLoading &&
        prevProps.selectedNode === nextProps.selectedNode &&
        prevProps.traceNode === nextProps.traceNode &&
        prevProps.traceIndex === nextProps.traceIndex)
})
