export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const categories = ["Tin tức", "Sự kiện", "Thông báo", "Hướng dẫn", "Cập nhật"];
const images = ["/images/banner/1.webp", "/images/banner/2.webp", "/images/banner/3.webp"];

const titles = [
  "Khai giảng khóa học mới - Nâng cao kỹ năng lập trình",
  "Hội thảo trực tuyến: Xu hướng giáo dục số 2024",
  "Ra mắt tính năng học tập AI mới",
  "Chương trình khuyến mãi đặc biệt tháng 1",
  "Workshop: Kỹ năng thuyết trình hiệu quả",
  "Cập nhật hệ thống học tập mới",
  "Tuyển sinh khóa học tiếng Anh giao tiếp",
  "Seminar: Phương pháp học tập hiện đại",
  "Cuộc thi: Sáng tạo dự án số",
  "Training: Kỹ năng làm việc nhóm",
  "Hội thảo: Tương lai của AI trong giáo dục",
  "Ra mắt ứng dụng học tập di động",
  "Chương trình đào tạo giáo viên 2024",
  "Workshop: Thiết kế đồ họa chuyên nghiệp",
  "Cập nhật nội dung khóa học mới nhất",
  "Tuyển dụng giảng viên tiếng Nhật",
  "Seminar: Kỹ năng quản lý thời gian",
  "Cuộc thi: Hackathon công nghệ giáo dục",
  "Training: Phát triển kỹ năng mềm",
  "Hội thảo: Blockchain trong giáo dục",
  "Ra mắt nền tảng học trực tuyến mới",
  "Chương trình học bổng đặc biệt",
  "Workshop: Marketing số cho doanh nghiệp",
  "Cập nhật tính năng chat trực tuyến",
  "Tuyển sinh khóa học lập trình web",
  "Seminar: Tư duy phản biện và sáng tạo",
  "Cuộc thi: Thiết kế website đẹp nhất",
  "Training: Kỹ năng giao tiếp hiệu quả",
  "Hội thảo: Công nghệ thực tế ảo VR/AR",
  "Ra mắt hệ thống quản lý học tập LMS",
];

const excerpts = [
  "Tham gia khóa học lập trình chuyên sâu với các công nghệ mới nhất...",
  "Cùng các chuyên gia hàng đầu thảo luận về tương lai của giáo dục...",
  "Trải nghiệm học tập cá nhân hóa với công nghệ trí tuệ nhân tạo...",
  "Giảm giá 50% cho tất cả khóa học trong tháng này...",
  "Học cách thuyết trình tự tin và thu hút khán giả...",
  "Nâng cấp giao diện và tính năng để trải nghiệm tốt hơn...",
  "Nâng cao khả năng giao tiếp tiếng Anh trong công việc và cuộc sống...",
  "Khám phá các phương pháp học tập hiện đại và hiệu quả...",
  "Thể hiện tài năng sáng tạo với các dự án công nghệ số...",
  "Phát triển kỹ năng hợp tác và làm việc nhóm hiệu quả...",
  "Tìm hiểu về ứng dụng AI trong lĩnh vực giáo dục...",
  "Học mọi lúc mọi nơi với ứng dụng di động tiện lợi...",
  "Nâng cao trình độ chuyên môn cho đội ngũ giáo viên...",
  "Học thiết kế đồ họa từ cơ bản đến nâng cao...",
  "Cập nhật nội dung mới nhất theo xu hướng hiện đại...",
  "Cơ hội việc làm hấp dẫn cho giảng viên tiếng Nhật...",
  "Quản lý thời gian hiệu quả để nâng cao năng suất...",
  "Tham gia cuộc thi lập trình và giành giải thưởng...",
  "Phát triển các kỹ năng mềm cần thiết trong công việc...",
  "Khám phá tiềm năng của blockchain trong giáo dục...",
  "Trải nghiệm nền tảng học tập hiện đại và tiện lợi...",
  "Cơ hội nhận học bổng cho các học viên xuất sắc...",
  "Học marketing số để phát triển doanh nghiệp...",
  "Tính năng chat trực tuyến giúp học tập dễ dàng hơn...",
  "Khóa học lập trình web từ cơ bản đến chuyên sâu...",
  "Phát triển tư duy phản biện và khả năng sáng tạo...",
  "Thiết kế website đẹp mắt và chuyên nghiệp...",
  "Cải thiện kỹ năng giao tiếp trong mọi tình huống...",
  "Trải nghiệm công nghệ VR/AR trong giáo dục...",
  "Hệ thống quản lý học tập toàn diện và hiện đại...",
];

function generateDate(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateNewsItem(id: number): NewsItem {
  const titleIndex = id % titles.length;
  const excerptIndex = id % excerpts.length;
  const imageIndex = id % images.length;
  const categoryIndex = id % categories.length;
  const dateOffset = Math.floor(id / 3); // Mỗi 3 items có cùng ngày

  return {
    id,
    title: titles[titleIndex],
    excerpt: excerpts[excerptIndex],
    image: images[imageIndex],
    date: generateDate(dateOffset),
    category: categories[categoryIndex],
  };
}

export const news: NewsItem[] = Array.from({ length: 100 }, (_, index) => 
  generateNewsItem(index + 1)
);

