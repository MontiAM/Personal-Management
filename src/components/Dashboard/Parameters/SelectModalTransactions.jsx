import { Segmented } from "antd";

const SelectModalTransactions = ({ setCharge, editValue }) => {
  const values = [
    { transaction_type: "Trans. Type" },
    { transaction_category: "Trans. Category" },
    { payment_methods: "Payments Method" },
  ];
  
  const getValueFromKey = (key) => {
    const found = values.find((item) => Object.keys(item)[0] === key);
    return found ? Object.values(found)[0] : undefined;
  };

  const handleChange = (selectedValue) => {
    const selectedKey = values.find(
      (item) => Object.values(item)[0] === selectedValue
    );

    if (selectedKey) {
      const key = Object.keys(selectedKey)[0];
      console.log(key);
      
      setCharge(key);
    }
  };

  return (
    <div className="py-4">
      <Segmented
        onChange={handleChange}
        options={["Trans. Category", "Trans. Type", "Payments Method"]}
        value={editValue ? getValueFromKey(editValue) : undefined}
        block
        disabled={!!editValue}
      />
    </div>
  );
};

export default SelectModalTransactions;
