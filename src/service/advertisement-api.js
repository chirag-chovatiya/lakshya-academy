import { get, post } from "./api";
import { API } from "./constant/api-constant";

export const getAllAdvertisementData = async (pagination) => {
  return await get(API.advertisement + pagination);
};

export async function getAdvertisementById(id) {
  return await get(`${API.advertisement}/${id}`);
}

export async function updateAdvertisementById(id, data) {
  return await post(API.advertisement + "/" + id, data);
}
