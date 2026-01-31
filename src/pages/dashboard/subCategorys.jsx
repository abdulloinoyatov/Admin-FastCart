import { getCategory } from '@/api/categoryApi'
import { addSubCategory, deleteSubCategory, editSubCategory, getSubcategory } from '@/api/subCategoryApi'
import { Button, Dialog, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SubCategorys = () => {
  const { data } = useSelector((state) => state.subCategory)
  const { data2 } = useSelector((state) => state.category)
  let [subCategoryAdd, setSubCategoryAdd] = useState("")
  let [subCategoryEdit, setSubCategoryEdit] = useState("")
  let [modal, setModal] = useState(false)
  let [idx, setIdx] = useState(null)
  let [id1, setId1] = useState(null)
  let [id2, setId2] = useState(null)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubcategory())
    dispatch(getCategory())
  }, [dispatch])
  function openEdit(e) {
    setSubCategoryEdit(e.subCategoryName)
    setId1(e.id)
    for (let i = 0; i <= data2?.id; i++) {
      setId2(data2?.[i]?.id)
    }
    setModal(true)
  }
  console.log(data2?.[0]?.id);


  return (
    <div>
      {modal ? (
        <div>
          <Dialog className='p-[20px]  gap-[30px]' open>
            <Typography >
              Edit subCategory
            </Typography>
            <div className='flex gap-[30px]'>
              <Input value={subCategoryEdit} onChange={(e) => setSubCategoryEdit(e.target.value)} />
              <select name="" id="" value={id2} onChange={(e) => setId2(e.target.value)}>
                {data2?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.categoryName}
                  </option>
                ))}
              </select>
              <Button variant='outlined' onClick={() => {
                dispatch(editSubCategory({ id1, id2, subCategoryEdit }))
                setModal(false)
              }}
              >Edit</Button>
            </div>
          </Dialog>
        </div>
      ) : false}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[380px] rounded-xl bg-white p-6 shadow-xl">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add SubCategory</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4">
              <Input
                placeholder="SubCategory name"
                value={subCategoryAdd}
                onChange={(e) => setSubCategoryAdd(e.target.value)}
              />

              <select
                className="rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={idx}
                onChange={(e) => setIdx(e.target.value)}
              >
                <option value="">Select category</option>
                {data2?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="text"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(addSubCategory({ idx, subCategoryAdd }));
                  setSubCategoryAdd("");
                  setIdx("");
                  setOpen(false);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button onClick={() => setOpen(true)}>Add SubCategory</Button>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((e) => (
          <div
            key={e.id}
            className="group relative overflow-hidden
               rounded-3xl border bg-gradient-to-br
               from-indigo-50 via-white to-purple-50
               p-6 shadow-md hover:shadow-2xl
               transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-indigo-200/40 to-purple-200/40
                    transition duration-300 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center gap-4">

              <div className="w-20 h-20 rounded-2xl
                      bg-gradient-to-br from-indigo-500 to-purple-600
                      flex items-center justify-center
                      text-3xl font-bold text-white
                      shadow-lg rotate-3 group-hover:rotate-0
                      transition-transform duration-300">
                {e.subCategoryName?.[0]?.toUpperCase() || "?"}
              </div>

              <h1 className="text-lg font-semibold text-gray-800
                     group-hover:text-indigo-600 transition">
                {e.subCategoryName}
              </h1>

              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => dispatch(deleteSubCategory(e.id))}
                  className="bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Delete
                </Button>

                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => openEdit(e)}
                  className="border-indigo-400 text-indigo-600 hover:bg-indigo-50"
                >
                  Edit
                </Button>

                <Link to={`/dashboard/getByIdSubCategory/${e.id}`}>
                  <Button
                    size="sm"
                    className="bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SubCategorys