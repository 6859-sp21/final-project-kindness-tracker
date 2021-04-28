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
                    <MouseIcon />
                </div>
                <div className="sidebar-info-right">
                    <h3>Click a circle to explore that act of kindness further!</h3>
                </div>
            </div>
            <div className="sidebar-info-row">
                <div className="sidebar-info-left">
                    <ExploreIcon />
                </div>
                <div className="sidebar-info-right">
                    <h3>Then, you can trace that act of kindess to see how may people have paid it forward.</h3>
                </div>
            </div>
        </div >
    )
}

export default SidebarInfoCard