import TableExpenses from "./TableExpenses";
import DatePickerExpense from "./DatePicker";
import ModalChargeExpenses from "../../ModalChargeExpenses";
import { mockData } from "@/mockData/mockData";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";

function TableSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedDate) {
      const startOfMonth = selectedDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = selectedDate.endOf("month").format("YYYY-MM-DD");
      const fetchData = async () => {
        try {
          const res = await fetch(
            `/api/expenses?fecha_desde=${startOfMonth}&fecha_hasta=${endOfMonth}`
          );
          const data = await res.json();
          setDataSource(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setDataSource([]);
        }
      };
      fetchData();
    }
  }, [selectedDate]);

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 h-full">
        <div className="flex justify-between px-2">
          <DatePickerExpense onDateChange={setSelectedDate} />
          <button
            onClick={showModal}
            className="text-white  rounded-lg bg-blue-500 p-3 col-span-full"
          >
            Add
          </button>
        </div>
        <div className="lg:relative h-max-[calc(100vh-12em)] overflow-auto">
          <TableExpenses dataSource={dataSource} />
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
