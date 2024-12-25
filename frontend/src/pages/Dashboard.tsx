import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../theme/theme'
import { CssBaseline, Grid2 } from '@mui/material'
import { SideBarList } from '../components/SideBarList'
import { useState } from 'react'
import { TasksList } from '../components/TasksList'
import { NavBar } from '../components/NavBar'

export interface selectedList {
  listId: number
  listName: string
}

export const Dashboard = () => {
  const [selectedLists, setSelectedLists] = useState<selectedList[]>([])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* NavBar */}
      <NavBar />

      <Grid2 container>
        {/* SideBar List */}
        <Grid2 size={3} sx={{ height: '100%' }}>
          <SideBarList
            selectedLists={selectedLists}
            setSelectedLists={setSelectedLists}
          />
        </Grid2>

        {/* Main Content */}
        <Grid2 size={9} sx={{ mt: 4 }}>
          <TasksList
            selectedLists={selectedLists}
            setSelectedLists={setSelectedLists}
          />
        </Grid2>
      </Grid2>
    </ThemeProvider>
  )
}
