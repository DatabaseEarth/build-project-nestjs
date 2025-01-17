export const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Chuyển từ giây sang mili giây
  return date.toISOString(); // Trả về định dạng ISO 8601
};
