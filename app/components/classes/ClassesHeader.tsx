"use client";

import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined, KeyOutlined } from "@ant-design/icons";

interface ClassesHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onAddClick?: () => void;
  onJoinClick?: () => void;
}

export default function ClassesHeader({ searchValue, onSearchChange, onAddClick, onJoinClick }: ClassesHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm kiếm lớp học... (Ctrl+K)"
          size="middle"
          className="flex-1 min-w-[200px]"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          allowClear
        />
        {onJoinClick && (
          <Button type="primary" icon={<KeyOutlined />} size="middle" onClick={onJoinClick} className="shadow-sm">
            Tham gia bằng code
          </Button>
        )}
        {onAddClick && (
          <Button
            type="default"
            icon={<PlusOutlined />}
            size="middle"
            className="bg-white border-gray-300 hover:bg-gray-50 shadow-sm"
            onClick={onAddClick}
          >
            Thêm lớp học
          </Button>
        )}
      </div>
    </div>
  );
}
