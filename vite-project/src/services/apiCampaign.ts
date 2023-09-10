import { campaigngApi } from "@/model/Auth.model";
import instance from "./api";
const Config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const campaign = (data: campaigngApi) => {
  console.log(data);

  let x = "";
  if (data.search_value) {
    x = `&search_value=${data.search_value}`;
  }
  return instance.get(
    `/campaign?page=${data.page}&search_by=title${x}&page_size=${data.page_size}`
  );
};
export const campaignDetail = (data: campaigngApi) => {
  return instance.get(`/campaign/${data.id}`);
};
export const putCampaign = (data: campaigngApi, token: string) => {
  return instance.put(`/campaign`, data, Config(token));
};

export const delCampaign = (data: any, token: string) => {
  return instance.delete(`/campaign`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ids: data },
  });
};

export const postCampaign = (data: campaigngApi, token: string) => {
  return instance.post(`/campaign`, data, Config(token));
};
export const postCampaignImg = (img: any, token: string) => {
  console.log(img);

  return instance.post(`/campaign`, img, Config(token));
};
