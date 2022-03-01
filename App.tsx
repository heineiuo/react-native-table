import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Table } from "./src/Table";

const sampleData = () =>
  Array.from({ length: 100 }, (v, k) => {
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

const sampleFields = () => [
  { fieldId: "f1", title: "Fileds1" },
  { fieldId: "f2", title: "Fileds2" },
  { fieldId: "f3", title: "Fileds3" },
  { fieldId: "f4", title: "Fileds4" },
];

export default function App() {
  const { height, width } = useWindowDimensions();
  const [fields, setFields] = useState(sampleFields);
  const [data, setData] = useState(sampleData);

  return (
    <SafeAreaView>
      <Table
        highlightBorderColor="blue"
        style={{ margin: 10, width: width - 20, height: height - 20 }}
        fields={fields}
        data={data}
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
        renderCell={({ item }) => {
          return (
            <View
              style={{
                padding: 4,
              }}
            >
              <Text style={{ color: "blue" }}>{item.value}</Text>
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
      ></Table>
    </SafeAreaView>
  );
}
