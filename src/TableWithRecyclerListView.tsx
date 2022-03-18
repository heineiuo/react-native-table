import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Text, View } from "react-native";
// import {
//   RecyclerListView,
//   DataProvider,
//   LayoutProvider,
// } from "recyclerlistview";
// import StickyContainer from "recyclerlistview/sticky";
import { useTable } from "./TableContext";

let RecyclerListView, DataProvider, LayoutProvider, StickyContainer;

const AnimatedRecyclerListView =
  Animated.createAnimatedComponent(RecyclerListView);

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
  HEADER: 3,
};

export function TableWithRecyclerListView({
  onLayout,
  borderColor,
  rowHeight,
  data,
  renderItem,
  style,
  TableHead,
  userSelect,
}: {
  borderColor: any;
  userSelect: any;
  style: any;
  onLayout: any;
  keyExtractor: any;
  rowHeight: any;
  data: any;
  TableHead: any;
  renderItem: any;
}) {
  const recycleRef = useRef(null);
  const { totalWidthValue } = useTable();
  const [width, setWidth] = useState(1000);
  const layoutProvider = useMemo(() => {
    return new LayoutProvider(
      (index) => {
        if (index === 0) {
          return ViewTypes.HEADER;
        }
        return ViewTypes.FULL;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = rowHeight;
      }
    );
  }, [width, rowHeight]);

  const dataProvider = useMemo(() => {
    return new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
  }, []);

  const rowRenderer = useCallback(
    (
      type: string | number,
      data: any,
      index: number,
      extendedState?: object
    ) => {
      return renderItem({
        item: data,
        index,
        separators: {
          highlight: () => {},
          unhighlight: () => {},
          updateProps: () => {},
        },
      });
    },
    []
  );

  useEffect(() => {
    const id = totalWidthValue.addListener((e) => {
      console.log(e);
      setWidth(e.value);
    });
    return () => {
      totalWidthValue.removeListener(id);
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setWidth(2000);
  //   }, 1000);
  // }, []);

  const overrideRowRenderer = useCallback((type, data, index) => {
    if (index === 0) {
      return (
        <View style={{ zIndex: -100 }}>
          <TableHead></TableHead>
        </View>
      );
    }
  }, []);

  return (
    <StickyContainer
      stickyHeaderIndices={[0]}
      overrideRowRenderer={overrideRowRenderer}
      style={{
        ...style,
        userSelect,
        overflow: "auto",
        borderRadius: 2,
        borderColor,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      <AnimatedRecyclerListView
        style={{
          width: totalWidthValue,
        }}
        canChangeSize
        useWindowScroll
        rowRenderer={rowRenderer}
        dataProvider={dataProvider.cloneWithRows([
          { id: "id", fields: [] },
          {
            id: "id__1",
            fields: [
              {
                fieldId: "f1",
                value: "second row",
              },
            ],
          },
          ...data,
        ])}
        layoutProvider={layoutProvider}
        // showsVerticalScrollIndicator={false}
        scrollViewProps={{
          onLayout: (e) => {
            // setWidth(e.nativeEvent.layout.width);
            // onLayout(e);
          },
        }}
      />
    </StickyContainer>
  );
}
