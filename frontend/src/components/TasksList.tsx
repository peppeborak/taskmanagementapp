import { Box, Paper, Typography, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { selectedList } from '../pages/Dashboard'
import { fetchTasksFromApi } from '../services/api'
import { MinimizeTaskListButton } from './MinimizeTaskListButton'
import { AddTaskButton } from './AddTaskButton'
import { DeleteTaskButton } from './DeleteTaskButton'
import { AddTaskInputField } from './AddTaskInputField'

export interface Task {
  id: number
  userId: number
  listId: number
  title: string
  description?: null | string
  dueDate?: null | string
  isDeleted: number
  isCompleted: boolean
}
interface TasksListProps {
  selectedLists: selectedList[]
  setSelectedLists: React.Dispatch<React.SetStateAction<selectedList[]>>
}

export const TasksList = ({
  selectedLists,
  setSelectedLists,
}: TasksListProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [activeTextFieldListId, setActiveTextFieldListId] = useState<
    number | null
  >(null)
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  // Load all tasks on load
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const result = await fetchTasksFromApi()
        setAllTasks(result.result)
      } catch (error) {
        console.error('Error loading tasks', error)
      }
    }
    fetchAllTasks()
  }, [])

  // Handle InputFieldvisible
  const showTaskInputForList = (listId: number) => {
    setActiveTextFieldListId(listId)
  }

  // Handle CheckBox toggle
  const handleToggleCheckBox = (taskId: number) => {
    // Map all tasks, find correct task, open it and edit isCompleted. All other task is same
    const newAllTasksList = allTasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )
    setAllTasks(newAllTasksList)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // Ensures wrapping when there are too many items
        gap: 2, // Space between the cards
        justifyContent: 'flex-start', // Aligns items to the left
        alignItems: 'flex-start', // Ensures items align at the top
      }}
    >
      {/* Map all selected lists */}
      {selectedLists.map((list: selectedList) => (
        <Box
          component={Paper}
          key={list.listId}
          elevation={3}
          sx={{
            height: 350,
            width: 250,
            overflowY: 'auto',
            borderRadius: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Top Box for title and buttons*/}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              paddingLeft: 2,
              marginBottom: 2,
            }}
          >
            {/* Box for List name */}
            <Box sx={{ mt: 1, padding: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  wordBreak: 'break-word',
                }}
              >
                {list.listName}
              </Typography>
            </Box>
            {/* Box for buttons */}
            <Box sx={{ display: 'flex', gap: 1, padding: 1 }}>
              <MinimizeTaskListButton
                selectedLists={selectedLists}
                setSelectedLists={setSelectedLists}
                listId={list.listId}
              />
              <AddTaskButton
                listId={list.listId}
                showTaskInputForList={showTaskInputForList}
              />
            </Box>
          </Box>
          {/* Tasks Section */}
          {/* Add Task input field */}
          {activeTextFieldListId === list.listId && (
            <AddTaskInputField
              listId={list.listId}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              setActiveTextFieldListId={setActiveTextFieldListId}
            />
          )}
          {allTasks
            .filter(
              (task) => task.listId === list.listId && task.isDeleted === 0
            )
            .map((task: Task) => (
              <Box
                key={task.id}
                className="hover-box"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  padding: 1,
                  marginBottom: 1,
                  borderRadius: 1,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    size="small"
                    checked={!!task.isCompleted}
                    onClick={() => handleToggleCheckBox(task.id)}
                  />
                  {/* Task Title */}
                  <Typography
                    sx={{
                      textDecoration: task.isCompleted
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {task.title}
                  </Typography>
                </Box>
                {/* Delete Task Button */}
                <Box>
                  <DeleteTaskButton
                    taskId={task.id}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                  />
                </Box>
              </Box>
            ))}
        </Box>
      ))}
    </Box>
  )
}
