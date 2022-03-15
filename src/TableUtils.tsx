import { Animated } from "react-native";

/**
 *
 */
export function resetColumnPosition({
  fields,
  indexCellWidth,
  cellWidth,
}: {
  fields: any[];
  indexCellWidth: number;
  tailCellWidth: number;
  cellWidth: number;
  resizerWidth: number;
}) {
  const nextFields: any = [];

  let prevRight = indexCellWidth;
  let currentIndex = 0;

  for (const field of fields) {
    const left = prevRight;
    let width = cellWidth;
    prevRight += width;

    const result = {
      left,
      width,
      ...field,
    };
    if (currentIndex === 0) {
      result.leftValue = new Animated.Value(indexCellWidth);
    } else {
      result.leftValue = nextFields[currentIndex - 1].rightValue;
    }

    result.highlightValue = new Animated.Value(0);
    result.widthValue = field.widthValue
      ? field.widthValue
      : new Animated.Value(cellWidth);

    result.rightValue = Animated.add(result.leftValue, result.widthValue);

    nextFields.push(result);
    currentIndex++;
  }

  return nextFields;
}
