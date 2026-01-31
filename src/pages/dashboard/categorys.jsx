import { addCategory, deleteCategory, editCategory, getCategory } from '@/api/categoryApi'
import { Button, Dialog, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Categorys = () => {
  const { data2 } = useSelector((state) => state.category)
  const [open, setOpen] = useState(false);
  const [categoryAdd, setCategoryAdd] = useState("")
  let [file, setFile] = useState(null)
  let [file2, setFile2] = useState(null)
  const [categoryEdit, setCategoryEdit] = useState("")
  const [modal, setModal] = useState(false)
  const [id, setId] = useState(null)
    let [search, setSearch] = useState("")
  

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("CategoryName", categoryAdd);
    for (let i = 0; i < file.length; i++) {
      fd.append("CategoryImage", file[i]);
    }
    dispatch(addCategory(fd));
    setCategoryAdd("");
    setFile(null)
    setOpen(false)
  };
  const handleEdit = (e) => {
    e.preventDefault();

    if (!file2) {
      alert("Image is required");
      return;
    }

    const fd = new FormData();
    fd.append("Id", id);
    fd.append("CategoryName", categoryEdit);

    for (let i = 0; i < file2.length; i++) {
      fd.append("CategoryImage", file2[i]);
    }

    dispatch(editCategory(fd));
    setModal(false);
  };


  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  function openEdit(e) {
    setFile2(null)
    setCategoryEdit(e.categoryName)
    setId(e.id)
    setModal(true)
  }
  let filtered = data2?.filter((e) => {
    return e.categoryName
      .toLowerCase()
      .includes(search.toLowerCase().trim());
  });
  return (
    <div>
      {modal && (
        <Dialog open={modal} handler={() => setModal(false)} className="p-[20px]">
          <Typography>Edit Category</Typography>
          <div className="flex gap-[20px] mt-4">
            <form action="" onSubmit={handleEdit}>
              <Input
                type="file"
                required
                onChange={(e) => setFile2(e.target.files)}
              />
              <Input
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <Button variant="outlined" type='submit'>
                Edit
              </Button>
            </form>
          </div>
        </Dialog>
      )}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Category</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <span>Upload image</span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files)}
              />
              <Input
                placeholder="Category name"
                value={categoryAdd}
                onChange={(e) => setCategoryAdd(e.target.value)}
              />
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="text" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : false}

      <Button onClick={() => setOpen(true)}>Add Category</Button>
      <div className="w-[300px] mb-[30px] mt-[30px]">

        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-[300px]"
        />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered?.map((e) => (
          <div
            key={e.id}
            className="group bg-white rounded-2xl border shadow-sm
               hover:shadow-xl transition-all duration-300
               p-6 flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center
                    overflow-hidden border group-hover:scale-110 transition">
              <img
                className="h-12 object-contain"
                src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
                alt={e.categoryName}
              />
            </div>
            <h1 className="text-lg font-semibold text-gray-800
                   group-hover:text-blue-600 transition">
              {e.categoryName}
            </h1>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => openEdit(e)}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Edit
              </Button>

              <Link to={`/dashboard/getByIdCategory/${e.id}`}>
                <Button
                  size="sm"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Info
                </Button>
              </Link>

              <Button
                size="sm"
                onClick={() => dispatch(deleteCategory(e.id))}
                className="bg-red-50 text-red-600 hover:bg-red-100"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categorys
