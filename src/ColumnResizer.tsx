import React, { useMemo } from "react";
import { Pressable, Animated, PanResponder } from "react-native";

import { useTable } from "./TableContext";

export function ColumnResizer({
  index,
  column,
  resizeable = false,
}: {
  index: number;
  column: any;
  resizeable?: boolean;
}) {
  const { highlightValue, widthValue } = column;
  const {
    debug,
    rowHeight,
    panController,
    columns,
    resizerWidth,
    borderColor,
    cellMinWidth,
    highlightBorderColor,
    resizeMode,
    indexCellWidth,
    columnKeyExtractor,
    onChangeColumnSize,
  } = useTable();

  const columnId = columnKeyExtractor(column);

  const panResponder = useMemo(() => {
    if (!resizeable) {
      return {
        panHandlers: {},
      };
    }
    let internalWidthValueListenerId = null;
    let widthValueListenerId = null;
    let disable = false;
    let currentWidthValue = 0;
    const internalWidthValue = new Animated.Value(0);
    const nextField = columns[index + 1];

    return PanResponder.create({
      onPanResponderTerminate: (event, gestureState) => {
        if (debug) {
          console.log("onPanResponderTerminate", event);
        }
      },
      onPanResponderTerminationRequest: (event, gestureState) => {
        if (debug) {
          console.log("onPanResponderTerminationRequest", event);
        }
        return false;
      },
      onPanResponderReject: (event) => {
        if (debug) {
          console.log("onPanResponderReject", event);
        }
      },

      /**
       * 为了不和位置调整冲突，在context里记录当前的stateID，
       * 当stateID一致时返回true，否则返回false
       */
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (debug) {
          console.log(
            "onMoveShouldSetPanResponder",
            event,
            panController.current,
            gestureState.stateID
          );
        }
        if (!panController.current) {
          panController.current = gestureState.stateID;
          return true;
        }
        return panController.current === gestureState.stateID;
      },
      /**
       * 手势初始化
       * 1. 判断是否是最后一个Field
       * 2. 计算最大宽度
       */
      onPanResponderGrant: () => {
        if (debug) {
          console.log("onPanResponderGrant");
        }
        disable = false;
        highlightValue.setValue(1);
        const currentWidth = JSON.parse(JSON.stringify(widthValue));
        widthValue.setOffset(currentWidth);
        internalWidthValue.setOffset(currentWidth);

        /**
         * 最大宽度
         * 计算方式：当前column宽度+下一个column宽度-最小宽度
         * -1代表不设置限制，目前最后一个column不设置限制
         */
        let maxWidth = -1;

        if (resizeMode === "keep-total-width" && nextField) {
          const nextFieldWidth = JSON.parse(
            JSON.stringify(nextField.widthValue)
          );
          maxWidth = currentWidth + nextFieldWidth - cellMinWidth;
          nextField.widthValue.setOffset(nextFieldWidth);
        }

        /**
         * 监听宽度变化，当超过最大宽度或小于最小宽度时禁止调整，
         * 否则允许调整
         */
        internalWidthValue.removeAllListeners();
        widthValue.removeAllListeners();

        internalWidthValueListenerId = internalWidthValue.addListener(
          ({ value }) => {
            if (value < cellMinWidth || (maxWidth > -1 && value > maxWidth)) {
              disable = true;
            } else {
              disable = false;
            }
          }
        );
        widthValueListenerId = widthValue.addListener(({ value }) => {
          currentWidthValue = value;
        });
      },
      /**
       * 移动手势时修改animated value
       * 1. 先更新internalWidthValue，这个值用来判断是否disable，所以
       * 需要保持更新，放在disable之前。
       *
       */
      onPanResponderMove: (event, gestureState) => {
        if (debug) {
          console.log("resizer onPanResponderMove", panController.current);
        }
        internalWidthValue.setValue(gestureState.dx);
        if (disable) {
          return;
        }
        widthValue.setValue(gestureState.dx);

        if (resizeMode === "keep-total-width" && nextField) {
          nextField.widthValue.setValue(-gestureState.dx);
        }
      },
      /**
       * 松开手势时flattenOffset
       */
      onPanResponderRelease: () => {
        if (debug) {
          console.log("onPanResponderRelease");
        }
        highlightValue.setValue(0);
        widthValue.flattenOffset();
        internalWidthValue.flattenOffset();

        panController.current = null;
        if (nextField) {
          nextField.widthValue.flattenOffset();
        }
        onChangeColumnSize({ width: currentWidthValue, columnId });
        internalWidthValue.removeListener(internalWidthValueListenerId);
        widthValue.removeListener(widthValueListenerId);
        disable = false;
      },
    });
  }, [
    debug,
    columnId,
    onChangeColumnSize,
    resizeable,
    highlightValue,
    columns,
    resizeMode,
    cellMinWidth,
    index,
    panController,
    widthValue,
  ]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: "absolute",
          top: 0,
          left: Animated.subtract(column.rightValue, resizerWidth / 2),
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
            />
          );
        }}
      </Pressable>
    </Animated.View>
  );
}
