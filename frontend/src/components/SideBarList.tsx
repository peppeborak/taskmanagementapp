import React, { useEffect, useState } from 'react'
import { fetchListsFromApi } from '../services/api.ts'
import { Box, List, ListItem, Typography, Paper } from '@mui/material'
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
    // Check if clicked list is already in selectedLists (Showing)
    if (selectedLists.some((list) => list.listId === listId)) {
      return // Do nothing (avoid duplicates)
    }
    const selectedList = {
      listId: listId,
      listName: listName,
    }

    const newSelectedListIds = [selectedList, ...selectedLists]
    setSelectedLists(newSelectedListIds)
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
        borderRadius: 0, // Remove round edges
      }}
    >
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
                    cursor: 'pointer',
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
                  selectedLists={selectedLists}
                  setSelectedLists={setSelectedLists}
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
