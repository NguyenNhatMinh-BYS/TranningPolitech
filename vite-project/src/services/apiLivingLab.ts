import { livingLabeApi } from "@/model/Auth.model";
import instance from "./api";
const Config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const livingLab = (data: livingLabeApi) => {
  console.log(data);

  let x = "",
    y = "";
  if (data.search_value) x = `search_value=${data.search_value}&`;
  if (data.page_size) y = `page_size=${data.page_size}&`;
  return instance.get(
    `/living-lab?${y}&page=${data.page}&${x}search_by=${data.search_by}&user_id=c1c3255e-247a-4c39-96ab-b7f65903b7ba`
  );
};

export const livingLabDetail = (data: livingLabeApi) => {
  console.log(data);
  let x = "",
    y = "";
  if (data.search_by) x = `?search_by=${data.search_by}`;
  if (data.search_value) y = `&search_value=${data.search_value}`;
  console.log(x, y);

  return instance.get(`/living-lab/${data.id}${x}${y}`);
};

export const putLivingLab = (data: livingLabeApi, token: string) => {
  return instance.put(`/living-lab`, data, Config(token));
};

export const delLivingLab = (data: any, token: string) => {
  return instance.delete(`/living-lab`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ids: data },
  });
};

export const postLivingLab = (data: livingLabeApi, token: string) => {
  return instance.post(`/living-lab`, data, Config(token));
};
