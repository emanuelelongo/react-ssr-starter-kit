export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_PLANETS':
      return action.payload
    default:
      return state
  }
}
