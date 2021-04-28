import * as DataConstants from '../../utils/dataConstants'
import * as StringUtils from '../../utils/stringUtils'

const TooltipContents = ({ node, isSelected }) => {
    // handle null node case
    if (! node) {
        return null;
    }

    console.log('rendering tooltip')

    const city = node[DataConstants.CITY_KEY_NAME]
    const state = node[DataConstants.STATE_KEY_NAME]
    const kindness = node[DataConstants.KINDNESS_KEY_NAME]

    return (
        <div>
            <p><b>{city ? `${city}, ` : null}{state}</b></p>
            <p><b>{StringUtils.trimWithElipses(kindness, 140)}</b></p>
            <p>{! isSelected ? 'Click for more info!' : null}</p>
        </div>
    )
}

export default TooltipContents
