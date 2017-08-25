import axios from "axios";

var algoliasearch = require('algoliasearch');

var client = algoliasearch("VXMYN1ZQFQ","4ec6a0aea46dc16f20ca5384a5df9c65");
var events = client.initIndex("Events");

const google_api_key = "AIzaSyC__j_wo5UbK6wqFq3xrqHJCwyjh-DTpNA";
const algolia_api_key = '4ec6a0aea46dc16f20ca5384a5df9c65';
const algolia_application_id = 'VXMYN1ZQFQ';

export function getRecentEvents() {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day = today.getDay();
  let fromTime = (new Date(year,month,date-day+1)).getTime()/1000;
  let toTime = (new Date(year,month,date+(7-day),23,59,59)).getTime()/1000;
  return (dispatch) => {
    events.search({
      filters: '(showings: ' + fromTime + ' TO ' + toTime + ')',
      hitsPerPage: 1000  //Get all events in one page
    })
    .then((data) => {
      dispatch({
        type: "FETCH_RECENT_EVENTS_FULFILLED",
        payload: data
      })
    })
  }
}

export function fetchEvents() {
  return (dispatch) => {
    dispatch({type: "FETCH_EVENTS"});
    axios.get("https://public.iticket.co.nz/api/EventSearch/BasicSearch?query=Auckland")
      .then((response) => {
        dispatch({type: "FETCH_EVENTS_FULFILLED", payload: response})
      })
      .catch((err) => {
        dispatch({type:"FETCH_EVENTS_REJECTED", payload: err})
      })
  }
}

//Fetch events info from Algolia API
export function fetchEvents1(page,city) {
  return {
    type: "FETCH_EVENTS",
    payload: axios.get("https://VXMYN1ZQFQ.algolia.net/1/indexes/Events", {
      params: {
        facetFilters: 'cityName:'+city,
        hitsPerPage: 6,
        page: page
      },
      headers: {
        'X-Algolia-API-Key': algolia_api_key,
        'X-Algolia-Application-Id': algolia_application_id
      }
    })
  }
}

export function getCurrentPosition(callback) {
  const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + google_api_key;
  return (dispatch) => {
    dispatch({type: "GET_CURRENT_POSITION"});
    axios.post(url)
      .then((response) => {
        dispatch({type: "GET_CURRENT_POSITION_FULFILLED", payload: response});
        callback();
      })
      .catch((err) => {
        dispatch({type: "GET_CURRENT_POSITION_REJECTED", payload: err});
      })
  }
}

//Get current city name from (latitude, longitude)
export function getCurrentCity(latlng, callback) {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=true&key=" + google_api_key;
  return (dispatch) => {
    dispatch({type: "GET_CURRENT_CITY"});
    axios.get(url)
      .then((response) => {
        dispatch({type: "GET_CURRENT_CITY_FULFILLED", payload: response});
        callback();
      })
      .catch((err) => {
        dispatch({type:"GET_CURRENT_CITY_REJECTED", payload: err})
      })
  }
}

export function changeLocation(location, callback) {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_LOCATION",
      payload: location
    });
    callback();
  }
}


export function setEvent(event){
    return {
        type: "SET_EVENT",
        payload: event
    }
}

export function getEvent(){
    
    return{
        type: "GET_EVENT"
    }

}
