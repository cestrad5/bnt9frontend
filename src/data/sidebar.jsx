import { FaTh, FaRegChartBar } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { BiImageAdd } from "react-icons/bi";
import { MdAddShoppingCart } from 'react-icons/md'
import { SiGamemaker } from 'react-icons/si';
import { GrDocumentPdf } from 'react-icons/gr';

/**
 * Main dashboard menu for Admin role.
 */
const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  { 
    title: "Crear Producto",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Cuenta",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Perfil",
        path: "/profile",
      },
      {
        title: "Editar Perfil",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Soporte",
    icon: <FaUserGear />,
    path: "/contact-us",
  },
  {
    title: "Pedidos",
    icon: <GrDocumentPdf />,
    path: "/orderPdfList",
  },
];

/**
 * Dashboard menu for Sales role.
 */
const menub = [
  { 
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Ver Pedido",
    icon: <MdAddShoppingCart/>,
    path: "/order",
  },
  {
    title: "Soporte",
    icon: <FaUserGear />,
    path: "/contact-us",
  },
  {
    title: "Pedidos",
    icon: <GrDocumentPdf />,
    path: "/orderPdfList",
  },
];

/**
 * Dashboard menu for Production role.
 */
const menuProduction = [
  {
    title: "Producción",
    icon: <SiGamemaker />,
    path: "/productions",
  },
  {
    title: "Soporte",
    icon: <FaUserGear />,
    path: "/contact-us",
  },
];

export { menu, menub, menuProduction };
