import React, { useState, useMemo } from "react";
import { Pressable, Animated, PanResponder } from "react-native";
import { useTable } from "./TableContext";

export function ColumnResizer({
  index,
  field,
  resizeable = false,
}: {
  index: number;
  field: any;
  resizeable?: boolean;
}) {
  const { leftValue, highlightValue, rightValue, widthValue } = field;
  const [draging, setDraging] = useState(false);
  const [panResult, setPanResult] = useState(null);
  const {
    rowHeight,
    panController,
    fields,
    resizerWidth,
    borderColor,
    highlightBorderColor,
  } = useTable();

  const nextField = fields[index + 1];

  const panResponder = useMemo(() => {
    let widthValueListenerId = null;
    let disable = false;
    const internalWidthValue = new Animated.Value(0);

    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        // console.log('resizer onMoveShouldSetPanResponder start');
        // console.log(
        //   'resizer onMoveShouldSetPanResponder',
        //   panController.current
        // );
        if (!panController.current) {
          panController.current = gestureState.stateID;
          return true;
        }
        return panController.current === gestureState.stateID;
      },
      onPanResponderGrant: () => {
        disable = false;
        highlightValue.setValue(1);
        widthValue.setOffset(widthValue._value);
        internalWidthValue.setOffset(widthValue._value);
        rightValue.setOffset(rightValue._value);
        /**
         * 最小宽度
         * 默认40，晚点做成可配置
         */
        let minWidth = 40;
        /**
         * 最大宽度
         * 计算方式：当前column宽度+下一个column宽度-最小宽度
         * -1代表不设置限制，目前最后一个column不设置限制
         */
        let maxWidth = -1;

        if (nextField) {
          maxWidth = widthValue._value + nextField.widthValue._value - minWidth;
          nextField.widthValue.setOffset(nextField.widthValue._value);
          nextField.leftValue.setOffset(nextField.leftValue._value);
        }

        /**
         * 监听宽度变化，当超过最大宽度或小于最小宽度时禁止调整，
         * 否则允许调整
         */
        widthValueListenerId = internalWidthValue.addListener(({ value }) => {
          if (value < minWidth) {
            disable = true;
          } else if (maxWidth > -1 && value > maxWidth) {
            disable = true;
          } else {
            disable = false;
          }
        });
      },
      onPanResponderMove: (event, gestureState) => {
        // console.log('resizer onPanResponderMove', panController.current);
        internalWidthValue.setValue(gestureState.dx);
        if (disable) {
          return;
        }
        widthValue.setValue(gestureState.dx);
        rightValue.setValue(gestureState.dx);
        if (nextField) {
          nextField.widthValue.setValue(-gestureState.dx);
          nextField.leftValue.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: () => {
        highlightValue.setValue(0);
        widthValue.flattenOffset();
        rightValue.flattenOffset();
        panController.current = null;
        if (nextField) {
          nextField.widthValue.flattenOffset();
          nextField.leftValue.flattenOffset();
        }

        internalWidthValue.removeListener(widthValueListenerId);
        disable = false;
      },
    });
  }, [highlightValue, nextField, panController, rightValue, widthValue]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: "absolute",
          top: 0,
          left: rightValue,
          zIndex: 10,
          height: rowHeight,
          width: resizerWidth,
        },
      ]}
    >
      <Pressable
        style={[
          {
            display: "flex",
            alignItems: "center",
            width: resizerWidth,
            height: rowHeight,
          },
        ]}
      >
        {(state) => {
          const hovered = (state as unknown as any).hovered;
          return (
            <Animated.View
              style={[
                {
                  height: rowHeight,
                },
                {
                  backgroundColor: highlightValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [borderColor, highlightBorderColor],
                  }),
                  width: highlightValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                  }),
                },
                hovered && {
                  width: 3,
                  backgroundColor: highlightBorderColor,
                },
              ]}
            ></Animated.View>
          );
        }}
      </Pressable>
    </Animated.View>
  );
}