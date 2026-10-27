export const GWR_ORIGINAL_ASSET_REFRESH_MESSAGE = 'Không thể lấy ảnh gốc, vui lòng tải lại trang và thử lại';

export function showUserNotice(targetWindow = globalThis, message = '') {
  const normalizedMessage = typeof message === 'string' ? message.trim() : '';
  if (!normalizedMessage) {
    return false;
  }

  try {
    if (typeof targetWindow?.alert === 'function') {
      targetWindow.alert(normalizedMessage);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
