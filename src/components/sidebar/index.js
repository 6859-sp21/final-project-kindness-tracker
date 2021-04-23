import '../../styles/Sidebar.css'
import * as DataConstants from '../../utils/dataConstants'

const Sidebar = ({ selectedNode, setSelectedNode, setTraceNode, traceList, setTraceList, traceIndex, setTraceIndex }) => {
    return (
        <div className="sidebar-flex">
            <h1>Kindess Tracker</h1>
            <h3>{selectedNode ? selectedNode.STATE : null}</h3>
            <h3>{selectedNode ? selectedNode[DataConstants.KINDNESS_KEY_NAME] : null}</h3>
            {
                selectedNode ? (
                    <button onClick={() => {
                        setSelectedNode(null)
                        setTraceList([])
                        setTraceIndex(-1)
                    }}>Clear Selected Node</button>
                ) : null
            }
            {
                selectedNode ? (
                    <button onClick={() => setTraceNode(selectedNode)}>Trace this Act!</button>
                ) : null
            }
            {
                traceList ? (
                    traceList.map((d, i) => {
                        return (
                            <p key={i} onClick={() => setTraceIndex(i)} style={{color: i == traceIndex ? 'blue' : 'white', cursor: 'pointer'}}>
                                {d[DataConstants.ID_KEY_NAME]}
                            </p>
                        )
                    })
                ) : null
            }

        </div>
    )
}

export default Sidebar
