"use client";

import React from "react";
import { Result, Button, Empty } from "antd";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  type: "noTestId" | "notFound";
  classId: string;
}

export default function ErrorState({ type, classId }: ErrorStateProps) {
  const router = useRouter();

  if (type === "noTestId") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Result
          status="warning"
          title="Thiếu mã bộ đề"
          subTitle="Vui lòng quay lại trang tạo đề AI."
          extra={
            <Button type="primary" onClick={() => router.push(`/admin/classes/${classId}/examinate`)}>
              Quay lại
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Empty description="Không tìm thấy bộ đề" />
    </div>
  );
}
