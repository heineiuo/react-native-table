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

  let prevRight = indexCellWidth;
  let currentIndex = 0;

  for (const field of columns) {
    const left = prevRight;
    const width = cellWidth;
    prevRight += width;

    const result = {
      left,
      width,
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
      : new Animated.Value(cellWidth);

    result.rightValue = Animated.add(result.leftValue, result.widthValue);

    nextColumns.push(result);
    currentIndex++;
  }

  return nextColumns;
}
