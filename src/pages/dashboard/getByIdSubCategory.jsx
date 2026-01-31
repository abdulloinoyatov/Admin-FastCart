import { getByIdSubCategory } from '@/api/subCategoryApi'
import { Button } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const GetByIdSubCategory = () => {
  const { id1 } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.subCategory)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getByIdSubCategory(id1))
  }, [dispatch, id1])

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">

      <div className="relative w-full max-w-md">

        <div className="absolute inset-0 rounded-3xl
                        bg-gradient-to-r from-indigo-300/30 to-purple-300/30
                        blur-2xl"></div>
        <div className="relative z-10 bg-white/80 backdrop-blur-xl
                        rounded-3xl shadow-2xl p-8
                        flex flex-col items-center gap-6 border">

          <div className="w-24 h-24 rounded-2xl
                          bg-gradient-to-br from-indigo-500 to-purple-600
                          flex items-center justify-center
                          text-4xl font-bold text-white
                          shadow-lg">
            {user?.subCategoryName?.[0]?.toUpperCase() || "?"}
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {user?.subCategoryName || "SubCategory"}
          </h1>

          <div className="w-full bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-700">SubCategory ID:</span>{" "}
              {user?.id}
            </p>
            {user?.categoryId && (
              <p className="mt-1">
                <span className="font-semibold text-gray-700">Category ID:</span>{" "}
                {user.categoryId}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              className="border-indigo-400 text-indigo-600 hover:bg-indigo-50"
            >
              Go Back
            </Button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default GetByIdSubCategory
