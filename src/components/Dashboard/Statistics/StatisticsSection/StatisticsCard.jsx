import { Card, Statistic, Progress, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const StatisticCard = ({
  categoryName,
  totalAmount,
  percentageChange,
  type = "expense",
}) => {
  const isPositive =
    type === "income" ? -1 * percentageChange >= 0 : percentageChange >= 0;

  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        height: 230,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Text strong>{categoryName}</Text>
      <Statistic
        value={totalAmount}
        precision={2}
        style={{ marginTop: 8, marginBottom: 8 }}
      />
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Progress
          type="circle"
          percent={Math.abs(percentageChange)}
          width={70}
          strokeColor={isPositive ? "#cf1322" : "#3f8600"}
        />
        <div style={{ marginLeft: 16 }}>
          <Statistic
            value={percentageChange}
            precision={2}
            valueStyle={{ color: isPositive ? "#cf1322" : "#3f8600" }}
            prefix={
              type == "income" ? (
                isPositive ? (
                  <ArrowDownOutlined />
                ) : (
                  <ArrowUpOutlined />
                )
              ) : isPositive ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            // suffix="%"
          />
        </div>
      </div>
      <Text>
        {type == "income"
          ? isPositive
            ? "Disminución"
            : "Aumento"
          : isPositive
          ? "Aumento"
          : "Disminución"}{" "}
        respecto al mes anterior
      </Text>
    </Card>
  );
};

export default StatisticCard;
