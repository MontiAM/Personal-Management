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
      column !== "user" &&
      column !== "user_id" &&
      column !== "expense_id" &&
      column !== "expense_location"
  );

  const mappedColumns = visibleColumns.map((column) => ({
    title:
      column.replace("expense_", "").charAt(0).toUpperCase() +
      column.replace("expense_", "").slice(1),
    dataIndex: column,
    sortDirections: ["ascend", "descend"],
    filterSearch: true,
    width:
      column === "expense_id" || column === "expense_amount"
        ? 50
        : column === "expense_date"
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
      width: 45,
      render: (_, record) => (
        <a
          onClick={() => onDelete(record)}
          style={{ color: "red", cursor: "pointer" }} // Color personalizado para "Eliminar"
        >
          Delete
        </a>
      ),
    },
  ];

  return [...mappedColumns, ...actionColumns];
};
