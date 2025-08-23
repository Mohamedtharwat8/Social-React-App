import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar fluid>
      <NavbarBrand as={Link} to={"/"}>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Social App
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem as={NavLink} to={"/register"}>
            Register
          </DropdownItem>
          <DropdownItem as={NavLink} to={"/login"}>
            Login
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={NavLink} to={"/"}>
          Home
        </NavbarLink>
        <NavbarLink as={NavLink} to={"/profile"}>
          Profile
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
