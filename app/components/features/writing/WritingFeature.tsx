"use client";

import {
  CommentOutlined,
  ReadOutlined,
  ProjectOutlined,
  RobotOutlined,
  EditOutlined,
  RocketOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  RightOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Form, Select, Radio, Button, Input } from "antd";

export default function WritingFeature() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Configuration Form */}
      <div className="lg:col-span-4">
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

          <h2 className="text-xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2">
            <span className="text-yellow-400 text-2xl animate-pulse">✨</span>
            <span>Tạo bài luyện viết mới</span>
          </h2>

          <Form layout="vertical" className="relative z-10">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={
                  <span className="text-slate-300 font-medium text-sm">
                    <span className="mr-1.5">🌍</span>Ngôn ngữ
                  </span>
                }
                name="language"
                initialValue="en"
                className="mb-3"
              >
                <Select
                  className="w-full text-sm"
                  disabled
                  size="middle"
                  popupClassName="bg-slate-800 border border-slate-700"
                  options={[
                    {
                      value: "en",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          <span className="text-base">🇬🇧</span> Tiếng Anh
                        </span>
                      ),
                    },
                    {
                      value: "vi",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          <span className="text-base">🇻🇳</span> Tiếng Việt
                        </span>
                      ),
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-slate-300 font-medium text-sm">
                    <span className="mr-1.5">📊</span>Độ khó
                  </span>
                }
                name="difficulty"
                initialValue="easy"
                className="mb-3"
              >
                <Select
                  className="w-full text-sm"
                  size="middle"
                  popupClassName="bg-slate-800 border border-slate-700"
                  options={[
                    {
                      value: "very_easy",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          🌱 Dễ
                        </span>
                      ),
                    },
                    {
                      value: "easy",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          🌿 Khá dễ
                        </span>
                      ),
                    },
                    {
                      value: "medium",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          🌳 Trung bình
                        </span>
                      ),
                    },
                    {
                      value: "hard",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          🎯 Khó
                        </span>
                      ),
                    },
                    {
                      value: "very_hard",
                      label: (
                        <span className="flex items-center gap-2 text-sm">
                          🏆 Rất khó
                        </span>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </div>

            {/* Row 2: Learning Goal */}
            <Form.Item
              label={
                <span className="text-slate-300 font-medium text-sm">
                  <span className="mr-1.5">🎯</span>Mục đích học
                </span>
              }
              name="goal"
              initialValue="communication"
              className="mb-4"
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "communication", icon: <CommentOutlined />, label: "Giao tiếp", color: "red" },
                  { value: "ielts", icon: <ReadOutlined />, label: "IELTS", color: "blue" },
                  { value: "work", icon: <ProjectOutlined />, label: "Công việc", color: "amber" },
                ].map((item) => (
                  <Form.Item shouldUpdate noStyle key={item.value}>
                    {({ getFieldValue, setFieldsValue }) => {
                      const isSelected = getFieldValue("goal") === item.value;
                      let activeClass = "";
                      if (isSelected) {
                        if (item.color === "red") activeClass = "bg-red-500/10 border-red-500 text-red-500";
                        if (item.color === "blue") activeClass = "bg-blue-500/10 border-blue-500 text-blue-500";
                        if (item.color === "amber") activeClass = "bg-amber-500/10 border-amber-500 text-amber-500";
                      } else {
                        activeClass = "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800";
                      }
                      
                      return (
                        <button
                          type="button"
                          onClick={() => setFieldsValue({ goal: item.value })}
                          className={`h-10 flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg border transition-all ${activeClass}`}
                        >
                          {item.icon} {item.label}
                        </button>
                      );
                    }}
                  </Form.Item>
                ))}
              </div>
            </Form.Item>

            {/* Row 3: Method */}
            <Form.Item
              label={
                <span className="text-slate-300 font-medium text-sm">
                  <span className="mr-1.5">📝</span>Cách tạo bài
                </span>
              }
              name="method"
              initialValue="ai"
              className="mb-4"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "ai", icon: <RobotOutlined />, label: "AI tạo từ chủ đề", color: "blue" },
                  { value: "custom", icon: <EditOutlined />, label: "Tự nhập đoạn văn", color: "purple" },
                ].map((item) => (
                  <Form.Item shouldUpdate noStyle key={item.value}>
                    {({ getFieldValue, setFieldsValue }) => {
                      const isSelected = getFieldValue("method") === item.value;
                      let activeClass = "";
                      if (isSelected) {
                        if (item.color === "blue") activeClass = "bg-blue-500/10 border-blue-500 text-blue-500";
                        if (item.color === "purple") activeClass = "bg-purple-500/10 border-purple-500 text-purple-500";
                      } else {
                        activeClass = "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800";
                      }

                      return (
                        <button
                          type="button"
                          onClick={() => setFieldsValue({ method: item.value })}
                          className={`h-10 flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg border transition-all ${activeClass}`}
                        >
                          {item.icon} {item.label}
                        </button>
                      );
                    }}
                  </Form.Item>
                ))}
              </div>
            </Form.Item>

            {/* Row 4: Topic */}
            <div className="space-y-3 mb-6">
              <Form.Item
                label={
                  <span className="text-slate-300 font-medium text-sm">
                    <span className="mr-1.5">📚</span>Chủ đề
                  </span>
                }
                name="topic_select"
                initialValue="greeting"
                className="mb-0"
              >
                <Select
                  className="w-full text-sm"
                  size="middle"
                  popupClassName="bg-slate-800 border border-slate-700"
                  options={[
                    {
                      value: "greeting",
                      label: (
                        <span className="text-sm">👋 Chào hỏi và làm quen</span>
                      ),
                    },
                    {
                      value: "shopping",
                      label: <span className="text-sm">🛍️ Mua sắm và mặc cả</span>,
                    },
                    {
                      value: "travel",
                      label: (
                        <span className="text-sm">✈️ Du lịch và phương tiện</span>
                      ),
                    },
                    {
                      value: "food",
                      label: (
                        <span className="text-sm">🍜 Ẩm thực và nhà hàng</span>
                      ),
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="topic_custom" className="mb-0">
                <Input
                  placeholder="Hoặc nhập chủ đề bạn muốn viết..."
                  className="text-sm bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/80"
                />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-gradient-to-r from-red-500 to-pink-600 border-none shadow-lg shadow-red-500/20 hover:shadow-red-500/40 text-base font-bold h-11 rounded-xl"
              icon={<RocketOutlined />}
            >
              Bắt đầu luyện viết
            </Button>
          </Form>
        </div>
      </div>

      {/* Right Column: Practice History */}
      <div className="lg:col-span-8">
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-xl sticky top-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HistoryOutlined className="text-blue-400" />
              Lịch sử luyện tập
            </h3>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full cursor-pointer hover:text-white transition-colors">
              Xem tất cả
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                topic: "Describe your favorite childhood memory",
                date: "2 giờ trước",
                score: 8.5,
                type: "IELTS",
              },
              {
                topic: "Email to a colleague about a new project",
                date: "Hôm qua",
                score: 9.0,
                type: "Công việc",
              },
              {
                topic: "Introduce yourself to a new friend",
                date: "3 ngày trước",
                score: 7.5,
                type: "Giao tiếp",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl p-4 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.type}
                  </span>
                  <span className="text-amber-400 text-xs font-bold flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <StarFilled className="text-[10px]" /> {item.score}
                  </span>
                </div>
                <h4 className="text-slate-200 text-sm font-medium mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {item.topic}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ClockCircleOutlined /> {item.date}
                  </span>
                  <RightOutlined className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white border border-dashed border-slate-700 hover:border-slate-500 rounded-xl transition-all">
            Xem lịch sử chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
