import { deleteImageProduct, getByIdProduct } from '@/api/productsSliceApi'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const GetByIdProduct = () => {
  const { id3 } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.product)
  const [activeImg, setActiveImg] = useState(null)

  useEffect(() => {
    if (id3) dispatch(getByIdProduct(id3))
  }, [dispatch, id3])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r
                          from-indigo-500 via-purple-500 to-pink-500
                          blur-2xl opacity-40" />

          <img
            src={`https://store-api.softclub.tj/images/${activeImg || user.images?.[0]?.images}`}
            className="relative z-10 w-full h-[420px] object-contain
                       rounded-3xl bg-black/40 p-6
                       transition-all duration-500"
          />
        </div>
        <div className="flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold tracking-tight">
            {user.productName}
          </h1>

          <p className="text-3xl font-bold text-indigo-400">
            ${user.price}
          </p>
          <div className="flex gap-3 flex-wrap">
            {user.images?.map((img) => (
              <div
                key={img.id}
                className="group relative cursor-pointer"
                onClick={() => setActiveImg(img.images)}
              >
                <img
                  src={`https://store-api.softclub.tj/images/${img.images}`}
                  className={`w-20 h-20 object-cover rounded-xl border
                    ${activeImg === img.images
                      ? "border-indigo-500"
                      : "border-white/10"}
                    hover:scale-110 transition`}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(deleteImageProduct(img.id))
                  }}
                  className="absolute -top-2 -right-2
                             bg-red-500 text-xs px-2 py-1
                             rounded-full opacity-0
                             group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl
                         bg-white/10 hover:bg-white/20 transition"
            >
              ← Back
            </button>

            <span className="px-6 py-3 rounded-xl bg-white/5 text-gray-300">
              {user.images?.length || 0} Images
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetByIdProduct
