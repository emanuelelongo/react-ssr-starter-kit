export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_PEOPLE':
      return action.payload
    default:
      return state
  }
}
