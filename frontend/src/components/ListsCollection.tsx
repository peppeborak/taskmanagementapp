import { useEffect, useState } from 'react'
import { ListsFetchAllFromApi } from '../services/api.ts'
interface List {
  id: number
  name: string
  isDeleted: number
  userId: number
}

export const ListsCollection = () => {
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await ListsFetchAllFromApi()
        setLists(data.result)
        return data
      } catch (error) {
        console.error('Could not load lists', error)
      }
    }
    loadLists()
  }, [])

  return (
    <>
      {lists.map((list) => (
        <div key={list.id} className="task">
          {list.name}
        </div>
      ))}
    </>
  )
}
