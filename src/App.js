import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { MapViewDemo } from './components'

import './styles/App.css'

const App = () => {
  const [data, setData] = useState(null)

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
      <header className="App-header">
        <div className="map-wrapper">
          <MapViewDemo data={data} />
        </div>
      </header>
    </div>
  );
}

export default App
