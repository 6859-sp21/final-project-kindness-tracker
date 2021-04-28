import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import * as DataConstants from '../..//utils/dataConstants'

const DataToggle = ({ dataUrl, setDataUrl }) => {
    const checked = dataUrl === DataConstants.REAL_DATA_URL

    const handleChange = (event) => {
        const eventChecked = event.target.checked
        const dataUrlNew = eventChecked ? DataConstants.REAL_DATA_URL : DataConstants.SPOOF_DATA_URL
        setDataUrl(dataUrlNew)
    }

    const label = dataUrl === DataConstants.REAL_DATA_URL ? 'Viewing Real Data' : 'Viewing Fake Data'
    
    return (
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
    )
}

export default DataToggle