import { TextField } from '@mui/material'
import { useState } from 'react'
import { createListToApi } from '../services/api'
import { List } from './SideBarList'
interface Props {
  setSideBarLists: React.Dispatch<React.SetStateAction<List[]>>
  sideBarLists: List[]
}

export const ListAddInputField = ({ setSideBarLists, sideBarLists }: Props) => {
  const [newListName, setNewListName] = useState<string>('')


  const handleAddNewList = async () => {
    // Validates that new list is not blank
    if (!newListName.trim()) {
      return // Do nothing
    }
    try {
      const result = await createListToApi(newListName) // Send api request
      const newList = {
        // Create newList with the response from query
        id: result.list.id,
        name: newListName,
        isDeleted: 0,
        userId: result.list.userId,
      }
      const updatedSideBarLists = [newList, ...sideBarLists] // Old array + the new list
      setSideBarLists(updatedSideBarLists)
      setNewListName('') // Clear input field
    } catch (error) {
      console.error('Error creating list', error)
      throw error
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(event.target.value)
  }

  return (
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
          handleAddNewList() // Save on Enter key
        }
      }}
      label="Add new list"
      onChange={handleChange}
      value={newListName}
      slotProps={{
        htmlInput: {autoComplete: 'off',},
      }}
    />
  )
}
