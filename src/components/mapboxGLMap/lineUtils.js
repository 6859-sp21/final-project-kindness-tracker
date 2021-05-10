import * as turf from '@turf/turf'
import * as DataConstants from '../../utils/dataConstants'
import triangleImage from '../../triangle.png'

const MILES_PER_STEP = 10
const MIN_NUM_STEPS = 100

const convertDatumToLngLatArray = d => [
    d[DataConstants.CENTER_LNG_KEY_NAME],
    d[DataConstants.CENTER_LAT_KEY_NAME],
]

const computePointId = (id) => `${id}-point`

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
    const numSteps = Math.max(Math.floor(lineDistance / MILES_PER_STEP), MIN_NUM_STEPS)

    const arc = []

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / numSteps) {
        const segment = turf.along(route.features[0], i)
        arc.push(segment.geometry.coordinates)
    }

    // append a final segment
    const segment = turf.along(route.features[0], lineDistance)
    arc.push(segment.geometry.coordinates)

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc
    return {
        route,
        numSteps,
    }
}

const drawArcBetweenNodes = (map, origin, destination) => {
    const id = `${origin.hash} -> ${destination.hash}`
    const idPoint = computePointId(id)

    // if already exists, just return
    if (map.getSource(id)) {
        return id
    }

    const route = constructFeatureCollection(origin, destination)
    const arcifyResult = arcifyFeatureCollection(route)
    const routeProc = arcifyResult.route
    const { numSteps } = arcifyResult

    // set up point to animate
    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    const point = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': convertDatumToLngLatArray(origin),
                },
            },
        ],
    }

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
            'line-color': 'black'
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round',
        },
    })

    if (!map.hasImage('triangle')) {
        map.loadImage(
            triangleImage,
            function (error, image) {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage('triangle', image)
            }
        )
    }

    map.addSource(idPoint, {
        'type': 'geojson',
        'data': point
    })

    map.addLayer({
        'id': idPoint,
        'source': idPoint,
        'type': 'symbol',
        'layout': {
            // This icon is a part of the Mapbox Streets style.
            // To view all images available in a Mapbox style, open
            // the style in Mapbox Studio and click the "Images" tab.
            // To add a new image to the style at runtime see
            // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
            'icon-image': 'triangle', // works: heliport-15
            // doesn't work: rectangle-blue-2
            'icon-rotate': ['get', 'bearing'],
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'icon-size': .02,
        }
    })

    let counter = 0

    const animatePoint = () => {
        var start =
            route.features[0].geometry.coordinates[
            counter >= numSteps ? counter - 1 : counter
            ]
        var end =
            route.features[0].geometry.coordinates[
            counter >= numSteps ? counter : counter + 1
            ]
        if (!start || !end) return;

        // Update point geometry to a new position based on counter denoting
        // the index to access the arc
        point.features[0].geometry.coordinates =
            route.features[0].geometry.coordinates[counter]

        // Calculate the bearing to ensure the icon is rotated to match the route arc
        // The bearing is calculated between the current point and the next point, except
        // at the end of the arc, which uses the previous point and the current point
        point.features[0].properties.bearing = turf.bearing(
            turf.point(start),
            turf.point(end)
        )

        // Update the source with this new data
        const source = map.getSource(idPoint)
        if (!source) {
            // this has been removed - stop the animation
            return
        }

        source.setData(point)

        // Request the next frame of animation as long as the end has not been reached
        if (counter < numSteps) {
            setTimeout(() => requestAnimationFrame(animatePoint), 500)
        } else {
            counter = 0
            setTimeout(() => requestAnimationFrame(animatePoint), 500)
        }

        counter = counter + 10
    }

    // start the animation
    animatePoint()

    return id
}

const clearArcsForId = (map, id) => {
    if (!id) {
        return
    }

    map.removeLayer(id)
    map.removeSource(id)

    // also clear the associated point
    const idPoint = computePointId(id)
    map.removeLayer(idPoint)
    map.removeSource(idPoint)
}

export {
    drawArcBetweenNodes,
    clearArcsForId,
}
