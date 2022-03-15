import { Animated } from "react-native";

/**
 * The total width change mode when resizing
 * default value: `increase-total-width`
 *
 * `keep-total-width`: total width won't change, next column
 * will decrease
 *
 * `increase-total-width`: next column won't change, total
 * width will increase
 */
export type TableResizeMode = "keep-total-width" | "increase-total-width";

export type InternalField = {
  fieldId: string;
  title: string;
  leftValue: Animated.Value;
  widthValue: Animated.Value;
};
