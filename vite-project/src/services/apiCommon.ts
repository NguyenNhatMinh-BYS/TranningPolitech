import instance from "./api";
export const upLoadImg = (img: any) => {
  console.log(img);

  return instance.post(`/assets`, img);
};
