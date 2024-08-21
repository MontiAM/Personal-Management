import { useState } from 'react';
import { Table } from 'antd';
import { transformColumns } from "@/helpers/helpers"


const TableExpenses = ({ dataSource }) => {
  const columns = transformColumns(dataSource)
  const [pageSize, setPageSize] = useState(10); 

  
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
      scroll={{ x: "100vh", y: "calc(100vh - 20rem)" }}
      bordered
      pagination={{
        pageSize: pageSize, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '20', '50', '100'],
        onShowSizeChange: (current, size) => {
          setPageSize(size);
        },
        locale: {
          items_per_page: "Page", 
        }, 
      }}
    />
  );
};

export default TableExpenses;
