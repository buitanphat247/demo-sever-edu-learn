import { news } from "../mock_data";

export interface NewsDetailData {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
  content: string[];
  relatedNews: number[];
}

const authors = [
  "Admin",
  "Event Team",
  "Tech Team",
  "Marketing Team",
  "Editor",
  "Content Team",
  "News Team",
];

const contentTemplates = [
  [
    "Chúng tôi rất vui mừng thông báo về việc khai giảng khóa học mới với nhiều cải tiến và nội dung hấp dẫn. Khóa học này được thiết kế dành cho những ai muốn nâng cao kỹ năng của mình.",
    "Khóa học bao gồm các chủ đề quan trọng như:",
    "• React và Next.js cho phát triển web hiện đại",
    "• Node.js và Express cho backend development",
    "• Database design và optimization",
    "• API development và integration",
    "• Testing và deployment",
    "Với đội ngũ giảng viên giàu kinh nghiệm và phương pháp giảng dạy thực tế, học viên sẽ được trang bị đầy đủ kiến thức và kỹ năng cần thiết.",
  ],
  [
    "Hội thảo sẽ diễn ra với sự tham gia của nhiều chuyên gia hàng đầu trong lĩnh vực giáo dục và công nghệ.",
    "Các chủ đề chính của hội thảo:",
    "• Tác động của AI trong giáo dục",
    "• Học tập cá nhân hóa với công nghệ",
    "• Xu hướng EdTech trong năm 2024",
    "• Thách thức và cơ hội trong giáo dục số",
    "Hội thảo sẽ có các phiên thảo luận, workshop thực hành và cơ hội networking với các chuyên gia.",
  ],
  [
    "Chúng tôi tự hào giới thiệu tính năng mới - một bước tiến lớn trong việc cải thiện trải nghiệm người dùng.",
    "Tính năng mới này bao gồm:",
    "• Phân tích điểm mạnh và điểm yếu của từng người học",
    "• Tạo lộ trình học tập tùy chỉnh phù hợp với từng cá nhân",
    "• Đề xuất nội dung học tập phù hợp với trình độ",
    "• Theo dõi tiến độ và đưa ra gợi ý cải thiện",
    "Với tính năng này, mỗi người học sẽ có một trải nghiệm học tập độc đáo và hiệu quả nhất.",
  ],
  [
    "Nhân dịp đặc biệt, chúng tôi xin gửi đến bạn chương trình khuyến mãi với mức giảm giá hấp dẫn.",
    "Chương trình áp dụng cho:",
    "• Tất cả khóa học mới",
    "• Gói học tập premium",
    "• Khóa học nâng cao",
    "• Chương trình đào tạo chuyên sâu",
    "Đây là cơ hội tuyệt vời để bắt đầu hành trình học tập của bạn với mức giá ưu đãi.",
  ],
  [
    "Workshop sẽ giúp bạn phát triển các kỹ năng cần thiết trong công việc và cuộc sống.",
    "Nội dung workshop bao gồm:",
    "• Kỹ thuật chuẩn bị chuyên nghiệp",
    "• Cách sử dụng công cụ hiệu quả",
    "• Kỹ năng tương tác và giao tiếp",
    "• Xử lý tình huống và giải quyết vấn đề",
    "Workshop sẽ được tổ chức với format thực hành, bạn sẽ có cơ hội thực hành ngay tại lớp.",
  ],
  [
    "Chúng tôi đã nâng cấp hệ thống với nhiều cải tiến về giao diện và tính năng để mang đến trải nghiệm tốt nhất cho người dùng.",
    "Các cập nhật chính:",
    "• Giao diện mới hiện đại và thân thiện hơn",
    "• Tốc độ tải trang nhanh hơn 50%",
    "• Tính năng tìm kiếm thông minh",
    "• Hỗ trợ học tập offline",
    "• Đồng bộ tiến độ trên nhiều thiết bị",
    "• Thông báo và nhắc nhở học tập thông minh",
    "Chúng tôi luôn lắng nghe phản hồi từ người dùng và không ngừng cải thiện.",
  ],
];

function generateRelatedNewsIds(currentId: number, total: number, count: number = 3): number[] {
  const related: number[] = [];
  const usedIds = new Set([currentId]);
  
  while (related.length < count && usedIds.size < total) {
    const randomId = Math.floor(Math.random() * total) + 1;
    if (!usedIds.has(randomId)) {
      related.push(randomId);
      usedIds.add(randomId);
    }
  }
  
  return related;
}

function generateNewsDetail(newsItem: typeof news[0], index: number): NewsDetailData {
  const contentIndex = index % contentTemplates.length;
  const authorIndex = index % authors.length;
  const relatedNews = generateRelatedNewsIds(newsItem.id, news.length, 3);

  return {
    id: newsItem.id,
    title: newsItem.title,
    excerpt: newsItem.excerpt,
    image: newsItem.image,
    date: newsItem.date,
    category: newsItem.category,
    author: authors[authorIndex],
    content: contentTemplates[contentIndex],
    relatedNews,
  };
}

// Generate news detail data for all news items
export const newsDetailData: Record<number, NewsDetailData> = news.reduce((acc, item, index) => {
  acc[item.id] = generateNewsDetail(item, index);
  return acc;
}, {} as Record<number, NewsDetailData>);

// Export allNews for related news display
export const allNews = news.map((item) => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt,
  image: item.image,
  date: item.date,
  category: item.category,
}));

export const featuredNews = [1, 2, 3, 4, 5, 6];

