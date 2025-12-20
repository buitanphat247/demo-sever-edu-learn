"use client";

import { Input, Select } from "antd";
import { useState, useMemo } from "react";
import NewsCard from "@/app/components/news/NewsCard";
import { SearchOutlined } from "@ant-design/icons";
import DarkPagination from "@/app/components/common/DarkPagination";
import ScrollAnimation from "@/app/components/common/ScrollAnimation";
import { news } from "./mock_data";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const pageSize = 20;

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory]);

  const total = filteredNews.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const categories = Array.from(new Set(news.map((item) => item.category)));

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[#0f172a]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Tin tức & Sự kiện</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Khám phá những xu hướng giáo dục mới nhất, các bài viết chuyên sâu và thông tin về các hoạt động cộng đồng sôi nổi.
          </p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                prefix={<SearchOutlined className="text-slate-400 text-xl mr-2" />}
                placeholder="Tìm kiếm tin tức..."
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full shadow-lg shadow-black/20"
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                placeholder="Chọn danh mục"
                allowClear
                className="w-full shadow-lg shadow-black/20"
                onChange={handleCategoryChange}
                options={categories.map((cat) => ({ label: cat, value: cat }))}
              />
            </div>
          </div>
        </div>

        {currentNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
              {currentNews.map((item, index) => (
                <ScrollAnimation
                  key={`${item.id}-${currentPage}`}
                  direction="up"
                  delay={isScrolling ? 500 + (index * 50) : index * 50}
                >
                  <NewsCard
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.image}
                    date={item.date}
                    category={item.category}
                  />
                </ScrollAnimation>
              ))}
            </div>

            {total > pageSize && (
              <DarkPagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={(page) => {
                  setIsScrolling(true);
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // Wait for scroll to complete before showing animation
                  setTimeout(() => {
                    setIsScrolling(false);
                  }, 500);
                }}
                showTotal={(total, range) => (
                  <span className="text-slate-300">
                    {range[0]}-{range[1]} của {total} tin tức
                  </span>
                )}
                className="mt-12"
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-[#1e293b] rounded-3xl border border-slate-700">
            <p className="text-slate-400 text-lg">Không tìm thấy tin tức nào</p>
          </div>
        )}
      </div>
    </main>
  );
}
