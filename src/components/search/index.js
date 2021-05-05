import React, { useEffect, useState } from 'react'
import SearchBar from 'material-ui-search-bar'

const KindnessSearchBar = ({ filterNodes, filterText, setFilterText }) => {
    return (
        <SearchBar
          value={filterText || ''}
          onChange={setFilterText}
          cancelOnEscape={true}
          onRequestSearch={() => filterNodes(filterText)}
          onCancelSearch={() => { setFilterText(null); filterNodes(null) }}
          placeholder={'Search for acts of kindness by description, location, or ID. Press Enter to search. ⏎'}
        />
      );
}

export default KindnessSearchBar