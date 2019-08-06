export function requestHeaderReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state.map(item => {
          return { ...item, last: false }
        }),
        action.item
      ]
    case 'MODIFY':
      return state.map((item, index) => {
        return item.symbol === action.symbol
          ? { ...item, ...action.item }
          : item
      })
    case 'DELETE':
      const newState = state.filter((item, index) => {
        return item.symbol === action.symbol ? null : item
      })
      return newState.map((item, index) => {
        return index === newState.length - 1 ? { ...item, last: true } : item
      })
    default:
      throw new Error('RequestHeaderReducer Error')
  }
}
