import * as DataConstants from '../../utils/dataConstants'
import { DateTime } from 'luxon'

const KindnessCard = ({ node }) => {
    console.log('rendering card')
    // handle null node case
    if (! node) {
        return null;
    }

    const streetNumber = node[DataConstants.STREET_NUMBER_KEY_NAME]
    const street = node[DataConstants.STREET_KEY_NAME]
    const address = (streetNumber && street) ? `${(streetNumber ? `${streetNumber} ` : null)}${street}` : null
    const city = node[DataConstants.CITY_KEY_NAME]
    const state = node[DataConstants.STATE_KEY_NAME]
    const cityState = (city || state) ? `${city}${city ? `, ${state}` : null}` : null
    const zip = node[DataConstants.ZIP_KEY_NAME]
    const location = `${address || 'No street address provided'}\n${cityState || 'No city/state provided'}${zip ? `\n${zip}` : ''}`
    const kindness = node[DataConstants.KINDNESS_KEY_NAME]

    // apply necessary parsing for date
    const date = node.dateTime
    const dateString = date.toLocaleString(DateTime.DATETIME_SHORT)

    return (
        <div className="kindness-card-inner">
            <p>Act of Kindness:</p>
            <div className="kindess-card-description">
                <p><b>{kindness || 'No kindess description provided!'}</b></p>
            </div>
            <p>Location:</p>
            <p><b>{location}</b></p>
            <p>Date & Time:</p>
            <p><b>{dateString}</b></p>
        </div>
    )
}

export default KindnessCard