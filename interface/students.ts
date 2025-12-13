export interface StudentItem {
  key: string;
  userId: number | string; // ID của người dùng (user_id) để xóa học sinh
  name: string;
  studentId: string;
  class: string;
  email: string;
  phone: string;
  status: "Đang học" | "Tạm nghỉ" | "Đã tốt nghiệp" | "Bị cấm";
  apiStatus?: string; // Status từ API: "online" | "banned"
  classStudentId?: number | string; // ID của bản ghi class-student để update status
}

