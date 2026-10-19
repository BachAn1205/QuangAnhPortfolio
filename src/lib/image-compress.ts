/**
 * Compresses an image File using HTML5 canvas before uploading.
 * Ensures the file is optimized for web display and always stays well under
 * the Vercel 4.5MB Serverless Function payload limit (FUNCTION_PAYLOAD_TOO_LARGE).
 */
export async function compressImage(
  file: File,
  maxDimension = 3840,
  maxSizeBytes = 4.2 * 1024 * 1024
): Promise<File> {
  // SVG shouldn't be processed via Canvas
  if (file.type === "image/svg+xml") {
    return file;
  }

  // If file is already small (e.g. <= 2.5MB), check if it's already safe
  if (file.size <= 2.5 * 1024 * 1024 && file.type !== "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    // If not in browser environment
    if (typeof window === "undefined") {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Downscale while preserving aspect ratio if dimensions are oversized
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) {
          resolve(file);
          return;
        }

        // Enable ultra-high quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Fill white background for transparent images converted to JPEG
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality JPEG for maximum web compression & compatibility
        const outputMime = "image/jpeg";
        let currentQuality = 0.94;

        const attemptBlob = (quality: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // If still exceeds payload limit, recursively lower quality slightly
              if (blob.size > maxSizeBytes && quality > 0.5) {
                attemptBlob(quality - 0.15);
                return;
              }

              const cleanBaseName = file.name.replace(/\.[^/.]+$/, "");
              const optimizedFileName = `${cleanBaseName}.jpg`;

              const compressedFile = new File([blob], optimizedFileName, {
                type: outputMime,
                lastModified: Date.now(),
              });

              console.log(
                `[Image Compression] Original: ${(file.size / (1024 * 1024)).toFixed(2)} MB -> Compressed: ${(
                  compressedFile.size / (1024 * 1024)
                ).toFixed(2)} MB (${width}x${height})`
              );

              resolve(compressedFile);
            },
            outputMime,
            quality
          );
        };

        attemptBlob(currentQuality);
      };

      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
