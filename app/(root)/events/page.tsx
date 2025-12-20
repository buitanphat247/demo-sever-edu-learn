"use client";

import { Input, Select } from "antd";
import { useState, useMemo } from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import EventDetailModal, { EventDetail } from "@/app/components/events/EventDetailModal";
import DarkPagination from "@/app/components/common/DarkPagination";
import ScrollAnimation from "@/app/components/common/ScrollAnimation";
import { events } from "./mock_data";

const { Search } = Input;


interface CardEventProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  color: string;
  onDetailClick?: () => void;
}

function CardEvent({ id, title, date, time, location, status, color, onDetailClick }: CardEventProps) {
  // Determine color classes based on event color
  const accentColor = color === 'blue' ? 'border-l-blue-500' : (color === 'green' ? 'border-l-emerald-500' : 'border-l-slate-500');
  const badgeClass = color === 'blue' 
    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
    : (color === 'green' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-200 border-slate-600');

  return (
    <div
      onClick={onDetailClick}
      className={`group h-full bg-[#1e293b] rounded-2xl shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 border border-slate-700 overflow-hidden cursor-pointer relative border-l-4 ${accentColor}`}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${badgeClass}`}>
            {status}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-300">
             <CalendarOutlined />
          </div>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-xl font-bold text-white mb-4  group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Details - Compact & Clean */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="w-8 flex justify-center"><CalendarOutlined className="text-blue-400"/></span>
            <span className="font-semibold text-slate-300">{date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
             <span className="w-8 flex justify-center"><ClockCircleOutlined className="text-orange-400"/></span>
            <span className="text-slate-300">{time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
             <span className="w-8 flex justify-center"><EnvironmentOutlined className="text-green-400"/></span>
            <span className="line-clamp-1 text-slate-300">{location}</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-sm font-semibold text-white mt-auto">
          <span className="group-hover:text-blue-400 transition-colors">Xem chi tiết</span>
          <svg 
            className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const pageSize = 18;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = !selectedStatus || event.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchText, selectedStatus]);

  const total = filteredEvents.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const statuses = Array.from(new Set(events.map((event) => event.status)));

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    // Simulate loading when searching
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
    // Simulate loading when filtering
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const handleEventClick = (event: EventDetail) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <main className="min-h-screen bg-[#0f172a]">
      <div className="container mx-auto px-4 py-12">
        <EventDetailModal open={isModalOpen} event={selectedEvent} onCancel={handleModalClose} />

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Sự kiện</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tham gia các sự kiện và hoạt động thú vị, mở rộng kiến thức và kết nối cộng đồng.
          </p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                prefix={<SearchOutlined className="text-slate-400 text-xl mr-2" />}
                placeholder="Tìm kiếm sự kiện..."
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full shadow-lg shadow-black/20"
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                className="w-full shadow-lg shadow-black/20"
                onChange={handleStatusChange}
                options={statuses.map((status) => ({ label: status, value: status }))}
              />
            </div>
          </div>
        </div>

        {currentEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event, index) => (
                <ScrollAnimation
                  key={`${event.id}-${currentPage}`}
                  direction="up"
                  delay={isScrolling ? 500 + (index * 50) : index * 50}
                >
                  <CardEvent
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    status={event.status}
                    color={event.color}
                    onDetailClick={() => handleEventClick(event)}
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
                    {range[0]}-{range[1]} của {total} sự kiện
                  </span>
                )}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-[#1e293b] rounded-3xl border border-slate-700">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-slate-400 text-lg">Không tìm thấy sự kiện nào phù hợp</p>
          </div>
        )}
      </div>
    </main>
  );
}

