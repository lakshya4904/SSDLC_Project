import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, DropdownSection } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { IUser } from '@/lib/models/user';
import { useUser } from "@/app/context/UserContext";


type MenuItemColor = "default" | "danger" | "primary" | "secondary" | "success" | "warning";

  const AvatarItems: { label: string; href: string; display: string; color: MenuItemColor }[] = [
    { label: "Account", href: "/Account", display: "block", color: "default" },
    { label: "Bookmarks", href: "/Bookmarks", display: "block", color: "default" },
    { label: "Settings", href: "/Settings", display: "block", color: "default" },
    { label: "Dashboard", href: "/Dashboard", display: "hidden", color: "default" },
    // { label: "Log Out", href: "/", display: "block", color: "danger" },
  ];

function MyDropdown({ handleCheckUser, handleLogout, currentPath }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarItems, setAvatarItems] = useState([]); // State for AvatarItems
  const { user, logout, checkUser } = useUser();

  useEffect(() => {
    // Fetch user data if necessary (assuming user data is not pre-fetched)
    if (!user) {
      // Fetch user data and update state
    }
  }, []);

  useEffect(() => {
    // Fetch AvatarItems if not already loaded (lazy loading)
    if (!avatarItems.length) {
      // Fetch AvatarItems and update state
      setAvatarItems(AvatarItems); // Assuming AvatarItems is pre-fetched
    }
  }, [avatarItems.length, AvatarItems]); // Only fetch on change

  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
    // Fetch AvatarItems if not already loaded (alternative approach)
    if (!avatarItems.length) {
      // Fetch AvatarItems and update state
    }
  };

  return (
    <Dropdown placement="bottom-end" className={isSelected ? "hidden" : ""}>
      <DropdownTrigger onClick={handleOpenDropdown}>
        <Avatar
          isBordered={user?.isBordered} // Assuming isBordered is defined within user
          showFallback={user?.showFallback} // Assuming showFallback is defined within user
          as="button"
          className={`transition-transform ${isSelected ? "hidden" : ""}`}
          color={user?.color}
          name={user?.username}
          size="sm"
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
  );
}