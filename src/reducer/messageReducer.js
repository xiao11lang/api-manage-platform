export function messages(state, action) {
  switch (action.type) {
    case 'SET_ALL_READ':
      return Object.assign({}, state, {
        [action.mesType]: {
          unRead: 0,
          list: state[action.mesType].list.map(mes => {
            return Object.assign({}, mes, {
              hasRead: 1
            })
          })
        }
      })
    case 'READ_ONE':
      return Object.assign({}, state, {
        [action.mesType]: {
          unRead: state[action.mesType].unRead - 1,
          list: state[action.mesType].list.map(mes => {
            return mes.id === action.id
              ? Object.assign({}, mes, {
                  hasRead: 1
                })
              : mes
          })
        }
      })
    case 'Delete_ALL':
      return Object.assign({}, state, {
        [action.mesType]: {
          unRead: 0,
          list: []
        }
      })
    case 'DELETE_ONE':
      let curMes = state[action.mesType].list[action.index]
      let unRead = 0
      if (curMes.hasRead === 0) {
        unRead = state[action.mesType].unRead - 1
      } else {
        unRead = state[action.mesType].unRead
      }
      return Object.assign({}, state, {
        [action.mesType]: {
          unRead: unRead,
          list: state[action.mesType].list.filter(mes => {
            return mes.id === action.id ? null : mes
          })
        }
      })
    default:
      return {
        official: {},
        project: {},
        person: {}
      }
  }
}
