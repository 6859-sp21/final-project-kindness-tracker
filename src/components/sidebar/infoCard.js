import MouseIcon from '@material-ui/icons/Mouse'
import ExploreIcon from '@material-ui/icons/Explore'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import SearchIcon from '@material-ui/icons/Search'

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
                    <p>Then, you can <b>trace</b> that act of kindness to see how may people have paid it forward.</p>
                </div>
            </div>
            <div className="sidebar-info-row sidebar-info-row-search">
                <div className="sidebar-info-left">
                    <SearchIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p><b>Search</b> for acts of kindness by description, location, or ID.</p>
                </div>
            </div>
            <div className="sidebar-info-row sidebar-info-row-toggle">
                <div className="sidebar-info-left">
                    <ToggleOffIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p>Switch between <b>real-time</b> and <b>generated</b> data using the toggle below.</p>
                </div>
            </div>
        </div >
    )
}

// Search for acts of kindness by description, location, or ID

export default SidebarInfoCard