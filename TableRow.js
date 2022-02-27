import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTable } from './TableContext';
import { TableRowCell } from './TableRowCell';

export function TableRow({ item, index = 0 }: { item: any, index: number }) {
  const {
    fields,
    rowHoverdBackgroundColor,
    rowHeight,
    borderColor,
    indexCellWidth,
    totalWidth,
    keyExtractor,
  } = useTable();

  const rowId = useMemo(() => {
    return keyExtractor(item);
  }, [keyExtractor, item]);

  return (
    <Pressable
      style={(state) => [
        {
          height: rowHeight,
          width: totalWidth,
        },
        state.hovered && {
          backgroundColor: rowHoverdBackgroundColor,
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          padding: 4,
          height: rowHeight,
          borderColor,
          borderBottomWidth: 1,
          width: indexCellWidth,
        }}>
        <Text>{index + 1}</Text>
      </View>
      {fields.map((field, fieldIndex) => {
        const data = item.fields.find(
          (dataField) => dataField.fieldId === field.fieldId
        );
        return (
          <TableRowCell
            field={field}
            rowId={rowId}
            index={index}
            fieldIndex={fieldIndex}
            data={data ?? {}}
            key={field.fieldId}></TableRowCell>
        );
      })}
    </Pressable>
  );
}
