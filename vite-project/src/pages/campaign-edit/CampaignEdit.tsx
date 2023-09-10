import Footer from "@/component/footter/Footer";
import Nav from "@/component/navigate/Nav";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yub from "yup";

import Quill from "@/component/quill/Quill";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import {
  campaignDetail,
  postCampaign,
  putCampaign,
} from "@/services/apiCampaign";
import { upLoadImg } from "@/services/apiCommon";
import Loading from "../../component/loading/Loading";
import { useCampaignEdit, useCampaignPost } from "@/queries/campaignQueries";
interface Title {
  title: string;
  link: string;
  img: string;
  content: string;
}
const module = {
  toolbar: [
    [{ header: [1, 2, false] }],

    ["bold", "italic", "underline", "blockquote"],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};
const schema = yub.object().shape({
  title: yub.string().required("입력하세요"),
  link: yub.string().required("입력하세요"),
  img: yub.string().required("입력하세요"),
  content: yub.string().required("입력하세요"),
});
const CampaignEdit = () => {
  const { state } = useLocation();
  const { infor } = state || "";

  const navigate = useNavigate();
  const [nameImg, setNameImg] = useState<string>("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Title>({
    mode: "onChange",
    defaultValues: {
      title: "",
      link: "",
      img: "",
      content: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(activeLoading(true));
    if (infor) {
      (async () => {
        try {
          const response = await campaignDetail({ id: infor.toString() });
          setValue("content", response.data.data.content);
          setValue("title", response.data.data.title);
          setValue("link", response.data.data.link);
          setValue("img", response.data.data.image_name);
          setNameImg(response.data.data.image_name);
        } catch (e) {
          console.log(e);
        }
      })();
    }
    dispatch(activeLoading(false));
  }, []);

  const mutateCreateCampaign= useCampaignPost()

  const createNotice = (data: Title, token: string) => {
    try {
      (async () => {
        const inputFile = document.querySelector("#files") as HTMLInputElement;
        // const file = inputFile.files ? inputFile.files[0] : null;

        if (inputFile?.files) {
          const form = new FormData();

          form.append("file", inputFile?.files[0]);
          const postFileImg = await upLoadImg(form);
          const campaignPost={
              title: data.title,
              content: data.content,
              link: data.link,
              image: postFileImg.data.data.filename,
              image_name: postFileImg.data.data.original_name,
          }
          mutateCreateCampaign.mutate({campaignPost,token})
          navigate(-1);
          toast.success("Created notice successfully");
        }
      })();
    } catch (e) {
      console.log(e);
    }
  };

  const mutationEdit = useCampaignEdit();

  const onSubmit = (data: Title) => {
    const token = localStorage.getItem("token") || "";

    if (!infor) createNotice(data, token);
    else {
      dispatch(activeLoading(true));
      try {
        (async () => {
          const inputFile = document.querySelector(
            "#files"
          ) as HTMLInputElement;

          if (inputFile?.files) {
            const form = new FormData();

            form.append("file", inputFile?.files[0]);
            console.log(inputFile?.files[0]);
            let postFileImg;
            if (inputFile?.files[0]) {
              postFileImg = await upLoadImg(form);
            }
            const dataEditCampaign = {
              id: infor.toString(),
              title: data.title,
              content: data.content,
              link: data.link,
              image: postFileImg?.data.data.filename || data.img,
              image_name: postFileImg?.data.data.original_name || nameImg,
            };

            mutationEdit.mutate({ dataEditCampaign, token });
          }
          navigate(-1);
        })();
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(activeLoading(false));
  };

  const handleGetFile = () => {
    const inputFile = document.querySelector("#files") as HTMLInputElement;
    console.log(inputFile.files);

    inputFile.addEventListener("change", () => {
      if (inputFile?.files) {
        setNameImg(inputFile?.files[0].name);
      }
    });
  };

  const delImg = () => {
    const inputFile = document.querySelector("#files") as HTMLInputElement;
    if (inputFile?.files) {
      inputFile.value = "";
      setNameImg("");
    }
    setValue("img", "");
    console.log(inputFile.files);
  };
  return (
    <div className=" pt-[100px] ">
      <Loading />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center ">
          <div className="w-3/5">
            <h1 className=" mt-[60px] mb-[40px] text-transparent text-[28px] font-black bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text inline-block">
              부산 전체보기
            </h1>
            <div className="flex w-full  bottom-[10px]  relative  bg-white border-[2px] border-solid">
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

            <div className="mt-[20px] relative">
              <Controller
                control={control}
                name="content"
                render={({ field }) => <Quill field={field} module={module} />}
              />
              <p className="text-red-500 absolute bottom-[-70px] ">
                {errors.content?.message}
              </p>
            </div>
            <div className="flex w-full  relative  bg-white border-[2px] border-solid mt-[42px] mb-[20px]">
              <h1 className="  grow-[3] text-[18px] font-bold text-center bg-[#b9e0ff] py-[14px]">
                제목
              </h1>

              <Controller
                control={control}
                name="link"
                render={({ field: { onChange } }) => (
                  <div className="grow-[7]  flex ">
                    <input
                      className=" outline-none pl-[20px] w-full"
                      type="text"
                      placeholder="제목을 입력해주세요."
                      {...register("link")}
                    />

                    <p className="text-red-500 absolute bottom-[-30px] left-0">
                      {errors.link?.message}
                    </p>
                  </div>
                )}
              />
            </div>
            <div className="inline-block max-w-[200px]   bg-white mt-[20px]">
              <div className="relative flex ">
                <label
                  htmlFor="files"
                  className="  grow-[3] text-[16px]  text-left bg-gradient-to-r from-blue-700 to-blue-400 text-white py-[8px]  w-[30px] flex justify-around"
                >
                  <p> 대표이미지 첨부</p>
                  <i className="bi bi-upload"></i>
                </label>
                {nameImg !== "" ? (
                  <div className=" absolute flex py-[8px] right-[-140px] ">
                    <p className="text-[14px]">{nameImg}</p>
                    <i
                      className="bi bi-x ml-[10px] bg-black rounded-md text-white px-[4px] cursor-pointer"
                      onClick={delImg}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <Controller
                control={control}
                name="img"
                render={({ field: { onChange } }) => (
                  <div className="grow-[7]  flex  relative">
                    <input
                      id="files"
                      type="file"
                      onClick={handleGetFile}
                      className=" outline-none pl-[20px] w-full invisible"
                      placeholder="제목을 입력해주세요."
                      {...register("img")}
                    />

                    <p className="text-red-500 absolute bottom-[-30px] left-0">
                      {errors.img?.message}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-4/5 mb-[20px]">
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

export default CampaignEdit;
