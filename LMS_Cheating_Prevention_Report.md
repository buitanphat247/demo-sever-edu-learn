# THƯ VIỆN LMS HỖ TRỢ CHỐNG GIAN LẬN

## MỞ ĐẦU

### 1. Lý do chọn đề tài
- **Thực trạng học trực tuyến**: [Nội dung thực trạng...]
- **Vấn đề gian lận trong LMS**: [Nội dung vấn đề gian lận...]
- **Sự cần thiết của thư viện chống gian lận**: [Nội dung sự cần thiết...]

### 2. Mục tiêu và phạm vi đề tài
- **Mục tiêu chính**: [Nội dung mục tiêu chính...]
- **Đối tượng hướng tới**: [Nội dung đối tượng...]
- **Phạm vi nghiên cứu và triển khai**: [Nội dung phạm vi...]

## CHƯƠNG 1: Ý TƯỞNG VÀ QUÁ TRÌNH HÌNH THÀNH

### 1.1. Ý tưởng ban đầu của đề tài
- **Động cơ hình thành**: [Nội dung động cơ...]
- **Vấn đề thực tế cần giải quyết**: [Nội dung vấn đề...]

### 1.2. Bối cảnh và quá trình phát triển (quá khứ)
- **LMS truyền thống**: [Nội dung về LMS truyền thống...]
- **Hạn chế về chống gian lận**: [Nội dung hạn chế...]
- **Nhu cầu cải tiến**: [Nội dung nhu cầu...]

## CHƯƠNG 2: TỔNG QUAN VỀ HỆ THỐNG

### 2.1. Giới thiệu hệ thống LMS
[Nội dung giới thiệu...]

### 2.2. Các hình thức gian lận phổ biến trong LMS
[Nội dung các hình thức gian lận...]

### 2.3. Vai trò của thư viện chống gian lận
[Nội dung vai trò...]

## CHƯƠNG 3: CÁC CHỨC NĂNG CHI TIẾT CỦA HỆ THỐNG

Hệ thống được xây dựng với mục tiêu cung cấp một giải pháp giáo dục toàn diện, tích hợp các công nghệ tiên tiến để hỗ trợ giảng dạy, học tập và đặc biệt là đảm bảo tính công bằng trong thi cử. Dưới đây là các nhóm chức năng cốt lõi:

### 3.1. Phân hệ Lớp học ảo và Tương tác (Module Jitsify Integration)
Đây là môi trường học tập trực tuyến thời gian thực, tích hợp sâu lõi **Jitsi Meet** để đảm bảo tính ổn định và bảo mật.
- **Phòng học trực tuyến Video Conference**:
  - Tổ chức lớp học video chất lượng cao (HD) với độ trễ thấp.
  - Hỗ trợ số lượng lớn học viên tham gia đồng thời.
  - Không yêu cầu cài đặt phần mềm bổ trợ (Web-based).
- **Công cụ giảng dạy & Tương tác**:
  - **Chia sẻ màn hình (Screen Sharing)**: Giáo viên chia sẻ slide, video hoặc thao tác phần mềm.
  - **Bảng trắng ảo (Whiteboard)**: Cho phép viết, vẽ minh họa bài giảng trực tiếp.
  - **Chat & Giơ tay phát biểu**: Hệ thống chat realtime và tính năng "Raise Hand" để học viên tương tác mà không gây ồn.
- **Giám sát hoạt động lớp học**:
  - Giáo viên có quyền kiểm soát Micro/Camera của học viên (Mute all).
  - Ghi lại buổi học (Recording) để xem lại phục vụ ôn tập.

### 3.2. Phân hệ Khảo thí và Giám sát Thi (Module "Azota-like" & Anti-Cheating)
Phân hệ này tập trung vào quy trình tạo đề, tổ chức thi và đặc biệt là hệ thống giám sát chặt chẽ (Proctoring) tương tự các phần mềm quản lý phòng máy (như NetSupport School) nhưng chạy trên nền web.
- **Số hóa và Soạn thảo đề thi thông minh**:
  - **Nhập đề từ file Word/PDF**: Hệ thống tự động phân tích cấu trúc file Word, tách câu hỏi, nhóm đáp án và nhận diện đáp án đúng (dựa trên định dạng quy ước).
  - **Hỗ trợ công thức Toán học (LaTeX/MathJax)**: Hiển thị chuẩn xác các công thức toán, lý, hóa phức tạp.
  - **Trộn đề tự động**: Từ một bộ đề gốc hoặc ngân hàng câu hỏi, hệ thống tự động hoán vị câu hỏi và đáp án để tạo ra nhiều mã đề khác nhau cho từng thí sinh.
