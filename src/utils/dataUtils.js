import { DateTime } from  'luxon'
import Filter from 'bad-words'
import * as DataConstants from './dataConstants'

const DEGREES_TO_MILES = 69
const LNG_KEY = 'lng'
const LAT_KEY = 'lat'

const BAD_WORDS_FILTER = new Filter()

const processRawSheetsData = (data) => {
    const dataProc = data ? data.map((d, i) => ({
        ...d,
        index: i,
        dateTime: DateTime.fromFormat(d[DataConstants.TIMESTAMP_KEY_NAME], DataConstants.TIMESTAMP_FORMAT),
        hash: `${i}-${d[DataConstants.TIMESTAMP_KEY_NAME]}`
    })) : null

    // convert certain fields to numbers
    const numericalFields = [
        DataConstants.ID_KEY_NAME,
        DataConstants.CENTER_LNG_KEY_NAME,
        DataConstants.CENTER_LAT_KEY_NAME,
    ]

    const dataProcNumerical = dataProc.map(d => {
        numericalFields.forEach(f => {
            d[f] = +d[f]
        })
        return d
    })

    const dataOverlappingProc = handleOverlappingPoints(dataProcNumerical)
    return dataOverlappingProc
}

const handleOverlappingPoints = (data) => {
    // return a new data where any lat long pairs that are overlapping are randomly shifted
    const lngKey = DataConstants.CENTER_LNG_KEY_NAME
    const latKey = DataConstants.CENTER_LAT_KEY_NAME
    const lngLatString = d => `${d[lngKey]} ${d[latKey]}`

    // get set of all unique lng lat strings in data
    const lngLatsMap = data.map(lngLatString).reduce((map, s) => {
        map[s] = (map[s] || 0) + 1
        return map
    }, {})

    // adjust the data based on this
    // for each point, handle necessary permuation
    const dataAdjusted = data.map(d => {
        const count = lngLatsMap[lngLatString(d)]

        if (count === 1) {
            return d
        }

        // permute since there is more than 1 of this point
        const { lng, lat } = permuteLngLat(
            d[lngKey],
            d[latKey]
        )

        d[lngKey] = lng
        d[latKey] = lat
        return d
    })
    return dataAdjusted
}

const permuteLngLat = (lng, lat, permutationMiles = 0.1) => {
    // get random deltas in the range [-permutationMiles, permutationMiles]
    const permutationDegrees = permutationMiles / DEGREES_TO_MILES
    const random = () => Math.random() * (2 * permutationDegrees) - permutationDegrees
    return {
        lng: lng + random(),
        lat: lat + random(),
    }
}

const nodesAreEqual = (one, two) => {
    if (! one || ! two)
        return false
        
    return one.index == two.index
}

const computeLngLatBoundingBox = (lngLatPoints, paddingMiles, isRatioPadding = false, padLeft = true) => {
    // compute top right and bottom left
    // then, add some padding amount in miles
    var paddingDegreesLng = 0
    var paddingDegreesLat = 0
    if (! isRatioPadding)
        paddingDegreesLng = paddingMiles / DEGREES_TO_MILES
        paddingDegreesLat = paddingDegreesLng
    
    // TODO fix hard coding here
    const leftPadConstant = padLeft ? 5 : 1

    const extractKey = key => lngLatPoints.map((d => d[key]))

    const maxLng = Math.max(...extractKey(LNG_KEY))
    const minLng = Math.min(...extractKey(LNG_KEY))
    const maxLat = Math.max(...extractKey(LAT_KEY))
    const minLat = Math.min(...extractKey(LAT_KEY))

    if (isRatioPadding) {
        paddingDegreesLng = (maxLng - minLng) * paddingMiles
        paddingDegreesLat = (maxLat - minLat) * (paddingMiles * 12)
    }

    return {
        topRight: {
            lng: maxLng + paddingDegreesLng,
            lat: minLat + paddingDegreesLat,
        },
        bottomLeft: {
            lng: minLng - paddingDegreesLng * leftPadConstant,
            lat: maxLat - paddingDegreesLat,
        }
    }
}

const filterTraceListForNode = (data, node) => {
    let dataFilt;
    const id = node[DataConstants.ID_KEY_NAME]
    if (id === DataConstants.ROOT_ACT_ID) {
        // if the id is the root note, just select all of data
        dataFilt = data
    } else {
        // select this id, and the root
        dataFilt = data
            .filter(d => 
                (d[DataConstants.ID_KEY_NAME] === id) ||
                (d[DataConstants.ID_KEY_NAME] === DataConstants.ROOT_ACT_ID)
            )
    }

    // apply sorting by date
    const traceNew = dataFilt.sort((a, b) => a.dateTime.toMillis() - b.dateTime.toMillis())
    return traceNew
}

const formatFieldsForDisplay = (node) => {
    const streetNumber = node[DataConstants.STREET_NUMBER_KEY_NAME]
    const street = node[DataConstants.STREET_KEY_NAME]
    const address = (streetNumber && street) ? `${(streetNumber ? `${streetNumber} ` : null)}${street}` : null
    const city = node[DataConstants.CITY_KEY_NAME]
    const state = node[DataConstants.STATE_KEY_NAME]
    const cityState = (city || state) ? `${city}${city ? `, ${state}` : state}` : null
    const zip = node[DataConstants.ZIP_KEY_NAME]
    const location = `${address || 'No street address provided'}\n${cityState || 'No city/state provided'}${zip ? `\n${zip}` : ''}`
    const kindness = node[DataConstants.KINDNESS_KEY_NAME]

    // apply necessary parsing for date
    const date = node.dateTime
    const dateString = date.toLocaleString(DateTime.DATETIME_SHORT)

    return {
        kindness,
        dateString,
        location,
        cityState,
    }
}

// write function to quickly convert a data array to the fomat for lat lng
const generateLngLatArray = data => data.map(d => ({
    lng: d[DataConstants.CENTER_LNG_KEY_NAME],
    lat: d[DataConstants.CENTER_LAT_KEY_NAME],
}))

const cleanDescription = (text) => {
    return BAD_WORDS_FILTER.clean(text)
}

export {
    processRawSheetsData,
    nodesAreEqual,
    computeLngLatBoundingBox,
    filterTraceListForNode,
    formatFieldsForDisplay,
    generateLngLatArray,
    cleanDescription,
}
