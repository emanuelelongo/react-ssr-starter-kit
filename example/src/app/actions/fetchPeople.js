import fetch from 'isomorphic-fetch';

export default function fetchPeople(search) {
  return dispatch => {
    return fetch(`https://swapi.co/api/people/?search=${search}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_PEOPLE',
          payload: data.results.map(i => ({...i, id: i.url.split('/').reverse()[1]}))
        })
      })
  }
}
