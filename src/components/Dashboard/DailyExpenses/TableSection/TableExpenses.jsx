import { useState } from "react";
import { Table, Modal } from "antd";
import { transformColumns } from "@/helpers/helpers";
import { CloseOutlined } from "@ant-design/icons";
import ModalChargeExpenses from "../../ModalChargeExpenses";


const TableExpenses = ({ dataSource }) => {

  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEdit = (record) => {
    setIsModalOpen(true);
    console.log("Editando...", record);
  };
  
  const onDelete = (record) => {
    console.log("Eliminando...", record);
  };

  const columns = transformColumns(dataSource, onEdit, onDelete);


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description + " - " + record.notes}
            </p>
          ),
        }}
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
        <ModalChargeExpenses />
      </Modal>
    </>
  );
};

export default TableExpenses;
