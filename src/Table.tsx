import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  createElement,
} from "react";
import { Animated, Text, View } from "react-native";

import { TableContext } from "./TableContext";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { TableContextState, TableInstance, TableProps } from "./TableTypes";
import { resetColumnPosition } from "./TableUtils";
import { TableWithFlatList } from "./TableWithFlatList";
import { useKeyDown } from "./useKeyDown";
// import { TableWithRecyclerListView } from "./TableWithRecyclerListView";

const Table = forwardRef<TableInstance, TableProps>(function Table(
  {
    debug = false,
    preventScrollWhenArrowMove = true,
    cellsExtractor = (row: any) => row.cells,
    columnKeyExtractor = (column: any) => column.columnId,
    keyExtractor = (item) => item.id,
    // ? should remove this value?
    useRecyclerListView = false,
    columns: initialColumns,
    resizeMode = "increase-total-width",
    style,
    data,
    resizeable = true,
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
    IndexCellComponent,
    TailCellComponent,
    HeadColumnHeaderComponent,
    TailColumnHeaderComponent,
    FooterIndexCellComponent,
    FooterCellComponent,
    renderCell,
    onChangeColumnSize,
    onChangeColumns,
    onValueChange,
    onEndReached,
    onEndReachedThreshold,
    onLayout,
  },
  ref
) {
  const tailCellLeftValue = useRef(new Animated.Value(0)).current;
  const [tableWidth, setTableWidth] = useState(0);
  const [columns, setColumns] = useState<typeof initialColumns>(initialColumns);
  const cellsMap = useRef<Map<string, any>>(new Map());

  /**
   * 内部记录columnd的widthValue
   */
  const columnsWidth = useRef<any>({});

  /**
   * 内部使用的column, 在props.columns的基础上
   * 添加leftValue, widthValue, rightValue
   */
  const internalColumns = useMemo(() => {
    const nextColumns = resetColumnPosition({
      columnsWidth: columnsWidth.current,
      columns,
      indexCellWidth,
      cellWidth,
      resizerWidth,
      tailCellWidth,
    });
    const nextColumnsWidth = {};
    for (const column of nextColumns) {
      nextColumnsWidth[columnKeyExtractor(column)] = column.widthValue;
    }
    columnsWidth.current = nextColumnsWidth;
    return nextColumns;
  }, [
    columns,
    indexCellWidth,
    columnKeyExtractor,
    cellWidth,
    resizerWidth,
    tailCellWidth,
  ]);

  const panController = useRef({}).current;
  const [userSelect] = useState("none");
  const focusedCell = useRef<any>();

  const focusCell = useCallback((options: any) => {
    if (focusedCell.current) {
      focusedCell.current.blur();
    }
    const { rowId, columnId } = options;
    const next = cellsMap.current.get(`${rowId}_${columnId}`);

    if (next) {
      focusedCell.current = next;
      focusedCell.current.focus();
    }
  }, []);

  const reIndex = useCallback(
    (payload: { fromIndex: number; toIndex: number }) => {
      const { fromIndex, toIndex } = payload;
      const nextState = columns.slice();
      const target = nextState[fromIndex];
      nextState.splice(fromIndex, 1);
      nextState.splice(toIndex, 0, target);
      return onChangeColumns(nextState);
    },
    [columns, onChangeColumns]
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

  const handleLayout = useCallback(
    (e) => {
      const tableWidth = e.nativeEvent.layout.width;
      setTableWidth(tableWidth);
      if (onLayout) {
        onLayout(e);
      }
    },
    [onLayout]
  );

  const totalWidthValue = useMemo(() => {
    let totalWidthValue = new Animated.Value(indexCellWidth + tailCellWidth);
    for (const field of internalColumns) {
      totalWidthValue = Animated.add(
        totalWidthValue,
        field.widthValue
      ) as Animated.Value;
    }

    return totalWidthValue;
  }, [internalColumns, indexCellWidth, tailCellWidth]);

  const internalChangeColumnSize = useCallback(
    (options) => {
      if (onChangeColumnSize) {
        onChangeColumnSize(options);
      }
    },
    [onChangeColumnSize]
  );

  const value = useMemo<TableContextState>(() => {
    return {
      debug,
      preventScrollWhenArrowMove,
      keyExtractor,
      cellsExtractor,
      columnKeyExtractor,
      tailCellWidth,
      panController,
      resizerWidth,
      resizeable,
      columns: internalColumns,
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
      TailColumnHeaderComponent,
      HeadColumnHeaderComponent,
      FooterIndexCellComponent,
      FooterCellComponent,
      TailCellComponent,
      IndexCellComponent,
      tailCellLeftValue,
      resizeMode,
      tableWidth,
      cellsMap,
      onChangeColumnSize: internalChangeColumnSize,
    };
  }, [
    debug,
    internalChangeColumnSize,
    preventScrollWhenArrowMove,
    cellsExtractor,
    columnKeyExtractor,
    tailCellWidth,
    reIndex,
    panController,
    rowHeight,
    cellWidth,
    borderColor,
    resizerWidth,
    internalColumns,
    resizeable,
    keyExtractor,
    highlightBorderColor,
    rowHoverdBackgroundColor,
    focusCell,
    indexCellWidth,
    TailColumnHeaderComponent,
    TailCellComponent,
    tailCellLeftValue,
    cellMinWidth,
    internalRenderCell,
    IndexCellComponent,
    ColumnHeaderComponent,
    HeadColumnHeaderComponent,
    FooterIndexCellComponent,
    FooterCellComponent,
    totalWidthValue,
    tableWidth,
    resizeMode,
  ]);

  useImperativeHandle(
    ref,
    () => {
      function getFocusedCell() {
        return focusedCell;
      }
      function getColumns() {
        return columns;
      }
      function addColumn(column) {
        setColumns((columns) => [...columns, column]);
      }

      return {
        getFocusedCell,
        focusCell,
        getColumns,
        addColumn,
      };
    },
    [focusCell, columns]
  );

  useKeyDown(
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    useCallback(
      (event: any) => {
        if (focusedCell.current) {
          const { rowId, columnId } = focusedCell.current;
          const rowIndex = data.findIndex(
            (item) => keyExtractor(item, 0) === rowId
          );
          const columnIndex = columns.findIndex(
            (item) => columnKeyExtractor(item, 0) === columnId
          );
          if (event.key === "ArrowUp") {
            if (rowIndex > 0) {
              const upRowId = keyExtractor(data[rowIndex - 1], 0);
              if (preventScrollWhenArrowMove) {
                event.preventDefault();
              }
              focusCell({ columnId, rowId: upRowId });
            }
          } else if (event.key === "ArrowDown") {
            if (rowIndex < data.length - 1) {
              const downRowId = keyExtractor(data[rowIndex + 1], 0);
              if (preventScrollWhenArrowMove) {
                event.preventDefault();
              }
              focusCell({ columnId, rowId: downRowId });
            }
          } else if (event.key === "ArrowLeft") {
            if (columnIndex > 0) {
              const leftColumnId = columnKeyExtractor(
                columns[columnIndex - 1],
                0
              );
              if (preventScrollWhenArrowMove) {
                event.preventDefault();
              }
              focusCell({ columnId: leftColumnId, rowId });
            }
          } else if (event.key === "ArrowRight") {
            if (columnIndex < columns.length - 1) {
              const rightColumnId = columnKeyExtractor(
                columns[columnIndex + 1],
                0
              );
              if (preventScrollWhenArrowMove) {
                event.preventDefault();
              }
              focusCell({ columnId: rightColumnId, rowId });
            }
          }
        }
      },
      [
        data,
        focusCell,
        preventScrollWhenArrowMove,
        columns,
        columnKeyExtractor,
        keyExtractor,
      ]
    )
  );

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <TableContext.Provider value={value}>
      {createElement(
        // useRecyclerListView ? TableWithRecyclerListView : TableWithFlatList,
        TableWithFlatList,
        {
          onEndReached,
          borderColor,
          userSelect,
          onLayout: handleLayout,
          style,
          data,
          rowHeight,
          TableHead,
          keyExtractor,
          onEndReachedThreshold,
          renderItem: (data: any) => {
            return <TableRow {...data} />;
          },
        }
      )}
    </TableContext.Provider>
  );
});

Table.displayName = "Table";

export { Table };
