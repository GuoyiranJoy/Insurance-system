import { AiFillCar } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import { IoMdDocument } from "react-icons/io";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { SiHandshake } from "react-icons/si";

export const navItems = [
  {
    id: 1,
    name: "代理险种费用率管理",
    route: "manage-agency-insurance-rate",
    icon: <SiHandshake />,
  },
  {
    id: 2,
    name: "代理险种费用率导入",
    route: "query-or-import-agency-insurance-rate",
    icon: <HiSearch />,
  },
  {
    id: 3,
    name: "核保规则管理",
    route: "manage-underwriting-rules",
    icon: <IoMdDocument />,
  },
  {
    id: 4,
    name: "车险费率管理",
    route: "manage-car-insurance-rate",
    icon: <AiFillCar />,
  },
  {
    id: 5,
    name: "结算费率管理",
    route: "manage-settlement-rate",
    icon: <RiMoneyCnyCircleFill />,
  },
];
