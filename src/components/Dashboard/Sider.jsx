import { Layout, Menu } from 'antd';
import { PieChartOutlined, DesktopOutlined, FileOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const DashboardSider = ({ collapsed, setCollapsed, setViewKey }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="cursor-pointer"
        items={[
          {
            key: "1",
            icon: <PieChartOutlined />,
            label: "Charge expenses",
            onClick: () => setViewKey(1),
          },
          {
            key: "2",
            icon: <DesktopOutlined />,
            label: "Daily expenses",
            onClick: () => setViewKey(2),
          },
          {
            key: "3",
            icon: <FileOutlined />,
            label: "Configuration",
            onClick: () => setViewKey(3),
          },
        ]}
      />
    </Sider>
  );
};

export default DashboardSider;