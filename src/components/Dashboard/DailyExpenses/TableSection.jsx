import TableExpenses from "./TableExpenses";
import DatePickerExpense from "./DatePicker";
import { mockData } from "@/mockData/mockData";

function TableSection() {
  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 h-full">
        <DatePickerExpense />
        <div className="lg:relative h-max-[calc(100vh-12em)] overflow-auto">
          <TableExpenses dataSource={mockData} />
        </div>
      </div>
    </>
  );
}

export default TableSection;
