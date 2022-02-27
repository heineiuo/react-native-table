import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTable } from './TableContext';
import { TableHeadCell } from './TableHeadCell';

export function TableHead() {
  const {
    borderColor,
    indexCellWidth,
    fields,
    rowHeight,
    totalWidth,
    resizeable,
  } = useTable();

  return (
    <View
      style={[
        {
          height: rowHeight,
          width: totalWidth,
          backgroundColor: '#fff',
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: rowHeight,
          borderColor,
          borderBottomWidth: 1,
          width: indexCellWidth,
        }}></View>
      {fields.map((field, index) => {
        return (
          <TableHeadCell
            resizeable={resizeable}
            field={field}
            index={index}
            key={field.fieldId}></TableHeadCell>
        );
      })}
    </View>
  );
}
