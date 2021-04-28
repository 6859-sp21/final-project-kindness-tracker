import React from 'react'
import { Button } from '@material-ui/core'
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
            <div className="sidebar-clear-div">
                {
                    selectedNode && !isTracing ? (
                        <Button variant="contained" style={{ backgroundColor: 'red' }} className="sidebar-button-below" onClick={() => {
                            setSelectedNode(null)
                            setIsTracing(false)
                        }}>Reset View</Button>
                    ) : null
                }
                {
                    (selectedNode && !isTracing) ? (
                        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} className="sidebar-button-below" onClick={() => setIsTracing(true)}>Trace this Act!</Button>
                    ) : null
                }
            </div>
            { !isTracing ? (
                <div className="selected-card-wrapper">
                    <KindessCard node={selectedNode} />
                </div>
            ) : null
            }
            <TraceStepper
                isTracing={isTracing}
                setIsTracing={setIsTracing}
                trace={trace}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
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

export default Sidebar
