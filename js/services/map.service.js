// import {storageService} from './async-storage.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
  connectGeocodingApi,
}

// Var that is used throughout this Module (not global)
let gMap
const API_KEY = 'AIzaSyBWcNTwn-dWPn_JZhBhSlcj8z8I61GbkVE'


function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')

  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    addMarker({ lat, lng })
    
    // console.log('Map!', gMap)
    gMap.addListener('click', function (ev) {
      const clickedLocation = ev.latLng.toJSON()
      // console.log('ev.latLng.toJSON():', ev.latLng.toJSON())
      addMarker(clickedLocation)

    })
  })
}

function addMarker(loc) {
  let marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  let laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
  addMarker(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  let elGoogleApi = document.createElement('script')
  //   elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=`

  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}


function connectGeocodingApi(location_name) {
  // if (window.google) return Promise.resolve()

  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location_name}&key=${API_KEY}`
  // const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location_name}&key=`

  return axios.get(geocodingApiUrl)
    .then(response => {
      console.log('res data', response.data)
      // console.log('resGeo', response.data.results[0].geometry.location)
      let locationCoords = response.data.results[0].geometry
      return locationCoords
    })
    .catch(error => {
      console.error('Error connecting to the Geocoding API:', error)
      throw error
    })
}

