import { get, post } from "./api";
import { API } from "./constant/api-constant";

export const getAllReportData = async (pagination) => {
  return await get(API.getReport + pagination);
};