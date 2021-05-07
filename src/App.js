import React, { useEffect, useState } from 'react'
import Tabletop from 'tabletop'
import { Sidebar, KindnessSearchBar, MapboxGLMap, HelpDialog } from './components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import TrieSearch from 'trie-search'
import * as DataConstants from './utils/dataConstants'
import * as DataUtils from './utils/dataUtils'
import * as AppMode from './utils/appMode'
import { Button } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

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
  const [dataUrl, setDataUrl] = useState(DataConstants.REAL_DATA_URL)
  const [trie, setTrie] = useState(null)
  const [filterText, setFilterText] = useState(null)
  const [mode, setMode] = useState(AppMode.DEFAULT)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    // on first render, check the width
    // if less than 800, provide alert about screen size
    if (window.innerWidth < 800) {
      alert('We see you\'re on mobile! Rotate your phone sideways for the best experience. Check out our app on your computer too!')
    }
  }, [])

  const fetchData = () => {
    console.log('fetching!')
    Tabletop.init({
      key: dataUrl,
      simpleSheet: true,
    })
      .then(data => {
        // process data right away
        const dataProc = DataUtils.processRawSheetsData(data)
        setData(dataProc)
        setTrace(dataProc)

        // set up our search object
        const ts = new TrieSearch([
          DataConstants.ID_KEY_NAME,
          DataConstants.KINDNESS_KEY_NAME,
          DataConstants.STREET_KEY_NAME,
          DataConstants.CITY_KEY_NAME,
          DataConstants.STATE_KEY_NAME,
          DataConstants.ZIP_KEY_NAME,
        ], {
          idFieldOrFunction: 'index',
        })
        ts.addAll(dataProc)
        setTrie(ts)
      })
      .catch(console.warn)
  }

  useEffect(() => {
    if (data === null) {
      fetchData()
    }
  }, [data])

  // listen for changes in the data url via a toggle
  useEffect(() => {
    if (data !== null) {
      // reset all required state before re-fetch
      setIsLoading(true)
      setSelectedNode(null)
      setFilterText(null)
      setHoveredNode(null)
      setMode(AppMode.DEFAULT)
      fetchData()
    }
  }, [dataUrl])

  // define function to set trace back to original data array
  const resetTrace = () => setTrace(data)

  // function to clear selected node
  const clearSelectedNode = () => {
    setSelectedNode(null)
    setMode(AppMode.DEFAULT)
    setFilterText(null)
  }

  // define function to filter nodes based on a query string
  const filterNodes = (text) => {
    // update state
    setIsLoading(true)

    // handle no filter
    if (!text) {
      // reset to all data
      setTrace(data)
      setIsLoading(false)
      setMode(AppMode.DEFAULT)
      return
    }

    // TrieSearch.UNION_REDUCER gives us an AND over the text
    const dataFiltSearch = trie.get(text.split(' '), TrieSearch.UNION_REDUCER)

    // handle empty data case
    if (dataFiltSearch.length === 0) {
      // TODO clean this up
      alert('No results found! Try another search query.')
      setIsLoading(false)
      setMode(AppMode.DEFAULT)
      return
    }

    setSelectedNode(null)
    setHoveredNode(null)
    setMode(AppMode.SEARCHING)
    setTrace(dataFiltSearch)
  }

  const handleSetSelectedNode = (node) => {
    // change to selection mode
    setMode(AppMode.SELECTED)

    // reset the trace
    resetTrace()

    // update the selected node as normal
    setSelectedNode(node)
  }

  const handleSetFilterText = (text) => {
    // get out of search mode and go back to default
    setMode(AppMode.DEFAULT)

    // still update our filter text so we have it
    setFilterText(text)
  }

  return (
    <div className="App">
      <div className="horizontal-stack">
        <div className="left-sidebar">
          <Sidebar
            isLoading={isLoading}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            clearSelectedNode={clearSelectedNode}
            mode={mode}
            setMode={setMode}
            trace={trace}
            dataUrl={dataUrl}
            setDataUrl={setDataUrl}
            filterText={filterText}
          />
        </div>
        <div className="vertical-stack">
          <div className="top-bar-wrapper">
            <div className="search-bar-wrapper">
              {
                mode === AppMode.DEFAULT || mode === AppMode.SEARCHING ? (
                  <KindnessSearchBar
                    filterText={filterText}
                    setFilterText={handleSetFilterText}
                    filterNodes={filterNodes}
                  />
                ) : null
              }
            </div>
            <div className="icon-wrapper">
              <Button onClick={() => setOpenDialog(true)}>
                <HelpIcon
                  fontSize="large"
                />
              </Button>
            </div>
          </div>

          <div className="map-wrapper">
            <MapboxGLMap
              trace={trace}
              setIsLoading={setIsLoading}
              selectedNode={selectedNode}
              setSelectedNode={handleSetSelectedNode}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              mode={mode}
              setTrace={setTrace}
              resetTrace={resetTrace}
            />
          </div>
        </div>
      </div>
      <HelpDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}

export default App
