import {
  addColor,
  deleteColor,
  editColor,
  getColor,
} from "@/api/colorsApi";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

const Colors = () => {
  const { data } = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const [colorAdd, setColorAdd] = useState("");
  const [colorEdit, setColorEdit] = useState("");
  const [idx, setIdx] = useState(null);
  const [modal, setModal] = useState(false);

  function openEdit(e) {
    setColorEdit(e.colorName);
    setIdx(e.id);
    setModal(true);
  }

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 w-full sm:w-auto">
          <Input
            label="Color name"
            value={colorAdd}
            onChange={(e) => setColorAdd(e.target.value)}
          />
          <Button
            className="bg-indigo-500 hover:bg-indigo-600"
            onClick={() => {
              dispatch(addColor(colorAdd));
              setColorAdd("");
            }}
          >
              Add
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((e) => (
          <div
            key={e.id}
            className="group bg-white rounded-3xl shadow-md
                       hover:shadow-xl transition p-5
                       flex flex-col items-center gap-4"
          >
            <div
              className="w-24 h-24 rounded-full border-4 border-white
                         shadow-lg group-hover:scale-105 transition"
              style={{ backgroundColor: e.colorName }}
            />

            <Typography variant="h6">{e.colorName}</Typography>
            <div className="flex gap-2 w-full">
              <Button
                size="sm"
                className="flex-1 bg-red-500 hover:bg-red-600 flex items-center gap-1"
                onClick={() => dispatch(deleteColor(e.id))}
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </Button>

              <Button
                size="sm"
                variant="outlined"
                className="flex-1"
                onClick={() => openEdit(e)}
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>

            <Link to={`/dashboard/getByIdColor/${e.id}`} className="w-full">
              <Button variant="gradient" fullWidth>
                Info
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <Dialog open={modal} handler={() => setModal(false)}>
        <DialogHeader>Edit Color</DialogHeader>

        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Color name / hex"
            value={colorEdit}
            onChange={(e) => setColorEdit(e.target.value)}
          />

          <div
            className="w-full h-16 rounded-xl border"
            style={{ backgroundColor: colorEdit }}
          />
        </DialogBody>

        <DialogFooter className="flex gap-2">
          <Button variant="text" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button
            className="bg-indigo-500"
            onClick={() => {
              dispatch(editColor({ idx, colorEdit }));
              setModal(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Colors;
