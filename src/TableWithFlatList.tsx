import React, { useCallback } from "react";
import { Animated } from "react-native";

import { TableFooter } from "./TableFooter";
import { SupportedFlatListProps } from "./TableTypes";

export function TableWithFlatList({
  onLayout,
  userSelect,
  borderColor,
  style,
  rowHeight,
  TableHead,
  keyExtractor,
  data,
  renderItem,
  ListEmptyComponent,
  ...extraFlatListProps
}: SupportedFlatListProps & {
  userSelect: any;
  borderColor: any;
  style: any;
  rowHeight: any;
  TableHead: any;
  keyExtractor: any;
  renderItem: any;
}) {
  const getItemLayout = useCallback(
    (_, index) => {
      return { length: rowHeight, offset: rowHeight * index, index };
    },
    [rowHeight]
  );

  return (
    <Animated.FlatList
      onLayout={onLayout}
      initialNumToRender={10}
      style={[
        {
          userSelect,
          overflow: "auto",
          borderRadius: 2,
          borderColor,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderBottomWidth: 1,
        },
        style,
      ]}
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={1}
      disableVirtualization={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={TableHead}
      ListFooterComponent={TableFooter}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      {...extraFlatListProps}
    />
  );
}
