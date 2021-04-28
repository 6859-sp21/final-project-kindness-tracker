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
  const [trace, setTrace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isTracing, setIsTracing] = useState(false)

  useEffect(() => {
    if (data === null) {
      Tabletop.init({
        key: DataConstants.REAL_DATA_URL,
        simpleSheet: true,
      })
        .then(data => {
          // process data right away
          const dataProc = DataUtils.processRawSheetsData(data)
          console.log(dataProc)
          setData(dataProc)
          setTrace(dataProc)
        })
        .catch(console.warn)
    }
  }, [data])

  // define function to set trace back to original data array
  const resetTrace = () => setTrace(data)

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
            trace={trace}
          />
        </div>
        <div className="map-wrapper">
          <MapboxGLMap
            trace={trace}
            setIsLoading={setIsLoading}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            isTracing={isTracing}
            setTrace={setTrace}
            resetTrace={resetTrace}
          />
        </div>
      </div>

    </div>
  );
}

export default App
