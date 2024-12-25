import React, { useEffect, useState } from 'react'
import { fetchListsFromApi } from '../services/api.ts'
import {
  Box,
  List,
  ListItem,
  Typography,
  Paper,
} from '@mui/material'
import { ListAddInputField } from './ListAddInputField.tsx'
import { DeleteListButton } from './DeleteListButton.tsx'
import { selectedList } from '../pages/Dashboard.tsx'
import Divider from '@mui/material/Divider'

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
    // Add if list.id === some id in list else do nothing
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
      component={Paper}
      elevation={3}
      sx={{
        width: '20vw',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          textAlign: 'left', // Center text horizontally
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
          <Divider component="li" />
          {sideBarLists.map((list: List) => (
            <React.Fragment key={list.id}>
              <ListItem
                key={list.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleSideBarClick(list.id, list.name)}
                >
                  <Typography
                    sx={{
                      textAlign: 'left',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {list.name}
                  </Typography>
                </Box>
                <DeleteListButton
                  listId={list.id}
                  setSideBarLists={setSideBarLists}
                  sideBarLists={sideBarLists}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  )
}
