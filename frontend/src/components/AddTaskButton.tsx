import AddIcon from '@mui/icons-material/Add'
import { IconButton } from '@mui/material'

interface Props {
  showTaskInputForList: (listId: number) => void
  listId: number
}

export const AddTaskButton = ({ showTaskInputForList, listId }: Props) => {
  return (
    <IconButton size="small" onClick={() => showTaskInputForList(listId)}>
      <AddIcon />
    </IconButton>
  )
}
