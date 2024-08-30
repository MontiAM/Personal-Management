import { Segmented } from "antd";

const SelectTransaction = ({ setCharge }) => {
  const handleChange = (value) => {

    setCharge(value.toLowerCase());
  };

  return (
    <div className="py-4">
      <Segmented
        onChange={handleChange}
        options={["Expenses", "Incomes"]}
        block
      />
    </div>
  );
};
export default SelectTransaction;
