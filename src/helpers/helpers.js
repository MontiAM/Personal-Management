const getColumns = (data) => {
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
      column !== "income_description" &&
      column !== "income_notes" &&
      column !== "income_key" &&
      column !== "income_id" &&
      column !== "income_location" &&
      column !== "expense_description" &&
      column !== "expense_notes" &&
      column !== "expense_key" &&
      column !== "expense_id" &&
      column !== "expense_location" &&
      column !== "created_at" &&
      column !== "updated_at" &&
      column !== "user" &&
      column !== "user_id"
  );

  const mappedColumns = visibleColumns.map((column) => ({
    title: column
      .slice(column.indexOf("_") + 1)
      .replace(/^\w/, (c) => c.toUpperCase()),
    dataIndex: column,
    sortDirections: ["ascend", "descend"],
    filterSearch: true,
    width:
      column.endsWith("_id") || column.endsWith("_amount")
        ? 50
        : column.endsWith("_date")
        ? 70
        : 150,
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
      title: "",
      key: "edit",
      width: 45,
      render: (_, record) => (
        <a
          onClick={() => onEdit(record)}
          style={{ color: "blue", cursor: "pointer" }} // Color personalizado para "Editar"
        >
          Edit
        </a>
      ),
    },
    {
      title: "",
      key: "delete",
      width: 50,
      render: (_, record) => (
        <a
          onClick={() => onDelete(record)}
          style={{ color: "red", cursor: "pointer" }} // Color personalizado para "Eliminar"
        >
          Del
        </a>
      ),
    },
  ];

  if (onEdit && onDelete) {
    return [...mappedColumns, ...actionColumns];
  } else return mappedColumns;
};
