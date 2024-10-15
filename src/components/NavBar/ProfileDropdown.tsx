
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { useUser } from '@/app/context/UserContext'; // Custom hook to get user info
import { ThemeSwitcher } from '../ThemeSwitcher';

import { usePathname, useRouter } from "next/navigation";

type MenuItemColor = "default" | "danger" | "primary" | "secondary" | "success" | "warning";

interface IAvatarItems {
  label: string;
  href: string;
  display: string;
  color: MenuItemColor
}

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, checkUser } = useUser();
  const router = useRouter();

  const avatarItems :IAvatarItems[] = [
    { label: "Profile Settings", href: "/profile-settings", display: "block", color: "default" },
    // { label: "Account Information", href: "/account-information", display: "block", color: "default" },
    { label: "Bookmarks", href: "/Bookmarks", display: "block", color: "default" },
    { label: "Dashboard", href: "/Dashboard", display: `${(user?.type === "admin") ? "block": " hidden"}`, color: "default" },
  ];

  const currentPath = usePathname();

  const handleDropdownOpenChange = async (isOpen: boolean) => {
    if (isOpen) {
      const isAuthenticated = await checkUser();
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }
    }
    setIsDropdownOpen(isOpen);
  };

  console.log("user type: " + user?.type);
  

  return (
    <div className="relative">
    <Dropdown isOpen={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
      <DropdownTrigger>
        <Avatar
              isBordered = {user? true : false}
              showFallback  = {user? true : false}
              as="button"
              className={`transition-transform cursor-pointer `}
              color = {user? "primary" : "default"}
              name={user?.username}
              size="sm"
              src={user?.profileImageURL}
            />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem>
            <ThemeSwitcher />
          </DropdownItem>
          <DropdownSection>
            {avatarItems.map((item) => (
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
          <DropdownItem key="logout" color="danger" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      {/* <DropdownMenu>
        {avatarItems.map(item => (
          <DropdownItem key={item.label} color={item.color}>
            <a href={item.href} className={`block ${item.display}`}>
              {item.label}
            </a>
          </DropdownItem>
        ))}
      </DropdownMenu> */}
    </Dropdown>
    </div>
  );
}