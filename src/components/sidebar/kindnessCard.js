import * as DataUtils from '../../utils/dataUtils'

const KindnessCard = ({ node }) => {
    console.log('rendering card')
    // handle null node case
    if (! node) {
        return null;
    }

    const {
        kindness,
        dateString,
        location,
    } = DataUtils.formatFieldsForDisplay(node)

    const kindnessClean = DataUtils.cleanDescription(kindness)

    return (
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