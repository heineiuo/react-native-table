import { createContext, useContext } from 'react';

export const TableContext = createContext({});

export function useTable() {
  return useContext(TableContext);
}
