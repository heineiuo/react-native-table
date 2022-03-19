import { createContext, useContext } from "react";
import { TableContextState } from "./TableTypes";

export const TableContext = createContext({} as TableContextState);

export function useTable() {
  return useContext(TableContext);
}
