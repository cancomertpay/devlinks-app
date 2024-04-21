"use client";

import Link from "next/link";
import { createContext, useContext } from "react";

const TabsItemContext = createContext();

export function useTabsItemContext() {
  const ctx = useContext(TabsItemContext);

  if (!ctx) {
    throw new Error("useTabsItem must be used within a TabsItem component");
  }

  return ctx;
}

function TabsItem({ id, children, href }) {
  return (
    <TabsItemContext.Provider value={id}>
      <li>
        <Link href={href}>{children}</Link>
      </li>
    </TabsItemContext.Provider>
  );
}

export default TabsItem;
