import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { Sidebar, MapboxGLMap } from './components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

const US_CENTER_LAT = 39.8283
const US_CENTER_LNG = -98.5795
const INITIAL_ZOOM = 3.75

import './styles/App.css'

const App = () => {
  const [data, setData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [traceNode, setTraceNode] = useState(null)
  const [traceList, setTraceList] = useState([])
  const [traceIndex, setTraceIndex] = useState(-1)

  useEffect(() => {
    if (data === null) {
      Tabletop.init({
        // TODO add this key to some environment variable, don't hard-code here
        key: 'https://docs.google.com/spreadsheets/d/1IqEBIcnFZ_BFCrD8jhk11yVoOjfxzZpiZLdL4cL3oK0/pubhtml',
        simpleSheet: true,
      })
        .then(data => {
          setData(data)
        })
        .catch(console.warn)
    }
  }, [data])

  return (
    <div className="App">
      <div className="horizontal-stack">
        <div className="left-sidebar">
          <Sidebar
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            setTraceNode={setTraceNode}
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
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            traceNode={traceNode}
            traceList={traceList}
            setTraceList={setTraceList}
            traceIndex={traceIndex}
          />
        </div>
      </div>

    </div>
  );
}

export default App
