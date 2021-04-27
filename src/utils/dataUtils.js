const processRawSheetsData = (data) => {
    const dataProc = (data || []).map((d, i) => ({
        ...d,
        index: i
    }))
    return dataProc
}

const nodesAreEqual = (one, two) => {
    if (! one || ! two)
        return false
        
    return one.index == two.index
}

export {
    processRawSheetsData,
    nodesAreEqual,
}
