import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { Sidebar, MapboxGLMap } from './components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import * as DataConstants from './utils/dataConstants'
import * as DataUtils from './utils/dataUtils'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

import './styles/App.css'

const App = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isTracing, setIsTracing] = useState(false)
  const [traceList, setTraceList] = useState([])
  const [traceIndex, setTraceIndex] = useState(0)

  useEffect(() => {
    if (data === null) {
      Tabletop.init({
        key: DataConstants.TEST_DATA_URL,
        simpleSheet: true,
      })
        .then(data => {
          // process data right away
          const dataProc = DataUtils.processRawSheetsData(data)
          setData(dataProc)
        })
        .catch(console.warn)
    }
  }, [data])

  return (
    <div className="App">
      <div className="horizontal-stack">
        <div className="left-sidebar">
          <Sidebar
            isLoading={isLoading}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            isTracing={isTracing}
            setIsTracing={setIsTracing}
            traceList={traceList}
            setTraceList={setTraceList}
            traceIndex={traceIndex}
            setTraceIndex={setTraceIndex}
          />
        </div>
        <div className="map-wrapper">
          {/* <MapViewDemo data={data} map={map} selectedNode={selectedNode} setSelectedNode={setSelectedNode}  /> */}
          <MapboxGLMap
            data={data}
            setIsLoading={setIsLoading}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            isTracing={isTracing}
            traceList={traceList}
            setTraceList={setTraceList}
            traceIndex={traceIndex}
            setTraceIndex={setTraceIndex}
          />
        </div>
      </div>

    </div>
  );
}

export default App
