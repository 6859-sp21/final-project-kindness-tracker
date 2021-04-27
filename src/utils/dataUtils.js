import { DateTime } from  'luxon'
import * as DataConstants from './dataConstants'

const DEGREES_TO_MILES = 69
const LNG_KEY = 'lng'
const LAT_KEY = 'lat'

const processRawSheetsData = (data) => {
    const dataProc = data ? data.map((d, i) => ({
        ...d,
        index: i,
        dateTime: DateTime.fromFormat(d[DataConstants.TIMESTAMP_KEY_NAME], DataConstants.TIMESTAMP_FORMAT),
    })) : null
    return dataProc
}

const nodesAreEqual = (one, two) => {
    if (! one || ! two)
        return false
        
    return one.index == two.index
}

const computeLngLatBoundingBox = (lngLatPoints, paddingMiles, isRatioPadding = false) => {
    // compute top right and bottom left
    // then, add some padding amount in miles
    var paddingDegreesLng = 0
    var paddingDegreesLat = 0
    if (! isRatioPadding)
        paddingDegreesLng = paddingMiles / DEGREES_TO_MILES
        paddingDegreesLat = paddingDegreesLng

    const extractKey = key => lngLatPoints.map((d => d[key]))

    const maxLng = Math.max(...extractKey(LNG_KEY))
    const minLng = Math.min(...extractKey(LNG_KEY))
    const maxLat = Math.max(...extractKey(LAT_KEY))
    const minLat = Math.min(...extractKey(LAT_KEY))

    if (isRatioPadding) {
        paddingDegreesLng = (maxLng - minLng) * paddingMiles
        paddingDegreesLat = (maxLat - minLat) * paddingMiles
    }

    return {
        topRight: {
            lng: maxLng + paddingDegreesLng,
            lat: minLat + paddingDegreesLat,
        },
        bottomLeft: {
            lng: minLng - paddingDegreesLng * 8,
            lat: maxLat - paddingDegreesLat,
        }
    }
}

export {
    processRawSheetsData,
    nodesAreEqual,
    computeLngLatBoundingBox,
}
