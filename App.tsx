import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Table, TableInstance } from "./src/index";

const sampleData = () =>
  Array.from({ length: 1000 }, (v, k) => {
    return {
      id: `id${k}`,
      fields: [
        { fieldId: "f1", value: `${Math.random().toString().slice(2)}` },
        { fieldId: "f2", value: `${Math.random().toString().slice(2)}` },
        { fieldId: "f3", value: `${Math.random().toString().slice(2)}` },
        { fieldId: "f4", value: `${Math.random().toString().slice(2)}` },
      ],
    };
  });

const sampleFields = [
  { fieldId: "f1", title: "Fileds1", initialWidth: 400 },
  { fieldId: "f2", title: "Fileds2", initialWidth: 200 },
  { fieldId: "f3", title: "Fileds3", initialWidth: 200 },
  { fieldId: "f4", title: "Fileds4" },
];

export default function App() {
  const { height, width } = useWindowDimensions();
  const tableRef = useRef<TableInstance>();

  const val1 = useRef(new Animated.Value(100));
  const val2 = useRef(new Animated.Value(200));
  const val4 = useRef(new Animated.Value(200));

  // work
  // const val3 = useRef(Animated.add(val1.current, val2.current));

  // work
  const val3 = useMemo(() => {
    return Animated.add(Animated.add(val1.current, val2.current), val4.current);
  }, []);

  const addColumn = useCallback(() => {
    const currentLength = tableRef.current.getColumns().length;
    tableRef.current.addColumn({
      fieldId: `f${currentLength + 1}`,
      title: `Fileds${currentLength + 1}`,
    });
  }, []);

  const onEndReached = useCallback(() => {
    console.log("onEndReached");
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.margin = "0px";
    }

    setTimeout(() => {
      // work
      // val1.current.setValue(300);

      // work
      Animated.timing(val1.current, {
        toValue: width - 420,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View style={{ width: "100%" }}>
        <Animated.View
          style={{
            backgroundColor: "#af1",
            height: 10,
            width: val3,
          }}
        />
      </View>

      <Table
        onChangeColumnSize={console.log}
        columnKeyExtractor={(item) => item.fieldId}
        cellsExtractor={(row) => row.fields}
        cellWidth={400}
        ref={tableRef}
        // useRecyclerListView
        highlightBorderColor="blue"
        style={{
          margin: 10,
          width: width - 40,
          height: height - 40,
        }}
        columns={sampleFields}
        data={sampleData()}
        IndexCellComponent={({ index }) => {
          return (
            <View>
              <Text numberOfLines={1} style={{}}>
                &gt;{index + 1}
              </Text>
            </View>
          );
        }}
        TailCellComponent={() => {
          return (
            <View>
              <Text>[]</Text>
            </View>
          );
        }}
        HeadColumnHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity onPress={addColumn}>
                <Text>o</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        TailColumnHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity onPress={addColumn}>
                <Text>Add column</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ColumnHeaderComponent={({ column }) => {
          return (
            <View
              style={{
                padding: 4,
              }}
            >
              <Text style={{ color: "green" }}>{column.title}</Text>
            </View>
          );
        }}
        FooterIndexCellComponent={() => {
          return (
            <View>
              <Text>+</Text>
            </View>
          );
        }}
        FooterCellComponent={() => {
          return (
            <View>
              <Text>...</Text>
            </View>
          );
        }}
        renderCell={({ item }) => {
          return (
            <View
              style={{
                padding: 4,
              }}
            >
              <Text style={{ color: "blue" }}>{item ? item.value : ""}</Text>
              <TouchableOpacity
                onPress={(e) => {
                  e.preventDefault();
                }}
                style={{
                  position: "absolute",
                  right: 4,
                  top: 4,
                  borderRadius: 6,
                  borderColor: "#eee",
                  borderWidth: 1,
                  backgroundColor: "#fff",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Text>↓</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        onEndReached={onEndReached}
        onChangeColumns={(columns) => {
          console.log(columns);
        }}
      />
    </SafeAreaView>
  );
}
