"use client";

import { ConfigProvider, App, theme as antTheme } from "antd";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";

function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          fontFamily: "inherit",
          colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          colorBorder: isDark ? "#334155" : "#e2e8f0",
          colorPrimary: "#3b82f6",
          borderRadius: 12,
        },
        components: {
          Button: {
            colorPrimary: "#3b82f6",
            borderRadius: 10,
          },
          Input: {
            colorBgContainer: isDark ? "#0f172a" : "#f8fafc",
            colorBorder: isDark ? "#334155" : "#e2e8f0",
          },
          Select: {
            colorBgContainer: isDark ? "#0f172a" : "#f8fafc",
            colorBorder: isDark ? "#334155" : "#e2e8f0",
          },
          Card: {
            colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          }
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AntdConfigProvider>{children}</AntdConfigProvider>
    </ThemeProvider>
  );
}

