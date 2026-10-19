"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Trash2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  type ReviewItem,
  type WebTextReviewConfig,
  resolveReviewConfig,
} from "./types";

export type { ReviewItem, WebTextReviewConfig } from "./types";

export interface ReviewFeedbackSystemProps {
  /** Tuỳ chỉnh tên project, API path, màu sắc, bật/tắt… */
  config?: WebTextReviewConfig;
}

export function ReviewFeedbackSystem(props: ReviewFeedbackSystemProps = {}) {
  const { config } = props;
  const cfg = useMemo(() => resolveReviewConfig(config), [config]);
  const pathname = usePathname();
  const router = useRouter();

  // Review drawer state
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMode, setFilterMode] = useState<"current" | "all" | "pending" | "resolved">("current");

  // Selection popup state
  const [selectionBox, setSelectionBox] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Comment dialog state
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reviewerName, setReviewerName] = useState("Reviewer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const commentDialogRef = useRef<HTMLDivElement>(null);

  // Load saved reviewer name
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(cfg.storageKey);
      if (savedName) setReviewerName(savedName);
    } catch {
      // Ignore localStorage error
    }
  }, [cfg.storageKey]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch reviews from API
  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${cfg.apiPath}?page_path=all`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cfg.apiPath]);

  useEffect(() => {
    if (!cfg.enabled) return;
    fetchReviews();
    const interval = setInterval(fetchReviews, cfg.pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchReviews, cfg.enabled, cfg.pollIntervalMs]);

  // Handle text selection on page
  useEffect(() => {
    if (!cfg.enabled) return;
    const handleMouseUp = () => {
      // Don't trigger if selection was inside drawer or dialog
      const activeEl = document.activeElement;
      if (
        drawerRef.current?.contains(activeEl) ||
        commentDialogRef.current?.contains(activeEl)
      ) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        // If clicked outside and dialog isn't open, clear selection box
        if (!commentDialogOpen) {
          setSelectionBox(null);
        }
        return;
      }

      const selectedStr = selection.toString().trim();
      if (selectedStr.length > 1) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setSelectionBox({
              text: selectedStr,
              x: Math.max(10, Math.min(window.innerWidth - 180, rect.left + rect.width / 2 - 80)),
              y: Math.max(10, rect.top + window.scrollY - 44),
            });
          }
        } catch {
          // Ignore range error
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [commentDialogOpen, cfg.enabled]);

  // Open submit dialog
  const handleOpenCommentDialog = () => {
    if (!selectionBox) return;
    setCommentDialogOpen(true);
  };

  // Submit new review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectionBox) return;

    try {
      setIsSubmitting(true);
      const payload = {
        page_path: pathname || "/",
        selected_text: selectionBox.text,
        comment: commentText.trim(),
        reviewer_name: reviewerName.trim() || "Reviewer",
      };

      const res = await fetch(cfg.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        try {
          localStorage.setItem(cfg.storageKey, reviewerName.trim());
        } catch {
          // Ignore
        }
        setCommentText("");
        setCommentDialogOpen(false);
        setSelectionBox(null);
        showToast("Đã lưu nhận xét! Dữ liệu đã đồng bộ lên cloud.");
        await fetchReviews();
        setIsOpen(true);
      } else {
        alert(data.error || "Gửi nhận xét thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối khi gửi nhận xét.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle review status (pending <-> resolved)
  const handleToggleStatus = async (item: ReviewItem) => {
    const newStatus = item.status === "pending" ? "resolved" : "pending";
    try {
      const res = await fetch(cfg.apiPath, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) => (r.id === item.id ? { ...r, status: newStatus } : r))
        );
        showToast(newStatus === "resolved" ? "Đã đánh dấu hoàn thành!" : "Đã chuyển lại thành chờ sửa.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Batch selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBatchCopied, setIsBatchCopied] = useState(false);
  const [isBatchResolving, setIsBatchResolving] = useState(false);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

  // Close drawer or comment dialog when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (commentDialogOpen) {
          setCommentDialogOpen(false);
          setSelectionBox(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, commentDialogOpen]);

  // Toggle single review selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all visible reviews in the current filter
  const handleToggleSelectAllVisible = () => {
    const visibleIds = filteredReviews.map((r) => r.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Select all pending reviews across all pages
  const handleSelectAllPending = () => {
    const pendingIds = reviews.filter((r) => r.status === "pending").map((r) => r.id);
    if (pendingIds.length === 0) {
      showToast("Không có nhận xét nào đang chờ sửa.");
      return;
    }
    setSelectedIds(pendingIds);
    showToast(`Đã chọn toàn bộ ${pendingIds.length} nhận xét đang chờ sửa.`);
  };

  // Clear all selections
  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  // Generate and copy batch prompt for AI
  const handleCopyBatchPrompt = () => {
    const selectedItems = reviews.filter((r) => selectedIds.includes(r.id));
    if (selectedItems.length === 0) {
      showToast("Vui lòng tick chọn ít nhất 1 nhận xét để copy batch prompt.");
      return;
    }

    const prompt = selectedItems
      .map(
        (item) => `Tại trang web \`${item.page_path}\`:
- Đoạn text/vị trí cần sửa: "${item.selected_text || "Toàn trang"}"
- Nhận xét từ Reviewer (${item.reviewer_name}): "${item.comment}"
Hãy tìm file mã nguồn tương ứng và sửa lại theo đúng yêu cầu của reviewer.`
      )
      .join("\n\n");

    navigator.clipboard.writeText(prompt);
    setIsBatchCopied(true);
    showToast(`Đã copy ${selectedItems.length} Prompt! Dán (Ctrl + V) vào chat để AI sửa tất cả.`);
    setTimeout(() => setIsBatchCopied(false), 2500);
  };

  // Batch mark selected reviews as resolved
  const handleBatchResolve = async () => {
    if (selectedIds.length === 0) return;
    try {
      setIsBatchResolving(true);
      await Promise.all(
        selectedIds.map((id) =>
          fetch(cfg.apiPath, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "resolved" }),
          })
        )
      );
      setReviews((prev) =>
        prev.map((r) => (selectedIds.includes(r.id) ? { ...r, status: "resolved" } : r))
      );
      showToast(`Đã đánh dấu ${selectedIds.length} nhận xét là đã sửa xong!`);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật trạng thái.");
    } finally {
      setIsBatchResolving(false);
    }
  };

  // Batch delete selected reviews
  const handleBatchDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} nhận xét đang được chọn?`)) {
      return;
    }

    try {
      setIsBatchDeleting(true);
      const res = await fetch(`${cfg.apiPath}?ids=${selectedIds.join(",")}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
        showToast(`Đã xóa ${selectedIds.length} nhận xét đã chọn.`);
        setSelectedIds([]);
      } else {
        alert(data.error || "Lỗi khi xóa nhận xét.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối khi xóa nhận xét.");
    } finally {
      setIsBatchDeleting(false);
    }
  };

  // Batch delete all resolved reviews (task đã hoàn thành)
  const handleBatchDeleteResolved = async () => {
    const resolvedItems = reviews.filter((r) => r.status === "resolved");
    if (resolvedItems.length === 0) {
      showToast("Không có task nào đã hoàn thành để xóa.");
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa toàn bộ ${resolvedItems.length} task đã hoàn thành?`)) {
      return;
    }

    try {
      setIsBatchDeleting(true);
      const res = await fetch(`${cfg.apiPath}?status=resolved`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.status !== "resolved"));
        setSelectedIds((prev) =>
          prev.filter((id) => !resolvedItems.some((r) => r.id === id))
        );
        showToast(`Đã xóa sạch ${resolvedItems.length} task đã hoàn thành!`);
      } else {
        alert(data.error || "Lỗi khi xóa task hoàn thành.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối khi xóa nhận xét.");
    } finally {
      setIsBatchDeleting(false);
    }
  };

  // Delete review
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nhận xét này?")) return;
    try {
      const res = await fetch(`${cfg.apiPath}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
        showToast("Đã xóa nhận xét.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generate and copy ready-made AI Prompt (single)
  const handleCopyAIPrompt = (item: ReviewItem) => {
    const prompt = `Tại trang web \`${item.page_path}\`:
- Đoạn text/vị trí cần sửa: "${item.selected_text || "Toàn trang"}"
- Nhận xét từ Reviewer (${item.reviewer_name}): "${item.comment}"
Hãy tìm file mã nguồn tương ứng và sửa lại theo đúng yêu cầu của reviewer.`;

    navigator.clipboard.writeText(prompt);
    setCopiedId(item.id);
    showToast("Đã copy Prompt cho AI! Bạn chỉ cần dán (Ctrl + V) vào chat.");
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    if (filterMode === "current") return r.page_path === pathname;
    if (filterMode === "pending") return r.status === "pending";
    if (filterMode === "resolved") return r.status === "resolved";
    return true;
  });

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const currentPendingCount = reviews.filter(
    (r) => r.page_path === pathname && r.status === "pending"
  ).length;

  if (!cfg.enabled) return null;

  const primary = cfg.primaryColor;
  const accent = cfg.accentColor;

  return (
    <>
      {/* ─── TOAST NOTIFICATION ────────────────────────────────────────── */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-full bg-[#183e2b] text-white text-xs sm:text-sm font-medium shadow-2xl border border-[#22c55e]/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>{notification}</span>
        </div>
      )}

      {/* ─── FLOATING SELECTION TOOLTIP ("THÊM NHẬN XÉT") ────────────── */}
      {selectionBox && !commentDialogOpen && (
        <div
          style={{
            position: "absolute",
            left: `${selectionBox.x}px`,
            top: `${selectionBox.y}px`,
            zIndex: 9990,
          }}
          className="animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            onClick={handleOpenCommentDialog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B3B2B] text-white text-xs font-semibold shadow-xl border border-white/20 hover:bg-[#142C20] hover:scale-105 transition-all cursor-pointer select-none"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#FAF7F2]" />
            <span>Thêm nhận xét</span>
          </button>
        </div>
      )}

      {/* ─── COMMENT SUBMISSION MODAL DIALOG ───────────────────────────── */}
      {commentDialogOpen && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            ref={commentDialogRef}
            className="w-full max-w-lg rounded-3xl bg-[#FAF7F2] border border-[#1B3B2B]/20 shadow-2xl p-6 sm:p-7 relative text-[#242220]"
          >
            <button
              onClick={() => {
                setCommentDialogOpen(false);
                setSelectionBox(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-[#242220]/50 hover:text-[#242220] hover:bg-[#1B3B2B]/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1B3B2B] text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#E2ECE5]" />
              </div>
              <div>
                <h3 className="font-anton text-lg uppercase tracking-tight text-[#242220]">
                  Gửi nhận xét Review
                </h3>
                <p className="text-[11px] font-mono text-[#7B0323]">
                  Trang: {pathname}
                </p>
              </div>
            </div>

            {/* Selected quote preview */}
            {selectionBox?.text && (
              <div className="mb-4 p-3 rounded-2xl bg-[#FFFFFF] border border-[#1B3B2B]/15 text-xs text-[#242220]/80 italic line-clamp-3">
                “{selectionBox.text}”
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#242220] mb-1.5">
                  Nội dung cần sửa đổi / góp ý:
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ví dụ: Chuyển đoạn này thành in thường, căn giữa lại ảnh, thay số liệu..."
                  rows={4}
                  required
                  autoFocus
                  className="w-full p-3.5 rounded-2xl bg-white border border-[#1B3B2B]/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]/30 resize-none text-[#242220]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-[11px] font-mono text-[#242220]/60 mb-1">
                    Tên của bạn:
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Reviewer"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1B3B2B]/20 text-xs text-[#242220] focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end sm:pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCommentDialogOpen(false);
                      setSelectionBox(null);
                    }}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold border border-[#1B3B2B]/20 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#7B0323] text-white hover:bg-[#5E021A] transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Đang gửi..." : "Gửi nhận xét"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── FLOATING REVIEW BADGE / LAUNCHER (GÓC DƯỚI BÊN PHẢI) ─────── */}
      <div className="print:hidden fixed bottom-6 right-6 z-[9980] flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mở bảng nhận xét"
          style={{ backgroundColor: primary }}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full text-white shadow-2xl border border-white/20 hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#FAF7F2]" />
            {pendingCount > 0 && (
              <span
                style={{ backgroundColor: accent }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-xs"
              >
                {pendingCount}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            Review Mode
          </span>
          {currentPendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[#FAF7F2] text-[10px] font-mono font-bold">
              Trang này ({currentPendingCount})
            </span>
          )}
        </button>
      </div>

      {/* ─── REVIEW SIDEBAR / DRAWER ─────────────────────────────────── */}
      {isOpen && (
        <div className="print:hidden fixed inset-0 z-[9990] flex justify-end bg-black/30 backdrop-blur-2xs animate-in fade-in duration-150">
          <div
            ref={drawerRef}
            className="w-full max-w-md h-full bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#1B3B2B]/20 animate-in slide-in-from-right duration-250 text-[#242220]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#1B3B2B]/15 flex items-center justify-between shrink-0 bg-[#FAF7F2]">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#1B3B2B]" />
                  <h2 className="font-anton text-xl uppercase tracking-tight text-[#242220]">
                    Bảng Nhận Xét
                  </h2>
                </div>
                <p className="text-xs text-[#242220]/60 font-mono mt-0.5">
                  Đồng bộ Realtime • Supabase Cloud
                </p>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#242220]/10 text-[#242220]/60 border border-[#242220]/15 select-none">
                  ESC
                </kbd>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-[#242220]/50 hover:text-[#242220] hover:bg-[#1B3B2B]/10 transition-colors cursor-pointer"
                  title="Đóng bảng nhận xét (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-5 py-3 border-b border-[#1B3B2B]/15 flex items-center gap-1.5 overflow-x-auto shrink-0 bg-[#FAF7F2]">
              <button
                onClick={() => setFilterMode("current")}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0 transition-colors cursor-pointer ${
                  filterMode === "current"
                    ? "bg-[#1B3B2B] text-white"
                    : "bg-[#FFFFFF] text-[#242220]/70 hover:bg-[#E2ECE5]"
                }`}
              >
                Trang này ({reviews.filter((r) => r.page_path === pathname).length})
              </button>
              <button
                onClick={() => setFilterMode("pending")}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0 transition-colors cursor-pointer ${
                  filterMode === "pending"
                    ? "bg-[#7B0323] text-white"
                    : "bg-[#FFFFFF] text-[#242220]/70 hover:bg-[#E2ECE5]"
                }`}
              >
                Chờ sửa ({pendingCount})
              </button>
              <button
                onClick={() => setFilterMode("resolved")}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0 transition-colors cursor-pointer ${
                  filterMode === "resolved"
                    ? "bg-[#1B3B2B] text-white"
                    : "bg-[#FFFFFF] text-[#242220]/70 hover:bg-[#E2ECE5]"
                }`}
              >
                Đã xong ({reviews.filter((r) => r.status === "resolved").length})
              </button>
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0 transition-colors cursor-pointer ${
                  filterMode === "all"
                    ? "bg-[#242220] text-white"
                    : "bg-[#FFFFFF] text-[#242220]/70 hover:bg-[#E2ECE5]"
                }`}
              >
                Tất cả ({reviews.length})
              </button>
            </div>

            {/* Instructions Banner */}
            <div className="px-5 py-2.5 bg-[#E2ECE5]/50 border-b border-[#1B3B2B]/15 text-[11px] text-[#1B3B2B] flex items-center justify-between">
              <span>💡 Bôi đen bất kỳ chữ nào trên web để gửi nhận xét. Bấm ESC để đóng.</span>
              <button
                onClick={fetchReviews}
                className="font-mono underline hover:text-[#7B0323] cursor-pointer"
              >
                Làm mới
              </button>
            </div>

            {/* Batch Selection & Action Toolbar */}
            {filteredReviews.length > 0 && (
              <div className="px-5 py-3 border-b border-[#1B3B2B]/15 bg-[#FAF7F2] flex flex-col gap-2.5 shrink-0 shadow-xs">
                <div className="flex items-center justify-between gap-2 text-xs flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-[#242220] select-none hover:text-[#7B0323]">
                    <input
                      type="checkbox"
                      checked={
                        filteredReviews.length > 0 &&
                        filteredReviews.every((r) => selectedIds.includes(r.id))
                      }
                      onChange={handleToggleSelectAllVisible}
                      className="w-4 h-4 rounded border-[#1B3B2B]/30 text-[#7B0323] accent-[#7B0323] cursor-pointer"
                    />
                    <span className="font-semibold text-xs">
                      {filteredReviews.every((r) => selectedIds.includes(r.id))
                        ? "Bỏ chọn tất cả"
                        : `Chọn tất cả (${filteredReviews.length})`}
                    </span>
                  </label>

                  <div className="flex items-center gap-2 text-[11px] font-mono flex-wrap">
                    {reviews.some((r) => r.status === "resolved") && (
                      <button
                        type="button"
                        onClick={handleBatchDeleteResolved}
                        disabled={isBatchDeleting}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-md border border-red-200 transition-colors"
                        title="Xóa vĩnh viễn toàn bộ các task đã hoàn thành"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                        <span>Xóa hết đã xong ({reviews.filter((r) => r.status === "resolved").length})</span>
                      </button>
                    )}
                    {pendingCount > 0 && (
                      <button
                        type="button"
                        onClick={handleSelectAllPending}
                        className="text-[#7B0323] font-bold hover:underline cursor-pointer"
                        title="Chọn tất cả các task chưa sửa"
                      >
                        Chọn hết chờ sửa ({pendingCount})
                      </button>
                    )}
                    {selectedIds.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearSelection}
                        className="text-[#242220]/60 hover:text-red-600 hover:underline cursor-pointer"
                      >
                        Xóa chọn
                      </button>
                    )}
                  </div>
                </div>

                {/* Batch Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyBatchPrompt}
                    disabled={selectedIds.length === 0}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                      selectedIds.length > 0
                        ? "bg-[#7B0323] hover:bg-[#5E021A] text-white ring-2 ring-[#7B0323]/25 active:scale-[0.98]"
                        : "bg-[#242220]/10 text-[#242220]/40 cursor-not-allowed"
                    }`}
                    title={
                      selectedIds.length > 0
                        ? `Copy ${selectedIds.length} task đã tick vào 1 prompt`
                        : "Vui lòng tick chọn ít nhất 1 task ở danh sách bên dưới"
                    }
                  >
                    {isBatchCopied ? (
                      <>
                        <Check className="w-4 h-4 text-[#22c55e]" />
                        <span>Đã copy {selectedIds.length} Task cho AI!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
                        <span>
                          Copy Batch Prompt {selectedIds.length > 0 ? `(${selectedIds.length} task)` : "(Tick chọn task)"}
                        </span>
                      </>
                    )}
                  </button>

                  {selectedIds.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleBatchResolve}
                        disabled={isBatchResolving}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#22c55e]/15 text-[#183e2b] hover:bg-[#22c55e]/25 transition-colors cursor-pointer border border-[#22c55e]/30 shrink-0"
                        title="Đánh dấu các task đang chọn là đã sửa xong"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>{isBatchResolving ? "..." : `Đã sửa (${selectedIds.length})`}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleBatchDeleteSelected}
                        disabled={isBatchDeleting}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer border border-red-200 shrink-0"
                        title="Xóa vĩnh viễn các task đang được chọn"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        <span>{isBatchDeleting ? "..." : `Xóa (${selectedIds.length})`}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {isLoading && reviews.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#242220]/50 font-mono">
                  Đang tải dữ liệu nhận xét...
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B]/10 text-[#1B3B2B] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-[#242220]">
                    Chưa có nhận xét nào
                  </h4>
                  <p className="text-xs text-[#242220]/60 mt-1 max-w-xs mx-auto">
                    Bôi đen đoạn chữ trên website để tạo nhận xét mới hoặc chuyển sang bộ lọc khác.
                  </p>
                </div>
              ) : (
                filteredReviews.map((item) => {
                  const isCurrentPage = item.page_path === pathname;
                  const isResolved = item.status === "resolved";
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? "bg-[#E2ECE5]/30 border-[#1B3B2B] ring-2 ring-[#1B3B2B]/30 shadow-sm"
                          : isResolved
                          ? "bg-[#FAF7F2]/60 border-[#1B3B2B]/10 opacity-75"
                          : "bg-white border-[#1B3B2B]/15 shadow-xs hover:border-[#1B3B2B]/35"
                      }`}
                    >
                      {/* Top bar: Checkbox, Page link & Status */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#1B3B2B]/10">
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(item.id)}
                            className="w-4 h-4 rounded border-[#1B3B2B]/30 text-[#7B0323] accent-[#7B0323] cursor-pointer shrink-0"
                            title="Tick chọn task này để copy gộp"
                          />
                          <button
                            onClick={() => {
                              if (!isCurrentPage) router.push(item.page_path);
                            }}
                            className="flex items-center gap-1 font-mono text-[11px] font-bold text-[#1B3B2B] hover:underline cursor-pointer truncate"
                          >
                            <span className="truncate">{item.page_path}</span>
                            {!isCurrentPage && <ExternalLink className="w-3 h-3 shrink-0" />}
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                              isResolved
                                ? "bg-[#22c55e]/15 text-[#183e2b]"
                                : "bg-[#7B0323]/15 text-[#7B0323]"
                            }`}
                          >
                            {isResolved ? "Đã sửa" : "Chờ sửa"}
                          </span>
                        </div>
                      </div>

                      {/* Selected text */}
                      {item.selected_text && (
                        <div className="mb-2.5 p-2 rounded-xl bg-[#FAF7F2] border border-[#1B3B2B]/10 text-xs text-[#242220]/75 italic line-clamp-3">
                          “{item.selected_text}”
                        </div>
                      )}

                      {/* Reviewer comment */}
                      <p className="text-xs sm:text-sm font-medium text-[#242220] mb-3 leading-relaxed whitespace-pre-wrap">
                        {item.comment}
                      </p>

                      {/* Metadata: Reviewer name & time */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#242220]/50 mb-3">
                        <span>Bởi: {item.reviewer_name}</span>
                        <span>{new Date(item.created_at).toLocaleDateString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1B3B2B]/10">
                        {/* Copy Prompt for AI Button */}
                        <button
                          onClick={() => handleCopyAIPrompt(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B3B2B] text-white hover:bg-[#142C20] text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
                          title="Copy prompt sẵn để dán cho AI sửa ngay"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#22c55e]" />
                              <span>Đã copy!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#FAF7F2]" />
                              <span>Copy Prompt cho AI</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-1.5">
                          {/* Toggle resolved */}
                          <button
                            onClick={() => handleToggleStatus(item)}
                            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              isResolved
                                ? "text-[#7B0323] hover:bg-[#7B0323]/10"
                                : "text-[#1B3B2B] hover:bg-[#1B3B2B]/10"
                            }`}
                            title={isResolved ? "Chuyển lại chờ sửa" : "Đánh dấu đã hoàn thành"}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isResolved ? "text-[#22c55e]" : "text-[#242220]/40"}`} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteReview(item.id)}
                            className="p-1.5 rounded-lg text-red-500/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa nhận xét"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom info */}
            <div className="p-4 border-t border-[#1B3B2B]/15 bg-[#FAF7F2] text-center text-[11px] text-[#242220]/50 font-mono">
              {cfg.projectName}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
