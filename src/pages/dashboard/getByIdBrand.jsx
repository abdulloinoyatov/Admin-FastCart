import { getByIdBrand } from "@/api/brandApi";
import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const GetByIdBrand = () => {
  const { id4 } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.brand);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getByIdBrand(id4));
  }, [dispatch, id4]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-5 w-[320px]">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-pink-500
                        flex items-center justify-center text-4xl font-bold text-white shadow-md">
          {user.brandName?.[0]?.toUpperCase() || "?"}
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {user.brandName || "No brand name"}
        </h1>
        <p className="text-sm text-gray-500">
          Brand ID: {user.id}
        </p>
        <Button
          variant="outlined"
          className="mt-2 w-full"
          onClick={() => navigate(-1)}
        >
          ⬅ Go Back
        </Button>
      </div>
    </div>
  );
};

export default GetByIdBrand;
