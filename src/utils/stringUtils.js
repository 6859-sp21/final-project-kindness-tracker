const trimWithElipses = (inp, length) => {
    if (inp.length > length) {
        return `${inp.substring(0, length)}`
    }
    
    return inp
}

export {
    trimWithElipses
}