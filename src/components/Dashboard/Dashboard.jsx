"use client";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import DashboardSider from "./Sider";
import ChargeExpenses from "./ChargeExpenses/ChargeExpenses";
import DailyExpenses from "./DailyExpenses/DailyExpenses";
import Configuration from "./Configuration/Configuration";

const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewKey, setViewKey] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ height: "calc(100vh - 3.25rem)"}}>
      <DashboardSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setViewKey={setViewKey}
      />
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          {viewKey === 1 && <ChargeExpenses />}
          {viewKey === 2 && <DailyExpenses />}
          {viewKey === 3 && <Configuration />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
