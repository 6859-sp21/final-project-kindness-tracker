import MouseIcon from '@material-ui/icons/Mouse'
import ExploreIcon from '@material-ui/icons/Explore'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import SearchIcon from '@material-ui/icons/Search'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

/*
    Simple component to render some useful info when no node is selected.
*/
const SidebarInfoCard = () => {
    return (
        <div>
            <hr className="sidebar-divider" />
            <div className="sidebar-info-row">
                <div className="sidebar-info-left">
                    <MouseIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p><b>Click</b> a circle to explore that act of kindness!</p>
                </div>
            </div>
            <div className="sidebar-info-row">
                <div className="sidebar-info-left">
                    <ExploreIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p><b>Trace</b> that act of kindness to see how may people have paid it forward.</p>
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
            <div className="sidebar-info-row sidebar-info-row-stats">
                <div className="sidebar-info-left">
                    <TrendingUpIcon fontSize="large" />
                </div>
                <div className="sidebar-info-right">
                    <p>View <b>summary statistics</b> about the entire dataset.</p>
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
            <div className="sidebar-info-row sidebar-info-row-learn">
                <Link to='/about' target="blank" rel="noopener noreferrer">
                    <Button variant="contained" color="primary">
                        Learn More
                </Button>
                </Link>
            </div>
        </div >
    )
}

// Search for acts of kindness by description, location, or ID

export default SidebarInfoCard