// * Función que se encarga de manejar el estado de la aplicación
export default function appReducer(state, action) {
  // ? state es el estado actual del contexto, action es la acción que se va a ejecutar
  switch (action.type) {
    case 'ADD_TASK':
      return {
        tasks: [...state.tasks, action.payload],
      }

    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter(taks => taks.id !== action.payload),
      }

    case 'UPDATE_TASK':
      console.log(action.payload)
      const updatedTask = action.payload

      const updatedTasks = state.tasks.map(task => {
        if (task.id === updatedTask.id) {
          task.title = updatedTask.title
          task.description = updatedTask.description
        }
        return task
      })

      return {
        tasks: updatedTasks,
      }

    case 'TOGGLE_TASK_DONE':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
      }

    default:
      return state
  }
}
