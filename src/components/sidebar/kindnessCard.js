import * as DataUtils from '../../utils/dataUtils'

const KindnessCard = ({ node, shortMode }) => {
    // handle null node case
    if (! node) {
        return null
    }

    const {
        kindness,
        dateString,
        location,
    } = DataUtils.formatFieldsForDisplay(node)

    const kindnessClean = DataUtils.cleanDescription(kindness)

    return shortMode ? (
        <div className="kindness-card-inner">
            <p>Most Recent Act of Kindness:</p>
            <p><b>{kindnessClean || 'No kindness description provided!'}</b></p>
            <p><b>{location}</b></p>
            <p><b>{dateString}</b></p>
        </div>
        ) : (
        <div className="kindness-card-inner">
            <p>Act of Kindness:</p>
            <div className="kindness-card-description">
                <p><b>{kindnessClean || 'No kindness description provided!'}</b></p>
            </div>
            <p>Location:</p>
            <p><b>{location}</b></p>
            <p>Date & Time:</p>
            <p><b>{dateString}</b></p>
        </div>
    )
}

export default KindnessCard