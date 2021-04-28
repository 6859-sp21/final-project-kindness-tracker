import MouseIcon from '@material-ui/icons/Mouse'
import ExploreIcon from '@material-ui/icons/Explore'

/*
    Simple component to render some useful info when no node is selected.
*/
const SidebarInfoCard = () => {
    console.log('rendering side info card')
    return (
        <div>
            <hr className="sidebar-divider" />
            <div className="sidebar-info-row">
                <div className="sidebar-info-left">
                    <MouseIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p><b>Click</b> a circle to explore that act of kindness further!</p>
                </div>
            </div>
            <div className="sidebar-info-row">
                <div className="sidebar-info-left">
                    <ExploreIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p>Then, you can <b>trace</b> that act of kindess to see how may people have paid it forward.</p>
                </div>
            </div>
        </div >
    )
}

export default SidebarInfoCard