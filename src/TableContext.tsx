import { createContext, useContext } from "react";
import { Animated } from "react-native";

type TableContextState = {
  panController: any;
  resizerWidth: number;
  resizeable: boolean;
  totalWidthValue: Animated.Value;
  fields: any[];
  data: any[];
  keyExtractor: any;
  cellWidth: number;
  borderColor: any;
  highlightBorderColor: any;
  rowHoverdBackgroundColor: any;
  rowHeight: number;
  focusCell: (options: any) => void;
  focusedField: string | null;
  focusedRow: string | null;
  indexCellWidth: number;
  reIndex: (options: { fromIndex: number; toIndex: number }) => void;
  /**
   * 最小单元格宽度
   */
  cellMinWidth: number;
};

export const TableContext = createContext({} as TableContextState);

export function useTable() {
  return useContext(TableContext);
}
