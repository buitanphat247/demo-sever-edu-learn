"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { App, Button, Table, Tag, Input, Tooltip, Avatar } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  PaperClipOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import CustomCard from "@/app/components/common/CustomCard";
import DataLoadingSplash from "@/app/components/common/DataLoadingSplash";
import { getAssignmentById, type AssignmentDetailResponse } from "@/lib/api/assignments";
import { getSubmissions, type StudentSubmission } from "@/lib/api/submissions";
import { getClassStudentsByClass } from "@/lib/api/classes";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const classId = params?.id as string;
  const exerciseId = params?.exerciseId as string;

  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<AssignmentDetailResponse | null>(null);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [students, setStudents] = useState<any[]>([]); // Store class student list to map names
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Fetch Assignment Details
      const assignmentData = await getAssignmentById(exerciseId);
      setAssignment(assignmentData);

      // 2. Fetch Class Students (to get full list even if not submitted)
      // Note: We need a way to get all students. Using existing API.
      // Assuming paginated, we might need a large limit or proper handling.
      // For now, let's fetch submissions and map known students. 
      // If we want "Not submitted" status, we need the full student list.
      const studentsData = await getClassStudentsByClass({ classId, limit: 1000 });
      setStudents(studentsData);

      // 3. Fetch Submissions
      const submissionsData = await getSubmissions({ 
        assignmentId: Number(exerciseId),
        classId: Number(classId),
        limit: 1000 // Get all
      });
      setSubmissions(submissionsData.data);

    } catch (error: any) {
      console.error(error);
      message.error("Không thể tải thông tin bài tập");
    } finally {
      setLoading(false);
    }
  }, [exerciseId, classId, message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Merge students and submissions
  const studentSubmissionMap = submissions.reduce((acc, sub) => {
    acc[sub.student_id] = sub;
    return acc;
  }, {} as Record<number, StudentSubmission>);

  const dataSource = students.map((record: any) => {
    const student = record.student;
    const submission = studentSubmissionMap[student.user_id];
    
    return {
      key: student.user_id,
      studentId: student.id || student.user_id, // Adjust based on actual API response structure
      name: student.fullname,
      email: student.email,
      avatar: student.avatar,
      submission: submission,
      status: submission ? submission.status : "not_submitted",
    };
  }).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnsType<any> = [
    {
      title: "Học sinh",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-gray-800">{text}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let text = "Chưa nộp";
        let icon = <CloseCircleOutlined />;

        if (status === "submitted" || status === "resubmitted") {
          color = "success";
          text = "Đã nộp";
          icon = <CheckCircleOutlined />;
        } else if (status === "late") {
          color = "warning";
          text = "Nộp muộn";
          icon = <ClockCircleOutlined />;
        } else if (status === "graded") {
            color = "blue";
            text = "Đã chấm";
            icon = <CheckCircleOutlined />;
        }

        return <Tag color={color} icon={icon}>{text}</Tag>;
      },
    },
    {
      title: "Thời gian nộp",
      dataIndex: "submission",
      key: "submitted_at",
      render: (submission) => 
        submission ? dayjs(submission.submitted_at).format("HH:mm - DD/MM/YYYY") : "-",
    },
    {
       title: "File đính kèm",
       dataIndex: "submission",
       key: "files",
       render: (submission) => {
           if (!submission || !submission.attachments || submission.attachments.length === 0) return "-";
           return (
               <div className="flex flex-col gap-1">
                   {submission.attachments.map((att: any) => (
                       <a 
                          key={att.id} 
                          href={att.file_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        >
                           <PaperClipOutlined /> {att.file_name}
                        </a>
                   ))}
               </div>
           );
       }
    },
    // {
    //   title: "Điểm số",
    //   dataIndex: "submission",
    //   key: "grade",
    //   render: (submission) => submission?.grade !== undefined ? submission.grade : "-",
    // },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        record.submission ? (
            <Tooltip title="Xem chi tiết & Chấm điểm">
                 <Button 
                    type="primary" 
                    ghost 
                    size="small" 
                    icon={<EyeOutlined />} 
                    onClick={() => {
                        // TODO: Navigate to grading page or open modal
                        // router.push(`/admin/classes/${classId}/exercises/${exerciseId}/grading/${record.studentId}`);
                        message.info("Tính năng chấm điểm đang phát triển");
                    }}
                />
            </Tooltip>
        ) : null
      ),
    },
  ];

  if (loading) return <DataLoadingSplash tip="Đang tải thông tin..." />;
  if (!assignment) return <div className="p-8 text-center">Bài tập không tồn tại</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push(`/admin/classes/${classId}`)}
            className="border-none bg-white shadow-sm hover:bg-gray-100 dark:bg-gray-800"
          >
            Quay lại
          </Button>
          <div>
             <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {assignment.title}
             </h1>
             <div className="flex items-center gap-4 text-sm text-gray-500">
                <span><ClockCircleOutlined /> Hạn nộp: {assignment.due_at ? dayjs(assignment.due_at).format("HH:mm - DD/MM/YYYY") : "Không có"}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <CustomCard className="lg:col-span-1 h-fit" padding="sm">
              <div className="space-y-4">
                  <div className="text-gray-500 font-medium border-b border-gray-100 pb-2">Thống kê nộp bài</div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{submissions.length}</div>
                          <div className="text-xs text-blue-400 font-medium uppercase">Đã nộp</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-600">{students.length - submissions.length}</div>
                          <div className="text-xs text-gray-400 font-medium uppercase">Chưa nộp</div>
                      </div>
                  </div>
              </div>
          </CustomCard>

          {/* Submissions Table */}
          <div className="lg:col-span-3">
              <CustomCard padding="none">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-bold text-gray-700">Danh sách bài làm</h3>
                      <Input 
                        placeholder="Tìm kiếm học sinh..." 
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="w-64"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                  </div>
                  <Table 
                    columns={columns} 
                    dataSource={dataSource}
                    pagination={{ pageSize: 10 }}
                    rowClassName="hover:bg-gray-50"
                  />
              </CustomCard>
          </div>
      </div>
    </div>
  );
}
