import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { MapViewDemo } from './components'

import './styles/App.css'

const App = () => {
  const [data, setData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    if (data === null) {
      Tabletop.init({
        // TODO add this key to some environment variable, don't hard-code here
        key: 'https://docs.google.com/spreadsheets/d/1IqEBIcnFZ_BFCrD8jhk11yVoOjfxzZpiZLdL4cL3oK0/pubhtml',
        simpleSheet: true,
      })
        .then(data => {
          console.log(data)
          setData(data)
        })
        .catch(console.warn)
    }
  }, [data])

  return (
    <div className="App">
      <div className="horizontal-stack">
        <div className="left-sidebar">
          <h1>Kindess Tracker</h1>
          <h3>{selectedNode ? selectedNode.STATE : null}</h3>
          <h3>{selectedNode ? selectedNode['[Optional] Tell us about the act of kindness you received!'] : null}</h3>
        </div>
        <div className="map-wrapper">
          <MapViewDemo data={data} selectedNode={selectedNode} setSelectedNode={setSelectedNode}  />
        </div>
      </div>

    </div>
  );
}

export default App
