export function requestHeaderReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item]
    case 'MODIFY':
      return state.map((item, index) => {
        return index === action.index ? { ...item, ...action.field } : item
      })
    default:
      throw new Error('RequestHeaderReducer Error')
  }
}
