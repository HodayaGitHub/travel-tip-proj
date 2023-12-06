import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/utils.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onMyLocation = onMyLocation
window.onSearch = onSearch

function onInit() {
  mapService.getUserLocation()
    .then((userLocation) => {
      return mapService.initMap(userLocation.lat, userLocation.lng)
    })
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => {
      console.log('Error: Cannot initialize map')
    })
}


function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo(lat, lng) {
  mapService.panTo(lat, lng)
}


function onMyLocation() {
  getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude)
      mapService.addMarker({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
    .catch((err) => console.log('Error panning to user position', err))
}


function onRemoveLocation() {
  //     removeLocation.then().catch()

}



function onSearch(ev) {
  if (ev) ev.preventDefault()
  const searchValue = document.querySelector('input[name=search]').value

  mapService.connectGeocodingApi(searchValue).then((res) => {

    const { lat, lng } = res.results[0].geometry.location
    mapService.panTo({ lat, lng })
    mapService.addLocationObj(searchValue, lat, lng)
      .then(() => renderLocationTable())

    utilService.updateURLQueryParam('location', searchValue)
  })
}


function renderLocationTable() {
  locService.getLocationsFromStorage()
    .then((locations) => {
      if (!locations.length) {
        console.log('No locations found')
        return
      }
      const strHtml = locations.map((location) => {
        return `
            <div class="location-item">
              <p>${location.name}</p>
              <button onclick="onPanTo(${location.lat}, ${location.lng})">Go</button>
              <button onclick="onRemoveLocation('${location.id}')">X</button>
            </div>`
      })
      const elLocationContainer = document.querySelector('.locations-container')
      elLocationContainer.innerHTML = strHtml.join('')
    })
    .catch((err) => console.error('Error rendering location table:', err))
}



// not in use functions: 
function renderPosition() {
  console.log('rendering first position')
  locService
    .getLocs()
    .then((locs) => {
      return { lat: locs[0].lat, lng: locs[0].lng }
    })
    .then((position) => mapService.panTo(position.lat, position.lng))
    .catch((err) => console.log('Error panning to First Position', err))
}