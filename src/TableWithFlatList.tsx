import React from "react";
import { Animated, Text, View } from "react-native";
import { TableFooter } from "./TableFooter";

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
}: {
  onLayout: any;
  userSelect: any;
  borderColor: any;
  style: any;
  rowHeight: any;
  TableHead: any;
  keyExtractor: any;
  data: any;
  renderItem: any;
  ListEmptyComponent?: any;
}) {
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
      getItemLayout={(data, index) => {
        return { length: rowHeight, offset: rowHeight * index, index };
      }}
      maxToRenderPerBatch={1}
      disableVirtualization={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={TableHead}
      ListFooterComponent={TableFooter}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
    ></Animated.FlatList>
  );
}
