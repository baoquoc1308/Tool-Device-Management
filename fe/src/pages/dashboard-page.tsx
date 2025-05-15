import { HttpRequest } from '@/lib'
import { useState } from 'react'
import { tryCatch } from '@/utils'
const DashboardPage = () => {
  const [data, setData] = useState<Array<any>>([])
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const api = new HttpRequest()
  const getUser = async () => {
    const response = await tryCatch(api.get('/user'))
    if (response.error) {
      setError(response.data)
      return
    }
    return setData(response.data.data)
  }
  const addUser = async () => {
    const response = await tryCatch(api.post('/user', { name: 'Quoc Dinh', age: 20 }))
    if (response.error) {
      setError(response.data)
      return
    }
    return setResponse(response.data.data)
  }

  const updateUser = async () => {
    const response = await tryCatch(api.put('/user/3', { name: 'Quoc Dinh 1' }))
    if (response.error) {
      setError(response.data)
      return
    }
    return setResponse(response.data.data)
  }
  const deleteUser = async () => {
    const response = await tryCatch(api.delete('/user/3'))
    if (response.error) {
      setError(response.data)
      return
    }
    return setResponse(response.data.data)
  }
  return (
    <div className='flex flex-col gap-4 p-4'>
      {data && (
        <div>
          {data.map((item) => (
            <div key={item.id}>Tên: {item.name}</div>
          ))}
        </div>
      )}
      {response && <div>{JSON.stringify(response)}</div>}
      <button
        className='w-fit cursor-pointer bg-gray-400 p-3'
        onClick={getUser}
      >
        Get user
      </button>
      <button
        className='w-fit cursor-pointer bg-gray-400 p-3'
        onClick={addUser}
      >
        Add user
      </button>
      <button
        className='w-fit cursor-pointer bg-gray-400 p-3'
        onClick={updateUser}
      >
        Update user
      </button>
      <button
        className='w-fit cursor-pointer bg-gray-400 p-3'
        onClick={deleteUser}
      >
        Delete user
      </button>
    </div>
  )
}

export default DashboardPage
