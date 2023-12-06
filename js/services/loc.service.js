import {storageService} from './async-storage.service.js'

export const locService = {
    getLocs
}

const LOCATION_TYPE = 'locations'

const locs = [
    {
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    // { 
    //     id: 2,
    //     name: 'Neveragain',
    //     lat: 32.047201,
    //     lng: 34.832581, 
    //     createdAt: Date.now(),
    //     updatedAt: Date.now(),
    //      }
]

function getLocs() {
    let locationsPromise = storageService.query(LOCATION_TYPE, 0).then(locations =>
        {
            console.log(locations)
            return locations
        })

    return locationsPromise 
}

// call the getLocs on renderLocs 

function removeLocation(locIdx) {
    // it returns a promise that it will be deleted
    return storageService.remove(LOCATION_TYPE,locIdx)
}

function addLocation(locationObj) {
    return storageService.post(LOCATION_TYPE, locationObj)
}


