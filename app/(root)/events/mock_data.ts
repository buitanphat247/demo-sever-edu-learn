import type { EventDetail } from "@/app/components/events/EventDetailModal";

const statuses = ["Sắp diễn ra", "Đang diễn ra", "Đã kết thúc"];
const colors = ["blue", "green", "default"];
const locations = [
  "Trực tuyến",
  "Phòng A101",
  "Phòng B202",
  "Hội trường lớn",
  "Phòng C303",
  "Phòng D404",
  "Trung tâm Hội nghị",
  "Phòng E505",
];

const organizers = [
  "Ban Giáo dục",
  "Trung tâm Đào tạo",
  "Ban Tổ chức",
  "Phòng Đào tạo",
  "Ban Công nghệ",
  "Trung tâm Phát triển Kỹ năng",
  "Ban Nghiên cứu",
  "Phòng Quan hệ Công chúng",
];

const titles = [
  "Hội thảo: Công nghệ trong Giáo dục",
  "Workshop: Kỹ năng thuyết trình hiệu quả",
  "Cuộc thi: Sáng tạo dự án số",
  "Seminar: Phương pháp học tập hiện đại",
  "Training: Kỹ năng làm việc nhóm",
  "Hội thảo: Tương lai của AI trong giáo dục",
  "Workshop: Thiết kế đồ họa chuyên nghiệp",
  "Cuộc thi: Hackathon công nghệ",
  "Seminar: Quản lý thời gian hiệu quả",
  "Training: Phát triển kỹ năng mềm",
  "Hội thảo: Blockchain trong giáo dục",
  "Workshop: Marketing số cho doanh nghiệp",
  "Cuộc thi: Thiết kế website đẹp nhất",
  "Seminar: Tư duy phản biện và sáng tạo",
  "Training: Kỹ năng giao tiếp hiệu quả",
  "Hội thảo: Công nghệ thực tế ảo VR/AR",
  "Workshop: Lập trình web từ cơ bản",
  "Cuộc thi: Sáng tạo ứng dụng di động",
  "Seminar: Phát triển bền vững trong giáo dục",
  "Training: Kỹ năng lãnh đạo",
  "Hội thảo: Trí tuệ nhân tạo và Machine Learning",
  "Workshop: Thiết kế UX/UI chuyên nghiệp",
  "Cuộc thi: Startup Weekend",
  "Seminar: Đổi mới sáng tạo trong giáo dục",
  "Training: Kỹ năng thuyết phục",
  "Hội thảo: Internet of Things (IoT)",
  "Workshop: Phân tích dữ liệu với Python",
  "Cuộc thi: Thiết kế logo và thương hiệu",
  "Seminar: Quản lý dự án hiệu quả",
  "Training: Kỹ năng đàm phán",
];

const descriptions = [
  "Hội thảo sẽ tập trung vào các công nghệ mới nhất trong giáo dục, bao gồm AI, VR/AR, và các nền tảng học tập trực tuyến.",
  "Workshop thực hành về kỹ năng thuyết trình, giúp bạn tự tin hơn khi trình bày ý tưởng trước đám đông.",
  "Cuộc thi dành cho các dự án sáng tạo về công nghệ số, khuyến khích tinh thần đổi mới và sáng tạo.",
  "Seminar về các phương pháp học tập hiện đại, giúp nâng cao hiệu quả học tập và phát triển kỹ năng.",
  "Khóa đào tạo về kỹ năng làm việc nhóm, giao tiếp và hợp tác hiệu quả trong môi trường làm việc.",
  "Hội thảo về tương lai của trí tuệ nhân tạo trong giáo dục, các xu hướng và ứng dụng thực tế.",
  "Học thiết kế đồ họa từ cơ bản đến nâng cao với các công cụ chuyên nghiệp.",
  "Tham gia cuộc thi lập trình và giành giải thưởng hấp dẫn.",
  "Khám phá các phương pháp quản lý thời gian hiệu quả để nâng cao năng suất.",
  "Phát triển các kỹ năng mềm cần thiết trong công việc và cuộc sống.",
  "Tìm hiểu về tiềm năng của blockchain trong lĩnh vực giáo dục.",
  "Học marketing số để phát triển doanh nghiệp trong thời đại số.",
  "Thiết kế website đẹp mắt và chuyên nghiệp với các công nghệ mới nhất.",
  "Phát triển tư duy phản biện và khả năng sáng tạo trong giải quyết vấn đề.",
  "Cải thiện kỹ năng giao tiếp trong mọi tình huống công việc và cuộc sống.",
  "Trải nghiệm công nghệ VR/AR trong giáo dục và khám phá tiềm năng ứng dụng.",
  "Khóa học lập trình web từ cơ bản đến chuyên sâu với các framework hiện đại.",
  "Thiết kế và phát triển ứng dụng di động sáng tạo và hữu ích.",
  "Tìm hiểu về phát triển bền vững và ứng dụng trong giáo dục.",
  "Phát triển kỹ năng lãnh đạo và quản lý đội nhóm hiệu quả.",
  "Khám phá trí tuệ nhân tạo và machine learning trong các ứng dụng thực tế.",
  "Học thiết kế UX/UI chuyên nghiệp để tạo ra trải nghiệm người dùng tuyệt vời.",
  "Tham gia cuộc thi khởi nghiệp và biến ý tưởng thành hiện thực.",
  "Tìm hiểu về đổi mới sáng tạo và cách áp dụng trong giáo dục.",
  "Nâng cao kỹ năng thuyết phục để thành công trong công việc và cuộc sống.",
  "Khám phá Internet of Things và ứng dụng trong các lĩnh vực khác nhau.",
  "Học phân tích dữ liệu với Python để đưa ra quyết định dựa trên dữ liệu.",
  "Thiết kế logo và xây dựng thương hiệu chuyên nghiệp.",
  "Quản lý dự án hiệu quả với các phương pháp và công cụ hiện đại.",
  "Nâng cao kỹ năng đàm phán để đạt được kết quả tốt nhất.",
];

const timeSlots = [
  "08:00 - 10:00",
  "09:00 - 12:00",
  "10:00 - 12:00",
  "14:00 - 17:00",
  "15:00 - 18:00",
  "08:00 - 18:00",
  "09:00 - 11:00",
  "13:00 - 16:00",
  "14:00 - 16:00",
  "19:00 - 21:00",
];

const participantsCounts = [
  "50 người tham gia",
  "80+ người tham gia",
  "100+ người tham gia",
  "150+ người tham gia",
  "200+ thí sinh",
  "300+ người tham gia",
  "500+ người tham gia",
];

function generateDate(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateEventItem(id: number): EventDetail {
  const titleIndex = id % titles.length;
  const descIndex = id % descriptions.length;
  const statusIndex = id % statuses.length;
  const colorIndex = id % colors.length;
  const locationIndex = id % locations.length;
  const organizerIndex = id % organizers.length;
  const timeIndex = id % timeSlots.length;
  const participantIndex = id % participantsCounts.length;
  const dateOffset = Math.floor(id / 2); // Mỗi 2 items có cùng ngày

  return {
    id,
    title: titles[titleIndex],
    date: generateDate(dateOffset),
    time: timeSlots[timeIndex],
    location: locations[locationIndex],
    status: statuses[statusIndex],
    color: colors[colorIndex] as "blue" | "green" | "default",
    description: descriptions[descIndex],
    organizer: organizers[organizerIndex],
    participants: participantsCounts[participantIndex],
  };
}

export const events: EventDetail[] = Array.from({ length: 100 }, (_, index) => 
  generateEventItem(index + 1)
);

