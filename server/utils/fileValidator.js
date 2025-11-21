export function isPdf(mimetype, name) {
  return mimetype === "application/pdf" || (name && name.toLowerCase().endsWith(".pdf"));
}

export function isImage(mimetype, name) {
  return mimetype.startsWith("image/") || (name && /\.(png|jpe?g|bmp|tiff)$/i.test(name));
}
