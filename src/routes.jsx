import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  PlayCircleIcon,
  BookmarkIcon,
  Bars3BottomLeftIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Products from "./pages/dashboard/products";
import Brands from "./pages/dashboard/brands";
import Categorys from "./pages/dashboard/categorys";
import SubCategorys from "./pages/dashboard/subCategorys";
import Colors from "./pages/dashboard/colors";
import GetByIdColor from "./pages/dashboard/getByIdColor";
import GetByIdSubCategory from "./pages/dashboard/getByIdSubCategory";
import GetByIdCategory from "./pages/dashboard/getByIdCategory";
import GetByIdProduct from "./pages/dashboard/getByIdProduct";
import GetByIdBrand from "./pages/dashboard/getByIdBrand";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const token = localStorage.getItem("token");

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon className="w-5 h-5" />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon className="w-5 h-5" />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <ShoppingCartIcon className="w-5 h-5" />,
        name: "products",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <GlobeAltIcon className="w-5 h-5" />,
        name: "brands",
        path: "/brands",
        element: <Brands />,
      },
      {
        icon: <BookmarkIcon className="w-5 h-5" />,
        name: "categorys",
        path: "/categorys",
        element: <Categorys />,
      },
      {
        icon: <Bars3BottomLeftIcon className="w-5 h-5" />,
        name: "sub categorys",
        path: "/sub-categorys",
        element: <SubCategorys />,
      },
      {
        icon: <PaintBrushIcon className="w-5 h-5" />,
        name: "colors",
        path: "/colors",
        element: <Colors />,
      },

      { path: "/getByIdColor/:id", element: <GetByIdColor /> },
      { path: "/getByIdSubCategory/:id1", element: <GetByIdSubCategory /> },
      { path: "/getByIdCategory/:id2", element: <GetByIdCategory /> },
      { path: "/getByIdProduct/:id3", element: <GetByIdProduct /> },
      { path: "/getByIdBrand/:id4", element: <GetByIdBrand /> },
    ],
  },

  {
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon className="w-5 h-5" />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
     
    ],
  },
];


export default routes;

