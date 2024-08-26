import React from 'react';

export const getColumns = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    // throw new Error("Invalid data input");
    return [];
  }

  const columns = Object.keys(data[0]);
  return columns;
};

export const transformColumns = (data, onEdit, onDelete) => {
  const columns = getColumns(data);
  const visibleColumns = columns.filter(column => column !== 'description' && column !== 'notes' && column !== 'key');

  const mappedColumns = visibleColumns.map((column) => ({
    title: column.charAt(0).toUpperCase() + column.slice(1),
    dataIndex: column,
    sortDirections: ["ascend", "descend"],
    filterSearch: true,
    sorter: (a, b) => {
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const aVal =
        typeof a[column] === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(a[column])
          ? parseDate(a[column])
          : typeof a[column] === "string"
          ? parseFloat(a[column])
          : a[column];

      const bVal =
        typeof b[column] === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(b[column])
          ? parseDate(b[column])
          : typeof b[column] === "string"
          ? parseFloat(b[column])
          : b[column];

      if (!isNaN(aVal) && !isNaN(bVal)) {
        return aVal - bVal;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return aVal - bVal;
      }
      if (typeof a[column] === "string" && typeof b[column] === "string") {
        return a[column].localeCompare(b[column]);
      }
      return 0;
    },
  }));

  const actionColumns = [
    {
      title: 'Edit',
      key: 'edit',
      fixed: 'right',
      width: 70,
      render: (_, record) => <a onClick={() => onEdit(record)}>Edit</a>,
    },
    {
      title: 'Delete',
      key: 'delete',
      fixed: 'right',
      width: 75,
      render: (_, record) => <a onClick={() => onDelete(record)}>Delete</a>,
    },
  ];

  return [...actionColumns, ...mappedColumns];
};
