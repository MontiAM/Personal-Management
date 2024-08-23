import TableSection from "./TableSection/TableSection";
import { mockData } from "@/mockData/mockData";

const DailyExpenses = () => {
  return (

    <div className=" flex flex-col justify-center items-center">
    <div className="grid grid-cols-1 gap-4">
      <TableSection dataSource={mockData} />
    </div>
  </div>
  );
};

export default DailyExpenses;
