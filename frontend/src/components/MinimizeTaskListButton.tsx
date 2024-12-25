import { IconButton } from '@mui/material'
import { selectedList } from '../pages/Dashboard'
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
  selectedLists: selectedList[]
  setSelectedLists: React.Dispatch<React.SetStateAction<selectedList[]>>
  listId: number
}

export const MinimizeTaskListButton = ({
  selectedLists,
  setSelectedLists,
  listId,
}: Props) => {

  // Removes the clicked list from selectedList (Not visible anymore)
  const handleOnClick = () => {
    const newSelectedList = selectedLists.filter(
      (list) => list.listId !== listId
    )
    setSelectedLists(newSelectedList)
  }

  return (
    <IconButton size="small" onClick={handleOnClick}>
      <RemoveIcon />
    </IconButton>
  )
}