- **Cơ chế Giám sát Đa thiết bị (Multi-Device Monitoring)**:
  - **Dashboard Giám thị (Proctor View)**: Giám thị có một màn hình tổng quan hiển thị cùng lúc **Camera** và **Màn hình (Screen)** của tất cả thí sinh trong phòng thi theo thời gian thực (Real-time).
  - **Nhật ký hành vi (Behavior Logs)**: Hệ thống tự động ghi lại mọi thao tác của thí sinh kèm mốc thời gian (Timestamp) chi tiết đến từng giây:
    - *Lúc 08:30:15*: Rời khỏi tab thi full-screen.
    - *Lúc 08:30:45*: Mở ứng dụng Calculator.
    - *Lúc 08:32:00*: Mất kết nối Camera.
    - *Lúc 08:35:00*: Phát hiện tiếng ồn lạ hoặc người thứ 2 trong khung hình.
- **Biện pháp ngăn chặn tức thời**:
  - **Khóa trình duyệt (Lockdown Browser Mode)**: Bắt buộc thí sinh phải bật chế độ toàn màn hình mới được làm bài. Nếu cố tình thoát, bài thi sẽ bị che lại hoặc tự động nộp.
  - **Vô hiệu hóa Clipboard**: Chặn hoàn toàn thao tác Copy câu hỏi (Ctrl+C) và Paste đáp án (Ctrl+V) từ nguồn ngoài.

### 3.3. Phân hệ Quản lý Công cụ Lớp học (Classroom Management)
Cung cấp các công cụ hành chính và quản trị để vận hành lớp học hiệu quả.
- **Quản lý Danh sách & Hồ sơ**:
  - Quản lý thông tin chi tiết giáo viên, học viên, lớp học.
  - Theo dõi tiến độ học tập và lịch sử tham gia khóa học.
- **Bảng tin & Thông báo (News Feed)**:
  - Đăng tải thông báo, tài liệu, bài tập về nhà cho từng lớp cụ thể.
  - Hệ thống bình luận, thảo luận dưới mỗi bài đăng.
- **Quản lý Tài liệu (Document Management)**:
  - Kho lưu trữ tài liệu số hóa, hỗ trợ nhiều định dạng (PDF, Docx, Video).
  - Phân quyền truy cập tài liệu theo lớp hoặc theo cấp độ thành viên.

### 3.4. Phân hệ Hỗ trợ Học Ngoại ngữ (Vocabulary Learning)
Đây là module chuyên biệt giúp học viên nâng cao vốn từ vựng, đặc biệt hữu ích cho các lớp học ngoại ngữ.
- **Hệ thống Flashcard thông minh**:
  - Tạo và quản lý bộ flashcard theo chủ đề (Topic-based).
  - Chế độ tự động phát âm, lật thẻ và ghi nhớ từ.
- **Bài tập ghi nhớ tự động**:
  - Hệ thống tự động sinh bài tập trắc nghiệm, điền từ dựa trên bộ từ vựng đã học.
  - Theo dõi tiến độ ghi nhớ của học viên (Spaced Repetition System - SRS).

### 3.5. Các tính năng Thống kê & Báo cáo (Analytics)
Cung cấp cái nhìn tổng quan về hiệu quả dạy và học thông qua dữ liệu trực quan.
- **Thống kê Học tập**:
  - Biểu đồ phổ điểm của lớp sau mỗi bài kiểm tra giúp giáo viên đánh giá mặt bằng chung.
  - Phân tích điểm mạnh/yếu của từng học viên dựa trên lịch sử làm bài.
- **Báo cáo chuyên cần**:
  - Thống kê tỷ lệ tham gia lớp học, thời lượng online.
  - Theo dõi mức độ tương tác (số lần chat, giơ tay phát biểu) trong giờ học ảo.

