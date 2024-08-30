import { Card, Statistic, Progress, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const StatisticCard = ({ categoryName, totalAmount, percentageChange }) => {
  const isPositive = percentageChange >= 0;

  return (
    <Card
      bordered={false}
      style={{ width: 300, height: 200 }}
    >
      <Text strong>{categoryName}</Text>
      <Statistic
        value={totalAmount}
        precision={2}
        style={{ marginTop: 8, marginBottom: 8 }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Progress
          type="circle"
          percent={Math.abs(percentageChange)}
          width={80}
          strokeColor={isPositive ?  "#cf1322" : "#3f8600" }
        />
        <div style={{ marginLeft: 16 }}>
          <Statistic
            value={percentageChange}
            precision={2}
            valueStyle={{ color: isPositive ? "#cf1322" : "#3f8600" }}
            prefix={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
          <Text>{isPositive ? "Aumento" : "Disminución"} respecto al mes anterior</Text>
        </div>
      </div>
    </Card>
  );
};

export default StatisticCard;