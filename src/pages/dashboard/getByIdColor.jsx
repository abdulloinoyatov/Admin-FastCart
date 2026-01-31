import { getByIdColor } from "@/api/colorsApi";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const GetByIdColor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.color);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getByIdColor(id));
  }, [dispatch, id]);

  return (
    <div className="flex items-center justify-center h-[600px]">

      <div
        key={user?.id}
        className="bg-white w-full max-w-md rounded-3xl shadow-xl
                   p-8 flex flex-col items-center gap-6
                   animate-fade-in"
      >
        {/* Color Preview */}
        <div
          className="w-36 h-36 rounded-full shadow-2xl border-8 border-white
                     transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: user?.colorName }}
        />

        {/* Color Name */}
        <Typography variant="h4" color="blue-gray">
          {user?.colorName}
        </Typography>

        {/* Color Code */}
        <Typography
          variant="small"
          className="text-gray-500 bg-gray-100 px-4 py-1 rounded-full"
        >
          Color Code
        </Typography>

        {/* Action */}
        <Button
          variant="outlined"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default GetByIdColor;
