import {
  addBrand,
  deleteBrand,
  editBrand,
  getBrand,
} from "../../api/brandApi";
import {
  Button,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Brands = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.brand);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [brandName, setBrandName] = useState("");
  const [editId, setEditId] = useState(null);
  let [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const openEdit = (brand) => {
    setBrandName(brand.brandName);
    setEditId(brand.id);
    setEditModal(true);
  };

  const handleAdd = () => {
    if (!brandName.trim()) return;
    dispatch(addBrand(brandName));
    setBrandName("");
    setAddModal(false);
  };

  const handleEdit = () => {
    dispatch(editBrand({ idx: editId, editBrand: brandName }));
    setEditModal(false);
    setBrandName("");
    setEditId(null);
  };
  let filtered = data?.filter((e) => {
    return e.brandName
      .toLowerCase()
      .includes(search.toLowerCase().trim());
  });


  return (
    <div>
      <Dialog open={addModal} handler={() => setAddModal(false)} className="p-6">
        <Typography className="mb-4 text-xl font-semibold">
          Add Brand
        </Typography>
        <div className="flex gap-4">
          <Input
            placeholder="Brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </Dialog>
      <Dialog open={editModal} handler={() => setEditModal(false)} className="p-6">
        <Typography className="mb-4 text-xl font-semibold">
          Edit Brand
        </Typography>
        <div className="flex gap-4">
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button variant="outlined" onClick={handleEdit}>
            Save
          </Button>
        </div>
      </Dialog>
      <Button
        onClick={() => setAddModal(true)}
        className="mb-6 bg-green-500"
      >
        + Add Brand
      </Button>
      <div className="w-[300px] mb-[30px]">

      <Input
        placeholder="Search brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-[300px]"
        />
        </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered?.map((e) => (
          <div
            key={e.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center gap-4 border"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-500 
                    flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {e.brandName?.[0]?.toUpperCase() || "?"}
            </div>
            <h1 className="text-lg font-semibold text-gray-800 group-hover:text-red-500 transition">
              {e.brandName}
            </h1>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => openEdit(e)}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Edit
              </Button>

              <Link to={`/dashboard/getByIdBrand/${e.id}`}>
                <Button
                  size="sm"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Info
                </Button>
              </Link>

              <Button
                size="sm"
                onClick={() => dispatch(deleteBrand(e.id))}
                className="bg-red-50 text-red-600 hover:bg-red-100"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Brands;
