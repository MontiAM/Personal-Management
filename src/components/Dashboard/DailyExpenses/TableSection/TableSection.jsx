import TableExpenses from "./TableExpenses";
import DatePickerExpense from "./DatePicker";
import SelectPicker from "./SelectPicker";
import ModalCharge from "../../Transactions/ModalCharge";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function TableSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectFilter, setSelectFilter] = useState("expenses")
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilter = () => {
    refreshData()
  }

  const refreshData = async () => {
    if (selectedDate) {
      const startOfMonth = selectedDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = selectedDate.endOf("month").format("YYYY-MM-DD");
      try {
        const res = await fetch(
          `/api/${selectFilter}?fecha_desde=${startOfMonth}&fecha_hasta=${endOfMonth}`
        );
        const data = await res.json();
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataSource([]);
      }
    }
  };

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 h-full">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between md:items-center">
          <div className="flex gap-2 justify-center items-center ">
            <div className="flex gap-2 items-start">
              <DatePickerExpense onDateChange={setSelectedDate} />
              <SelectPicker onFilterChange={setSelectFilter}/>
            </div>
            <button onClick={handleFilter} className="text-white h-12 rounded-lg bg-blue-500 p-3 col-span-full">
              Filter
            </button>
          </div>
          <button
            onClick={showModal}
            className="md:mx-0 lg:mx-0 mx-2 text-white h-12 rounded-lg bg-blue-500 p-3 col-span-full"
          >
            Add
          </button>
        </div>
        <div className="lg:relative h-max-[calc(100vh-12em)] overflow-auto">
          <TableExpenses
            dataSource={dataSource}
            setDataSource={setDataSource}
            refreshData={refreshData}
            filterType={selectFilter}
          />
        </div>
      </div>

      <Modal
        closeIcon={<CloseOutlined className="text-white" />}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalCharge onClose={handleCancel} refreshData={refreshData} />
      </Modal>
    </>
  );
}

export default TableSection;
