import { useNavigate } from "react-router-dom";
import Nav from "@/component/navigate/Nav";
import Footer from "@/component/footter/Footer";
import Quill from "@/component/quill/Quill";
import { Controller, useForm } from "react-hook-form";
import * as yub from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import {
  livingLabDetail,
  postLivingLab,
  putLivingLab,
} from "@/services/apiLivingLab";
interface Title {
  title: string;
  content: string;
}
const module = {
  toolbar: [
    [{ header: [1, 2, false] }],

    ["bold", "italic", "underline", "strike", "blockquote"],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean", "link", "image"],
  ],
};
const schema = yub.object().shape({
  title: yub.string().required("입력하세요"),
  content: yub.string().required("입력하세요"),
});
const LivingLabEdit = () => {
  const { state } = useLocation();
  const { infor } = state || "";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Title>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (infor) {
      (async () => {
        try {
          const response = await livingLabDetail({ id: infor.toString() });
          console.log(response);

          setValue("content", response.data.data.content);
          setValue("title", response.data.data.title);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  const createNotice = (data: Title, token: string) => {
    try {
      (async () => {
        await postLivingLab(
          {
            title: data.title,
            content: data.content,
          },
          token
        );
        navigate(-1);
        toast.success("Created notice successfully");
      })();
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (data: Title) => {
    const token = localStorage.getItem("token") || "";
    console.log(data.title);

    if (!infor) createNotice(data, token);
    else {
      try {
        (async () => {
          const response = await putLivingLab(
            {
              id: infor[0],
              title: data.title,
              content: data.content,
            },

            token
          );
          console.log(response);
        })();
        navigate(-1);
        toast.success("Created Edit successfully");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className=" pt-[100px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center ">
          <div className="w-3/5">
            <h1 className=" mt-[60px] mb-[20px] text-transparent text-[28px] font-black bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text inline-block">
              부산 전체보기
            </h1>
            <div className="flex w-full  relative  bg-white border-[2px] border-solid">
              <h1 className="  grow-[3] text-[18px] font-bold text-center bg-[#b9e0ff] py-[14px]">
                제목
              </h1>

              <Controller
                control={control}
                name="title"
                render={({ field: { onChange } }) => (
                  <div className="grow-[7]  flex ">
                    <input
                      className=" outline-none pl-[20px] w-full"
                      type="text"
                      placeholder="제목을 입력해주세요."
                      {...register("title")}
                    />

                    <p className="text-red-500 absolute bottom-[-30px] left-0">
                      {errors.title?.message}
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="mt-[40px]">
              <Controller
                control={control}
                name="content"
                render={({ field }) => <Quill field={field} module={module} />}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-4/5 mb-[20px] cursor-pointer">
          <button
            type="submit"
            className="mr-[20px] from-blue-700 to-blue-400 bg-gradient-to-r px-[40px] py-[10px] text-white"
          >
            수정
          </button>
          <div
            onClick={() => navigate(-1)}
            className="px-[40px] py-[10px] bg-[#D9D9D9] border-solid border-[1px] border-[#707070cc]"
          >
            취소
          </div>
        </div>
      </form>
    </div>
  );
};

export default LivingLabEdit;
