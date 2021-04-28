import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import * as MapUtils from './mapUtils'
import * as DataConstants from '../../utils/dataConstants'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import TooltipContents from '../tooltip'
import * as DataUtils from '../../utils/dataUtils'

import '../../styles/Map.css'

const POINT_ZOOM = 12
const POINT_ZOOM_MILES = 1
const DEFAULT_RADIUS = 10
const BIG_RADIUS = 30

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ trace, setIsLoading, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, isTracing }) => {
    const [map, setMap] = useState(null)
    const [boundingObject, setBoundingObject] = useState(null)
    const mapContainer = useRef(null)

    const circleClickHandler = (e, d) => {
        // make other circles not red
        MapUtils.resetAllCircleColors()
        
        // make this circle red
        d3.select(`#${MapUtils.uniqueCircleId(d)}`)
            .transition()
            .duration(500)
            .style('fill', 'red')
        
        // set this to be the selected node
        setSelectedNode(d)
    }

    // let's init our map first again
    useEffect(() => {
        if (map === null) {
            // need to init the map since it is null
            MapUtils.initializeMap({ setMap, mapContainer })
        } else {
            // also append an svg to the map for later use
            // TODO put this in css
            var container = map.getCanvasContainer()
            d3.select(container)
                .append('svg')
                .attr('class', 'map-svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('position', 'absolute')
                .style('z-index', 2)
                .style('top', 0)
                .style('left', 0)
            
            // also set up map events for re-render
            map.on('viewreset', () => MapUtils.mapRender(map))
            map.on('move', () => MapUtils.mapRender(map))
            map.on('moveend', () => MapUtils.mapRender(map))
            map.on('load', () => map.resize())
        }
    }, [map])

    // here is where we do our data join for trace points
    useEffect(() => {
        if (map && trace) {
            // do a data join on all the trace points with d3
            d3.select('.map-svg')
                .selectAll('circle')
                .data(trace)
                .join(
                    enter => enter
                        .append('circle')
                        .attr('id', MapUtils.uniqueCircleId)
                        .attr('class', MapUtils.circleClass)
                        .attr('r', DEFAULT_RADIUS)
                        .style('fill', 'steelblue')
                        .on('click', circleClickHandler)
                        .on('mouseover', (e, d) => {
                            setHoveredNode(d)
                            MapUtils.showTooltip(e, d)
                        })
                        .on('mousemove', (e, d) => {
                            MapUtils.showTooltip(e, d)
                        })
                        .on('mouseout', (e, d) => {
                            MapUtils.hideTooltip(() => setHoveredNode(null))
                        }),
                    update => update,
                    exit => exit.remove()
                )

            // perform initial render
            MapUtils.mapRender(map)

            // also complete loading
            setIsLoading(false)

            // update bounding box
            const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                MapUtils.generateLngLatArray(trace),
                0.05,
                true
            )
            setBoundingObject(boundingObjectNew)
        }
    }, [map, trace])

    // THE PURPOSE OF THIS EFFECT IS TO ZOOM ON THE MAP
    // WE RE-ZOOM WHEN:
    // 1. BOUNDING BOX CHANGES
    // 2. SELECTED NODE BECOMES NULL 
    // listen for changes in the bounding box
    useEffect(() => {
        if (boundingObject) {
            MapUtils.zoomMapToBoundingObject(map, boundingObject)
        }
    }, [boundingObject])

    // listen for changes in the selected node
    // RIGHT NOW THIS IS ASSUMING GENERAL NON TRACE MODE
    useEffect(() => {
        if (selectedNode) {
            // update bounding box
            const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                MapUtils.generateLngLatArray([selectedNode]),
                POINT_ZOOM_MILES,
                false,
                false
            )
            setBoundingObject(boundingObjectNew)
        } else if (trace) {
            // reset the bounding box to original trace points
            const boundingObjectNew = DataUtils.computeLngLatBoundingBox(
                MapUtils.generateLngLatArray(trace),
                0.05,
                true
            )
            setBoundingObject(boundingObjectNew)

            // also clear the color
            MapUtils.resetAllCircleColors()
        }
    }, [selectedNode])

    return <div ref={el => (mapContainer.current = el)} className='map-container-div'>
        <div className='map-tooltip' style={{ 'opacity': 0 }}>
            <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
        </div>
    </div>
}

export default MapboxGLMap
