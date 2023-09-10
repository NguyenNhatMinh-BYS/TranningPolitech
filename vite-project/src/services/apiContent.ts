import { ContentApi } from "@/model/Auth.model";
import instance from "./api";
const Config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const contentDetail = ({ id }: ContentApi) => {
  console.log(id);
  return instance.get(`/content/${id}`);
};
export const content = (data: ContentApi) => {
  console.log(data);
  let x = "",
    y = "";
  if (data.search_by) {
    x = `&search_by=${data.search_by}`;
  }
  if (data.search_value) {
    y = `&search_value=${data.search_value}`;
  }
  return instance.get(
    `/content?page_size=${data.page_size}&page=${data.page}${x}${y}&user_id=c1c3255e-247a-4c39-96ab-b7f65903b7ba`
  );
};
export const putContent = (data: ContentApi, token: string) => {
  console.log(data);

  return instance.put(`/content`, data, Config(token));
};

export const delContent = (data: any, token: string) => {
  console.log({ data });

  return instance.delete(`/content`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ids: data },
  });
};

export const postContent = (data: ContentApi, token: string) => {
  return instance.post(`/content`, data, Config(token));
};
