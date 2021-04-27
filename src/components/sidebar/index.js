import React from 'react'
import '../../styles/Sidebar.css'
import KindessCard from './kindessCard'
import LoadingSpinner from './loadingSpinner'
import SidebarInfoCard from './infoCard'
import TraceStepper from './traceStepper'

const Sidebar = ({ isLoading, selectedNode, setSelectedNode, isTracing, setIsTracing, traceList, setTraceList, traceIndex, setTraceIndex }) => {
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
                        setTraceIndex(0)
                        setIsTracing(false)
                    }}>Clear Selected Node</button>
                ) : null
            }
            {
                (selectedNode && ! isTracing) ? (
                    <button onClick={() => setIsTracing(true)}>Trace this Act!</button>
                ) : null
            }
            <TraceStepper
                isTracing={isTracing}
                setIsTracing={setIsTracing}
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
        prevProps.isTracing === nextProps.isTracing &&
        prevProps.traceList === nextProps.traceList &&
        prevProps.traceIndex === nextProps.traceIndex)
})
