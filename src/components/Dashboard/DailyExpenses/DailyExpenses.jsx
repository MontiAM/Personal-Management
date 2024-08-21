import TableSection from "./TableSection";
import { mockData } from "@/mockData/mockData";

const DailyExpenses = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TableSection dataSource={mockData} />
        <div className="flex flex-col justify-center items-center">
          lorem5000
        </div>
      </div>
    </div>
  );
};

export default DailyExpenses;
