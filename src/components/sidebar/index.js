import React from 'react'
import '../../styles/Sidebar.css'
import KindessCard from './kindessCard'
import LoadingSpinner from './loadingSpinner'
import SidebarInfoCard from './infoCard'
import TraceStepper from './traceStepper'

const Sidebar = ({ isLoading, selectedNode, setSelectedNode, isTracing, setIsTracing, trace }) => {
    console.log('rendering sidebar')
    return (
        <div className="sidebar-flex">
            <h1>Kindess Tracker</h1>
            {
                isLoading ? <LoadingSpinner /> : null
            }
            {
                !isLoading && !selectedNode ? <SidebarInfoCard /> : null
            }
            { !isTracing ? (
                <div className="selected-card-wrapper">
                    <KindessCard node={selectedNode} />
                </div>
            ) : null
            }
            <div className="sidebar-clear-div">
                {
                    selectedNode && !isTracing ? (
                        <button className="sidebar-button-below" onClick={() => {
                            setSelectedNode(null)
                            setIsTracing(false)
                        }}>Clear Selected Node</button>
                    ) : null
                }
                {
                    (selectedNode && !isTracing) ? (
                        <button onClick={() => setIsTracing(true)}>Trace this Act!</button>
                    ) : null
                }
            </div>
            <TraceStepper
                isTracing={isTracing}
                setIsTracing={setIsTracing}
                trace={trace}
            />
            <div className="sidebar-bottom-content">
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

export default React.memo(Sidebar, (prevProps, nextProps) => {
    return (prevProps.isLoading === nextProps.isLoading &&
        prevProps.selectedNode === nextProps.selectedNode &&
        prevProps.isTracing === nextProps.isTracing &&
        prevProps.traceList === nextProps.traceList &&
        prevProps.traceIndex === nextProps.traceIndex)
})
