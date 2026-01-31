import { getByIdCategory } from '@/api/categoryApi'
import { Button } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const GetByIdCategory = () => {
  const { id2 } = useParams()
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.category)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getByIdCategory(id2))
  }, [dispatch, id2])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading category...
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md
                      flex flex-col items-center gap-6">

        <div className="w-28 h-28 rounded-full bg-gray-100 border
                        flex items-center justify-center overflow-hidden">
          <img
            src={`https://store-api.softclub.tj/images/${user.categoryImage}`}
            alt={user.categoryName}
            className="h-16 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {user.categoryName}
        </h1>
        <div className="w-full bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Category ID:</span> {user.id}
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            className="border-gray-400 text-gray-700"
          >
            ⬅ Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetByIdCategory
