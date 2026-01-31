import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/api/useProfileApi";
import { useEffect } from "react";

export function Profile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (data?.sid) dispatch(getUserById(data.sid));
  }, [dispatch, data?.sid]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br
                    from-gray-100 via-white to-indigo-100">
      <div className="relative h-80 w-full bg-[url('/img/background-image.png')]
                      bg-cover bg-center rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <Button
          size="sm"
          variant="text"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 inline" />
          Back
        </Button>
      </div>
      <Card className="relative mx-auto -mt-24 max-w-5xl
                       bg-white/80 backdrop-blur-xl
                       rounded-3xl shadow-2xl border">

        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-center
                          md:items-end gap-6">

            <Avatar
              src="/img/bruce-mars.jpeg"
              size="xxl"
              variant="rounded"
              className="rounded-2xl shadow-xl shadow-indigo-500/30"
            />

            <div className="flex-1 text-center md:text-left">
              <Typography variant="h4" color="blue-gray">
                {data?.name || "User"}
              </Typography>
              <Typography className="text-blue-gray-500">
                {data?.email}
              </Typography>
            </div>
            <div className="flex gap-2">
              <Tooltip content="Edit Profile">
                <Button
                  size="sm"
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip content="Settings">
                <Button
                  size="sm"
                  variant="outlined"
                  className="border-indigo-400 text-indigo-600"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="my-8 h-px bg-gray-200" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "Orders", value: 24 },
              { label: "Wishlist", value: 12 },
              { label: "Reviews", value: 8 },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-50 p-6
                           hover:shadow-md transition"
              >
                <Typography variant="h4" className="text-indigo-600">
                  {stat.value}
                </Typography>
                <Typography className="text-gray-500">
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
         

        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
