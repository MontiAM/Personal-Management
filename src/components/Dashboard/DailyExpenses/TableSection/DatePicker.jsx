import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM";

const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      defaultValue={dayjs("2015/01", monthFormat)}
      format={monthFormat}
      picker="month"
    />
  </Space>
);
export default App;
