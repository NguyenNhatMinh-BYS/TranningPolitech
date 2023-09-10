import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notice, noticeDetail } from "@/services/apiNotice";
import { DataNotice } from "@/model/Auth.model";
import Nav from "@/component/navigate/Nav";
import dayjs from "dayjs";
import Footer from "@/component/footter/Footer";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { useLocation } from "react-router-dom";
import Loading from "../../component/loading/Loading";
import { livingLabDetail } from "@/services/apiLivingLab";
const LivingLabDetail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispath = useDispatch();
  const [data, setData] = useState<DataNotice>();
  const [id, setId] = useState(param.id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const getDataAnnouncementDetail = async () => {
    dispath(activeLoading(true));
    console.log(state);

    try {
      const response = await livingLabDetail({
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

  return (
    <div className="h-auto relative">
      <Loading />

      <div className="h-full flex justify-between flex-col ">
        {/* main  */}
        <div className="w-full flex justify-center mt-[160px] mb-[120px]  ">
          <div className="w-3/5">
            {/* title  */}
            <div>
              <h1 className="text-transparent text-[28px] font-black bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text w-[120px] ">
                공지사항
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
            <div className="flex w-full justify-end mt-[20px]">
              {/* pre  */}
              {data?.previous ? (
                <div
                  onClick={() => setId(data.previous)}
                  className="px-[20px] py-[10px] bg-[#D9D9D9] cursor-pointer"
                >
                  이전 글
                </div>
              ) : (
                ""
              )}
              {/* back */}
              <div
                onClick={() =>
                  // navigate("-1", {
                  //   state: {
                  //     search_value: state.search_value,
                  //     search_by: state.search_by,
                  //   },
                  // })
                  navigate(-1)
                }
                className="mx-[20px] bg-gradient-to-r from-blue-700 to-blue-400 px-[20px] py-[10px] text-white cursor-pointer"
              >
                목록으로
              </div>
              {/* next */}
              {data?.next ? (
                <div
                  onClick={() => setId(data.next)}
                  className="px-[20px] py-[10px] bg-[#D9D9D9] cursor-pointer"
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
  );
};

export default LivingLabDetail;
