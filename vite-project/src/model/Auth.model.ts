export type dataUser = {
  created_at?: string;
  email?: string;
  full_name?: string;
  id?: string;
  phone_number?: string;
  role?: string;
  token?: string;
  updated_at: string;
  username: string;
  index?: string;
};
export type User = {
  username: string;
  password: string;
};
export interface FormValueRegister {
  full_name: string;
  username: string;
  password: string;
  confirmPassword?: string;
  phone_number: string;
  email: string;
}
export type DataNotice = {
  index?: number;
  author?: string;
  content: string;
  created_at?: string;
  id: string;
  title: string;
  updated_at?: string;
  user_id?: string;
  previous?: string;
  next?: string;
};

export interface PostNotice {
  title: string;
  content: string;
}
export interface Notice {
  id?: string;
  page_size?: string;
  page?: string;
  user_id?: string;
  search_value?: string;
  search_by?: string;
}
export interface ContentApi {
  author?: string;
  created_at?: string;
  description?: string;
  id?: string;
  title?: string;
  updated_at?: string;
  user_id?: string;
  video?: string;
  page_size?: string;
  search_value?: string;
  search_by?: string;
  page?: string;
}
export interface campaigngApi {
  author?: string;
  created_at?: string;
  description?: string;
  id?: string;
  title?: string;
  updated_at?: string;
  user_id?: string;
  video?: string;
  page_size?: string;
  page?: string;
  image?: string;
  search_value?: string;
  link?: string;
  content?: string;
  image_name?: string;
}
export interface livingLabeApi extends Notice {
  content?: string;
  title?: string;
}
export interface FreeBoard {
  author?: string;
  created_at?: string;
  description?: string;
  id?: string;
  title?: string;
  updated_at?: string;
  user_id?: string;
  content?: string;
  page_size?: string;
  page?: string;
}
export interface UserPostFreeBoard {
  author?: string;
  password?: string;
  title?: string;
  content: string;
}
export interface ValidateAuthor {
  id: string;
  password: string;
}
export interface ManageUser extends Notice {}
export type FacilityData = {
  index: number;
  address?: string;
  breadth?: string;
  depart?: string;
  district?: string;
  img?: string;
  isserviced?: boolean;
  kinds?: string;
  length?: string;
  pollution?: string;
  spotname?: string;
};

export enum CommandType {
  spot = "spot",
  using = "using",
}
