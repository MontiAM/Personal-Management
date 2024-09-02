import { useState } from "react";
import { Table, Modal } from "antd";
import { transformColumns } from "@/helpers/helpers";
import { CloseOutlined } from "@ant-design/icons";
import ModalCharge from "../../Transactions/ModalCharge";

const TableExpenses = ({ dataSource, setDataSource, refreshData, filterType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const onEdit = (record) => {
    setIsModalOpen(true);
    setSelectedExpense(record); 
  };

  const onDelete = async (record) => {
    try {
      const res = await fetch(`/api/expenses/${record.expense_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setDataSource((prevData) =>
          prevData.filter((item) => item.expense_id !== record.expense_id)
        );
        console.log("Eliminando...", record);
      }
    } catch (error) {
      console.log(error);
    }
  };  

  const columns = transformColumns(dataSource, onEdit, onDelete);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedExpense([]); 
  };

  

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
               {record[`${filterType.slice(0, -1)}_description`] + " - " + record[`${filterType.slice(0, -1)}_notes`]}
            </p>
          ),
        }}
        rowKey={`${filterType.slice(0, -1)}_id`}
        scroll={{ x: "100vh", y: "calc(100vh - 20rem)" }}
        bordered
        pagination={false} 
      />
      <Modal
        closeIcon={<CloseOutlined className="text-white" />}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalCharge onClose={handleCancel} refreshData={refreshData} expense={selectedExpense} filterType={filterType}/>
      </Modal>
    </>
  );
};

export default TableExpenses;
