"use client";

import { useState, useEffect } from "react";
import { Layout } from "antd";
import DashboardSider from "./Sider";
import DailyExpenses from "./DailyExpenses/DailyExpenses";
import Statistics from "./Statistics/Statistics"
import Configuration from "./Configuration/Configuration";
import Parameters from "./Parameters/Parameters" 

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

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>  
      <DashboardSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setViewKey={setViewKey}
      />
      <Layout
      
        className={`pt-10 site-layout transition-all duration-300 ml-${
          collapsed ? "20" : "80"
        } h-full`}
      >
        <Content className="p-4 overflow-auto">
          {viewKey === 1 && <DailyExpenses />}
          {viewKey === 2 && <Statistics />}
          {viewKey === 3 && <Parameters />}
          {viewKey === 4 && <Configuration />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
