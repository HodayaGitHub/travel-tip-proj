import {storageService} from './async-storage.service.js'

export const locService = {
  getLocationsFromStorage,
  addLocationToStorage,
  removeLocationFromStorage,
}

const LOCATION_TYPE = 'locations'

function getLocationsFromStorage() {
    let locationsPromise = storageService.query(LOCATION_TYPE, 0)
    .then(locations =>
        {
            console.log(locations)
            return locations
        })

    return locationsPromise 
}


function removeLocationFromStorage(locId) {
    // it returns a promise that it will be deleted
    return storageService.remove(LOCATION_TYPE,locId)
}

function addLocationToStorage(locationObj) {
    return storageService.post(LOCATION_TYPE, locationObj)
}
