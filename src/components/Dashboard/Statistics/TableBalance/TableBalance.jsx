import { Table } from "antd";
import { transformColumns } from "@/helpers/helpers";

const TableBalance = ({ dataSource }) => {

  const columns = transformColumns(dataSource);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        // rowKey={`${filterType.slice(0, -1)}_id`}
        scroll={{ x: "100vh", y: "calc(100vh - 20rem)" }}
        bordered
        pagination={false}
      />
    </>
  );
};

export default TableBalance;
