import fetch from 'isomorphic-fetch';

export default function fetchPlanetDetails(id) {
  return dispatch => {
    return fetch(`https://swapi.co/api/planets/${id}/`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_PLANET_DETAILS',
          payload: data
        })
    })
  }
}