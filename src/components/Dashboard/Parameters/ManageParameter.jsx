import TableParameter from "./TableParameter";
import ModalChargeParameter from "./ModalChargeParameter";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ManageParameter({ title, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    const res = await fetch(`/api/${type}`);
    const data = await res.json();
    setDataSource(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshData = async () => {
    console.log("Refreshing");
    try {
      const res = await fetch(`/api/${type}`);
      const data = await res.json();
      setDataSource(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataSource([]);
    }
  };

  return (
    <>
      <div className="w-full lg:h-500 ">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-white">{title}</h1>
          <button
            onClick={showModal}
            className="text-white w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-lg font-bold"
          >
            +
          </button>
        </div>
        <div>
          <TableParameter
            refreshData={refreshData}
            dataSource={dataSource}
            setDataSource={setDataSource}
            type={type}
          />
        </div>
      </div>
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
        />
      </Modal>
    </>
  );
}
