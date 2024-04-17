"use client";

import { useState } from "react";
import Link from "../icons/link";
import { useTabsItemContext } from "./tabs-item";
import { usePathname } from "next/navigation";

function TabsTitle({ children }) {
  const [onMouseEnter, setOnMouseEnter] = useState({ id: "", status: false });
  const pathname = usePathname();
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
        pathname === id ? "text-primary-index bg-neutral-light-purple" : ""
      } `}
    >
      <span>
        <Link
          color={
            pathname === id || (onMouseEnter.id === id && onMouseEnter.status)
              ? "#633CFF"
              : "#737373"
          }
          size={18}
        />
      </span>
      <span>{children}</span>
    </div>
  );
}

export default TabsTitle;
