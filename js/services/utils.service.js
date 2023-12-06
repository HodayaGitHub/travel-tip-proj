
export const utilService = {
    updateURLQueryParam
}


function updateURLQueryParam(key, value) {
    // Get the current URL's search params
    const queryParams = new URLSearchParams(window.location.search)

    // Update the specified query parameter
    queryParams.set(key, value)

    // Replace the current URL with the updated search params
    
    window.history.replaceState({}, '', `${location.pathname}?${queryParams}`)
}