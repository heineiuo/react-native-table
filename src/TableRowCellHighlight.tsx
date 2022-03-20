import React from "react";
import { View } from "react-native";

export function TableRowCellHighlight({
  visible,
  color,
}: {
  visible: boolean;
  color: any;
}) {
  return (
    <View
      style={[
        {
          display: visible ? "flex" : "none",
          zIndex: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderWidth: 2,
          top: 0,
          left: 0,
          borderColor: color,
        },
      ]}
    >
      <View
        style={[
          {
            width: "100%",
            height: "100%",
            borderWidth: 3,
            top: 0,
            left: 0,
            borderColor: "#fff",
          },
        ]}
      />
    </View>
  );
}
