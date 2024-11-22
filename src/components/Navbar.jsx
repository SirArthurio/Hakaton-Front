import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../assets/SearchIcon.jsx";
import { Link } from "react-router-dom";
import { AcmeLogo } from "../assets/AcmeLogo";
import { MdOutlineCircleNotifications } from "react-icons/md";



const menuItems = [
  {
    titulo: "Proyectos",
    ref: "/Proyectos",
  },
  {
    titulo: "Docentes",
    ref: "/Docentes",
  },
  {
    titulo: "Colaboradores",
    ref: "/Colaboradores",
  },
];

export default function Barra() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const isLogin = user == null;

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = async () => {
    setUser(null);
    
    console.log("Usuario deslogueado");
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      const closeMenu = () => setIsMenuOpen(false);
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [isMenuOpen]);
  const Notificaciones = () => {
    return (
      <NavbarItem>
        <Link to="/Notificaciones">
          <MdOutlineCircleNotifications />
        </Link>
      </NavbarItem>
    );
  };

  const NavbarContentEnd = () => {
    if (!isLogin) {
      return (
        <NavbarContent justify="end">
          <Notificaciones />
          <NavbarItem className="hidden lg:flex">
            <Link to="/Login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/Register" variant="flat">
              Registrarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      );
    } else {
      return (
        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Notificaciones />

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="perfil">
                <Link to="/Perfil">Perfil</Link>
              </DropdownItem>
              <DropdownItem key="admin">
                <Link to="/Admin">Administrar</Link>
              </DropdownItem>
              <DropdownItem key="Mis compras">
                <Link to="/Proyectos/usuario">Mis Proyectos</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      );
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="border-b"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <Link to="/">
            <p className="font-bold text-inherit">Hakaton</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" to={item.ref}>
              {item.titulo}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContentEnd />

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.titulo}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to={item.ref}
              size="lg"
              onClick={handleMenuItemClick}
            >
              {item.titulo}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}