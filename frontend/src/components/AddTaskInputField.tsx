import { Box, TextField } from '@mui/material'
import { Task } from './TasksList'
import { createTaskToApi } from '../services/api'

interface Props {
  listId: number
  allTasks: Task[]
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
  newTaskTitle: string
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>
  setActiveTextFieldListId: React.Dispatch<React.SetStateAction<number | null>>
}

export const AddTaskInputField = ({
  listId,
  allTasks,
  setAllTasks,
  newTaskTitle,
  setNewTaskTitle,
  setActiveTextFieldListId,
}: Props) => {
  // Handle newTask input
  const handleOnchangeNewTaskTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskTitle(event.target.value)
    console.log(newTaskTitle)
  }

  const handleAddTask = async (listId: number) => {
    console.log('new task Title:', newTaskTitle, 'list id:', listId)
    if (!newTaskTitle.trim()) {
      return // Do nothing
    }
    try {
      const result = await createTaskToApi(listId, newTaskTitle)
      const newTask: Task = {
        id: result.taskId,
        userId: result.userId,
        listId: listId,
        title: newTaskTitle,
        description: null,
        dueDate: null,
        isDeleted: 0,
      }
      const updatedTasksList = [newTask, ...allTasks] // Old array + new task
      setAllTasks(updatedTasksList)
      setNewTaskTitle('') // Clear input field
      setActiveTextFieldListId(null)
      console.log(updatedTasksList)
    } catch (error) {
      console.error('Error creating task', error)
      throw error
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      key={listId}
    >
      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Disable the border
            },
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask(listId) // Add on Enter key
          }
        }}
        autoFocus
        onBlur={() => setActiveTextFieldListId(null)} // Hide on blur(lose focus)
        label="Add new Task"
        onChange={handleOnchangeNewTaskTitle}
        value={newTaskTitle}
        slotProps={{
          htmlInput: { autoComplete: 'off' },
        }}
      />
    </Box>
  )
}
