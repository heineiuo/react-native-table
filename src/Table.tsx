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
import { TableInstance, TableProps, TableResizeMode } from "./TableTypes";
import { resetColumnPosition } from "./TableUtils";
import { TableWithFlatList } from "./TableWithFlatList";
// import { TableWithRecyclerListView } from "./TableWithRecyclerListView";

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
    IndexCellComponent,
    TailCellComponent,
    HeadColumnHeaderComponent,
    TailColumnHeaderComponent,
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
      } else if (action.type === "add-field") {
        const nextState = state.slice();
        const { fieldId } = action.payload;
        const sameField = nextState.find((item) => item.fieldId === fieldId);
        if (sameField) {
          return nextState;
        }
        nextState.push(action.payload);
        return resetColumnPosition({
          fields: nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth,
          tailCellWidth,
        });
      } else if (action.type === "del-field") {
        const nextState = state.slice();
        const { fieldId } = action.payload;
        const sameFieldIndex = nextState.findIndex(
          (item) => item.fieldId === fieldId
        );
        if (sameFieldIndex === -1) {
          return nextState;
        }
        nextState.split(sameFieldIndex, 1);
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
    focusedCell.current.focus();
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
      TailColumnHeaderComponent,
      HeadColumnHeaderComponent,
      TailCellComponent,
      IndexCellComponent,
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
    TailColumnHeaderComponent,
    TailCellComponent,
    tailCellLeftValue,
    cellMinWidth,
    internalRenderCell,
    IndexCellComponent,
    ColumnHeaderComponent,
    HeadColumnHeaderComponent,
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
      function getFocusedCell(payload) {}
      function focuseCell(payload) {}

      return {
        getFocusedCell,
        focuseCell,
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
        // useRecyclerListView ? TableWithRecyclerListView : TableWithFlatList,
        TableWithFlatList,
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

Table.displayName = "Table";

export { Table };
