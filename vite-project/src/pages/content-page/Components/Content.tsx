import { ContentApi } from "@/model/Auth.model";
import { useEffect, useRef, useState } from "react";
import { content } from "services/apiContent";
import dayjs from "dayjs";
import Loading from "@/component/loading/Loading";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
const Content = () => {
  const [colDataCurrent, setColDataCurrent] = useState("0");
  const [dataPageCurrent, setDataPageCurrent] = useState([]);
  const dispath = useDispatch();
  const [totalListData, setTotalListData] = useState<string[]>([]);
  const [isEmpty, setIsempty] = useState(false);
  const [maxMinListData, setMaxMinListData] = useState<string[]>([]);
  const totalDatas = useRef<number>(0);
  const listHeight = useRef<string[]>([]);
  
  const getId = (url: string) => {
    url = url.split("v=")[1];
    return url;
  };
  const handleClickIndexList = (index: number) => {
    // console.log(index);
    //
    setColDataCurrent(index.toString());
  };
  const showFull = (
    id: string,
    index: number,
    showIcon?: string,
    hiddenIcon?: string
  ) => {
    let idIconShow = document.getElementById(`${showIcon}`);
    let idIconHidden = document.getElementById(`${hiddenIcon}`);
    idIconShow?.classList.add(..."opacity-0 pointer-events-none".split(" "));
    idIconHidden?.classList.remove(
      ..."opacity-0 pointer-events-none".split(" ")
    );
    // const tmp = listHeight.current[index];

    const x = Number(listHeight.current[index]);
    const tmp = "400";
    console.log(x);

    let checkHeight = document.getElementById(`${id}`);
    checkHeight?.classList.add(`h-[${tmp}px]`);
    checkHeight?.classList.remove(..."line-clamp-4 h-[110px]".split(" "));
  };
  const showShort = (
    id: string,
    index: number,
    showIcon?: string,
    hiddenIcon?: string
  ) => {
    let idIconShow = document.getElementById(`${showIcon}`);
    let idIconHidden = document.getElementById(`${hiddenIcon}`);
    idIconShow?.classList.remove(..."opacity-0 pointer-events-none".split(" "));
    idIconHidden?.classList.add(..."opacity-0 pointer-events-none".split(" "));

    let checkHeight = document.getElementById(`${id}`);
    const x = Number(listHeight.current[index]) + 98;
    const tmp = "400";

    checkHeight?.classList.remove(`h-[${tmp}px]`);
    checkHeight?.classList.add(..."line-clamp-4 h-[110px]".split(" "));
  };
  const getDataContent = async () => {
    dispath(activeLoading(true));
    try {
      const response = await content({ page: colDataCurrent, page_size: "10" });

      setDataPageCurrent(response.data.data.list);
      let data = response.data.data?.list;
      data.length === 0 ? setIsempty(true) : setIsempty(false);
      const totalData = response.data.data?.total;
      totalDatas.current = totalData;
      for (
        let i = 10 * Number(colDataCurrent), x = 0;
        i <= 10 * Number(colDataCurrent) + 10 && x < 10;
        i++, x++
      ) {
        if (data[x]) {
          data[x].index = totalData - i;
        } else {
          break;
        }
      }
      setTotalListData(Array(Math.ceil(totalData / 10)).fill(""));
      setMaxMinListData(["0", (Math.ceil(totalData / 10) - 1).toString()]);

      return data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDataContent();

    dispath(activeLoading(false));
  }, [colDataCurrent]);
  useEffect(() => {
    listHeight.current = [];

    const elements = document.querySelectorAll(
      "#heghtFlex"
    ) as NodeListOf<HTMLElement>;

    if (elements && elements.length > 0) {
    
        elements.forEach((item, index) => {
          listHeight.current.push(item.offsetHeight.toString());
          const itemChildren = item.children;
          for (let i = 0; i < itemChildren.length; i++) {
            itemChildren[i].classList.add("h-[110px]");
          }
        });
       

      console.log(listHeight);
    }
  }, [dataPageCurrent]);
  return (
    <div className="w-full flex justify-center mt-[60px] mb-[80px] transition-all duration-200 ease-in-out ">
      <Loading />
      <div className="w-3/5 min-h-[580px]">
        <div>
          <h1 className="text-transparent text-[28px] font-black bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text w-[120px] ">
            시설현황
          </h1>
        </div>
        {dataPageCurrent &&
          dataPageCurrent.map((item: ContentApi, index: number) => (
            <div key={index} className="mt-[20px]">
              <div className="flex max-[1024px]:flex-wrap">
                <div className="mr-[40px]">
                  <iframe
                    width="300"
                    height="200"
                    src={`https://www.youtube.com/embed/${getId(
                      item.video || ""
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="w-full">
                  <div className="flex w-full">
                    <h1 className="w-[80%] font-bold text-[18px] line-clamp-2 max-[1024px]:mt-[20px]">
                      {item.title}
                    </h1>
                    <p className="w-[20%] mt-[10px] ml-[8px] font-light text-[14px]">
                      {dayjs(item?.updated_at).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className="flex items-end relative">
                    <div
                      id="heghtFlex"
                      className="mt-[10px] flex items-end transition-all duration-[600ms] ease-in-out w-full bg-[#dfdfdf41] h-auto "
                    >
                      <p
                        className=" text-[16px] bg-[#dfdfdf41] pt-[10px] pb-[5px] px-[10px] line-clamp-4 w-full  transition-all duration-[600ms] ease-in-out overflow-hidden"
                        id={`${item.title}`}
                        dangerouslySetInnerHTML={{
                          __html: item?.description || "",
                        }}
                      ></p>
                    </div>
                    {item.description &&
                    item.description?.trim().length > 200 ? (
                      <div className="cursor-pointer absolute bg-gradient-to-b from-blue-700 to-blue-400 inline-block py-[8px] px-[12px] text-white right-[-38px]  w-[36px] h-[40px] transition-all duration-200 ease-in-out">
                        <div>
                          <i
                            id={`${item.description}down`}
                            onClick={() =>
                              showFull(
                                item.title || " ",
                                index,
                                `${item.description}down`,
                                `${item.description}up`
                              )
                            }
                            className="bi bi-chevron-down text-[20px]  absolute top-[6px] right-[8px] transition-all duration-200 ease-in-out"
                          ></i>

                          <i
                            id={`${item.description}up`}
                            onClick={() =>
                              showShort(
                                item.title || "",
                                index,
                                `${item.description}down`,
                                `${item.description}up`
                              )
                            }
                            className="bi bi-chevron-up text-[20px] opacity-0 pointer-events-none  absolute top-[6px] right-[8px] transition-all duration-200 ease-in-out"
                          ></i>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {totalDatas.current > 0 ? (
          <div className="my-[60px] flex justify-center">
            {maxMinListData[0] !== colDataCurrent ? (
              <>
                <a
                  href="#video"
                  onClick={() => setColDataCurrent(maxMinListData[0])}
                  className=" bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
                >
                  <i className="bi bi-chevron-double-left"></i>
                </a>
                <a
                  href="#video"
                  onClick={() =>
                    setColDataCurrent((Number(colDataCurrent) - 1).toString())
                  }
                  className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
                >
                  <i className="bi bi-chevron-left"></i>
                </a>
              </>
            ) : (
              ""
            )}

            {totalListData &&
              totalListData.map((item, index) => (
                <a
                  href="#video"
                  key={index}
                  onClick={() => handleClickIndexList(index)}
                  className="p-[8px] px-[14px]  border-[1px] text-black border-solid border-[#CCCCCC]  mx-[6px]"
                  style={{
                    backgroundColor:
                      colDataCurrent === index.toString() ? "#0066C1" : "",
                    color: colDataCurrent === index.toString() ? "white" : "",
                  }}
                >
                  {index + 1}
                </a>
              ))}

            {maxMinListData[1] !== colDataCurrent ? (
              <>
                <a
                  href="#video"
                  onClick={() =>
                    setColDataCurrent((Number(colDataCurrent) + 1).toString())
                  }
                  className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
                >
                  <i className="bi bi-chevron-right"></i>
                </a>
                <a
                  href="#video"
                  onClick={() => setColDataCurrent(maxMinListData[1])}
                  className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
                >
                  <i className="bi bi-chevron-double-right"></i>
                </a>
              </>
            ) : (
              " "
            )}
          </div>
        ) : isEmpty ? (
          <div className="flex justify-center mt-[60px]">
            현재 사용 가능한 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex justify-center mt-[60px]">Loading...</div>
        )}
        {/* list page */}
      </div>
    </div>
  );
};

export default Content;
