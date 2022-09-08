
export const addTask = (task: any) => async (dispatch: any) => {
  try {

    dispatch({
      type: 'ADD_TASK',
      payload: task
    })

  } catch (error) {
    console.log('error addTask action', error)
  }
}

export const getTask = (user: any) => async (dispatch: any) => {

  try {
    console.log('soy el action user', user)
    dispatch({
      type: 'LOAD_TASK',
      payload: user.task
    })
  } catch (error) {
    console.log('error action task', error)
  }
}