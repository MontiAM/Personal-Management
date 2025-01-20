import { Layout, Menu } from "antd";
import {
  ControlOutlined,
  DesktopOutlined,
  FileOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const DashboardSider = ({ collapsed, setCollapsed, setViewKey }) => {
  return (
    <Sider
      style={{
        height: "100vh",
        position: "sticky", 
        top: 0, 
        overflow: "hidden", 
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="cursor-pointer pt-14"
        items={[
          {
            key: "1",
            icon: <FileOutlined />,
            label: "Daily expenses",
            onClick: () => setViewKey(1),
          },
          {
            key: "2",
            icon: <AreaChartOutlined />,
            label: "Statistics",
            onClick: () => setViewKey(2),
          },
          {
            key: "3",
            icon: <ControlOutlined />,
            label: "Parameters",
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
