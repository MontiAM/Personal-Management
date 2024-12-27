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
      <Space direction="vertical" size={12}>
        <p className="text-white block text-sm">Periodo:</p>
        <RangePicker
          defaultValue={defaultDates}
          format={monthFormat}
          onChange={handleChange}
          className=" w-full"
        />
      </Space>
    </>
  );
};

export default DatePickerComponent;
