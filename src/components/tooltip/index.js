import * as DataConstants from '../../utils/dataConstants'
import * as StringUtils from '../../utils/stringUtils'

const TooltipContents = ({ node }) => {
    // handle null node case
    if (! node) {
        return null;
    }

    const city = node[DataConstants.CITY_KEY_NAME]
    const state = node[DataConstants.STATE_KEY_NAME]
    const kindness = node[DataConstants.KINDNESS_KEY_NAME]

    return (
        <div>
            <p><b>{city ? `${city}, ` : null}{state}</b></p>
            <p><b>{StringUtils.trimWithElipses(kindness, 140)}</b></p>
            <p>Click for more info!</p>
        </div>
    )
}

export default TooltipContents
