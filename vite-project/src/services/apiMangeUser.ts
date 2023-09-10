import { ManageUser } from "@/model/Auth.model";
import instance from "./api";
const Config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const manageUser = (data: ManageUser, token: string) => {
  console.log(data);

  let x = "",
    y = "";
  if (data.search_value) x = `&search_value=${data.search_value}`;
  if (data.search_by) y = `&search_by=${data.search_by}`;
  return instance.get(
    `/user?page=${data.page}&page_size=${data.page_size}${x}${y}`,
    Config(token)
  );
};
export const delUserNormal = (id: string, token: string) => {
  console.log(id, token);

  return instance.delete(`/user/${id}`, Config(token));
};
