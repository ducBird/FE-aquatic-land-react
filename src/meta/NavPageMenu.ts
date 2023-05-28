import { AiOutlineHeart } from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import { RxPerson } from "react-icons/rx";

export const PageMenuData = [
  {
    value: "home",
    linkTo: "/",
    icon: null,
  },
  {
    value: "shop",
    linkTo: "/shop",
    icon: null,
  },
  {
    value: "services",
    linkTo: "/services",
    icon: null,
  },
  {
    value: "blog",
    linkTo: "/blog",
    icon: null,
  },
  {
    value: "contact us",
    linkTo: "/contact-us",
    icon: null,
  },
  {
    value: "wishlist",
    linkTo: "/wishlist",
    icon: AiOutlineHeart,
  },
  {
    value: "compare",
    linkTo: "/compare",
    icon: IoIosGitCompare,
  },
  {
    value: "login / register",
    linkTo: "/login",
    icon: RxPerson,
  },
];
