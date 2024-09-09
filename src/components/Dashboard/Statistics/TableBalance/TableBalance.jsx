import { Table } from "antd";
import { transformBalanceColumns } from "@/helpers/helpers";

const TableBalance = ({ dataSource }) => {

  const newData = dataSource.map((item) => ({
    period: `${item.year}/${item.month}`,
    total_income: item.total_income,
    total_expense: item.total_expense,
    balance: item.balance
  }))

  const columns = transformBalanceColumns(newData);

  return (
    <>
      <Table
        columns={columns}
        dataSource={newData}
        // rowKey={`${filterType.slice(0, -1)}_id`}
        scroll={{ y: "calc(100vh - 13rem)" }}
        bordered
        pagination={false}
      />
    </>
  );
};

export default TableBalance;
