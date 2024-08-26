import TableExpenses from "./TableExpenses";
import DatePickerExpense from "./DatePicker";
import ModalChargeExpenses from "../../ModalChargeExpenses";
import { mockData } from "@/mockData/mockData";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";

function TableSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 h-full">
        <div className="flex justify-between px-2">
          <DatePickerExpense />
          <button
            onClick={showModal}
            className="text-white  rounded-lg bg-blue-500 p-3 col-span-full"
          >
            Add
          </button>
        </div>
        <div className="lg:relative h-max-[calc(100vh-12em)] overflow-auto">
          <TableExpenses dataSource={mockData} />
        </div>
      </div>
      <Modal
        closeIcon={<CloseOutlined className="text-white" />}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalChargeExpenses onClose={handleCancel} />
      </Modal>
    </>
  );
}

export default TableSection;
