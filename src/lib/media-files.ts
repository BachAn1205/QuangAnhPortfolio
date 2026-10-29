/** Supabase free-plan object cap for this project. */
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|mkv|avi|3gp|mpeg|mpg)$/i;

export function isVideoFile(file: File) {
  return file.type.startsWith("video/") || VIDEO_EXT.test(file.name);
}

export function isVideoUrl(url: string) {
  const path = url.split("?")[0];
  return VIDEO_EXT.test(path) || url.startsWith("data:video/");
}

export function friendlyUploadError(message: string) {
  if (/exceeded the maximum allowed size/i.test(message)) {
    return "Video vượt quá dung lượng cho phép (tối đa 50MB). Hãy cắt ngắn hoặc nén thành file mp4 rồi tải lại.";
  }
  if (/payload too large|FUNCTION_PAYLOAD|body exceeded/i.test(message)) {
    return "Video quá lớn để gửi qua máy chủ. Hãy dùng file mp4 dưới 50MB.";
  }
  return message || "Không tải được file.";
}
