/**
 * Factory tạo API handlers (GET/POST/PATCH/DELETE) cho bảng website_reviews.
 * Dùng với Next.js App Router hoặc bất kỳ runtime nào nhận Request/Response.
 *
 * @example
 * // app/api/reviews/route.ts
 * import { createReviewsHandlers } from "@holyann/web-text-review/api";
 * import { getServiceSupabase, isSupabaseConfigured } from "@/lib/supabase";
 *
 * const handlers = createReviewsHandlers({
 *   getClient: getServiceSupabase,
 *   isConfigured: isSupabaseConfigured,
 * });
 *
 * export const GET = handlers.GET;
 * export const POST = handlers.POST;
 * export const PATCH = handlers.PATCH;
 * export const DELETE = handlers.DELETE;
 */

export type ReviewSupabaseClient = {
  from: (table: string) => {
    select: (cols?: string) => any;
    insert: (row: Record<string, unknown>) => any;
    update: (row: Record<string, unknown>) => any;
    delete: () => any;
  };
};

export interface CreateReviewsHandlersOptions {
  /** Trả về Supabase service client (hoặc null) */
  getClient: () => ReviewSupabaseClient | null;
  /** Kiểm tra env đã cấu hình chưa */
  isConfigured: () => boolean;
  /** Tên bảng — mặc định website_reviews */
  tableName?: string;
}

export function createReviewsHandlers(options: CreateReviewsHandlersOptions) {
  const table = options.tableName ?? "website_reviews";

  async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const pagePath = searchParams.get("page_path");

      if (!options.isConfigured()) {
        return Response.json({
          reviews: [],
          warning: "Supabase chưa được cấu hình.",
        });
      }

      const supabase = options.getClient();
      if (!supabase) {
        return Response.json({ reviews: [] });
      }

      let query = supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (pagePath && pagePath !== "all") {
        query = query.eq("page_path", pagePath);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching reviews:", error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      return Response.json({ reviews: data || [] });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal Server Error";
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  async function POST(request: Request) {
    try {
      const body = await request.json();
      const {
        page_path,
        selected_text,
        element_context,
        comment,
        reviewer_name,
      } = body;

      if (!page_path || !comment) {
        return Response.json(
          { error: "Vui lòng nhập đầy đủ trang và nội dung nhận xét." },
          { status: 400 }
        );
      }

      if (!options.isConfigured()) {
        return Response.json(
          { error: "Supabase chưa được cấu hình." },
          { status: 503 }
        );
      }

      const supabase = options.getClient();
      if (!supabase) {
        return Response.json({ error: "Lỗi kết nối Supabase" }, { status: 500 });
      }

      const { data, error } = await supabase
        .from(table)
        .insert({
          page_path,
          selected_text: selected_text
            ? String(selected_text).slice(0, 1000)
            : null,
          element_context: element_context
            ? String(element_context).slice(0, 500)
            : null,
          comment: String(comment).trim(),
          reviewer_name: reviewer_name
            ? String(reviewer_name).trim()
            : "Reviewer",
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating review:", error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      return Response.json({ success: true, review: data });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal Server Error";
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  async function PATCH(request: Request) {
    try {
      const body = await request.json();
      const { id, status } = body;

      if (!id || !status) {
        return Response.json(
          { error: "Thiếu ID hoặc trạng thái nhận xét." },
          { status: 400 }
        );
      }

      const supabase = options.getClient();
      if (!supabase) {
        return Response.json({ error: "Lỗi kết nối Supabase" }, { status: 500 });
      }

      const { data, error } = await supabase
        .from(table)
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating review:", error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      return Response.json({ success: true, review: data });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal Server Error";
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const ids = searchParams.get("ids");
      const status = searchParams.get("status");

      const supabase = options.getClient();
      if (!supabase) {
        return Response.json({ error: "Lỗi kết nối Supabase" }, { status: 500 });
      }

      if (ids) {
        const idList = ids
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (idList.length === 0) {
          return Response.json({ error: "Danh sách ID rỗng." }, { status: 400 });
        }
        const { error } = await supabase.from(table).delete().in("id", idList);
        if (error) {
          console.error("Error batch deleting reviews by IDs:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ success: true, count: idList.length });
      }

      if (status) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("status", status);
        if (error) {
          console.error("Error batch deleting reviews by status:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ success: true, deletedStatus: status });
      }

      if (!id) {
        return Response.json(
          { error: "Thiếu ID hoặc tiêu chí nhận xét cần xóa." },
          { status: 400 }
        );
      }

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) {
        console.error("Error deleting review:", error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      return Response.json({ success: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal Server Error";
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  return { GET, POST, PATCH, DELETE };
}
