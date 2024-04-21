"use client";

// next.js
import { usePathname } from "next/navigation";

// react
import { useState } from "react";

// context
import { useTabsItemContext } from "./tabs-item";

//icons
import Link from "../icons/link";
import ProfileIcon from "../icons/profile";

function TabsTitle({ children }) {
  const pathname = usePathname();
  const activePath = pathname.split("/").pop();

  const [onMouseEnter, setOnMouseEnter] = useState({ id: "", status: false });

  const id = useTabsItemContext();

  const handleMouseEnter = (fieldId) => {
    setOnMouseEnter({ id: fieldId, status: true });
  };

  const handleMouseLeave = (fieldId) => {
    setOnMouseEnter({ id: fieldId, status: false });
  };

  return (
    <div
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
      className={`flex items-center justify-center gap-2 py-3 px-6 font-semibold rounded-lg text-neutral-grey hover:text-primary-index  ${
        activePath === id ? "text-primary-index bg-neutral-light-purple" : ""
      } `}
    >
      <span>
        {id !== "profile" ? (
          <Link
            color={
              activePath === id ||
              (onMouseEnter.id === id && onMouseEnter.status)
                ? "#633CFF"
                : "#737373"
            }
            size={20}
          />
        ) : (
          <ProfileIcon
            color={
              activePath === id ||
              (onMouseEnter.id === id && onMouseEnter.status)
                ? "#633CFF"
                : "#737373"
            }
            size={20}
          />
        )}
      </span>
      {children?.length > 0 || children && <span>{children}</span>}
    </div>
  );
}

export default TabsTitle;
