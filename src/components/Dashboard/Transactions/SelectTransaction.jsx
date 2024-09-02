import { Segmented } from "antd";

const SelectTransaction = ({ setCharge, editValue}) => {
  const handleChange = (value) => {
    setCharge(value.toLowerCase());
  };

  return (
    <div className="py-4">
      <Segmented
        onChange={handleChange}
        options={["Expenses", "Incomes"]}
        value={editValue ? editValue.charAt(0).toUpperCase() + editValue.slice(1).toLowerCase() : undefined}
        block
        disabled={!!editValue}
      />
    </div>
  );
};
export default SelectTransaction;
