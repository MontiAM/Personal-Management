import { useState } from "react";
import { Table, Modal } from "antd";
import { transformColumns } from "@/helpers/helpers";
import { CloseOutlined } from "@ant-design/icons";
import ModalChargeExpenses from "../../ModalChargeExpenses";

const TableExpenses = ({ dataSource, setDataSource, refreshData }) => {
  const [pageSize, setPageSize] = useState(10);
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
      className="custome-table"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.expense_description + " - " + record.expense_notes}
            </p>
          ),
        }}
        rowKey="expense_id"
        dataSource={dataSource}
        scroll={{ x: "100vh", y: "calc(100vh - 20rem)" }}
        bordered
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          locale: {
            items_per_page: "Page",
          },
        }}
      />
      <Modal
        closeIcon={<CloseOutlined className="text-white" />}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalChargeExpenses onClose={handleCancel} refreshData={refreshData} expense={selectedExpense}/>
      </Modal>
    </>
  );
};

export default TableExpenses;
