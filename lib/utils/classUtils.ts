/**
 * Utility functions for class management
 */

// Constants
export const MIN_LOADING_TIME = 250; // Minimum loading time in ms to prevent UI jitter
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Status mappings
export const STUDENT_STATUS_MAP = {
  online: "Đang học",
  banned: "Bị cấm",
} as const;

export const CLASS_STATUS_MAP = {
  active: "Đang hoạt động",
  inactive: "Tạm dừng",
} as const;

/**
 * Ensure minimum loading time to prevent UI jitter
 */
export const ensureMinLoadingTime = async (startTime: number, minTime: number = MIN_LOADING_TIME): Promise<void> => {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, minTime - elapsedTime);
  if (remainingTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }
};

/**
 * Calculate pagination adjustments when data changes
 */
export const calculatePaginationAdjustment = (
  currentPage: number,
  total: number,
  pageSize: number,
  dataLength: number
): number | null => {
  const maxPage = Math.ceil(total / pageSize) || 1;

  // If current page has no data and we're not on page 1, go to previous page
  if (dataLength === 0 && currentPage > 1) {
    return Math.max(1, currentPage - 1);
  }
  // If current page exceeds max page, go to max page
  if (currentPage > maxPage && maxPage > 0) {
    return maxPage;
  }

  return null;
};

/**
 * Format student ID
 */
export const formatStudentId = (userId: number | string, username?: string): string => {
  return username || `HS${String(userId).padStart(3, "0")}`;
};

