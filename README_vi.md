# Gemini Watermark Remover — Công cụ xóa watermark không giảm chất lượng

Một công cụ mã nguồn mở giúp **xóa hình mờ (watermark) Gemini** từ các hình ảnh và video do AI tạo ra với độ chính xác cao. Được xây dựng hoàn toàn bằng JavaScript thuần, công cụ sử dụng thuật toán toán học chính xác **Reverse Alpha Blending** (Giải ngược kênh Alpha) thay vì các mô hình AI inpainting dễ sinh ảo giác hoặc làm nhòe ảnh.

> **🚀 Bạn muốn sử dụng trực tuyến? Hãy thử [geminiwatermarkremover.io](https://geminiwatermarkremover.io/)** — Miễn phí, không cần cài đặt, xử lý trực tiếp trên trình duyệt của bạn.

---

## Các tính năng nổi bật

- ✅ **Xử lý 100% Cục bộ (Local)** - Mọi quá trình xử lý ảnh và video đều diễn ra ngay trên máy của bạn (trên trình duyệt hoặc CLI). Không có bất kỳ tệp nào bị tải lên máy chủ.
- ✅ **Độ chính xác toán học** - Dựa trên công thức Reverse Alpha Blending, bảo toàn chi tiết gốc mà không làm méo hay mờ pixel.
- ✅ **Tự động nhận diện** - Tự động phát hiện kích thước và tọa độ watermark dựa trên danh mục đầu ra chuẩn của Gemini và thuật toán tìm kiếm thích ứng.
- ✅ **Đa dạng hình thức sử dụng** - Hỗ trợ Web trực tuyến, Tiện ích Chrome Extension, Tampermonkey Userscript, dòng lệnh CLI, Thư viện NPM SDK và AI Agent Skill.
- ✅ **Hỗ trợ cả Video** - Tách và xóa watermark trên video do Gemini / Veo tạo ra ngay trên trình duyệt thông qua WebCodecs.
- ✅ **Đa nền tảng** - Hoạt động trên mọi trình duyệt hiện đại (Chrome, Edge, Firefox, Safari) và môi trường Node.js.

---

## Hướng dẫn sử dụng

### 1. Sử dụng công cụ trực tuyến (Khuyến nghị cho người dùng phổ thông)

- **Xóa watermark ảnh:** Truy cập [geminiwatermarkremover.io](https://geminiwatermarkremover.io/), kéo thả ảnh vào và tải về ảnh sạch.
- **Xóa watermark video:** Truy cập [geminiwatermarkremover.io/video](https://geminiwatermarkremover.io/video), kéo thả video vào để hệ thống tự động xử lý từng khung hình và xuất tệp MP4 mới.

---

### 2. Cài đặt Chrome Extension

Dành cho người dùng muốn tự động xóa watermark ngay trong giao diện trang web Gemini:

1. Mở Chrome và vào [Gemini Watermark Remover trên Chrome Web Store](https://chromewebstore.google.com/detail/gemini-watermark-remover/cjlmnfcfnofnglkphbcdclbpimdjkmdf).
2. Nhấn **Thêm vào Chrome (Add to Chrome)**.
3. Khi bạn tạo ảnh trên Gemini, tiện ích sẽ tự động xử lý ảnh xem trước và nút tải về/sao chép.
4. Bạn có thể bật/tắt tiện ích bất cứ lúc nào từ menu tiện ích ở góc trên trình duyệt.

*(Nếu cài đặt thủ công từ mã nguồn, chạy `pnpm build`, sau đó vào `chrome://extensions`, bật Developer Mode và chọn thư mục `dist/extension`)*.

---

### 3. Cài đặt Tampermonkey Userscript

Nếu bạn đã cài sẵn Tampermonkey hoặc Violentmonkey:

1. Mở liên kết: [gemini-watermark-remover.user.js](https://geminiwatermarkremover.io/userscript/gemini-watermark-remover.user.js).
2. Trình quản lý userscript sẽ tự động hiển thị trang xác nhận cài đặt.
3. Bấm **Install**.
4. Truy cập [gemini.google.com](https://gemini.google.com), userscript sẽ tự động thay thế ảnh xem trước và can thiệp vào hành vi sao chép/tải xuống để cho ra ảnh sạch.

---

### 4. Sử dụng công cụ dòng lệnh (CLI)

Dành cho lập trình viên cần xử lý hàng loạt hoặc tích hợp vào hệ thống tự động:

```bash
# Cài đặt thư viện trước
pnpm install

# Xóa watermark cho 1 ảnh
node bin/gwr.mjs remove input.png --output output.png

# Xóa watermark cho video
node bin/gwr.mjs remove input.mp4 --output output.mp4 --video-bitrate-mbps 15

# Xử lý toàn bộ ảnh trong một thư mục
node bin/gwr.mjs remove "./anh_goc/*.png" --out-dir "./anh_sach"
```

---

### 5. Chạy giao diện Web cục bộ

```bash
# Cài đặt dependencies
pnpm install

# Khởi chạy server phát triển (mặc định tại cổng 4173)
pnpm dev
```

Sau đó mở trình duyệt:
- Giao diện ảnh: `http://localhost:4173/dev-preview.html`
- Giao diện video: `http://localhost:4173/video-preview.html`

---

## Nguyên lý toán học

Mô hình gắn watermark của Gemini:
$$\text{Watermarked} = \alpha \times \text{Logo} + (1 - \alpha) \times \text{Original}$$

Trong đó:
- $\text{Original}$: Giá trị pixel gốc.
- $\text{Logo}$: Giá trị pixel của watermark (thường là màu trắng $255$ hoặc đen $0$).
- $\alpha$: Độ mờ (Alpha channel) tại vị trí đó.

Công thức giải ngược chính xác:
$$\text{Original} = \frac{\text{Watermarked} - \alpha \times \text{Logo}}{1 - \alpha}$$

Nhờ giải ngược công thức này, toàn bộ chi tiết nằm dưới watermark được phục hồi lại nguyên bản một cách hoàn hảo mà không làm biến dạng cấu trúc ảnh.

---

## Giấy phép (License)

Dự án được phát hành theo giấy phép [MIT License](LICENSE).
