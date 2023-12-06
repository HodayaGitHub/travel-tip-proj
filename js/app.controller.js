import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onMyLocation = onMyLocation

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

// TODO Nir: Render the location on the map - connect between the const locs to the render function

renderFirstPosition()

function renderFirstPosition() {
  console.log('rendering first position')
  locService
    .getLocs()
    .then((locs) => {
      return { lat: locs[0].lat, lng: locs[0].lng }
    })
    .then((position) => mapService.panTo(position.lat, position.lng))
    .catch((err) => console.log('Error panning to First Position', err))
}

// TODO Nir: Create a “my-place” button that pan the map to the user’s place.

function onMyLocation() {
  getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude)
    })
    .catch((err) => console.log('Error panning to user position', err))
}

// TODO Hodaya: Add an Actions column with buttons: Go and Delete
