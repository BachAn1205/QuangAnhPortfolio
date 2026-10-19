# QuangAnhPort — Thiết lập Supabase + Prisma

Code đã sẵn sàng: review kit, upload ảnh/video, Prisma schema.
Bạn cần tạo project Supabase mới và điền key vào `.env.local`.

## 1. Tạo project Supabase

1. Vào https://supabase.com → **New project**
2. Đặt tên gợi ý: `quanganh-portfolio`
3. Chọn region gần (Singapore / Tokyo)
4. Lưu database password

## 2. Lấy API keys

**Settings → API:**

| Biến | Lấy từ |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` (giữ bí mật) |

**Settings → Database → Connection string:**

| Biến | Lấy từ |
|------|--------|
| `DATABASE_URL` | URI (Transaction pooler, port 6543) + `?pgbouncer=true` |
| `DIRECT_URL` | URI (Session / Direct, port 5432) |

## 3. Tạo file `.env.local`

Copy từ `.env.example` rồi dán key thật:

```bash
cp .env.example .env.local
```

## 4. Chạy SQL schema

Supabase → **SQL Editor** → paste toàn bộ file `supabase-schema.sql` → **Run**.

(Tạo bảng `website_reviews`, `project_media`, `project_images` + bucket `project-media`.)

## 5. (Tuỳ chọn) Prisma push

```bash
npm install
npx prisma generate
npx prisma db push
```

> Nếu đã chạy `supabase-schema.sql` thì `db push` thường không bắt buộc — dùng để sync Prisma Client với DB.

## 6. Chạy web

```bash
npm install
npm run dev
```

- Hover ảnh → nút **Upload** (ảnh hoặc video)
- Góc dưới phải → **Review Mode** (bôi đen chữ để gửi nhận xét)

## Checklist

- [ ] Tạo Supabase project
- [ ] Điền `.env.local` (5 biến)
- [ ] Chạy `supabase-schema.sql`
- [ ] `npm install && npm run dev`
- [ ] Thử upload 1 ảnh + gửi 1 review
