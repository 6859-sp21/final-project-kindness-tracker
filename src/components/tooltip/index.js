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


    return (
        <div>
            <p><b>{StringUtils.trimWithElipses(kindness, 140)}</b></p>
            <p><i>{cityState}</i></p>
            <p>{! isSelected ? 'Click for more info!' : null}</p>
        </div>
    )
}

export default TooltipContents
