import { Table } from 'antd';
import { transformColumns } from "@/helpers/helpers"


const TableExpenses = ({ dataSource }) => {
  const columns = transformColumns(dataSource)
  
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description + ' - ' + record.notes}
          </p>
        ),
      }}
      dataSource={dataSource}
    />
  );
};

export default TableExpenses;
