export function apiGroupReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.list
    case 'ADD':
      return [...state,action.item]
    case 'DELETE':
      return state.filter(item => {
        return item.id !== action.id
      })
    case 'MODIFY':
      return state.map(item => {
        return item.id === action.id
          ? Object.assign({}, item, { name: action.name })
          : item
      })
    default:
      throw new Error('')
  }
}
