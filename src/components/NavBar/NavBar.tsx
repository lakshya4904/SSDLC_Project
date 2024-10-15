'use client';
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, Dropdown, Input, SwitchProps, useSwitch, VisuallyHidden, DropdownSection } from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/context/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";

export default function NavBar(props: SwitchProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user } = useUser();

  const currentPath = usePathname();
  // console.log(currentPath);


  const links = [
    { label: "User", href: "/user", display: "block" },
    { label: "Settings", href: "/settings", display: "block" },
    { label: "Dashboard", href: "/dashboard", display: `${(user?.type == "admin") ? "block": " hidden"}` },
  ];

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props);

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
      <SearchBar/>
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
        <ProfileDropdown/>
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
