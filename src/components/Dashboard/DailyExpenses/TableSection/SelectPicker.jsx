import { Select, Space } from "antd";

const SelectPicker = ({onFilterChange}) => {
  const selectOptions = [
    {
      value: "expenses",
      label: "Expenses",
    },
    {
      value: "incomes",
      label: "Incomes",
    },
  ];

  const handleChange = (value) => {    
    onFilterChange(value);
  };

  return (
    <>
      <Space className="px-8 md:p-0" direction="vertical" size={12}>
        <p className="text-slate-500 block text-sm">Filtro:</p>
        <Select
          style={{ minWidth: "auto" }}
          showSearch
          defaultValue={selectOptions[0].label}
          placeholder={selectOptions[0].label}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          className="w-full md:w-auto"
          options={selectOptions}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};

export default SelectPicker;
