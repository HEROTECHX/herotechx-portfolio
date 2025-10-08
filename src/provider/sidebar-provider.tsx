import { SidebarContext } from "@/context/sidebar-context";
import { useState } from "react";

export const SidebarProvider: React.FC<{
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}> = ({ children, open, setOpen, animate = true }) => {
  const [openState, setOpenState] = useState(false);
  const finalOpen = open !== undefined ? open : openState;
  const finalSetOpen = setOpen !== undefined ? setOpen : setOpenState;

  return (
    <SidebarContext.Provider value={{ open: finalOpen, setOpen: finalSetOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};