import '../../styles/Sidebar.css'

const Sidebar = ({ selectedNode, setSelectedNode }) => {
    return (
        <div className="sidebar-flex">
            <h1>Kindess Tracker</h1>
            <h3>{selectedNode ? selectedNode.STATE : null}</h3>
            <h3>{selectedNode ? selectedNode['[Optional] Tell us about the act of kindness you received!'] : null}</h3>
            {
                selectedNode ? (
                    <button onClick={() => setSelectedNode(null)}>Clear Selected Node</button>
                ) : null
            }
            
        </div>
    )
}

export default Sidebar
