
export const utilService = {
    updateURLQueryParam
}


function updateURLQueryParam(key, value) {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(key, value)
    window.history.replaceState({}, '', `${location.pathname}?${queryParams}`)
}


