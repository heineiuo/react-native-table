import { ReactNode } from "react";
import { Animated, FlatListProps } from "react-native";

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

export type SupportedFlatListProps = Omit<
  FlatListProps<any>,
  | "ItemSeparatorComponent"
  | "ListFooterComponent"
  | "ListFooterComponentStyle"
  | "ListHeaderComponent"
  | "ListHeaderComponentStyle"
  | "columnWrapperStyle"
  | "horizontal"
  | "numColumns"
  | "renderItem"
>;

export type TableContextState = {
  panController: any;
  resizerWidth: number;
  resizeable: boolean;
  totalWidthValue: Animated.Value;
  tailCellLeftValue: Animated.Value;
  fields: any[];
  keyExtractor: any;
  cellWidth: number;
  borderColor: any;
  highlightBorderColor: any;
  rowHoverdBackgroundColor: any;
  rowHeight: number;
  focusCell: (options: any) => void;
  indexCellWidth: number;
  reIndex: (options: { fromIndex: number; toIndex: number }) => void;
  /**
   * 自定义列头
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

  HeadColumnHeaderComponent?:
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

  FooterCellComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  FooterIndexCellComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  /**
   * 最小单元格宽度
   */
  cellMinWidth: number;
  resizeMode: TableResizeMode;
  renderCell: (options: any) => ReactNode;
  /**
   * 表格容器宽度
   */
  tableWidth: number;
  tailCellWidth: number;
};

export type TableProps = SupportedFlatListProps & {
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

  HeadColumnHeaderComponent?:
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

  FooterCellComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  FooterIndexCellComponent?:
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
