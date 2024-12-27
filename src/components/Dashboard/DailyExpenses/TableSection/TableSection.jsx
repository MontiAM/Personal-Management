import TableExpenses from "./TableExpenses";
import DatePickerComponent from "../../../common/DatePicker";
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
  const [selectedDates, setSelectedDates] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [selectFilter, setSelectFilter] = useState("expenses");
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilter = () => {
    refreshData();
  };

  const refreshData = async () => {
    console.log("Refreshing...");

    if (selectedDates) {
      const startOfRange = selectedDates[0].format("YYYY-MM-DD");
      const endOfRange = selectedDates[1].format("YYYY-MM-DD");

      try {
        const res = await fetch(
          `/api/transactions?fecha_desde=${startOfRange}&fecha_hasta=${endOfRange}`
        );
        const data = await res.json();
        setDataSource(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataSource([]);
      }
    }
  };

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-4 h-full">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <DatePickerComponent onDateChange={setSelectedDates} />
          <SelectPicker onFilterChange={setSelectFilter} />
          <button
            onClick={handleFilter}
            className="mx-8 md:mx-0 md:w-auto text-white h-6 md:h-12 rounded-lg bg-blue-500 md:p-3"
          >
            Filter
          </button>
        </div>
        <div className="lg:relative h-[calc(100vh-12em)] overflow-auto">
          <TableExpenses
            dataSource={dataSource}
            setDataSource={setDataSource}
            refreshData={refreshData}
            filterType={selectFilter}
          />
        </div>
      </div>
      <button
        onClick={showModal}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 shadow-lg hover:bg-blue-600 flex items-center justify-center z-10"
      >
        <p>Add</p>
      </button>

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
