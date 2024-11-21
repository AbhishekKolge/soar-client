import { RADIAN } from "../constants";

export const calculateSliceOffset = (startAngle, endAngle) => {
  const midAngle = (startAngle + endAngle) / 2;
  const offsetRadius = 9;
  const dx = Math.cos(-RADIAN * midAngle) * offsetRadius;
  const dy = Math.sin(-RADIAN * midAngle) * offsetRadius;
  return { dx, dy };
};
