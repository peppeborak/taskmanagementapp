import { List, ListItem, ListItemText } from '@mui/material'

interface Task {
  id: number
  userId: number
  listId: number
  title: string
  description?: null | string
  dueDate?: null | string
  isDeleted: number
}
interface TasksListProps {
  tasks: Task[]
  selectedListId: number | null
}

export const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <div>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText>{task.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
