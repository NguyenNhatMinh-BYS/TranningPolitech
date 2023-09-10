import instance from "./api";
import { FreeBoard, Notice, UserPostFreeBoard } from "@/model/Auth.model";
const Config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const freeBoard = (data: Notice) => {
  console.log(data);

  let x = "",
    y = "",
    z = "";
  if (data.search_value) x = `&search_value=${data.search_value}`;
  if (data.page_size) y = `&page_size=${data.page_size}`;
  if (data.search_by) z = `&search_by=${data.search_by}`;

  return instance.get(`/free-board?page=${data.page}${y}${z}${x}`);
};

export const freeBoardDetail = (data: Notice) => {
  let x = "",
    y = "";
  if (data.search_by) {
    x = `search_by=${data.search_by}`;
  }
  if (data.search_value) {
    y = `search_value=${data.search_value}&`;
  }

  return instance.get(`/free-board/${data.id}?${y}${x}`);
};

export const putFreeBoard = (data: FreeBoard, token: string, id: string) => {
  return instance.put(`/free-board/admin/${id}`, data, Config(token));
};

export const delFreeBoard = (data: any, token: string) => {
  console.log({ data });

  return instance.delete(`/free-board`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ids: data },
  });
};

export const postFreeBoard = (data: FreeBoard, token: string) => {
  return instance.post(`/free-board/admin`, data, Config(token));
};
export const postFreeBoardUser = (data: UserPostFreeBoard) => {
  console.log(data);

  return instance.post(`/free-board`, data);
};

export const validateAuthor = (id: string, password: string) => {
  console.log(id, { password: password });

  return instance.post(`/free-board/${id}`, { password: password });
};
export const deleteFreeBoardPost = (id: string, password: string) => {
  return instance.delete(`/free-board/${id}`, {
    data: { password: password },
  });
};
export const editFreeBoard = (id: string, data: UserPostFreeBoard) => {
  return instance.put(`/free-board/${id}`, data);
};
