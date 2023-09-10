import { useEffect, useRef, useState } from "react";
import ContentDetailTitle from "./ContentDetailTitle";
import ContentDetailHeader from "./ContentDetailHeader";
import { notice } from "@/services/apiNotice";
import { DataNotice } from "model/Auth.model";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { useNavigate } from "react-router-dom";
import Loading from "@/component/loading/Loading";
const ContentDetail = () => {
  const scroller = useRef<HTMLDivElement>(null);
  const [dataNotice, setDataNotice] = useState([]);
  const dispath = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    function handleScroll() {
      let scrollY = window.scrollY;
      const addClass = "opacity-0 mt-140";
      if (scrollY > 300) {
        // console.log(scrollY);
        scroller &&
          scroller.current &&
          scroller.current.classList.remove(...addClass.split(" "));
      } else if (scrollY < 200) {
        scroller &&
          scroller.current &&
          scroller.current.classList.add(...addClass.split(" "));
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const getData = async () => {
    try {
      const responsive = await notice({
        page_size: "4",
        page: "0",

        search_by: "author",
      });
      let data = responsive.data.data?.list;
      // console.log(responsive.data.data);

      setDataNotice(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispath(activeLoading(true));
    getData();
    dispath(activeLoading(false));
  }, []);
  return (
    <div className="flex justify-center w-full  duration-500 transition-all  ">
      <Loading />
      <div
        className="w-80 mt-140 opacity-0 duration-500 transition-all "
        ref={scroller}
      >
        <ContentDetailHeader title={"공지사항"} to={"/announcement"} />
        <div className="w-full mt-25 flex justify-between flex-wrap ">
          {dataNotice.map((data: DataNotice, index: number) => (
            <div
              key={index}
              className="mt-4 lg:w-1/5 lg:mr-4 w-full "
              onClick={() => navigate(`/announcement/${data.id}`)}
            >
              <ContentDetailTitle
                title={data.title}
                text={data.content}
                date={data.updated_at}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
