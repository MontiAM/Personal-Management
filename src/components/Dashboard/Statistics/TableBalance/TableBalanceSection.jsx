import TableBalance from "./TableBalance";

const TableBalanceSection = ({ fetchDate }) => {
  const dataBalance = [
    {
      year: 2024,
      month: 7,
      total_income: 0,
      total_expense: 600,
      balance: -600,
    },
    {
      year: 2024,
      month: 8,
      total_income: 12000,
      total_expense: 11000,
      balance: 1000,
    },
    {
      year: 2024,
      month: 9,
      total_income: 15000,
      total_expense: 15000,
      balance: 0,
    },
    {
      year: 2024,
      month: 10,
      total_income: 900,
      total_expense: 0,
      balance: 900,
    },
  ];

  return (
    <>
      <div className="bg-gray-950 lg:h-[calc(100vh-6rem)] shadow-lg shadow-gray-900 rounded-lg p-2">
        <h1 className="text-white text-lg sm:text-xl font-bold">Balance</h1>
        <TableBalance dataSource={dataBalance} />
      </div>
    </>
  );
};

export default TableBalanceSection;
