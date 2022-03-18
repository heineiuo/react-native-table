import { ReactNode } from "react";
import { Animated } from "react-native";

/**
 * The total width change mode when resizing
 * default value: `increase-total-width`
 *
 * `keep-total-width`: total width won't change, next column
 * will decrease
 *
 * `increase-total-width`: next column won't change, total
 * width will increase
 */
export type TableResizeMode = "keep-total-width" | "increase-total-width";

export type InternalField = {
  fieldId: string;
  title: string;
  leftValue: Animated.Value;
  widthValue: Animated.Value;
};

export type TableProps = {
  /**
   * 行高
   */
  rowHeight?: number;
  /**
   * 单元格宽度
   */
  cellWidth?: number;
  /**
   * 最小单元格宽度
   */
  cellMinWidth?: number;
  /**
   * The widget width of column resizer
   */
  resizerWidth?: number;
  style?: any;
  keyExtractor?: any;
  resizeable?: boolean;
  onValueChange?: any;

  resizeMode?: TableResizeMode;

  /**
   * custom cell renderer
   */
  renderCell?: (options: any) => ReactNode;
  CellComponent?: React.ComponentType<any>;

  /**
   * custom column header component
   */
  ColumnHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  TailColumnHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  TailCellComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  IndexCellComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  /**
   * border color
   */
  borderColor?: string;
  /**
   * highlight cell's border color
   */
  highlightBorderColor?: string;
  /**
   * @deprecated Use initialColumns instead
   * columns
   */
  fields?: any[];

  initialColumns?: any[];
  data: any[];
  /**
   * 序号单元格宽度
   */
  indexCellWidth?: number;
  tailCellWidth?: number;
  /**
   * 悬浮行背景颜色
   */
  rowHoverdBackgroundColor?: string;
  useRecyclerListView?: boolean;
};

export type TableInstance = {
  addColumn: any;
  delColumn: any;
};
