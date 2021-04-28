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
const DEFAULT_RADIUS = 10
const BIG_RADIUS = 30

mapboxgl.accessToken = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker;

const MapboxGLMap = ({ trace, setIsLoading, selectedNode, setSelectedNode, hoveredNode, setHoveredNode, isTracing }) => {
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    // let's init our map first again
    useEffect(() => {
        if (map === null) {
            // need to init the map since it is null
            MapUtils.initializeMap({ setMap, mapContainer })
        } else {
            // also append an svg to the map for later use
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
        }
    }, [map])

    // here is where we do our data join for trace points
    useEffect(() => {
        if (map) {
            // do a data join on all the trace points with d3
            console.log(trace)
            d3.select('.map-svg')
                .selectAll('circle')
                .data(trace)
                .join(
                    enter => enter
                        .append('circle')
                        .attr('id', MapUtils.uniqueCircleId)
                        .attr('class', MapUtils.circleClass)
                        .attr('r', DEFAULT_RADIUS)
                        .style('fill', 'steelblue'),
                    update => update,
                    exit => exit.remove()
                )
            
            // done loading map - set render function
            const mapRender = () => {
                // project dots
                d3.selectAll('.circle')
                    .attr('cx', d => MapUtils.projectLngLatToXY(map, d).x)
                    .attr('cy', d => MapUtils.projectLngLatToXY(map, d).y)
            }

            map.on('viewreset', mapRender)
            map.on('move', mapRender)
            map.on('moveend', mapRender)

            map.on('load', () => {
                map.resize()
            })

            mapRender()
        }
    }, [map, trace])

    return <div ref={el => (mapContainer.current = el)} className='map-container-div'>
        <div className='map-tooltip' style={{ 'opacity': 0 }}>
            <TooltipContents node={hoveredNode} isSelected={DataUtils.nodesAreEqual(hoveredNode, selectedNode)} />
        </div>
    </div>
}

export default MapboxGLMap
