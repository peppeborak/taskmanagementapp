import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../theme/theme'
import { Box, CssBaseline, Grid2 } from '@mui/material'
import { SideBarList } from '../components/SideBarList'
import { useState } from 'react'
import { TasksList } from '../components/TasksList'

export interface selectedList {
  listId: number
  listName: string
}

export const Dashboard = () => {
  const [selectedLists, setSelectedLists] = useState<selectedList[]>([])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid2 container sx={{ height: '100hv' }}>
        <SideBarList
          selectedLists={selectedLists}
          setSelectedLists={setSelectedLists}
        />
        <Grid2 container spacing={4}>
          <TasksList selectedLists={selectedLists} />
        </Grid2>
      </Grid2>
    </ThemeProvider>
  )
}