### 3.6. Module Trợ lý Ảo AI hỗ trợ Nghiên cứu (Secure Private AI Research Assistant)
Mô hình AI riêng tư, giải quyết vấn đề bảo mật ý tưởng trong nghiên cứu khoa học (NCKH) mà các nền tảng AI công cộng (như ChatGPT, Gemini) không đáp ứng được.
- **Bảo mật tuyệt đối & Không chia sẻ dữ liệu (Data Sovereignty)**:
  - **Vấn đề giải quyết**: Khi nhập ý tưởng mới vào các AI công cộng, dữ liệu đó có thể bị dùng để training, dẫn đến việc ý tưởng bị "lộ" hoặc bị coi là "đã tồn tại" (not novel) khi check đạo văn sau này.
  - **Giải pháp**: Hệ thống triển khai mô hình ngôn ngữ lớn (LLM) cục bộ hoặc Private Cloud. Dữ liệu nghiên cứu của người dùng **CHỈ** được lưu trữ trong không gian riêng tư, **KHÔNG** gửi ra ngoài, đảm bảo tính độc nhất và bí mật của đề tài.
- **Bộ nhớ ngữ cảnh dài hạn & Riêng biệt (Isolated Contextual Memory)**:
  - AI ghi nhớ toàn bộ tiến trình nghiên cứu (giả thuyết, số liệu, bản nháp) trong một "khoang" dữ liệu khép kín.
  - Giúp nhà nghiên cứu phát triển đề tài liên tục trong thời gian dài mà không sợ bị trộn lẫn với dữ liệu của người khác hay internet.
- **Hỗ trợ trích dẫn & Kiểm chứng nguồn nội bộ**:
  - AI chỉ phân tích và trích dẫn dựa trên kho tài liệu (Papers, Books) mà người dùng chủ động tải lên, đảm bảo độ tin cậy và chính xác tuyệt đối phục vụ trích dẫn khoa học.

### 3.7. Công nghệ Sử dụng và Các Module Hệ thống (Development Stack)
Hệ thống được phát triển trên kiến trúc Micro-services, tận dụng thế mạnh của các công nghệ hàng đầu hiện nay:

*   **Frontend (Next.js 16)**:
    *   **Công nghệ**: Framework React tối ưu hóa SEO và hiệu năng (Server-Side Rendering). Sử dụng **Tailwind CSS v4** cho giao diện và **Ant Design** cho các components phức tạp.
    *   **Lý do chọn**: Tốc độ tải trang cực nhanh, hỗ trợ tốt cho SEO (quan trọng để quảng bá khóa học), hệ sinh thái thư viện phong phú.

*   **Backend Core (NestJS v10)**:
    *   **Công nghệ**: Framework Node.js kiến trúc module hóa (tương tự Angular), sử dụng **TypeScript** giúp code chặt chẽ và dễ bảo trì.
    *   **Module chính**: Auth (JWT Guard), User, Class, Exam, Document.
    *   **Lý do chọn**: Khả năng mở rộng (Scalability) tuyệt vời, dễ dàng tích hợp với Database thông qua **TypeORM/Prisma** và các dịch vụ bên thứ 3 (AWS, Socket.io).

*   **Database (MySQL)**:
    *   **Công nghệ**: Sử dụng **MySQL** làm hệ quản trị cơ sở dữ liệu chính (RDBMS).
    *   **Lý do chọn**: Đảm bảo tính nhất quán (ACID), hỗ trợ tốt các mối quan hệ phức tạp giữa User, Lớp học, và Bài thi. Dễ dàng truy vấn và thống kê báo cáo.

*   **Automation & AI Service (Python)**:
    *   **Công nghệ**: Sử dụng **Flask/FastAPI** để tạo các micro-service xử lý dữ liệu nặng.
    *   **Thư viện**: `playwright` (Crawl Azota), `requests` (Crawl Vi-Translate), `python-docx` (Xử lý Word), `scikit-learn` (AI thuật toán).
    *   **Lý do chọn**: Python là ngôn ngữ số 1 về xử lý dữ liệu và AI. Việc tách riêng service Python giúp Backend Node.js không bị quá tải khi xử lý các tác vụ nặng (như OCR hay Train AI).

