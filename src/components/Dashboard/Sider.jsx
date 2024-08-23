import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  AreaChartOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

const DashboardSider = ({ collapsed, setCollapsed, setViewKey }) => {
  return (
    <Sider
      className="fixed top-0 left-0 "
      style={{ minHeight: "calc(100vh - 3.25rem)" }}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["2"]}
        mode="inline"
        className="cursor-pointer relative"
        items={[
          // {
          //   key: "1",
          //   icon: <PieChartOutlined />,
          //   label: "Charge expenses",
          //   onClick: () => setViewKey(1),
          // },
          {
            key: "2",
            icon: <FileOutlined />,
            label: "Daily expenses",
            onClick: () => setViewKey(2),
          },
          {
            key: "3",
            icon: <AreaChartOutlined />,
            label: "Statistics",
            onClick: () => setViewKey(3),
          },
          {
            key: "4",
            icon: <DesktopOutlined />,
            label: "Configuration",
            onClick: () => setViewKey(4),
          },
        ]}
      />
    </Sider>
  );
};

export default DashboardSider;
