'use client';
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, Dropdown, Input, SwitchProps, useSwitch, VisuallyHidden, DropdownSection } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function NavBar(props: SwitchProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const currentPath = usePathname();
  console.log(currentPath);


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
    { label: "Log Out", href: "/", display: "block", color: "danger" },
  ];

  return (

    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" className="">
      <NavbarContent as={"div"} className={`${styles.menuToggleWrapper} ${isSelected ? " hidden" : ""}`}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`${styles.menuToggleButton} ${isSelected ? "hidden" : ""}`}
        />
        <NavbarItem>
          <Link className={`${styles.menuBrand} ${isSelected ? "hidden" : ""}`} href="/">Novella</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as={"div"} className={`${styles.menu} ${isSelected ? "hidden" : ""}`} justify="start">
        {links.map((link) => (
          <NavbarItem key={link.href} className={`${link.display} ${isSelected ? "hidden" : ""}`}>
            <Link
              className={`${link.display} ${link.href === currentPath ? 'text-primary' : 'text-default'} ${styles.item} ${isSelected ? "hidden" : ""}`}
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

      <NavbarContent as="div" >
        <Input
          className={`${styles.menuSearchBar} `}
          placeholder="Type to search..."
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent >

      <NavbarContent as="div" className="items-center" justify="end">

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
              isBordered //#494:user.username? false : true
              showFallback //#494:user.username? false : true
              as="button"
              className={`transition-transform ${isSelected ? "hidden" : ""}`}
              color="primary" //#494:user.username? "primary" : "default"
              //name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem >
                <ThemeSwitcher/>
              </DropdownItem>
            <DropdownSection>

              {AvatarItems.map((item) => (
                <DropdownItem key={item.href} href={item.href} className={`${item.display} ${item.href === currentPath ? 'text-primary' : ''}`} color={item.color}>
                  {/* <Link
                            color={"foreground"}
                            className="w-full"
                            href={item.href}
                            size="lg"
                        >
                        </Link> */}
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownSection>

            {/* <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="lg:flex hidden">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden">
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className={styles.menuToggleButton}>
        {links.map((link) => (
          <NavbarMenuItem key={link.href} className={`${link.display} `}>
            <Link
              className={`${link.display} ${link.href === currentPath ? 'text-primary' : 'text-default'} ${styles.item}`}
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
