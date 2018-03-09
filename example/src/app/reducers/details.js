export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PLANET_DETAILS':
      return action.payload
    default:
      return state
  }
}
