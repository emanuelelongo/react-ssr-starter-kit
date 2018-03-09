import fetch from 'isomorphic-fetch';

export default function fetchPlanets() {
  return dispatch => {
    return fetch('https://swapi.co/api/planets/')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_PLANETS',
          payload: data.results.map(i => ({...i, id: i.url.split('/').reverse()[1]}))
        })
      })
  }
}