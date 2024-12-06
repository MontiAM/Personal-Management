import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const monthFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

const DatePickerComponent = ({ onDateChange }) => {
  const handleChange = (date) => {
    onDateChange(date);
  };

  const defaultDates = [dayjs().startOf("month"), dayjs().endOf("month")];

  return (
    <>
      <Space className="px-8 md:p-0" direction="vertical" size={12}>
        <p className="text-slate-500 block text-sm">Periodo:</p>
        <RangePicker
          defaultValue={defaultDates}
          format={monthFormat}
          onChange={handleChange}
          className=" w-full md:w-auto"
        />
      </Space>
    </>
  );
};

export default DatePickerComponent;
