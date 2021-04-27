const DEGREES_TO_MILES = 69
const LNG_KEY = 'lng'
const LAT_KEY = 'lat'

const processRawSheetsData = (data) => {
    const dataProc = data ? data.map((d, i) => ({
        ...d,
        index: i
    })) : null
    return dataProc
}

const nodesAreEqual = (one, two) => {
    if (! one || ! two)
        return false
        
    return one.index == two.index
}

const computeLngLatBoundingBox = (lngLatPoints, paddingMiles) => {
    // compute top right and bottom left
    // then, add some padding amount in miles
    const paddingDegrees = paddingMiles / DEGREES_TO_MILES

    const extractKey = key => lngLatPoints.map((d => d[key]))

    const maxLng = Math.max(...extractKey(LNG_KEY))
    const minLng = Math.min(...extractKey(LNG_KEY))
    const maxLat = Math.max(...extractKey(LAT_KEY))
    const minLat = Math.min(...extractKey(LAT_KEY))

    return {
        topRight: {
            lng: maxLng + paddingDegrees,
            lat: minLat + paddingDegrees,
        },
        bottomLeft: {
            lng: minLng - paddingDegrees * 6,
            lat: maxLat - paddingDegrees,
        }
    }
}

export {
    processRawSheetsData,
    nodesAreEqual,
    computeLngLatBoundingBox,
}
