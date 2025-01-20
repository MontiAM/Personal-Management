import TableExpenses from "./TableExpenses";
import DatePickerComponent from "../../../common/DatePicker";
import SelectPicker from "./SelectPicker";
import ModalCharge from "../../transactions/ModalCharge";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import SideDrawer from "../../../common/SideDrawer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function TableSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDates] = useState(dayjs());
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
    console.log("Refreshing...");    
    
    if (selectedDate) {
      const startOfMonth = selectedDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = selectedDate.endOf("month").format("YYYY-MM-DD");
      
      try {
        const res = await fetch(
          `/api/transactions?fecha_desde=${startOfMonth}&fecha_hasta=${endOfMonth}`
        );
        const data = await res.json();        
        setDataSource(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataSource([]);
      }
    }
  };

  useEffect( ()=>{
    refreshData();
  }, [])

  return (
    <>
      <h1 className="mb-2 text-lg sm:text-xl font-bold text-white">
        Daily Expenses
      </h1>
      <div className="relative mt-2 grid grid-cols-1 gap-4 h-full">
        <SideDrawer         
          title="Filtros"
        >
          <DatePickerComponent onDateChange={setSelectedDates} />
          <SelectPicker onFilterChange={setSelectFilter} />
          <button
            onClick={handleFilter}
            className="text-white h-12 rounded-lg bg-blue-500 hover:bg-blue-600 p-3"
          >
            Filtrar
          </button>
        </SideDrawer>
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
