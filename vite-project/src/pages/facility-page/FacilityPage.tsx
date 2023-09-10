import { useEffect, useState } from "react";

import Content from "./component/Content";
import useWebSocket from "react-use-websocket";
import ContentAdmin from "./component/ContentAdmin";
import { FacilityData, CommandType } from "@/model/Auth.model";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Banner from "@/component/banner/Banner";
import imgPage4 from "assets/img/BannerPage4.png";
import iconPage4 from "assets/img/iconPage4.png";
const FacilityPage = () => {
  const [role, setRole] = useState();
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [data] = useState<Array<FacilityData>>([]);
  const [request, setRequest] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { VITE_SOCKET_FACILITY_ENDPOINT } = import.meta.env;
  const [isLoad, setIsload] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const { readyState, sendJsonMessage } = useWebSocket(
    VITE_SOCKET_FACILITY_ENDPOINT,
    {
      onOpen: () => {
        console.log("Success!");
      },
      onClose: () => {
        console.log("close!");
      },
      onMessage: (e) => {
        const res = JSON.parse(e.data);
        if (typeof res?.data?.number === "number" && request === 0) {
          setTotalCount(res?.data?.number);

          setRequest(1);
          return;
        }
        if (res.data && request === 1) {
          data.push(res.data);
          if (data.length % 10 === 0 || data.length === totalCount) {
            forceUpdate();
          }
          if (data.length === totalCount - 1) {
            setIsload(false);
          }
        }
      },
      onError: (e) => {
        console.log("error", e);
        toast.error("Dont Connect to server");
        setIsload(false);
        setIsError(true);
      },
      filter: () => false,
    }
  );

  useEffect(() => {
    if (readyState === 1) {
      // 1 - open
      setIsload(true);
      sendJsonMessage({
        head: "monitoring",
        command: CommandType.spot,
        data: {
          request,
        },
      });
    }
  }, [readyState, request]);
  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      setRole(JSON.parse(dataUser).role);
    }
  }, []);

  return (
    <div className=" pt-[100px] flex flex-col justify-around h-full">
      <div className="grow-[2] ">
        <Banner
          imgBanner={imgPage4}
          icon={iconPage4}
          text={"깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다."}
        />
      </div>
      <div className="grow-[7] min-h-[600px]">
        {role !== "Admin" ? (
          <Content data={data} isLoad={isLoad} isError={isError} />
        ) : (
          <ContentAdmin data={data} isLoad={isLoad} />
        )}
      </div>
    </div>
  );
};

export default FacilityPage;
