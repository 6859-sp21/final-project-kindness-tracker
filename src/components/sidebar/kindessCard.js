import { useEffect } from 'react';
import * as DataConstants from '../../utils/dataConstants'

const KindnessCard = ({ node }) => {
    // handle null node case
    if (! node) {
        return null;
    }

    const street = node[DataConstants.STREET_KEY_NAME]
    const city = node[DataConstants.CITY_KEY_NAME]
    const state = node[DataConstants.STATE_KEY_NAME]
    const zip = node[DataConstants.ZIP_KEY_NAME]
    const kindness = node[DataConstants.KINDNESS_KEY_NAME]

    return (
        <div className="kindness-card-inner">
            <p>Address: <b>{street || 'No street provided.'}</b></p>
            <p>City: <b>{city || 'No city provided.'}</b></p>
            <p>State: <b>{state || 'No state provided.'}</b></p>
            <p>Zip Code: <b>{zip || 'No zip code provided.'}</b></p>
            <p>Act of Kindness Description:</p>
            <p><b>{kindness || 'No kindess description provided.'}</b></p>
        </div>
    )
}

export default KindnessCard