import { useState } from "react";
import { Table, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { transformParameterColumns } from "@/util/helpers";
import ModalChargeParameter from "./ModalChargeParameter";

const   TableParameter = ({ dataSource, setDataSource, type, refreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const onEdit = (record) => {
    setIsModalOpen(true);
    setSelectedParameter(record);
  };

  const onDelete = async (record) => {
    try {
      const id = record[Object.keys(record)[0]];
      const res = await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
      });
      if (res.ok) {
        setDataSource((prevData) =>
          prevData.filter((item) => item[Object.keys(item)[0]] !== id)
        );
        console.log("Eliminando...", record);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedParameter([]);
  };

  const columns = transformParameterColumns(dataSource, onEdit, onDelete);

  return (
    <>
      {dataSource.length > 0 && (
        <Table
          className="custom-table"
          rowKey={Object.keys(dataSource[0])[0]}
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: "calc(100vh - 13rem)" }}
          bordered
          pagination={false}
        />
      )}
      <Modal
        closeIcon={<CloseOutlined className="text-white" />}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalChargeParameter
          filterType={type}
          onClose={handleCancel}
          refreshData={refreshData}
          editValue={selectedParameter}
        />
      </Modal>
    </>
  );
};

export default TableParameter;
