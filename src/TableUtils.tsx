import { Animated } from "react-native";

/**
 *
 */
export function resetColumnPosition({
  columns,
  indexCellWidth,
  cellWidth,
}: {
  columns: any[];
  indexCellWidth: number;
  tailCellWidth: number;
  cellWidth: number;
  resizerWidth: number;
}) {
  const nextColumns: any = [];

  let currentIndex = 0;

  for (const field of columns) {
    const result = {
      ...field,
    };
    if (currentIndex === 0) {
      result.leftValue = new Animated.Value(indexCellWidth);
    } else {
      result.leftValue = nextColumns[currentIndex - 1].rightValue;
    }

    result.highlightValue = new Animated.Value(0);
    result.widthValue = field.widthValue
      ? field.widthValue
      : new Animated.Value(field.initialWidth ?? cellWidth);

    result.rightValue = Animated.add(result.leftValue, result.widthValue);

    nextColumns.push(result);
    currentIndex++;
  }

  return nextColumns;
}
