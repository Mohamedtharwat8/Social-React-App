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
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const { token, setToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleUserSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Sign out successfully, Redirecting to Login Page");
    navigate("/login");
  };
  return (
    <Navbar
      fluid
      className="  text-white border-gray-200 shadow-lg  bg-gray-900"
    >
      {console.log(userData)}
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
              img={
                userData
                  ? userData.photo
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">
              {userData ? userData.name : "Welcome Guest"}
            </span>
            <span className="block truncate text-sm font-medium">
              {userData ? userData.email : "name@test.com"}
            </span>
          </DropdownHeader>
          {token ? (
            <DropdownItem onClick={handleUserSignOut}>Sign out</DropdownItem>
          ) : (
            <>
              <DropdownItem as={NavLink} to={"/register"}>
                Register
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as={NavLink} to={"/login"}>
                Login
              </DropdownItem>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      {token && (
        <NavbarCollapse>
          <NavbarLink as={NavLink} to={"/"}>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to={"/profile"}>
            Profile
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}