*   **Real-time Communication (Socket.io & WebRTC)**:
    *   **Công nghệ**: **Jitsi Meet** (WebRTC core) cho video call và **Socket.io** cho chat/thông báo thời gian thực.
    *   **Lý do chọn**: Độ trễ thấp (<200ms), đảm bảo tính tương tác mượt mà trong lớp học ảo và giám sát thi.

## CHƯƠNG 4: CÁCH THỨC HOẠT ĐỘNG VÀ LUỒNG XỬ LÝ DỮ LIỆU CỦA HỆ THỐNG

### 4.1. Kiến trúc Tổng thể (System Architecture)
Hệ thống hoạt động theo mô hình **Client-Server** hiện đại, tách biệt hoàn toàn giữa Frontend và Backend, kết nối thông qua RESTful API và WebSocket.

*   **Frontend (Next.js 16)**: Đóng vai trò là lớp giao diện tương tác, xử lý hiển thị dữ liệu (SSR/CSR) và gửi yêu cầu về Server.
*   **Backend (NestJS v10)**: Trung tâm xử lý logic nghiệp vụ, xác thực bảo mật và điều phối dữ liệu.
*   **Automation & AI Layer (Python)**: Lớp xử lý dữ liệu nền, chịu trách nhiệm Crawl dữ liệu, xử lý file Word phức tạp và chạy các thuật toán AI.
*   **Database (MySQL)**: Lưu trữ toàn bộ dữ liệu có cấu trúc của hệ thống (User, Lớp học, Điểm số, Đề thi) đảm bảo tính toàn vẹn và quan hệ chặt chẽ. AWS S3 được dùng để lưu trữ file media (Ảnh, Video).

### 4.2. Luồng Xử lý Dữ liệu Chi tiết (Detailed Data Flows)

#### a. Luồng Số hóa Đề thi (Document Digitization Flow)
Đây là quy trình biến một file Word tĩnh thành đề thi tương tác trên hệ thống:
1.  **Upload**: Giáo viên upload file đề thi (`.docx`) từ Frontend (`/admin/exercises`).
2.  **Transfer**: Backend nhận file qua Multer, lưu tạm vào server và gọi **Python Script** (`main.py` của module Document Digitization).
3.  **Processing (Python Core)**:
    *   Sử dụng `python-docx` đọc cấu trúc file.
    *   Regex phân tích các từ khóa: *"Câu 1.", "A.", "B.", "PHẦN I"*.
    *   Tách biệt nội dung câu hỏi và định dạng đáp án đúng (gạch chân/tô đỏ).
4.  **Response**: Python trả về kết quả dưới dạng JSON object chuẩn hóa.
5.  **Storage**: Backend nhận JSON -> Validate dữ liệu -> Lưu vào Database (Collection `Exercises` và `Questions`).

#### b. Luồng Thu thập Dữ liệu Tự động (Automated Crawling Flow)
Hệ thống tự động làm giàu kho tài liệu mà không cần nhập liệu thủ công:
1.  **Scheduler Trigger**: Hệ thống Scheduler (trên Python) kích hoạt định kỳ **mỗi 1 giờ**.
2.  **Execution**:
    *   **Module Azota Crawler**: Khởi động Playwright (Headless Browser) -> Login -> Quét danh sách đề thi mới -> Crawl chi tiết -> Clean Data.
    *   **Module Vi-Translate**: Gửi Request tới API đích -> Lấy bài nghe/từ vựng -> Tải file Audio về Server.
3.  **Synchronization**:
    *   Dữ liệu sạch được đóng gói và gửi về Backend qua **Internal API** (hoặc ghi trực tiếp vào Database chung).
    *   Backend bắn Notification báo cho Admin phê duyệt tài liệu mới.

#### c. Luồng Chống gian lận thời gian thực (Real-time Anti-Cheating)
1.  **Monitoring**: Khi thí sinh bắt đầu làm bài, Frontend kích hoạt `Event Listeners` để bắt sự kiện: `visibilitychange` (với tab), `blur` (mất focus).
2.  **Streaming**: Module Jitsi gửi luồng video/audio từ Client về Server Media.
3.  **Logging**: Mọi vi phạm (VD: chuyển tab lần 3) được Frontend gửi ngay lập tức về Backend qua **Socket.io**.
4.  **Penalty Decision**: Backend nhận log -> Kiểm tra cấu hình luật thi -> Nếu vi phạm vượt ngưỡng -> Gửi lệnh **"Lock Exam"** ngược lại Frontend để đình chỉ thi.

