import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM";

const DatePickerExpense = ({ onDateChange }) => {
  const handleChange = (date) => {
    onDateChange(date);
  };

  return (
    <>
      <Space direction="vertical" size={12}>
        <p className="text-slate-500 block text-sm">Periodo:</p>
        <DatePicker
          defaultValue={dayjs()}
          format={monthFormat}
          picker="month"
          onChange={handleChange}
        />
        <div></div>
      </Space>
    </>
  );
};

export default DatePickerExpense;
