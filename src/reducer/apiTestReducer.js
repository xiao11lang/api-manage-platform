export function apiTestReducer(state, action) {
    switch (action.type) {
      case 'INIT':
        return action.list
      case 'ADD':
        return [action.item, ...state]
      case 'DELETE':
        return state.filter(item => {
          return item.id !== action.id
        })
      case 'MODIFY':
        return state.map(item => {
          return item.id === action.id
            ? Object.assign({}, item, { ...action.item })
            : item
        })
      default:
        throw new Error('ApiTestReducer Error')
    }
  }
  