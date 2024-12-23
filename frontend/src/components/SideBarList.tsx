import { useEffect, useState } from 'react'
import { fetchListsFromApi } from '../services/api.ts'
import { Box, ButtonBase, List, ListItem, Typography } from '@mui/material'
import { ListAddInputField } from './ListAddInputField.tsx'
import { DeleteListButton } from './DeleteListButton.tsx'
import { selectedList } from '../pages/Dashboard.tsx'
export interface List {
  id: number
  name: string
  isDeleted: number
  userId: number
}
interface SideBarProps {
  setSelectedLists: React.Dispatch<React.SetStateAction<selectedList[]>>
  selectedLists: selectedList[]
}

export const SideBarList = ({
  setSelectedLists,
  selectedLists,
}: SideBarProps) => {
  const [sideBarLists, setSideBarLists] = useState<List[]>([])
  const handleSideBarLoad = async () => {
    try {
      const data = await fetchListsFromApi()
      setSideBarLists(data.result)
    } catch (error) {
      console.error('Error loading sidebar', error)
      throw error
    }
  }

  const handleSideBarClick = (listId: number, listName: string) => {
    // Add if list.id === some id in list, do nothing
    const selectedList = {
      listId: listId,
      listName: listName,
    }

    const newSelectedListIds = [selectedList, ...selectedLists]
    setSelectedLists(newSelectedListIds)
    console.log('Selected lists: ', selectedLists)
  }

  useEffect(() => {
    handleSideBarLoad()
  }, [])

  return (
    <Box
      sx={{
        width: '20vw',
        height: '100vh',
        borderRight: '1px solid rgba(0,0,0,0.12)',
        overflowY: 'auto',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          textAlign: 'center', // Center text horizontally
          padding: 2, // Add padding around the text
        }}
      >
        <Typography variant="h5">Your lists</Typography>
      </Box>
      <Box>
        <List>
          <ListAddInputField
            setSideBarLists={setSideBarLists}
            sideBarLists={sideBarLists}
          />
          {sideBarLists.map((list: List) => (
            <ListItem
              key={list.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ButtonBase
                sx={{
                  width: '100%',
                  textAlign: 'left',
                }}
                onClick={() => handleSideBarClick(list.id, list.name)}
              >
                <Typography>{list.name}</Typography>
              </ButtonBase>
              <DeleteListButton
                listId={list.id}
                setSideBarLists={setSideBarLists}
                sideBarLists={sideBarLists}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
