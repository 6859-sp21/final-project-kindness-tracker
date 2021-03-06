import FormControlLabel from '@material-ui/core/FormControlLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Switch from '@material-ui/core/Switch'
import * as DataConstants from '../..//utils/dataConstants'

const DataToggle = ({ dataUrl, setDataUrl }) => {
    const checked = dataUrl === DataConstants.REAL_DATA_URL

    const handleChange = (event) => {
        const eventChecked = event.target.checked
        const dataUrlNew = eventChecked ? DataConstants.REAL_DATA_URL : DataConstants.SPOOF_DATA_URL
        setDataUrl(dataUrlNew)
    }

    const label = dataUrl === DataConstants.REAL_DATA_URL ? 'Viewing Real Data' : 'Viewing Fake Data'

    const description = dataUrl === DataConstants.REAL_DATA_URL ?
        'You are currently viewing REAL acts of kindness!' :
        'You are currently viewing FAKE acts of kindness for testing purposes only.'

    return (
        <Tooltip title={<h2>Toggle to switch the data source. {description}</h2>} arrow placement="top">
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        // value={'checked'}
                        color='primary'
                    />
                }
                labelPlacement='top'
                label={label}
            />
        </Tooltip>
    )
}

export default DataToggle