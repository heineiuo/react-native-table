import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  createElement,
  RefObject,
} from "react";
import { Animated, Text, View } from "react-native";
import { useTable, TableContext } from "./TableContext";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { TableResizeMode } from "./TableTypes";
import { resetColumnPosition } from "./TableUtils";
import { TableWithFlatList } from "./TableWithFlatList";
import { TableWithRecyclerListView } from "./TableWithRecyclerListView";

type FieldsChangeFunc = (fields: {}[]) => void;

type TableProps = {
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

  /**
   * custom column header component
   */
  ColumnHeaderComponent?:
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

type TableInstance = {
  addColumn: any;
  delColumn: any;
};

const Table = forwardRef<TableInstance, TableProps>(function Table(
  {
    useRecyclerListView = false,
    initialColumns,
    fields,
    resizeMode = "increase-total-width",
    style,
    data,
    keyExtractor = (item) => item.id,
    resizeable = true,
    onValueChange,
    cellWidth = 150,
    resizerWidth = 24,
    borderColor = "#d8dee4",
    highlightBorderColor = "blue",
    indexCellWidth = 40,
    tailCellWidth = 100,
    rowHeight = 36,
    cellMinWidth = 40,
    rowHoverdBackgroundColor = "#f6f8fa",
    ColumnHeaderComponent,
    renderCell,
  },
  ref
) {
  const tailCellLeftValue = useRef(new Animated.Value(0)).current;
  const [tableWidth, setTableWidth] = useState(0);

  const [internalFields, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "reindex") {
        const { fromIndex, toIndex } = action.payload;
        const nextState = state.slice();
        const target = nextState[fromIndex];
        nextState.splice(fromIndex, 1);
        nextState.splice(toIndex, 0, target);
        return resetColumnPosition({
          fields: nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth,
          tailCellWidth,
        });
      }

      return state;
    },
    fields,
    (fields) => {
      return resetColumnPosition({
        fields,
        indexCellWidth,
        cellWidth,
        resizerWidth,
        tailCellWidth,
      });
    }
  );

  const panController = useRef({}).current;
  const [userSelect] = useState("none");
  const focusedCell = useRef<any>();

  const focusCell = useCallback(({ cellRef }: { cellRef: RefObject<any> }) => {
    if (focusedCell.current) {
      focusedCell.current.blur();
    }
    focusedCell.current = cellRef.current;
  }, []);

  const reIndex = useCallback(
    (payload: { fromIndex: number; toIndex: number }) => {
      dispatch({ type: "reindex", payload });
    },
    []
  );

  const internalRenderCell = useCallback(
    (option) => {
      if (renderCell) {
        return renderCell(option);
      }
      return (
        <View
          style={{
            padding: 4,
          }}
        >
          <Text style={{}}>{option.item.value}</Text>
        </View>
      );
    },
    [renderCell]
  );

  const onLayout = useCallback((e) => {
    const tableWidth = e.nativeEvent.layout.width;
    setTableWidth(tableWidth);
    dispatch({ type: "update-width", payload: { tableWidth } });
  }, []);

  const value = useMemo(() => {
    let totalWidthValue = new Animated.Value(indexCellWidth + tailCellWidth);
    for (const field of internalFields) {
      totalWidthValue = Animated.add(
        totalWidthValue,
        field.widthValue
      ) as Animated.Value;
    }

    return {
      tailCellWidth,
      panController,
      resizerWidth,
      resizeable,
      fields: internalFields,
      data,
      keyExtractor,
      cellWidth,
      borderColor,
      highlightBorderColor,
      rowHoverdBackgroundColor,
      rowHeight,
      focusCell,
      indexCellWidth,
      reIndex,
      totalWidthValue,
      cellMinWidth,
      renderCell: internalRenderCell,
      ColumnHeaderComponent,
      tailCellLeftValue,
      resizeMode,
      tableWidth,
    };
  }, [
    tailCellWidth,
    reIndex,
    panController,
    rowHeight,
    cellWidth,
    borderColor,
    resizerWidth,
    internalFields,
    resizeable,
    data,
    keyExtractor,
    highlightBorderColor,
    rowHoverdBackgroundColor,
    focusCell,
    indexCellWidth,

    tailCellLeftValue,
    cellMinWidth,
    internalRenderCell,
    ColumnHeaderComponent,
    tableWidth,
    resizeMode,
  ]);

  useImperativeHandle(
    ref,
    () => {
      function addColumn(payload) {
        dispatch({ type: "add-field", payload });
      }
      function delColumn(payload) {
        dispatch({ type: "del-field", payload });
      }

      return {
        addColumn,
        delColumn,
      };
    },
    []
  );

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <TableContext.Provider value={value}>
      {createElement(
        useRecyclerListView ? TableWithRecyclerListView : TableWithFlatList,
        {
          borderColor,
          userSelect,
          onLayout,
          style,
          data,
          rowHeight,
          TableHead,
          keyExtractor,
          renderItem: (data: any) => {
            return <TableRow {...data}></TableRow>;
          },
        }
      )}
    </TableContext.Provider>
  );
});

export { useTable, Table };
export type { TableInstance, TableProps };
