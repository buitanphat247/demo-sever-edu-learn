"use client";

import { Modal, Form, Input, Select, Button, App } from "antd";
import { useState, useEffect } from "react";
import { createNotification, type CreateNotificationParams, type NotificationResponse } from "@/lib/api/notifications";
import { getClassesByUser, type ClassResponse } from "@/lib/api/classes";
import { getUserIdFromCookie } from "@/lib/utils/cookies";

const { TextArea } = Input;
const { Option } = Select;

interface CreateNotificationModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: (created: NotificationResponse) => void;
}

export default function CreateNotificationModal({ open, onCancel, onSuccess }: CreateNotificationModalProps) {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [classes, setClasses] = useState<ClassResponse[]>([]);

  useEffect(() => {
    if (open) {
      form.resetFields();
      fetchClasses();
    }
  }, [open, form]);

  // Fetch classes when modal opens
  const fetchClasses = async () => {
    const userId = getUserIdFromCookie();
    if (!userId) {
      message.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    setLoadingClasses(true);
    try {
      const result = await getClassesByUser({
        userId: userId,
        page: 1,
        limit: 1000, // Lấy tất cả lớp học
      });
      setClasses(result.classes);
    } catch (error: any) {
      message.error(error?.message || "Không thể tải danh sách lớp học");
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const userId = getUserIdFromCookie();
      if (!userId) {
        message.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        setSubmitting(false);
        return;
      }

      const classId = values.class_id;
      if (!classId) {
        message.error("Vui lòng chọn lớp học");
        setSubmitting(false);
        return;
      }

      const numericUserId = typeof userId === "string" ? Number(userId) : userId;

      const params: CreateNotificationParams = {
        title: values.title,
        message: values.message,
        scope: "class",
        scope_id: Number(classId),
        created_by: numericUserId,
      };
      const created = await createNotification(params);
      onSuccess(created);

      message.success("Tạo thông báo thành công!");
      form.resetFields();
    } catch (error: any) {
      message.error(error?.message || "Không thể tạo thông báo");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (submitting) {
      message.warning("Đang tạo thông báo, vui lòng đợi...");
      return;
    }
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Tạo thông báo mới"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      maskClosable={!submitting}
      closable={!submitting}
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề" },
            { max: 255, message: "Tiêu đề không được vượt quá 255 ký tự" },
          ]}
        >
          <Input
            placeholder="Nhập tiêu đề thông báo"
            disabled={submitting}
            size="middle"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </Form.Item>

        <Form.Item
          name="message"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung thông báo" }]}
        >
          <TextArea
            placeholder="Nhập nội dung thông báo"
            rows={4}
            disabled={submitting}
            showCount
            maxLength={5000}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </Form.Item>

        <Form.Item
          name="class_id"
          label="Lớp học"
          rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}
        >
          <Select
            placeholder="Chọn lớp học"
            disabled={submitting || loadingClasses}
            size="middle"
            loading={loadingClasses}
            allowClear
          >
            {classes.map((cls) => (
              <Option key={cls.class_id} value={cls.class_id}>
                {cls.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} disabled={submitting} size="middle">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting} size="middle" className="bg-blue-500 hover:bg-blue-600">
              {submitting ? "Đang tạo..." : "Tạo thông báo"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

