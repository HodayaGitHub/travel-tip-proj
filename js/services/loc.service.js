import {storageService} from './async-storage.service.js'

export const locService = {
  getLocs,
  addLocationToStorage,
  removeLocationFromStorage,
}

const LOCATION_TYPE = 'locations'

const locs = [
  {
    // name: 'Greatplace',
    // lat: 32.047104,
    // lng: 34.832384,
    // lat: 43.653225,
    // lng: -79.383186,
    // createdAt: Date.now(),
    // updatedAt: Date.now(),
  },
]

function getLocs() {
    let locationsPromise = storageService.query(LOCATION_TYPE, 0)
    .then(locations =>
        {
            console.log(locations)
            return locations
        })

    return locationsPromise 
}

// call the getLocs on renderLocs 

function removeLocationFromStorage(locId) {
    // it returns a promise that it will be deleted
    return storageService.remove(LOCATION_TYPE,locId)
}

function addLocationToStorage(locationObj) {
    return storageService.post(LOCATION_TYPE, locationObj)
}
