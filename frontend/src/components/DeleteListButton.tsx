import { Button } from '@mui/material'
import { List } from './SideBarList'
import { deleteListToApi } from '../services/api'
import DeleteIcon from '@mui/icons-material/Delete'

interface DeleteButtonProps {
  setSideBarLists: React.Dispatch<React.SetStateAction<List[]>>
  sideBarLists: List[]
  listId: number
}

export const DeleteListButton = ({
  setSideBarLists,
  sideBarLists,
  listId,
}: DeleteButtonProps) => {
  const handleButtonClick = async () => {
    try {
      const response = await deleteListToApi(listId) // Send delete request to api
      if (response.message !== 'Successfully deleted list') {
        // If not successful
        throw new Error('Unexpected API response') // Throw error
      }
      // Filter out the deleted list
      const newSideBarList = sideBarLists.filter((list) => list.id !== listId)
      setSideBarLists(newSideBarList) // Set new sidebar list
    } catch (error) {
      console.error('Error deleting list', error)
      throw error
    }
  }

  return (
    <Button onClick={handleButtonClick}>
      <DeleteIcon />
    </Button>
  )
}
