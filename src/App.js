import React, { useEffect, useState } from 'react'
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Tabletop from 'tabletop'
import { Sidebar, KindnessSearchBar, MapboxGLMap, HelpDialog, AddDialog, StatisticsSidebar } from './components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import TrieSearch from 'trie-search'
import * as DataConstants from './utils/dataConstants'
import * as DataUtils from './utils/dataUtils'
import * as AppMode from './utils/appMode'
import { Button, Fab } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import AddIcon from '@material-ui/icons/Add'
import * as d3 from 'd3'
import Tooltip from '@material-ui/core/Tooltip'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import CloseIcon from '@material-ui/icons/Close'
import ClearIcon from '@material-ui/icons/Clear'
import AboutPage from './aboutPage'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ'
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

import './styles/App.css'

const MainPage = () => {
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
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openSummaryStats, setOpenSummaryStats] = useState(false)
  const [traceFilterId, setTraceFilterId] = useState(null)
  const [showTraceWarning, setShowTraceWarning] = useState(true)

  // listen for summary stat changes
  useEffect(() => {
    if (openSummaryStats) {
      d3.select('.right-sidebar')
        .style('left', '65%')
    } else {
      d3.select('.right-sidebar')
        .style('left', '100%')
    }
  }, [openSummaryStats])

  // close summary stat view if mode ever is not default
  useEffect(() => {
    setOpenSummaryStats(false)

    // also check if we need to adjust the alert popup
    if ((mode === AppMode.TRACING || mode === AppMode.TRACE_STATS) &&
      (traceFilterId === DataConstants.ROOT_ACT_ID || traceFilterId === DataConstants.PUBLIC_ACT_ID) &&
      showTraceWarning) {
      d3.select('.trace-alert-popup')
        .style('left', '70%')
    } else {
      d3.select('.trace-alert-popup')
        .style('left', '100%')
    }
  }, [mode, traceFilterId, showTraceWarning])

  // when trace filter id goes back to null, reset trace warning to true
  useEffect(() => {
    if (traceFilterId === null) {
      setShowTraceWarning(true)
    }
  }, [traceFilterId])

  const escKeyHandler = (event) => {
    if (event.keyCode === 27) {
      // close the summary stats view
      setOpenSummaryStats(false)
    }
  }

  useEffect(() => {
    // on first render, check the width
    // if less than 800, provide alert about screen size
    if (window.innerWidth < 800) {
      alert('We see you\'re on mobile! Rotate your phone sideways for the best experience. Check out our app on your computer too!')
    }

    // also add handler for esc key
    document.addEventListener('keydown', escKeyHandler, false)
  }, [])

  const fetchData = () => {
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
      setTraceFilterId(null)
      setFilterText(null)
      setHoveredNode(null)
      setMode(AppMode.DEFAULT)
      setOpenSummaryStats(false)
      fetchData()
    }
  }, [dataUrl])

  // define function to set trace back to original data array
  const resetTrace = () => {
    setTrace(data)
    setTraceFilterId(null)
  }

  // function to clear selected node
  const clearSelectedNode = () => {
    setSelectedNode(null)
    setTraceFilterId(null)
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
      setTraceFilterId(null)
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
    setTraceFilterId(null)
    setHoveredNode(null)
    setMode(AppMode.SEARCHING)
    setTrace(dataFiltSearch)
  }

  const handleSetSelectedNode = (node) => {
    // if we are in a trace-like mode, don't change mode
    if (mode === AppMode.TRACING || mode === AppMode.TRACE_STATS) {
      // do nothing
    } else {
      // change to selection mode
      setMode(AppMode.SELECTED)

      // reset the trace
      resetTrace()
    }

    // update the selected node as normal
    setSelectedNode(node)
  }

  const handleSetFilterText = (text) => {
    // get out of search mode and go back to default
    setMode(AppMode.DEFAULT)

    // still update our filter text so we have it
    setFilterText(text)
  }

  const setTraceForId = (id) => {
    const traceNew = DataUtils.filterTraceListForId(data, id)

    setTrace(traceNew)
    setMode(AppMode.TRACE_STATS)
    setSelectedNode(traceNew[traceNew.length - 1])
    setTraceFilterId(id)
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
            setTraceFilterId={setTraceFilterId}
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
              {
                mode === AppMode.DEFAULT ? (
                  <Tooltip title={<h2>View Summary Statistics</h2>} arrow>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="view"
                      onClick={() => setOpenSummaryStats(true)}
                      className="icon-wrapper-button"
                    >
                      <TrendingUpIcon />
                    </Fab>
                  </Tooltip>
                ) : (
                  <Tooltip title={<h2>Reset to Default View</h2>} arrow>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="reset"
                      onClick={clearSelectedNode}
                      className="icon-wrapper-button"
                    >
                      <ClearIcon />
                    </Fab>
                  </Tooltip>
                )
              }

              <Tooltip title={<h2>Add New</h2>} arrow>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={() => setOpenAddDialog(true)}
                  className="icon-wrapper-button"
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title={<h2>Learn More</h2>} arrow>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="info"
                  onClick={() => setOpenDialog(true)}
                  className="icon-wrapper-button"
                >
                  <InfoIcon />
                </Fab>
              </Tooltip>
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
              setTraceFilterId={setTraceFilterId}
            />
          </div>
        </div>
        {
          openSummaryStats ? (
            <div className="right-sidebar-button-exit">
              <Tooltip title={<h2>Close (Or Press Esc)</h2>} arrow>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="close"
                  onClick={() => setOpenSummaryStats(false)}
                  className="icon-wrapper-button"
                >
                  <CloseIcon />
                </Fab>
              </Tooltip>
            </div>
          ) : null
        }
        <div className="right-sidebar">
          <StatisticsSidebar
            data={data}
            setSelectedNode={handleSetSelectedNode}
            traceId={setTraceForId}
          />
        </div>
        <div className="trace-alert-popup">
          <h3>Note!</h3>
          <p>⚠️ You are tracing <b>{traceFilterId === DataConstants.ROOT_ACT_ID ? 'the root act of kindness' : 'public acts of kindness that didn\'t come from kindness cards'}.</b> Adjacent acts may not be diretly linked to one another. All acts are simply sorted by date.</p>
          {
            showTraceWarning ? (
              <Tooltip title={<h2>Close</h2>} arrow>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="close"
                  onClick={() => setShowTraceWarning(false)}
                  className="trace-alert-popup-close"
                >
                  <CloseIcon />
                </Fab>
              </Tooltip>
            ) : null
          }
        </div>
      </div>
      <HelpDialog open={openDialog} setOpen={setOpenDialog} />
      <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
    </div>
  )
}

const App = () => {
  return (
    <HashRouter basename={'/'}>
      <Switch>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path='/paper'
          render={
            () => {
              window.location.href = `${process.env.PUBLIC_URL}/paper.pdf`;
              return null;
            }
          }>
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        {/* <Route>
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </HashRouter>
  )
}

export default App
