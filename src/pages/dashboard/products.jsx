import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImg, addToCart, deleteProduct, getBrands, getColors, getProducts, getSubcategory, postProduct, putProduct } from "../../api/productsSliceApi";
import { Link } from "react-router-dom";
import { Button, Dialog, Input, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";

const Product = () => {
  let { data, subCategory, colors, brands } = useSelector((state) => state.product)
  let [file, setFile] = useState(null)
  let [modalAdd, setModalAdd] = useState(false)
  let [idx, setIdx] = useState(null)
  const notify = () => toast("Wow so easy!");
  const toastSuccess = (msg) => toast.success(msg);
  const toastError = (msg) => toast.error(msg);
  let dispatch = useDispatch()
  const addProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < e.target.image.files.length; i++) {
      formData.append("Images", e.target["image"].files[i]);
    }
    formData.append("ProductName", e.target["productName"].value);
    formData.append("Description", e.target["description"].value);
    formData.append("Quantity", e.target["quantity"].value);
    formData.append("Code", e.target["code"].value);
    formData.append("Price", e.target["price"].value);
    formData.append("HasDiscount", e.target["hasDiscount"].value);
    formData.append("DiscountPrice", e.target["discountPrice"].value);
    formData.append("SubCategoryId", e.target["subCategoryId"].value);
    formData.append("BrandId", e.target["brandId"].value);
    formData.append("ColorId", e.target["colorId"].value);
    formData.append("Size", e.target["size"].value);
    formData.append("Weight", e.target["weight"].value);
    dispatch(postProduct(formData)).unwrap()
      .then(() => {
        toastSuccess("Product added successfully ✅");
      })
      .catch(() => {
        toastError("Failed to add product ❌");
      });
  };
  const handleSubmit = (e) => {
    const fd = new FormData();
    fd.append("ProductId", idx);
    for (let i = 0; i < file.length; i++) {
      fd.append("Files", file[i]);
    }
    dispatch(addImg(fd));
    setModalAdd(false);
    setFile(null);
  };

  const [id1,setId1] = useState(null)
  const [id2,setId2] = useState(null)
  const [id3,setId3] = useState(null)
  const [id4,setId4] = useState(null)
  const [productName,setProductName] = useState(null)
  let [editModal, setModalEdit] = useState(false)
  let [quantity, setQuantity] = useState("")
  let [weigth, setWeigth] = useState("")
  let [size, setSize] = useState("")
  let [code, setCode] = useState("")
  let [price, setPrice] = useState("")
  let [discountPrice, setDiscountPrice] = useState("")
  let [hasDiscount, setHasDiscount] = useState("")
  

  function openEdit(e){
    setId1(null)
    setId2(null)
    setId3(null)
    setId4(e.id)
    setProductName(e.productName)
    setQuantity(e.quantity)
    setPrice(e.price)
    setHasDiscount(e.hasDiscount)
    setDiscountPrice(e.discountPrice)
    setModalEdit(true)
  }


  useEffect(() => {
    dispatch(getProducts())
    dispatch(getColors())
    dispatch(getSubcategory())
    dispatch(getBrands())
  }, [dispatch])

  return <div>
    {editModal ? (
      <div>
       <Dialog open={editModal} handler={() => setModalEdit(false)} className="p-[20px]">
        <Typography>Edit Product</Typography>
        <div  className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <div>
            <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            <input type="text" value={weigth} onChange={(e)=>setWeigth(e.target.value)}/>
            <input type="text" value={size} onChange={(e)=>setSize(e.target.value)}/>
            <input type="text" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)}/>
            <input type="text" value={hasDiscount} onChange={(e)=>setHasDiscount(e.target.value)}/>
           <label className="block text-sm font-medium mb-1">Sub category</label>
        <select value={id1} onChange={(e)=>setId1(e.target.value)} className="w-full border rounded-xl p-2">
          {subCategory?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.subCategoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Brand</label>
        <select value={id2} onChange={(e)=>setId2(e.target.value)}  className="w-full border rounded-xl p-2">
          {brands?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.brandName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <select value={id3} onChange={(e)=>setId3(e.target.value)}  className="w-full border rounded-xl p-2">
          {colors?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.colorName}
            </option>
          ))}
        </select>
      </div>
          <Button  onClick={()=>dispatch(putProduct({id1,id2,id3,id4,productName,quantity,weigth,size,code,price,hasDiscount,discountPrice}))&&setModalEdit(false)}>
            edit
          </Button>
          </div>
      </Dialog>
      </div>
    ) : false}
    {modalAdd && (
      <Dialog open={modalAdd} handler={() => setModalAdd(false)} className="p-[20px]">
        <Typography>Add Image</Typography>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <input
            type="file"
            multiple
            onChange={(e) => setFile(e.target.files)}
          />
          <Button type="submit" disabled={!file}>
            Add Img
          </Button>
        </form>
      </Dialog>
    )}
    <form
      onSubmit={addProductSubmit}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Product images</label>
        <input
          name="image"
          multiple
          type="file"
          className="w-full border rounded-xl p-2"
        />
      </div>
      <input className="border rounded-xl p-2" placeholder="Product name" name="productName" />
      <input className="border rounded-xl p-2" placeholder="Description" name="description" />
      <input className="border rounded-xl p-2" placeholder="Quantity" name="quantity" />
      <input className="border rounded-xl p-2" placeholder="Code" name="code" />
      <input className="border rounded-xl p-2" placeholder="Price" name="price" />
      <input className="border rounded-xl p-2" placeholder="Size" name="size" />
      <input className="border rounded-xl p-2" placeholder="Weight" name="weight" />
      <div>
        <label className="block text-sm font-medium mb-1">Has discount</label>
        <select name="hasDiscount" className="w-full border rounded-xl p-2">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <input
        className="border rounded-xl p-2"
        placeholder="Discount price"
        name="discountPrice"
      />
      <div>
        <label className="block text-sm font-medium mb-1">Sub category</label>
        <select name="subCategoryId" className="w-full border rounded-xl p-2">
          {subCategory?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.subCategoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Brand</label>
        <select name="brandId" className="w-full border rounded-xl p-2">
          {brands?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.brandName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <select name="colorId" className="w-full border rounded-xl p-2">
          {colors?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.colorName}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          ADD PRODUCT
        </button>
      </div>
    </form>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((e) => (
  <div
    key={e.id}
    className="group relative bg-white rounded-3xl border
               shadow-sm hover:shadow-2xl transition-all duration-300
               p-5 flex flex-col"
  >
    {/* Top badge */}
    <span className="absolute top-3 left-3 text-xs font-semibold
                     bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
      PRODUCT
    </span>

    {/* Image */}
    <div className="relative w-full h-[180px]
                    flex items-center justify-center
                    rounded-2xl bg-gradient-to-br
                    from-gray-50 to-gray-100 overflow-hidden">
      <img
        src={`https://store-api.softclub.tj/images/${e.image}`}
        alt={e.productName}
        className="w-[150px] h-[140px] object-contain
                   group-hover:scale-110 transition duration-300"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0
                      group-hover:opacity-100 transition" />
    </div>
    <div className="mt-4 flex-1">
      <h1 className="text-lg font-bold text-gray-800 truncate">
        {e.productName}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Color: <span className="font-medium text-gray-700">{e.color}</span>
      </p>

      <p className="text-xl font-extrabold text-indigo-600 mt-3">
        ${e.price}
      </p>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <Link to={`/dashboard/getByIdProduct/${e.id}`}>
        <Button
          size="sm"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Info
        </Button>
      </Link>

      <Button
        size="sm"
        variant="outlined"
        className="w-full border-red-400 text-red-600 hover:bg-red-50"
        onClick={() => dispatch(deleteProduct(e.id))}
      >
        Delete
      </Button>

      <Button
        size="sm"
        variant="gradient"
        className="w-full col-span-2"
        onClick={() => {
          setModalAdd(true)
          setIdx(e.id)
        }}
      >
        Add Image
      </Button>

      <Button
        size="sm"
        className="w-full col-span-2 bg-gray-900 hover:bg-black text-white"
        onClick={() => openEdit(e)}
      >
        Edit Product
      </Button>
    </div>
  </div>
))}

    </div>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  </div>;
};

export default Product;
