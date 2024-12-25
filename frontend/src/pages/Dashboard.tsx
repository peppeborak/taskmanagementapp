import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from '../theme/theme'
import { CssBaseline, Grid2 } from '@mui/material'
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
      <Grid2 container>
        {/* SideBar List */}
        <Grid2 size={3} sx={{height: '100%'}}>
          <SideBarList
            selectedLists={selectedLists}
            setSelectedLists={setSelectedLists}
          />
        </Grid2>

        {/* Main Content */}
        <Grid2 size={9}>
          <TasksList selectedLists={selectedLists} />
        </Grid2>
      </Grid2>
    </ThemeProvider>
  )
}
