"use client"
import { useState } from 'react';
import { Layout } from 'antd';
import DashboardSider from '../../components/Dashboard/Sider';
import ChargeExpenses from '../../components/Dashboard/ChargeExpenses';
import DailyExpenses from '../../components/Dashboard/DailyExpenses';
import Configuration from '../../components/Dashboard/Configuration';

const { Content } = Layout;

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewKey, setViewKey] = useState(1);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setViewKey={setViewKey}
      />
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          {viewKey === 1 && <ChargeExpenses />}
          {viewKey === 2 && <DailyExpenses />}
          {viewKey === 3 && <Configuration />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
