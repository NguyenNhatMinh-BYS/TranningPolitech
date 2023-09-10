import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DataNotice } from "@/model/Auth.model";
import Nav from "@/component/navigate/Nav";
import dayjs from "dayjs";
import Footer from "@/component/footter/Footer";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { useLocation } from "react-router-dom";
import Loading from "../../component/loading/Loading";
import { freeBoardDetail } from "@/services/apiFreeBoard";
import ConfirmPassword from "./ConfirmPassword";
const FreeBoardDetail = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispath = useDispatch();
  const [data, setData] = useState<DataNotice>();
  const [id, setId] = useState(param.id);
  const [showInputPassword, setShowInputPassword] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const getDataAnnouncementDetail = async () => {
    dispath(activeLoading(true));
    try {
      const response = await freeBoardDetail({
        search_by: state ? state.search_by : "",
        search_value: state ? state.search_value : "",
        id: id,
      });
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispath(activeLoading(false));
  };
  useEffect(() => {
    getDataAnnouncementDetail();
  }, [id]);
  const CloseConfirmPW = () => {
    setShowInputPassword(false);
  };
  const editIteam = (password: string) => {
    setShowInputPassword(false);
    navigate(`/freeboard/edit/${id}`, {
      state: { infor: id, password: password },
    });
  };
  return (
    <div className="h-auto relative">
      {showInputPassword ? (
        <ConfirmPassword
          CloseConfirmPW={CloseConfirmPW}
          isDeleted={isDeleted}
          idItem={id || ""}
          editIteam={editIteam}
        />
      ) : (
        ""
      )}
      <Loading />

      <div className="h-full flex justify-between flex-col ">
        {/* main  */}
        <div className="w-full flex justify-center mt-[160px] mb-[120px]  ">
          <div className="w-4/5">
            {/* title  */}
            <div>
              <h1 className="text-transparent text-[28px] font-black bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text inline-block ">
                자유게시판
              </h1>
            </div>
            {/* information  */}
            <div className="w-full bg-[#b4dcfff7] my-[40px] px-[20px] py-[10px] font-bold">
              <h1>{data?.title}</h1>
            </div>
            <div>
              <div className="flex justify-around items-center max-[1024px]:flex-col max-[1024px]:items-start gap-5">
                {" "}
                <div className=" px-[20px] flex flex-1 justify-between lg:mr-[100px] mr-0 ">
                  <h1 className="font-bold pr-[10px]">작성자</h1>
                  <p className="pl-[20px] border-l-[1px] border-solid border-[#7d7d7dbc]">
                    {data?.author}
                  </p>
                </div>
                <div className=" px-[20px] flex flex-1 justify-between  lg:mr-[100px] mr-0">
                  <h1 className="font-bold pr-[10px]">작성일</h1>
                  <p className="pl-[20px] border-l-[1px] border-solid border-[#7d7d7dbc]">
                    {dayjs(data?.updated_at).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
              {/* content  */}
              <div className="mt-[16px] py-[6px] border-y-[1px] border-neutral-300">
                <div
                  className="mx-[20px] px-[10px] ql-editor "
                  dangerouslySetInnerHTML={{ __html: data?.content || "" }}
                />
              </div>
            </div>
            {/* navigate */}
            <div className="flex justify-between max-[1280px]:flex-col items-center">
              <div className="flex grow-[1] mt-[20px] items-center text-center">
                {/* edit  */}
                <div
                  className="w-[80px] px-[20px] py-[10px] border-[1px] border-solid border-[#bfbfbfb9] cursor-pointer"
                  onClick={() => {
                    setShowInputPassword(true);
                    setIsDeleted(false);
                  }}
                >
                  수정
                </div>
                {/* delete */}
                <div
                  className="w-[80px] mx-[20px] bg-[#bfbfbfb9] px-[20px] py-[10px] cursor-pointer"
                  onClick={() => {
                    setShowInputPassword(true);
                    setIsDeleted(true);
                  }}
                >
                  삭제
                </div>
              </div>
              <div className="flex w-full justify-end mt-[20px] grow-[1] items-center max-[1280px]:justify-center">
                {/* pre  */}
                {data?.previous ? (
                  <div
                    onClick={() => setId(data.previous)}
                    className="lg:px-[20px] py-[10px] bg-[#D9D9D9] cursor-pointer px-[10px]"
                  >
                    이전 글
                  </div>
                ) : (
                  ""
                )}
                {/* back */}
                <div
                  onClick={() => navigate(-1)}
                  className="mx-[20px] bg-gradient-to-r from-blue-700 to-blue-400 lg:px-[20px] py-[10px] text-white cursor-pointer px-[10px]"
                >
                  목록으로
                </div>
                {/* next */}
                {data?.next ? (
                  <div
                    onClick={() => setId(data.next)}
                    className="lg:px-[20px] py-[10px] bg-[#D9D9D9] cursor-pointer px-[10px]"
                  >
                    다음 글
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardDetail;
