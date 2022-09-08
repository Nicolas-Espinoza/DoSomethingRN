const initialState: any = []

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'LOAD_TASK':
      return [...state, action.payload]
    default:
      return state
  }
}

export default reducer