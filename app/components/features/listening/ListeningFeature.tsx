"use client";

import { useEffect, useState } from "react";
import { App, Skeleton } from "antd";
import { getLessons, type Lesson } from "@/lib/api/lessons";
import LessonCard from "@/app/components/listening/LessonCard";
import DarkPagination from "@/app/components/common/DarkPagination";
import CustomInput from "@/app/components/common/CustomInput";
import CustomSelect from "@/app/components/common/CustomSelect";

export default function ListeningFeature() {
  const { message } = App.useApp();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchText);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, debouncedSearchQuery, selectedLevel, selectedLanguage]);

  const fetchLessons = async () => {
    const startTime = Date.now();
    setLoading(true);
    setLessons([]); // Clear previous lessons to prevent overlap overlap or stale state flashing (though normally masked by loading UI)
    try {
      const result = await getLessons({
        page: currentPage,
        limit: pageSize,
        search: debouncedSearchQuery || undefined,
        level: selectedLevel,
        language: selectedLanguage,
      });
      
      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 250;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      
      setLessons(result.data);
      setTotal(result.total);
    } catch (error: any) {
      // Ensure minimum loading time even on error
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 250;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      
      message.error(error?.message || "Không thể tải danh sách lessons");
      setLessons([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <CustomInput
            placeholder="Tìm kiếm bài học..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            wrapperClassName="flex-1 w-full"
          />
          <CustomSelect
            placeholder="Chọn cấp độ"
            value={selectedLevel}
            onChange={(value) => {
              setSelectedLevel(value);
              setCurrentPage(1);
            }}
            options={[
              { label: "A1", value: "A1" },
              { label: "A2", value: "A2" },
              { label: "B1", value: "B1" },
              { label: "B2", value: "B2" },
              { label: "C1", value: "C1" },
              { label: "C2", value: "C2" },
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
            ]}
            wrapperClassName="w-full md:w-48"
            allowClear
          />
          <CustomSelect
            placeholder="Chọn ngôn ngữ"
            value={selectedLanguage}
            onChange={(value) => {
              setSelectedLanguage(value);
              setCurrentPage(1);
            }}
            options={[
              { label: "Tiếng Anh", value: "en" },
              { label: "Tiếng Việt", value: "vi" },
              { label: "Tiếng Pháp", value: "fr" },
              { label: "Tiếng Đức", value: "de" },
              { label: "Tiếng Tây Ban Nha", value: "es" },
            ]}
            wrapperClassName="w-full md:w-48"
            allowClear
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden h-full flex flex-col transition-colors duration-300 shadow-sm">
              <div className="flex-1 p-6 animate-pulse">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>

                <div className="space-y-2.5">
                  <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
                </div>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/30 px-6">
                 <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                 <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      ) : lessons.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                name={lesson.name}
                level={lesson.level}
                language={lesson.language}
                challengeCount={lesson.challengeCount}
                practiceCount={lesson.practiceCount}
                audioSrc={lesson.audioSrc}
              />
            ))}
          </div>

          {total > pageSize && (
            <DarkPagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              showTotal={(total, range) => (
                <span className="text-slate-600 dark:text-slate-300">
                  {range[0]}-{range[1]} của {total} bài học
                </span>
              )}
            />
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-white/50 dark:bg-[#1e293b]/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 border-dashed transition-colors duration-300">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {debouncedSearchQuery || selectedLevel || selectedLanguage
              ? "Không tìm thấy bài học nào phù hợp"
              : "Chưa có bài học nào"}
          </p>
        </div>
      )}
    </div>
  );
}

