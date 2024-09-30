const getColumns = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const columns = Object.keys(data[0]);
  return columns;
};

export const transformBalanceColumns = (data) => {
  const columns = getColumns(data);

  const mappedColumns = columns.map((column) => {
    const isNumeric = (value) => !isNaN(value);
    const isYearMonthFormat = (value) => /^\d{4}\/\d{1,2}$/.test(value);

    return {
      title: column
        .slice(column.indexOf("_") + 1)
        .replace(/^\w/, (c) => c.toUpperCase()),
      dataIndex: column,
      sortDirections: ["ascend", "descend"],
      filterSearch: true,
      width: 45,
      sorter: (a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (isNumeric(aValue) && isNumeric(bValue)) {
          return aValue - bValue;
        }

        if (isYearMonthFormat(aValue) && isYearMonthFormat(bValue)) {
          const parseYearMonth = (str) => {
            const [year, month] = str.split("/").map(Number);
            return new Date(year, month - 1);
          };

          return parseYearMonth(aValue) - parseYearMonth(bValue);
        }

        return 0;
      },
    };
  });

  return mappedColumns;
};

export const transformParameterColumns = (data, onEdit, onDelete) => {
  const columns = getColumns(data);

  const mappedColumns = columns.map((column, index) => {
    // Si termina en _id, renombrarlo como "ID"
    // const title = column.endsWith("_id")
    //   ? "ID"
    //   : column
    //       .slice(column.indexOf("_") + 1)
    //       .replace(/^\w/, (c) => c.toUpperCase());
    const title =
      column === "pay_method_name"
        ? "Metodo de pago"
        : column === "trans_type_name"
        ? "Tipo transaccion"
        : column === "trans_cat_name"
        ? "Categoria"
        : column === "l_trans_type_name"
        ? "Tipo transaccion"
        : column.endsWith("_id")
        ? "ID"
        : null;
    return {
      title,
      dataIndex: column,
      sortDirections: ["ascend", "descend"],
      filterSearch: true,
      width: column.endsWith("_id") ? 50 : 150,
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
      ...(index === 0 ? { defaultSortOrder: "ascend" } : {}),
    };
  });

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

export const transformTransactionsColumns = (data, onEdit, onDelete) => {
  const columns = getColumns(data);

  const visibleColumns = columns.filter(
    (column) =>
      column !== "created_at" &&
      column !== "updated_at" &&
      column !== "trans_cat_id" &&
      column !== "trans_payment_method_id" &&
      column !== "l_trans_type_id" &&
      column !== "trans_id" &&
      column !== "trans_description" &&
      column !== "l_trans_type_name" &&
      column !== "l_user_email"
  );

  const mappedColumns = visibleColumns.map((column) => ({
    title:
      column === "trans_date"
        ? "Fecha"
        : column === "trans_amount"
        ? "Monto"
        : column === "l_trans_cat_name"
        ? "Categoria"
        : column === "l_pay_method_name"
        ? "Metodo de Pago"
        : null,
    dataIndex: column,
    sortDirections: ["ascend", "descend"],
    filterSearch: true,
    width:
      column.endsWith("_id") || column.endsWith("_amount")
        ? 70
        : column.endsWith("_date")
        ? 90
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
    ...(column === "trans_date" && { defaultSortOrder: "descend" }),
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
