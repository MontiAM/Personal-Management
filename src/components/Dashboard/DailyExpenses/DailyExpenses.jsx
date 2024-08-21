import TableExpenses from "./TableExpenses";
import { mockData } from "@/mockData/mockData";

const DailyExpenses = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-slate-200 font-bold text-4xl mb-4 col-span-full">
        Daily Expenses
      </h1>
      <div className="w-full">
        <TableExpenses dataSource={mockData}/>
      </div>
    </div>
  );
};

export default DailyExpenses;
