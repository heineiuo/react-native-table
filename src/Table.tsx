import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  createElement,
  RefObject,
} from "react";
import { Animated, Text, View } from "react-native";

import { TableContext } from "./TableContext";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { TableInstance, TableProps } from "./TableTypes";
import { resetColumnPosition } from "./TableUtils";
import { TableWithFlatList } from "./TableWithFlatList";
import { useKeyDown } from "./useKeyDown";
// import { TableWithRecyclerListView } from "./TableWithRecyclerListView";

const Table = forwardRef<TableInstance, TableProps>(function Table(
  {
    preventScrollWhenArrowMove = true,
    cellsExtractor = (row: any) => row.cells,
    columnKeyExtractor = (column: any) => column.columnId,
    keyExtractor = (item) => item.id,
    useRecyclerListView = false,
    initialColumns,
    resizeMode = "increase-total-width",
    style,
    data,
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
    IndexCellComponent,
    TailCellComponent,
    HeadColumnHeaderComponent,
    TailColumnHeaderComponent,
    FooterIndexCellComponent,
    FooterCellComponent,
    renderCell,
    onEndReached,
    onEndReachedThreshold,
    onLayout,
  },
  ref
) {
  const tailCellLeftValue = useRef(new Animated.Value(0)).current;
  const [tableWidth, setTableWidth] = useState(0);
  const cellsMap = useRef<Map<string, any>>(new Map());

  const [columns, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "reindex") {
        const { fromIndex, toIndex } = action.payload;
        const nextState = state.slice();
        const target = nextState[fromIndex];
        nextState.splice(fromIndex, 1);
        nextState.splice(toIndex, 0, target);
        return resetColumnPosition({
          columns: nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth,
          tailCellWidth,
        });
      } else if (action.type === "add-field") {
        const nextState = state.slice();
        const fieldId = columnKeyExtractor(action.payload);
        const sameField = nextState.find(
          (item) => columnKeyExtractor(item) === fieldId
        );
        if (sameField) {
          return nextState;
        }
        nextState.push(action.payload);
        return resetColumnPosition({
          columns: nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth,
          tailCellWidth,
        });
      } else if (action.type === "del-field") {
        const nextState = state.slice();
        const fieldId = columnKeyExtractor(action.payload);
        const sameFieldIndex = nextState.findIndex(
          (item) => columnKeyExtractor(item) === fieldId
        );
        if (sameFieldIndex === -1) {
          return nextState;
        }
        nextState.split(sameFieldIndex, 1);
        return resetColumnPosition({
          columns: nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth,
          tailCellWidth,
        });
      }

      return state;
    },
    initialColumns,
    (initArgs) => {
      return resetColumnPosition({
        columns: initArgs,
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

  const handleLayout = useCallback(
    (e) => {
      const tableWidth = e.nativeEvent.layout.width;
      setTableWidth(tableWidth);
      dispatch({ type: "update-width", payload: { tableWidth } });
      if (onLayout) {
        onLayout(e);
      }
    },
    [onLayout]
  );

  const totalWidthValue = useMemo(() => {
    let totalWidthValue = new Animated.Value(indexCellWidth + tailCellWidth);
    for (const field of columns) {
      totalWidthValue = Animated.add(
        totalWidthValue,
        field.widthValue
      ) as Animated.Value;
    }

    return totalWidthValue;
  }, [columns, indexCellWidth, tailCellWidth]);

  const value = useMemo(() => {
    return {
      preventScrollWhenArrowMove,
      keyExtractor,
      cellsExtractor,
      columnKeyExtractor,
      tailCellWidth,
      panController,
      resizerWidth,
      resizeable,
      columns,
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
    };
  }, [
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
    columns,
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
      function addColumn(payload) {
        dispatch({ type: "add-field", payload });
      }
      function delColumn(payload) {
        dispatch({ type: "del-field", payload });
      }
      function getFocusedCell() {
        return focusedCell;
      }
      function getColumns() {
        return columns;
      }

      return {
        getFocusedCell,
        focusCell,
        addColumn,
        delColumn,
        getColumns,
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
