# @holyann/web-text-review

Kit **bôi đen chữ → gửi nhận xét review** tái sử dụng cho mọi website Next.js.

Reviewer bôi đen đoạn text trên trang → popup “Thêm nhận xét” → lưu lên Supabase → drawer quản lý task → **Copy Prompt cho AI** (đơn / batch) để dán vào Cursor.

---

## Tính năng

- Bôi đen text trên mọi trang → gửi góp ý kèm quote
- Drawer: lọc theo trang / chờ sửa / đã xong / tất cả
- Tick chọn nhiều task → Copy Batch Prompt cho AI
- Đánh dấu đã sửa / xóa đơn / xóa hàng loạt
- Poll realtime ~15s (tuỳ chỉnh)
- Cấu hình tên project, màu, API path, bật/tắt

---

## Cài vào dự án Next.js mới (3 bước)

### 1) Copy package

```bash
# Từ repo này:
cp -r packages/web-text-review /path/to/your-project/packages/web-text-review
```

Hoặc symlink / npm workspace:

```json
// package.json của web app
{
  "dependencies": {
    "@holyann/web-text-review": "file:./packages/web-text-review"
  }
}
```

### 2) Supabase

1. Tạo project Supabase (hoặc dùng sẵn)
2. Chạy SQL trong `sql/schema.sql`
3. Env:

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3) Wire vào App Router

**API** — copy `templates/nextjs/route.ts` → `app/api/reviews/route.ts`  
(sửa import path tới package nếu cần)

**UI** — trong `app/layout.tsx`:

```tsx
import { ReviewFeedbackSystem } from "@holyann/web-text-review";
// hoặc: import { ReviewFeedbackSystem } from "../packages/web-text-review/src";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ReviewFeedbackSystem
          config={{
            projectName: "My Site Review Hub",
            apiPath: "/api/reviews",
            storageKey: "mysite_reviewer_name",
            primaryColor: "#1B3B2B",
            accentColor: "#7B0323",
            // Chỉ bật khi review:
            // enabled: process.env.NEXT_PUBLIC_ENABLE_REVIEW === "true",
          }}
        />
      </body>
    </html>
  );
}
```

Peer deps: `react`, `react-dom`, `next`, `lucide-react` (+ Tailwind utility classes như project gốc).

---

## API config

| Prop | Mặc định | Mô tả |
|------|----------|--------|
| `projectName` | `Web Text Review Hub` | Chân drawer |
| `apiPath` | `/api/reviews` | Endpoint |
| `storageKey` | `wtr_reviewer_name` | localStorage tên reviewer |
| `enabled` | `true` | Tắt kit hoàn toàn |
| `pollIntervalMs` | `15000` | Tần suất sync |
| `primaryColor` | `#1B3B2B` | Nút launcher |
| `accentColor` | `#7B0323` | Badge / nhấn |

---

## Cấu trúc package

```
packages/web-text-review/
├── src/
│   ├── ReviewFeedbackSystem.tsx   # UI + selection + drawer
│   ├── createReviewsHandler.ts    # Factory API GET/POST/PATCH/DELETE
│   ├── types.ts
│   └── index.ts
├── sql/schema.sql
├── templates/nextjs/
│   ├── route.ts                   # Drop-in API route
│   └── layout-snippet.tsx
├── package.json
└── README.md
```

---

## Dùng trên web không có Next Router?

Component hiện dùng `next/navigation` (`usePathname`, `useRouter`). Với Vite/React Router: fork component và thay bằng `useLocation` / `useNavigate`, giữ nguyên `createReviewsHandlers` cho backend.

---

## Portfolio Quỳnh Chi

Site hiện tại vẫn dùng bản tích hợp sẵn tại:

- `src/components/ui/review-feedback-system.tsx`
- `src/app/api/reviews/route.ts`

Package này là bản **tách riêng / portable** để copy sang dự án khác. Có thể dần migrate portfolio sang import từ package nếu muốn một nguồn duy nhất.
