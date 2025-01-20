import { useState } from "react";
import { Table, Modal } from "antd";
import { transformTransactionsColumns } from "@/util/helpers";
import { CloseOutlined } from "@ant-design/icons";
import ModalCharge from "../../transactions/ModalCharge";

const TableExpenses = ({
  dataSource,
  setDataSource,
  refreshData,
  filterType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const onEdit = (record) => {
    setIsModalOpen(true);
    setSelectedTransaction(record);
  };

  const onDelete = async (record) => {
    if (record) {
      try {
        const res = await fetch(`/api/transactions/${record.trans_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          setDataSource((prevData) =>
            prevData.filter((item) => item.trans_id !== record.trans_id)
          );
          console.log("Eliminando...", record);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = transformTransactionsColumns(dataSource, onEdit, onDelete);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTransaction([]);
  };

  return (
    <>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => <p>{record.trans_description} - {record.l_trans_type_name}</p>,
        }}
        rowKey={"trans_id"}
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
        <ModalCharge
          onClose={handleCancel}
          refreshData={refreshData}
          editValue={selectedTransaction}
        />
      </Modal>
    </>
  );
};

export default TableExpenses;
