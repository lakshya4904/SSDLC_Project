'use client';
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, Dropdown, Input, SwitchProps, useSwitch, VisuallyHidden, DropdownSection } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/context/UserContext";

export default function NavBar(props: SwitchProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user, logout, checkUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const router = useRouter();


  
  // Effect to reset the dropdown state when user logs out or changes
  useEffect(() => {
    if (!user) {
      setIsDropdownOpen(false); // Close dropdown if user logs out
      
    }
  }, [user]);

  const handleCheckUser = () => {
    if (checkUser()){
      //console.log(user);
      setIsDropdownOpen(true);
    } 
    else {
      // Redirect to login if the user is not logged in
      // This is a place to use next/navigation's redirect()
      setIsDropdownOpen(false);
      router.push("/login");
    }
  };

  const handleLogout = () => {
    logout(); // Perform logout logic
    setIsDropdownOpen(false); // Close dropdown when logging out
    //router.push('/login'); // Redirect to login page
  };

  const currentPath = usePathname();
  // console.log(currentPath);


  const links = [
    { label: "User", href: "/user", display: "block" },
    { label: "Settings", href: "/settings", display: "block" },
    { label: "Dashboard", href: "/dashboard", display: "block" },
  ];

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props);

  type MenuItemColor = "default" | "danger" | "primary" | "secondary" | "success" | "warning";

  const AvatarItems: { label: string; href: string; display: string; color: MenuItemColor }[] = [
    { label: "Account", href: "/Account", display: "block", color: "default" },
    { label: "Bookmarks", href: "/Bookmarks", display: "block", color: "default" },
    { label: "Settings", href: "/Settings", display: "block", color: "default" },
    { label: "Dashboard", href: "/Dashboard", display: "hidden", color: "default" },
    // { label: "Log Out", href: "/", display: "block", color: "danger" },
  ];

  

  return (

    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" className="!flex">
      <NavbarContent as={"div"} className={`${styles.menuToggleWrapper} !flex-auto ${isSelected ? " hidden" : ""}`}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`${styles.menuToggleButton} ${isSelected ? "hidden" : ""}`}
        />
        <NavbarItem>
          <Link className={`${styles.menuBrand} ${isSelected ? "hidden" : ""}`} href="/">Novella</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as={"div"} className={`${styles.menu} !flex-auto ${isSelected ? "hidden" : ""}`} justify="start">
        {links.map((link) => (
          <NavbarItem key={link.href} className={`${link.display} ${isSelected ? "hidden" : ""}`}>
            <Link
              className={`${link.display} ${link.href === currentPath ? 'text-primary' : 'text-default-900'} ${styles.item} ${isSelected ? "hidden" : ""}`}
              href={link.href}
              size="lg"
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
        {/* <NavbarItem isActive>
                    <Link color="foreground" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem> */}
      </NavbarContent>

      <NavbarContent as="div" className={`!flex-auto`} >
        <Input
          className={`${styles.menuSearchBar} `}
          placeholder="Type to search..."
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent >

      <NavbarContent as="div" className="items-center !flex-auto" justify="end">

        {/* Search switch for mobiles*/}
        {/* <Component {...getBaseProps()} >
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
            {...getWrapperProps()}
            className={slots.wrapper({
              class: [
                "w-8 h-8",
                "flex items-center justify-center ",
                "rounded-full bg-default-100 hover:bg-default-200 md:!hidden",
                isSelected ? "bg-default-100" : "bg-default-100",
              ],
            })}
          >
            {isSelected ? <FaXmark /> : <FaSearch />}

          </div>
        </Component> */}

        {/* Theme Switcher */}
        {/* <NavbarContent className="hidden sm:flex items-center">
          <ThemeSwitcher />
        </NavbarContent> */}
        {/* Avatar */}
        <Dropdown placement="bottom-end" className={isSelected ? "hidden" : ""} >
          <DropdownTrigger>
            <Avatar
              isBordered = {user? true : false}
              showFallback  = {user? true : false}
              as="button"
              className={`transition-transform ${isSelected ? "hidden" : ""}`}
              color = {user? "primary" : "default"}
              name={user?.username}
              size="sm"
              onClick={handleCheckUser}
              src={user?.profileImageURL}
            />
          </DropdownTrigger>
          {isDropdownOpen && (
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem>
            <ThemeSwitcher />
          </DropdownItem>
          <DropdownSection>
            {AvatarItems.map((item) => (
              <DropdownItem
                key={item.href}
                href={item.href}
                className={`${item.display} ${item.href === currentPath ? 'text-primary' : 'text-default-900'}`}
                color={item.color}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      )}
        </Dropdown>
        {/* <NavbarItem className="lg:flex hidden">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden">
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu className={styles.menuToggleButton}>
        {links.map((link) => (
          <NavbarMenuItem key={link.href} className={`${link.display} `}>
            <Link
              className={`${link.display} ${link.href === currentPath ? 'text-primary' : 'text-default-900'} ${styles.item}`}
              href={link.href}
              size="lg"
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>


    </Navbar>
  );
}
