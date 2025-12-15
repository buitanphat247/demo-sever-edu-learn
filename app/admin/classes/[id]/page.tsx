"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  getClassStudentsByClass,
  type ClassDetailResponse,
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

  // Use ref to store stable values
  const classIdRef = useRef(classId);
  const classNameRef = useRef<string>("");

  // Update refs when classId changes
  useEffect(() => {
    classIdRef.current = classId;
  }, [classId]);

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

  // Map ClassStudentRecord to StudentItem
  const mapStudentRecordToItem = useCallback((record: ClassStudentRecord, className: string): StudentItem => {
    if (!record.student) {
      throw new Error("Student data is missing in record");
    }

    // Lấy userId từ student.user_id (vì API trả về user_id trong object student)
    const userId = record.student.user_id || record.user_id;
    
    const displayStatus = record.status === "banned" ? "Bị cấm" : "Đang học";

    return {
      key: String(userId),
      userId: userId,
      studentId: formatStudentId(userId, record.student.username),
      name: record.student.fullname,
      email: record.student.email,
      phone: "",
      class: className,
      status: displayStatus,
      apiStatus: record.status || "online",
      classStudentId: record.id,
    };
  }, []);

  // Fetch class information (separate from students)
  const fetchClassInfo = useCallback(async (): Promise<string> => {
    const currentClassId = classIdRef.current;
    if (!currentClassId) return "";

    try {
      const data = await getClassById(currentClassId);

      // Map class data
      const mappedClassData = {
        id: String(data.class_id),
        name: data.name,
        code: data.code,
        students: data.student_count,
        status: (data.status === "active" ? CLASS_STATUS_MAP.active : CLASS_STATUS_MAP.inactive) as "Đang hoạt động" | "Tạm dừng",
      };

      setClassData(mappedClassData);
      setOriginalClassData(data); // Lưu original data để dùng cho update
      classNameRef.current = data.name; // Store className in ref
      return data.name; // Return className for use in fetchClassStudents
    } catch (error: any) {
      message.error(error?.message || "Không thể tải thông tin lớp học");
      setClassData(null);
      throw error;
    }
  }, [message]);

  // Fetch class students (separate from class info)
  const fetchClassStudents = useCallback(
    async (className?: string) => {
      const currentClassId = classIdRef.current;
      if (!currentClassId) return;

      const startTime = Date.now();
      try {
        const records = await getClassStudentsByClass({
          classId: currentClassId,
          page: 1,
          limit: 1000, // Lấy tất cả học sinh
        });

        // Use provided className or fallback to ref
        const studentClassName = className || classNameRef.current || "";

        // Map students - chỉ lấy học sinh có status "online" (loại bỏ "banned")
        const mappedStudents: StudentItem[] = records
          .filter((record: ClassStudentRecord) => record.status === "online")
          .map((record: ClassStudentRecord) => mapStudentRecordToItem(record, studentClassName));

        // Ensure minimum loading time
        await ensureMinLoadingTime(startTime);

        setStudents(mappedStudents);
      } catch (error: any) {
        // Ensure minimum loading time even on error
        await ensureMinLoadingTime(startTime);
        message.error(error?.message || "Không thể tải danh sách học sinh");
        setStudents([]);
      }
    },
    [message, mapStudentRecordToItem]
  );

  // Fetch both class info and students
  const fetchClassDetail = useCallback(async () => {
    const currentClassId = classIdRef.current;
    if (!currentClassId) return;

    setLoading(true);
    try {
      // Fetch class info first and get className
      const className = await fetchClassInfo();
      // Then fetch students with className
      await fetchClassStudents(className);
    } catch (error) {
      // Error already handled in fetchClassInfo
    } finally {
      setLoading(false);
    }
  }, [fetchClassInfo, fetchClassStudents]);

  // Only fetch when classId changes
  useEffect(() => {
    if (classId) {
      fetchClassDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  const handleEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    const currentClassId = classIdRef.current;
    const currentClassName = classNameRef.current;

    modal.confirm({
      title: "Xác nhận xóa lớp học",
      content: `Bạn có chắc chắn muốn xóa lớp học "${currentClassName}"? Hành động này không thể hoàn tác.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteClass(currentClassId);
          message.success(`Đã xóa lớp học "${currentClassName}" thành công`);
          // Redirect về trang danh sách lớp học
          router.push("/admin/classes");
        } catch (error: any) {
          message.error(error?.message || "Không thể xóa lớp học");
        }
      },
    });
  }, [modal, message, router]);

  const handleViewStudent = useCallback((student: StudentItem) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  }, []);

  const handleViewBanned = useCallback((student: StudentItem) => {
    setSelectedStudent(student);
    setIsBannedModalOpen(true);
  }, []);

  const handleBanStudent = useCallback(
    (student: StudentItem) => {
      const currentClassId = classIdRef.current;

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
              const id = await getClassStudentId(currentClassId, student.userId);
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
    },
    [modal, message]
  );

  const handleRemoveStudent = useCallback(
    (student: StudentItem) => {
      const currentClassId = classIdRef.current;
      const currentClassName = classNameRef.current;

      modal.confirm({
        title: "Xác nhận xóa học sinh",
        content: `Bạn có chắc chắn muốn xóa học sinh "${student.name}" ra khỏi lớp "${currentClassName}"?`,
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            console.log(student);
            await removeStudentFromClass({
              classId: currentClassId,
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
    },
    [modal, message]
  );

  const handleAddSingle = useCallback(() => {
    setIsAddSingleModalOpen(true);
  }, []);

  const handleAddMultiple = useCallback(() => {
    setIsAddMultipleModalOpen(true);
  }, []);

  const handleViewBannedList = useCallback(() => {
    setIsBannedListModalOpen(true);
  }, []);

  const handleAddStudentSuccess = useCallback(
    (student: StudentResponse, classStudentResponse: AddStudentToClassResponse) => {
      const currentClassName = classNameRef.current;

      // Map API student to StudentItem format
      const newStudent: StudentItem = {
        key: String(student.user_id),
        userId: student.user_id,
        studentId: formatStudentId(student.user_id, student.username),
        name: student.fullname,
        email: student.email,
        phone: student.phone || "",
        class: currentClassName,
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
    },
    [message]
  );

  // Get existing student IDs for filtering (memoized)
  const existingStudentIds = useMemo(() => students.map((s) => s.key), [students]);

  // Memoize classInfo object to prevent unnecessary rerenders
  const classInfo = useMemo(() => {
    if (!classData) return null;
    return {
      name: classData.name,
      code: classData.code,
      students: classData.students,
      status: classData.status,
    };
  }, [classData]);

  // Memoize modal classInfo
  const modalClassInfo = useMemo(() => {
    if (!classData) return { name: "", code: "" };
    return {
      name: classData.name,
      code: classData.code,
    };
  }, [classData]);

  // Memoize callbacks for modals
  const handleCloseViewModal = useCallback(() => {
    setIsViewModalOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleCloseBannedModal = useCallback(() => {
    setIsBannedModalOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleCloseAddSingleModal = useCallback(() => {
    setIsAddSingleModalOpen(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const handleCloseBannedListModal = useCallback(() => {
    setIsBannedListModalOpen(false);
  }, []);

  const handleUpdateClassSuccess = useCallback((updatedName: string) => {
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
    classNameRef.current = updatedName; // Update ref
  }, []);

  const handleUnbanSuccess = useCallback(() => {
    // Refresh students list và class info để cập nhật số lượng học sinh
    const currentClassName = classNameRef.current;
    if (currentClassName) {
      fetchClassStudents(currentClassName);
      fetchClassInfo(); // Refresh để cập nhật student_count
    }
  }, [fetchClassStudents, fetchClassInfo]);

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
      {classInfo && <ClassInfoCard classInfo={classInfo} />}

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
      {originalClassData && classData && (
        <UpdateClassModal
          open={isEditModalOpen}
          classId={classId}
          currentName={classData.name}
          currentCode={classData.code}
          currentStudentCount={classData.students}
          currentStatus={originalClassData.status}
          onCancel={handleCloseEditModal}
          onSuccess={handleUpdateClassSuccess}
        />
      )}

      {/* Modal thêm học sinh single */}
      <AddSingleStudentModal
        open={isAddSingleModalOpen}
        classId={classId}
        existingStudentIds={existingStudentIds}
        onCancel={handleCloseAddSingleModal}
        onSuccess={handleAddStudentSuccess}
      />

      {/* Modal xem chi tiết học sinh */}
      <StudentDetailModal open={isViewModalOpen} onCancel={handleCloseViewModal} student={selectedStudent} classInfo={modalClassInfo} />

      {/* Modal học sinh bị cấm */}
      <BannedStudentModal open={isBannedModalOpen} onCancel={handleCloseBannedModal} student={selectedStudent} classInfo={modalClassInfo} />

      {/* Modal danh sách học sinh bị cấm */}
      {classData && (
        <BannedListModal
          open={isBannedListModalOpen}
          onCancel={handleCloseBannedListModal}
          classId={classId}
          className={classData.name}
          onUnbanSuccess={handleUnbanSuccess}
        />
      )}
    </div>
  );
}
