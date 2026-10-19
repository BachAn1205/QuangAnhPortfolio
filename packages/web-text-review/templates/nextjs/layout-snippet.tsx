/**
 * Thêm vào `app/layout.tsx` (Root Layout) — đặt trong body, sau {children}.
 *
 * import { ReviewFeedbackSystem } from "@holyann/web-text-review";
 * // hoặc relative: import { ReviewFeedbackSystem } from "../packages/web-text-review/src";
 */

/*
<body>
  {children}
  <ReviewFeedbackSystem
    config={{
      projectName: "My Project Review Hub",
      apiPath: "/api/reviews",
      storageKey: "my_project_reviewer_name",
      // Chỉ bật trên staging / khi cần review:
      // enabled: process.env.NEXT_PUBLIC_ENABLE_REVIEW === "true",
      primaryColor: "#1B3B2B",
      accentColor: "#7B0323",
    }}
  />
</body>
*/

export {};
