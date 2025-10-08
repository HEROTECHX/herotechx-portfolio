import type { CardContextType } from "../types/index";
import { createContext } from "react";

export const CardContext = createContext<CardContextType>({
  onCardClose: () => {},
  currentIndex: null,
});
