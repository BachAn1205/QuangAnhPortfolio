export type ReviewStatus = "pending" | "resolved";

export interface ReviewItem {
  id: string;
  page_path: string;
  selected_text: string | null;
  element_context: string | null;
  comment: string;
  reviewer_name: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

/** Cấu hình kit — truyền vào component để tái sử dụng trên mọi web */
export interface WebTextReviewConfig {
  /** Tên hiển thị ở chân drawer (VD: "My Shop Review Hub") */
  projectName?: string;
  /** Endpoint API, mặc định `/api/reviews` */
  apiPath?: string;
  /** Key localStorage lưu tên reviewer */
  storageKey?: string;
  /** Tắt kit (VD: chỉ bật trên staging) */
  enabled?: boolean;
  /** Poll interval ms, mặc định 15000 */
  pollIntervalMs?: number;
  /** Màu chính (nút launcher, header) — mặc định xanh đậm */
  primaryColor?: string;
  /** Màu nhấn (nút gửi, badge chờ) — mặc định đỏ rượu */
  accentColor?: string;
}

export const DEFAULT_REVIEW_CONFIG: Required<
  Pick<
    WebTextReviewConfig,
    | "projectName"
    | "apiPath"
    | "storageKey"
    | "enabled"
    | "pollIntervalMs"
    | "primaryColor"
    | "accentColor"
  >
> = {
  projectName: "Web Text Review Hub",
  apiPath: "/api/reviews",
  storageKey: "wtr_reviewer_name",
  enabled: true,
  pollIntervalMs: 15000,
  primaryColor: "#1B3B2B",
  accentColor: "#7B0323",
};

export function resolveReviewConfig(
  config?: WebTextReviewConfig
): typeof DEFAULT_REVIEW_CONFIG {
  return { ...DEFAULT_REVIEW_CONFIG, ...config };
}
