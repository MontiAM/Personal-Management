"use client";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import DashboardSider from "./Sider";
import ChargeExpenses from "./ChargeExpenses";
import DailyExpenses from "./DailyExpenses";
import Configuration from "./Configuration";

const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewKey, setViewKey] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Ejecutar la función al montar el componente
    handleResize();

    // Agregar el event listener
    window.addEventListener("resize", handleResize);

    // Cleanup el event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh"}}>
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
