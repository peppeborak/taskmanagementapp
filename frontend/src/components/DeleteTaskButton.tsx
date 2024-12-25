import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import { deleteTaskToApi } from '../services/api'
import { Task } from './TasksList'

interface Props {
  taskId: number
  allTasks: Task[]
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const DeleteTaskButton = ({ taskId, allTasks, setAllTasks }: Props) => {
  const handleDeleteTask = async () => {
    try {
      const response = await deleteTaskToApi(taskId)
      if (response.message !== 'Successfully deleted task') {
        // If not successful
        throw new Error('Unexpected API response') // Throw error
      }
      const newTaskList = allTasks.filter((task) => task.id !== taskId)
      setAllTasks(newTaskList)
    } catch (error) {
      console.error('Error deleting task', error)
    }
  }

  return (
    <IconButton size="small" onClick={handleDeleteTask}>
      <ClearIcon />
    </IconButton>
  )
}
