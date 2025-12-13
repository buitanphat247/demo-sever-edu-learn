"use client";

import { Modal, Table, Input, Button, App, Spin } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import { getStudents, type StudentResponse } from "@/lib/api/users";
import { addStudentToClass, type AddStudentToClassResponse } from "@/lib/api/classes";
import type { ColumnsType } from "antd/es/table";
import { ensureMinLoadingTime, calculatePaginationAdjustment, DEFAULT_PAGE_SIZE } from "@/lib/utils/classUtils";

interface AddSingleStudentModalProps {
  open: boolean;
  classId: string | number;
  existingStudentIds: (string | number)[];
  onCancel: () => void;
  onSuccess: (student: StudentResponse, classStudentResponse: AddStudentToClassResponse) => void;
}

export default function AddSingleStudentModal({ open, classId, existingStudentIds, onCancel, onSuccess }: AddSingleStudentModalProps) {
  const { message } = App.useApp();
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch students from API with server-side pagination and search
  const fetchStudents = useCallback(async () => {
    const startTime = Date.now();
    try {
      setLoading(true);
      const result = await getStudents({
        classId: classId,
        page: pagination.current,
        limit: pagination.pageSize,
        search: debouncedSearchQuery || undefined,
      });

      // Calculate pagination adjustment if needed
      const adjustedPage = calculatePaginationAdjustment(
        pagination.current,
        result.total,
        pagination.pageSize,
        result.students.length
      );

      // If page needs adjustment, update pagination and let useEffect trigger new fetch
      if (adjustedPage !== null) {
        setPagination((prev) => ({
          ...prev,
          current: adjustedPage,
          total: result.total,
        }));
        await ensureMinLoadingTime(startTime);
        setLoading(false);
        return; // Exit early, useEffect will trigger new fetch with adjusted page
      }

      setStudents(result.students);
      setPagination((prev) => ({
        ...prev,
        total: result.total,
        page: result.page,
        limit: result.limit,
      }));

      // Ensure minimum loading time to prevent UI jitter
      await ensureMinLoadingTime(startTime);
    } catch (error: any) {
      // Ensure minimum loading time even on error
      await ensureMinLoadingTime(startTime);

      message.error(error?.message || "Không thể tải danh sách học sinh");
    } finally {
      setLoading(false);
    }
  }, [classId, pagination.current, pagination.pageSize, debouncedSearchQuery, message]);

  // Fetch students when modal opens, pagination changes, or search query changes
  useEffect(() => {
    if (open) {
      fetchStudents();
    }
  }, [open, pagination.current, pagination.pageSize, debouncedSearchQuery, fetchStudents]);

  // Reset search when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setDebouncedSearchQuery("");
      setPagination((prev) => ({ ...prev, current: 1 }));
    }
  }, [open]);

  // No need for client-side filtering, API handles search

  const handleTableChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  const handleAddStudent = async (student: StudentResponse) => {
    try {
      // Gọi API để thêm học sinh vào lớp
      const response = await addStudentToClass({
        class_id: classId,
        user_id: student.user_id,
      });

      // Loại bỏ học sinh vừa thêm khỏi danh sách hiện tại
      setStudents((prev) => prev.filter((s) => s.user_id !== student.user_id));

      // Gọi callback để cập nhật UI, truyền cả response để có classStudentId
      onSuccess(student, response);

      // Re-fetch để cập nhật danh sách (API đã tự động filter học sinh đã thêm)
      setTimeout(() => {
        fetchStudents();
      }, 250);
    } catch (error: any) {
      message.error(error?.message || "Không thể thêm học sinh vào lớp");
    }
  };

  const columns: ColumnsType<StudentResponse> = [
    {
      title: "Mã học sinh",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">{text}</span>,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      width: "50%",
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: StudentResponse) => (
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="small"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => handleAddStudent(record)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  return (
    <Modal title="Thêm học sinh vào lớp" open={open} onCancel={onCancel} footer={null} width={800} destroyOnClose={true}>
      <div className="space-y-4">
        {/* Search */}
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm kiếm theo tên, email, username..."
          size="middle"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />

        {/* Table */}
        <Spin spinning={loading}>
          <div>
            <Table
              columns={columns}
              dataSource={students}
              rowKey={(record) => String(record.user_id)}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showTotal: (total) => `Tổng ${total} học sinh`,
                showSizeChanger: false,
                pageSizeOptions: ["10", "20", "50"],
                onChange: handleTableChange,
              }}
              size="small"
            />
          </div>
        </Spin>
      </div>
    </Modal>
  );
}
