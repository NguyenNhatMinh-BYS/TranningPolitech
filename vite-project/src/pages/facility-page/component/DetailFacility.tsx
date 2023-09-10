import { CommandType, FacilityData } from "@/model/Auth.model";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import dayjs from "dayjs";
type DataType = {
  depart?: string;
  garbage?: number;
  manpower?: 7;
  returntime?: string;
  spotname?: string;
  username?: string;
  usingtime?: string;
  state?: boolean;
};

interface FormDetailFacility {
  itemSelected?: FacilityData;
  handleCloseDetail?: () => void;
}
const DetailFacility: React.FC<FormDetailFacility> = ({
  itemSelected,
  handleCloseDetail,
}) => {
  const [dataDetail, setDataDetail] = useState<DataType[]>([]);
  const { VITE_SOCKET_FACILITY_ENDPOINT } = import.meta.env;
  const [isLoading, setIsLoading] = useState(true);
  const { readyState, sendJsonMessage } = useWebSocket(
    VITE_SOCKET_FACILITY_ENDPOINT,
    {
      onOpen: () => {
        console.log("Successfully Detail");
      },
      onClose: () => {
        console.log("Close Detail");
      },
      onMessage: (e) => {
        const response: { data: DataType[] } = JSON.parse(e.data);

        const data = response.data.some((item) => item.state === false);
        if (data) {
          setIsLoading(false);
          setDataDetail([]);
        } else {
          setDataDetail(response.data);
        }
      },
      onError: (e) => {
        console.log(e);
      },
      filter: () => false,
    }
  );

  useEffect(() => {
    if (readyState === 1 && itemSelected?.spotname) {
      sendJsonMessage(
        {
          head: "monitoring",
          command: CommandType.using,
          data: {
            spotname: itemSelected?.spotname,
          },
        },
        true
      );
    }
  }, [readyState, itemSelected]);
  const handleTime = (returntime?: string, usingtime?: string) => {
    const start = new Date(returntime || "");
    const end = new Date(usingtime || "");
    const houseDiff = Math.abs(end.getHours() - start.getHours());
    const minutesDiff = Math.abs(end.getMinutes() - start.getMinutes());
    return `${houseDiff}시간 ${minutesDiff}분`;
  };
  return (
    <div
      className="w-screen h-screen fixed bg-[#bcbcbc70] top-0 flex justify-center items-center z-[100]"
      onClick={handleCloseDetail}
    >
      <div
        className="bg-white w-3/5 h-auto rounded-md flex flex-col justify-center py-[40px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="px-[20px] text-[20px] font-bold max-[1280px]:text-center ">
          <span>{itemSelected?.spotname}</span> 쓰레기 수거 정보
        </div>
        <div className="flex justify-between px-[20px] mt-[20px] items-start max-[1280px]:flex-col max-[1280px]:justify-center max-[1280px]:items-center">
          <img
            src={`data:image/png;base64, ${itemSelected?.img}`}
            alt="imgDetail"
            className="h-[200px] mr-[20px]   max-[1280px]:mr-[0px] max-[1280px]:w-full object-cover "
          />
          <div className="grow-[8] max-[1280px]:w-full max-[1280px]:mt-[16px] overflow-auto border-solid border-[1px] ">
            <table className="w-full">
              <thead className="bg-[#b4dcfff7] h-[40px]  ">
                <tr>
                  <th className="py-[10px] w-[20%]">수거일자</th>
                  <th className="py-[10px] w-[20%]">수거시간</th>
                  <th className="py-[10px] w-[20%]">수거량</th>
                  <th className="py-[10px] w-[20%]">투입인력</th>
                </tr>
              </thead>
            </table>
            <div className=" h-[160px]  max-[1280px]:w-full  overflow-auto border-solid border-[1px] ">
              <table className="w-full relative">
                {dataDetail && dataDetail.length !== 0 ? (
                  <tbody>
                    {dataDetail.map((item, index: number) => (
                      <tr key={index}>
                        <th className="font-normal py-[26px] w-[20%]">
                          {dayjs(item.returntime).format("YYYY.MM.DD")}
                        </th>
                        <th className="font-normal py-[26px] w-[20%]">
                          {handleTime(item.returntime, item.usingtime)}
                        </th>
                        <th className="font-normal py-[26px] w-[20%]">
                          {(Number(item.garbage) / 1000).toFixed(1)} T
                        </th>
                        <th className="font-normal py-[26px] w-[20%]">
                          {item.manpower} 명
                        </th>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  ""
                )}

                {isLoading && dataDetail.length === 0 ? (
                  <div className="absolute text-center left-0 right-0 py-[20px] text-[16px]">
                    Loading...
                  </div>
                ) : !isLoading && dataDetail.length === 0 ? (
                  <div className="absolute text-center left-0 right-0 py-[20px] text-[16px]">
                    현재 사용 가능한 데이터가 없습니다.{" "}
                  </div>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailFacility;