### 4.3. Cơ chế Giao tiếp (API & Integration)

Hệ thống sử dụng **RESTful API** làm chuẩn giao tiếp chính, kết hợp với các cơ chế bảo mật lớp:

*   **Authentication Flow**:
    *   Client gửi `Email/Pass` -> Backend kiểm tra -> Trả về `AccessToken` (JWT).
    *   Mọi request sau đó phải đính kèm Token này trong Header `Authorization: Bearer <token>`.
*   **Role-Based Guard**:
    *   Trước khi xử lý API, Backend chạy **Guard Interceptor** để kiểm tra Role.
    *   Ví dụ: API `POST /exercises/create` chỉ cho phép nếu Role nằm trong `['ADMIN', 'TEACHER']`.
*   **Internal Communication (Python <-> Node.js)**:
    *   Sử dụng cơ chế `child_process.spawn` để Node.js gọi trực tiếp script Python khi cần xử lý tức thì (như upload file).
    *   Sử dụng Shared Database hoặc Webhook cho các tác vụ chạy nền (như Crawl data).

## CHƯƠNG 5: CHI TIẾT TIẾN ĐỘ THỰC HIỆN DỰ ÁN

Tính đến thời điểm báo cáo, dự án đã hoàn thành khoảng **45-50%** khối lượng công việc, tập trung chủ yếu vào **Core Foundation** (Nền tảng cốt lõi) và **CRUD Operations** (Thao tác dữ liệu cơ bản). Các tính năng nâng cao về Real-time, Video Call và AI vẫn chưa được khởi tạo.

### 5.1. Các Hạng Mục Đã Hoàn Thành (Completed Modules)

#### A. Backend (Edu_Learn_Server - NestJS) - Hoàn thành ~60%
Hệ thống API cốt lõi đã chạy ổn định, phục vụ việc lưu trữ và truy xuất dữ liệu tĩnh.
1.  **Hạ tầng Core & Database**:
    *   Thiết lập dự án NestJS v10, tích hợp **TypeORM (MySQL)** cho dữ liệu cấu trúc và **Mongoose (MongoDB)**.
    *   Cấu hình **AWS S3** qua SDK để upload/lưu trữ file tài liệu, hình ảnh.
2.  **Module Xác thực & Phân quyền (Auth & RBAC)** (`src/auth`, `src/role`):
    *   Đăng ký/Đăng nhập (JWT).
    *   Phân quyền chặt chẽ (Guards) cho 3 vai trò: User, Admin, Super Admin.
3.  **Module Quản lý Lớp học** (`src/class`, `src/class-student`):
    *   CRUD: Tạo lớp, Sửa thông tin, Xóa lớp, Lấy danh sách lớp.
    *   Gán học viên vào lớp (Enrollment).
4.  **Module Nội dung & Tài liệu**:
    *   **Vocabulary** (`src/vocabulary`): Quản lý bộ từ vựng, flashcard.
    *   **News** (`src/news`): Đăng tải tin tức, thông báo chung.
    *   **Listen** (`src/listen`): API nhận dữ liệu nghe từ crawler (Topic/Lesson).
5.  **Module Tiện ích**:
    *   **Notification** (`src/notification`): Mới chỉ hỗ trợ lưu thông báo vào Database (Pull model), chưa có Push notification thời gian thực.

#### B. Frontend (Edu_Learn_Next - Next.js 16) - Hoàn thành ~50%
Giao diện (UI) đã hoàn thiện khá nhiều nhưng Logic (Integration) còn thiếu sót ở các phần tương tác.
1.  **Layout & Routing**:
    *   Chuyển đổi hoàn toàn sang **App Router**.
    *   Layout riêng biệt cho: Public Page, User Dashboard, Admin Dashboard.
