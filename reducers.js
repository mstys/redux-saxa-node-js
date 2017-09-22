export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    case 'FETCH_SUCCEEDED': {
      console.log('Reducers fetch success', action);
      state.data = action.data;
      return state
    }
    case 'FETCH_FAILED': {
      console.log('Reducers fetch failed');
      return state
    }
    default:
      return state
  }
}
