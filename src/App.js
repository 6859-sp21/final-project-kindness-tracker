import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { BarChartDemo, MapViewDemo } from './components'
import demoData from './data/demo-data'

import './App.css'

const App = () => {
  const [data, setData] = useState(null)
  const loading = data === null

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
        <p>
          Welcome to Kindness Tracker!
        </p>
        <p>
          {loading ? 'Loading...' : `Loaded ${data.length} rows from Google Sheets!`}
        </p>
        <p>
          :-)
        </p>
        {/* <div className="bar-wrapper">
          <BarChartDemo data={demoData} />
        </div> */}
        <div className="map-wrapper">
          <MapViewDemo data={data} />
        </div>
      </header>
    </div>
  );
}

export default App