2.  **Các trang đã tích hợp API (Functional)**:
    *   Đăng nhập/Đăng ký.
    *   Trang chủ, Tin tức (hiển thị danh sách tin từ API).
    *    Danh sách Lớp học (Hiển thị dữ liệu thật từ Backend).
    *   Trang Profile cá nhân.
3.  **Công cụ học tập (Learning Tools)**:
    *   **Writing Feature**: UI thực hành viết (đã có logic frontend, chưa lưu lịch sử chi tiết).
    *   **Flashcard**: Hiển thị thẻ từ vựng (Fetch từ API).

#### C. Automation Tools (Python Scripts) - Hoàn thành ~80% (Standalone)
Các tool chạy độc lập để thu thập dữ liệu, chưa tích hợp tự động hóa hoàn toàn vào luồng chính.
1.  **Document Digitization (`digitization_project`)**:
    *   Parse file Word (`.docx`) bằng regex.
    *   Tách câu hỏi/đáp án/lời giải chính xác.
2.  **Crawl Data Azota (`crawl_data_azota`)**:
    *   Sử dụng **Playwright** để login và tải đề thi từ Azota.
    *   Scheduler cơ bản để chạy định kỳ.
3.  **Crawl Vi-Translate (`crawl-data-vi-translate`)**:
    *   Crawl topics/lessons audio và text về để nạp vào module `Listen`.

---

## CHƯƠNG 6: CÁC MODULE CHƯA HOÀN THIỆN & NỢ KỸ THUẬT (MISSING FEATURES)

Đây là những phần quan trọng theo yêu cầu "Chi tiết hơn" của cấp trên, phản ánh đúng thực trạng **chưa có** của hệ thống.

### 6.1. Nhóm Tính Năng Thời Gian Thực (Real-Time Communication) - Trạng thái: 0%
Hiện tại Backend **hoàn toàn chưa có Socket.io Gateway**.
*   **Chat System**:
    *   Frontend: Chỉ là UI tĩnh (Mock Chat UI). Không nhắn tin được.
    *   Backend: Chưa có module xử lý message, phòng chat (Rooms), trạng thái online/offline.
*   **Real-time Notification**:
    *   Hệ thống không thể báo (Push) cho người dùng khi có sự kiện mới ngay lập tức. Phải tải lại trang mới thấy.

### 6.2. Phân Hệ Lớp Học Ảo & Video Call (Virtual Class) - Trạng thái: 0%
*   **Jitsi Integration**:
    *   Chưa có bất kỳ mã nguồn nào tích hợp Jitsi Meet API hay WebRTC.
    *   Không thể tạo phòng họp trực tuyến.
    *   Không có tính năng Share Screen hay Whiteboard.
*   **Hậu quả**: Tính năng "Lớp học ảo" hiện tại chỉ là danh sách học viên dạng văn bản, không phải Video Conference.

### 6.3. Hệ Thống Chống Gian Lận (Anti-Cheating Core) - Trạng thái: 10%
*   **Giám sát**: Chưa có luồng truyền video (Stream) từ camera học viên về Server.
*   **Proctor View**: Chưa có giao diện cho giám thị xem nhiều màn hình cùng lúc.
*   **Hiện tại chỉ có**: Login log (Lịch sử đăng nhập).

### 6.4. Data Warehouse & ETL Pipeline - Trạng thái: Sơ khai
*   User phản ánh: "etl warehouse gì cũng chưa". Chính xác.
*   **Thực trạng**: Các script Python đang chạy rời rạc (Standalone). Dữ liệu sau khi crawl đang được lưu thủ công hoặc đẩy thẳng vào DB chính (Transactional DB) gây rủi ro hiệu năng.
*   **Thiếu**:
    *   Một kho dữ liệu tập trung (Data Warehouse) để phân tích.
    *   Luồng ETL tự động (Orchestration tool như Airflow/Prefect) để làm sạch, biến đổi và nạp dữ liệu định kỳ mà không cần người chạy script `main.py` bằng tay.

### 6.5. Mobile App & AI - Trạng thái: 0%
*   **Mobile App (React Native)**: Chưa có file code nào được khởi tạo.
*   **AI Module**: Chưa có model AI nào. Các tính năng "AI" hiện tại (nếu có) chỉ là gọi API OpenAI đơn giản hoặc hard-code logic. Chưa có RAG (Retrieval-Augmented Generation) hay Fine-tuned Model.

