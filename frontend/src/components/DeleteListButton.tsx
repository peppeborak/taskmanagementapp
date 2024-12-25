import { IconButton } from '@mui/material'
import { List } from './SideBarList'
import { deleteListToApi } from '../services/api'
import DeleteIcon from '@mui/icons-material/Delete'
import { selectedList } from '../pages/Dashboard.tsx'

interface DeleteButtonProps {
  setSideBarLists: React.Dispatch<React.SetStateAction<List[]>>
  sideBarLists: List[]
  listId: number
  selectedLists: selectedList[]
  setSelectedLists: React.Dispatch<React.SetStateAction<selectedList[]>>
}

export const DeleteListButton = ({
  setSideBarLists,
  sideBarLists,
  listId,
  setSelectedLists,
  selectedLists,
}: DeleteButtonProps) => {
  const handleDeleteList = async () => {
    try {
      const response = await deleteListToApi(listId) // Send delete request to api
      if (response.message !== 'Successfully deleted list') {
        // If not successful
        throw new Error('Unexpected API response') // Throw error
      }
      // Filter out the deleted list from sidebar
      const newSideBarList = sideBarLists.filter((list) => list.id !== listId)
      setSideBarLists(newSideBarList) // Set new sidebar list

      const newSelectedList = selectedLists.filter(
        (list) => list.listId !== listId
      )
      setSelectedLists(newSelectedList)
    } catch (error) {
      console.error('Error deleting list', error)
      throw error
    }
  }

  return (
    <IconButton size="small" onClick={handleDeleteList}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  )
}
