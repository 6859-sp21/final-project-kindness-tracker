import * as DataConstants from '../../utils/dataConstants'
import * as StringUtils from '../../utils/stringUtils'
import * as DataUtils from '../../utils/dataUtils'

const TooltipContents = ({ node, isSelected }) => {
    // handle null node case
    if (! node) {
        return null;
    }

    console.log('rendering tooltip')

    const {
        kindness,
        cityState,
    } = DataUtils.formatFieldsForDisplay(node)

    const kindnessClean = DataUtils.cleanDescription(kindness)
    const kindnessTrimmed = StringUtils.trimWithElipses(kindnessClean, 140)

    return (
        <div>
            <p><b>{kindnessTrimmed}</b></p>
            <p><i>{cityState}</i></p>
            <p>{! isSelected ? 'Click for more info!' : null}</p>
        </div>
    )
}

export default TooltipContents