### 6.6. Module Thanh Toán (Payment) - Trạng thái: 0%
*   Chưa có tích hợp cổng thanh toán (VNPay/Momo/Stripe).
*   Chưa có logic xử lý đơn hàng (Orders), hóa đơn (Invoices).

## CHƯƠNG 7: PHÂN TÍCH SỰ KHÁC BIỆT VÀ TÍNH ƯU VIỆT
Hệ thống không chỉ là một LMS thông thường mà là sự kế thừa và khắc phục các nhược điểm chí mạng của các nền tảng hiện có trên thị trường như Azota, VnEdu và Google Meet.

### 7.1. So sánh với Google Meet & Zoom (Về khía cạnh Phòng học ảo)
-   **Vấn đề hiện tại**: Google Meet (gói miễn phí) hiện giới hạn thời gian họp tối đa 60 phút, gây gián đoạn nghiêm trọng cho các tiết học kéo dài (thường 90-120 phút). Zoom bản miễn phí giới hạn 40 phút.
-   **Giải pháp của Hệ thống (Jitsify Integration)**:
    -   Tích hợp lõi **Jitsi Meet** mã nguồn mở, cho phép tổ chức lớp học **KHÔNG GIỚI HẠN THỜI GIAN**.
    -   Hoàn toàn miễn phí, không yêu cầu người dùng phải mua license đắt đỏ để duy trì lớp học.
    -   Tích hợp sâu vào hệ thống điểm danh tự động (điều mà Google Meet/Zoom phải cài thêm extension mới làm được).

### 7.2. So sánh với Azota (Về khía cạnh Khảo thí & Chống gian lận)
-   **Azota**: Chuyên về thi cử nhưng tính năng giám sát còn thụ động (chủ yếu cảnh báo chuyển tab).
-   **Hệ thống đề xuất**: Nâng cấp khả năng giám sát lên mức độ **"Phòng máy ảo"**:
    -   Giám sát **Real-time Dual View**: Xem song song cả Camera và Màn hình thí sinh cùng lúc.
    -   **AI Proctoring**: Tự động phát hiện khuôn mặt lạ, tiếng ồn bất thường để cảnh báo giám thị ngay lập tức (Azota chưa có cảnh báo âm thanh/người lạ tự động chuyên sâu).
    -   Khóa chặt môi trường thi (Lockdown Browser) mạnh mẽ hơn.

### 7.3. So sánh với VnEdu/K12Online (Về khía cạnh Hệ sinh thái)
-   **VnEdu**: Mạnh về quản lý sổ liên lạc, điểm số nhưng giao diện học tập và tương tác (E-learning) thường bị đánh giá là cũ kỹ, UX chưa thân thiện.
-   **Hệ thống đề xuất**:
    -   **All-in-One Modern UX**: Giao diện Next.js hiện đại, trải nghiệm mượt mà như các app giải trí (Facebook/Netflix), tạo hứng thú học tập.
    -   **Tính năng AI Research độc quyền**: Hỗ trợ nghiên cứu khoa học an toàn (như đã nêu ở chương 3), điều mà các hệ thống phổ thông dùng chung (VnEdu) không bao giờ cung cấp.

| Tiêu chí | Google Meet/Zoom | Azota | VnEdu | **Hệ thống Đề xuất** |
| :--- | :--- | :--- | :--- | :--- |
| **Thời gian học** | Giới hạn 40-60p (Free) | N/A | Tích hợp bên thứ 3 | **Không giới hạn (Jitsi Core)** |
| **Chống gian lận** | Không có | Tốt (Cơ bản) | Cơ bản | **Nâng cao (Screen + Cam + AI Log)** |
| **Bảo mật NCKH** | Không | Không | Không | **Có (Private AI Research)** |
| **Chi phí** | Đắt (nếu mua gói Pro) | Freemium | Gói trường học | **Tối ưu (Open Source Base)** |

## KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

- **Kết quả đạt được**: [Tổng kết kết quả...]
- **Hạn chế của đề tài**: [Tổng kết hạn chế...]
- **Hướng phát triển trong tương lai**: [Đề xuất hướng phát triển...]
