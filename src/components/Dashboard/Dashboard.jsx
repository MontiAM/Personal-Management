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
    <Layout className="relative">  
      <DashboardSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setViewKey={setViewKey}
      />
      <Layout
      
        className={`site-layout transition-all duration-300 ml-${
          collapsed ? "20" : "80"
        } h-full`}
      >
        <Content className="p-4 overflow-auto">
          {viewKey === 1 && <ChargeExpenses />}
          {viewKey === 2 && <DailyExpenses />}
          {viewKey === 3 && <Configuration />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
