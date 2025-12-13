"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { App, Spin } from "antd";
import StudentDetailModal from "@/app/components/students/StudentDetailModal";
import BannedStudentModal from "@/app/components/students/BannedStudentModal";
import ClassHeader from "@/app/components/classes/ClassHeader";
import ClassInfoCard from "@/app/components/classes/ClassInfoCard";
import ClassStudentsTable from "@/app/components/classes/ClassStudentsTable";
import UpdateClassModal from "@/app/components/classes/UpdateClassModal";
import AddSingleStudentModal from "@/app/components/classes/AddSingleStudentModal";
import BannedListModal from "@/app/components/classes/BannedListModal";
import {
  getClassById,
  removeStudentFromClass,
  deleteClass,
  updateClassStudentStatus,
  getClassStudentId,
  getBannedStudents,
  type ClassDetailResponse,
  type ClassStudent,
  type ClassStudentRecord,
  type AddStudentToClassResponse,
} from "@/lib/api/classes";
import { type StudentResponse } from "@/lib/api/users";
import type { StudentItem } from "@/interface/students";
import { ensureMinLoadingTime, STUDENT_STATUS_MAP, CLASS_STATUS_MAP, formatStudentId } from "@/lib/utils/classUtils";

export default function ClassDetail() {
  const router = useRouter();
  const params = useParams();
  const { modal, message } = App.useApp();
  const classId = params?.id as string;

  const [classData, setClassData] = useState<{
    id: string;
    name: string;
    code: string;
    students: number;
    status: "Đang hoạt động" | "Tạm dừng";
  } | null>(null);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBannedModalOpen, setIsBannedModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAddSingleModalOpen, setIsAddSingleModalOpen] = useState(false);
  const [isAddMultipleModalOpen, setIsAddMultipleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [originalClassData, setOriginalClassData] = useState<ClassDetailResponse | null>(null);
  const [isBannedListModalOpen, setIsBannedListModalOpen] = useState(false);

  // Map API student to StudentItem
  const mapStudentToItem = useCallback((student: ClassStudent, className: string): StudentItem => {
    const displayStatus = student.status === "banned" ? "Bị cấm" : "Đang học";

    return {
      key: String(student.user_id),
      userId: student.user_id,
      studentId: formatStudentId(student.user_id, student.username),
      name: student.fullname,
      email: student.email,
      phone: "",
      class: className,
      status: displayStatus,
      apiStatus: student.status || "online",
      classStudentId: student.id,
    };
  }, []);

  // Fetch class detail
  const fetchClassDetail = useCallback(async () => {
    if (!classId) return;

    const startTime = Date.now();
    try {
      const data = await getClassById(classId);

      // Map class data
      const mappedClassData = {
        id: String(data.class_id),
        name: data.name,
        code: data.code,
        students: data.student_count,
        status: (data.status === "active" ? CLASS_STATUS_MAP.active : CLASS_STATUS_MAP.inactive) as "Đang hoạt động" | "Tạm dừng",
      };

      // Map students - chỉ lấy học sinh có status "online" (loại bỏ "banned")
      const mappedStudents: StudentItem[] = (data.students || [])
        .filter((student: ClassStudent) => student.status === "online")
        .map((student: ClassStudent) => mapStudentToItem(student, data.name));

      // Ensure minimum loading time
      await ensureMinLoadingTime(startTime);

      setClassData(mappedClassData);
      setStudents(mappedStudents);
      setOriginalClassData(data); // Lưu original data để dùng cho update
    } catch (error: any) {
      // Ensure minimum loading time even on error
      await ensureMinLoadingTime(startTime);
      message.error(error?.message || "Không thể tải thông tin lớp học");
      setClassData(null);
    } finally {
      setLoading(false);
    }
  }, [classId, message, mapStudentToItem]);

  useEffect(() => {
    fetchClassDetail();
  }, [fetchClassDetail]);

  const handleEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (!classData) return;
    
    modal.confirm({
      title: "Xác nhận xóa lớp học",
      content: `Bạn có chắc chắn muốn xóa lớp học "${classData.name}"? Hành động này không thể hoàn tác.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteClass(classId);
          message.success(`Đã xóa lớp học "${classData.name}" thành công`);
          // Redirect về trang danh sách lớp học
          router.push("/admin/classes");
        } catch (error: any) {
          message.error(error?.message || "Không thể xóa lớp học");
        }
      },
    });
  }, [classData, classId, modal, message, router]);

  const handleViewStudent = useCallback((student: StudentItem) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  }, []);

  const handleViewBanned = useCallback((student: StudentItem) => {
    setSelectedStudent(student);
    setIsBannedModalOpen(true);
  }, []);

  const handleBanStudent = useCallback((student: StudentItem) => {
    modal.confirm({
      title: "Xác nhận cấm học sinh",
      content: `Bạn có chắc chắn muốn cấm học sinh "${student.name}"? Học sinh này sẽ không thể tham gia các hoạt động của lớp học.`,
      okText: "Cấm",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Lấy class-student id (id của bản ghi class-student) nếu chưa có
          let classStudentId = student.classStudentId;
          if (!classStudentId) {
            // Gọi API để lấy id của bản ghi class-student từ userId
            const id = await getClassStudentId(classId, student.userId);
            if (!id) {
              message.error("Không tìm thấy ID bản ghi học sinh trong lớp");
              return;
            }
            classStudentId = id;
          }

          await updateClassStudentStatus({
            id: classStudentId, // id của bản ghi class-student, không phải userId
            status: "banned",
          });

          // Xóa học sinh khỏi danh sách chính (chỉ hiển thị online)
          setStudents((prev) => prev.filter((s) => s.key !== student.key));
          
          // Cập nhật số lượng học sinh
          setClassData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              students: prev.students - 1,
            };
          });

          message.success(`Đã cấm học sinh "${student.name}"`);
        } catch (error: any) {
          message.error(error?.message || "Không thể cấm học sinh");
        }
      },
    });
  }, [classId, modal, message]);

  const handleRemoveStudent = useCallback((student: StudentItem) => {
    if (!classData) return;
    
    modal.confirm({
      title: "Xác nhận xóa học sinh",
      content: `Bạn có chắc chắn muốn xóa học sinh "${student.name}" ra khỏi lớp "${classData.name}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await removeStudentFromClass({
            classId: classId,
            userId: student.userId,
          });

          // Cập nhật state trực tiếp
          setStudents((prev) => prev.filter((s) => s.key !== student.key));
          setClassData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              students: prev.students - 1,
            };
          });

          message.success(`Đã xóa học sinh "${student.name}" ra khỏi lớp`);
        } catch (error: any) {
          message.error(error?.message || "Không thể xóa học sinh khỏi lớp");
        }
      },
    });
  }, [classData, classId, modal, message]);

  const handleAddSingle = useCallback(() => {
    setIsAddSingleModalOpen(true);
  }, []);

  const handleAddMultiple = useCallback(() => {
    setIsAddMultipleModalOpen(true);
  }, []);

  const handleViewBannedList = useCallback(() => {
    setIsBannedListModalOpen(true);
  }, []);

  const handleAddStudentSuccess = useCallback((student: StudentResponse, classStudentResponse: AddStudentToClassResponse) => {
    // Map API student to StudentItem format
    const newStudent: StudentItem = {
      key: String(student.user_id),
      userId: student.user_id,
      studentId: formatStudentId(student.user_id, student.username),
      name: student.fullname,
      email: student.email,
      phone: student.phone || "",
      class: classData?.name || "",
      status: "Đang học" as const,
      apiStatus: "online",
      classStudentId: classStudentResponse.id,
    };

    // Cập nhật state trực tiếp
    setStudents((prev) => [...prev, newStudent]);
    setClassData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        students: prev.students + 1,
      };
    });

    message.success(`Đã thêm học sinh "${student.fullname}" vào lớp`);
  }, [classData?.name, message]);

  // Get existing student IDs for filtering (memoized)
  const existingStudentIds = useMemo(() => students.map((s) => s.key), [students]);

  // Early returns after all hooks
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large">
          <div style={{ minHeight: "200px" }} />
        </Spin>
        <div className="absolute text-gray-600 mt-20">Đang tải thông tin lớp học...</div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="space-y-6">
        <ClassHeader className="Lớp học" onEdit={() => {}} onDelete={() => {}} />
        <ClassInfoCard
          classInfo={{
            name: "Không tìm thấy",
            code: "N/A",
            students: 0,
            status: "Không tồn tại",
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ClassHeader className={classData.name} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Thông tin lớp học */}
      <ClassInfoCard
        classInfo={{
          name: classData.name,
          code: classData.code,
          students: classData.students,
          status: classData.status,
        }}
      />

      {/* Danh sách học sinh */}
      <ClassStudentsTable
        students={students}
        onViewStudent={handleViewStudent}
        onRemoveStudent={handleRemoveStudent}
        onAddSingle={handleAddSingle}
        onAddMultiple={handleAddMultiple}
        onViewBanned={handleViewBanned}
        onViewBannedList={handleViewBannedList}
        onBanStudent={handleBanStudent}
      />

      {/* Modal chỉnh sửa lớp học */}
      {originalClassData && (
        <UpdateClassModal
          open={isEditModalOpen}
          classId={classId}
          currentName={classData.name}
          currentCode={classData.code}
          currentStudentCount={classData.students}
          currentStatus={originalClassData.status}
          onCancel={() => setIsEditModalOpen(false)}
          onSuccess={(updatedName) => {
            setIsEditModalOpen(false);
            // Cập nhật state trực tiếp thay vì gọi lại API
            setClassData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                name: updatedName,
              };
            });
            // Cập nhật originalClassData để đồng bộ
            setOriginalClassData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                name: updatedName,
              };
            });
          }}
        />
      )}

      {/* Modal thêm học sinh single */}
      {classData && (
        <AddSingleStudentModal
          open={isAddSingleModalOpen}
          classId={classId}
          existingStudentIds={existingStudentIds}
          onCancel={() => setIsAddSingleModalOpen(false)}
          onSuccess={handleAddStudentSuccess}
        />
      )}

      {/* Modal xem chi tiết học sinh */}
      <StudentDetailModal
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        classInfo={{
          name: classData.name,
          code: classData.code,
        }}
      />

      {/* Modal học sinh bị cấm */}
      <BannedStudentModal
        open={isBannedModalOpen}
        onCancel={() => {
          setIsBannedModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        classInfo={{
          name: classData.name,
          code: classData.code,
        }}
      />

      {/* Modal danh sách học sinh bị cấm */}
      <BannedListModal
        open={isBannedListModalOpen}
        onCancel={() => setIsBannedListModalOpen(false)}
        classId={classId}
        className={classData.name}
        onUnbanSuccess={() => {
          // Refresh class detail để cập nhật số lượng học sinh
          fetchClassDetail();
        }}
      />
    </div>
  );
}
