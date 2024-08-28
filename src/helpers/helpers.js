import React from "react";

export const getColumns = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const columns = Object.keys(data[0]);
  return columns;
};

export const transformColumns = (data, onEdit, onDelete) => {
  const columns = getColumns(data);

  const visibleColumns = columns.filter(
    (column) =>
      column !== "expense_description" &&
      column !== "expense_notes" &&
      column !== "expense_key" &&
      column !== "created_at" &&
      column !== "updated_at" &&
      column !== "user"
  );

  const mappedColumns = visibleColumns.map((column) => ({
    title: column.replace("expense_", "").charAt(0).toUpperCase() + column.replace("expense_", "").slice(1),
    dataIndex: column,
    sortDirections: ["ascend", "descend"],
    filterSearch: true,
    sorter: (a, b) => {
      const parseDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      };

      const aVal =
        typeof a[column] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(a[column])
          ? parseDate(a[column])
          : typeof a[column] === "string"
          ? parseFloat(a[column])
          : a[column];

      const bVal =
        typeof b[column] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b[column])
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
      title: "Edit",
      key: "edit",
      fixed: "right",
      width: 70,
      render: (_, record) => <a onClick={() => onEdit(record)}>Edit</a>,
    },
    {
      title: "Delete",
      key: "delete",
      fixed: "right",
      width: 75,
      render: (_, record) => <a onClick={() => onDelete(record)}>Delete</a>,
    },
  ];

  return [...actionColumns, ...mappedColumns];
};