import * as turf from '@turf/turf'
import * as DataConstants from '../../utils/dataConstants'

const convertDatumToLngLatArray = d => [
    d[DataConstants.CENTER_LNG_KEY_NAME],
    d[DataConstants.CENTER_LAT_KEY_NAME],
]

const constructFeatureCollection = (origin, destination) => ({
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    convertDatumToLngLatArray(origin),
                    convertDatumToLngLatArray(destination),
                ],
            },
        },
    ],
})

const arcifyFeatureCollection = (route) => {
    // src: https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/
    // Calculate the distance in kilometers between route start/end point.
    const lineDistance = turf.length(route.features[0])

    const arc = []

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const steps = 500

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        const segment = turf.along(route.features[0], i)
        arc.push(segment.geometry.coordinates)
    }

    // append a final segment
    const segment = turf.along(route.features[0], lineDistance)
    arc.push(segment.geometry.coordinates)

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc
    return route
}

const drawArcBetweenNodes = (map, origin, destination) => {
    const id = `${origin.hash} -> ${destination.hash}`

    // if already exists, just return
    if (map.getSource(id)) {
        return id
    }

    const route = constructFeatureCollection(origin, destination)
    const routeProc = arcifyFeatureCollection(route)

    map.addSource(id, {
        'type': 'geojson',
        'data': routeProc
    })

    map.addLayer({
        'id': id,
        'source': id,
        'type': 'line',
        'paint': {
            'line-width': 5,
            'line-color': '#007cbf'
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round',
        },
    })

    return id
}

const clearArcsForId = (map, id) => {
    if (!id) {
        return
    }

    map.removeLayer(id)
    map.removeSource(id)
}

export {
    drawArcBetweenNodes,
    clearArcsForId,
}
