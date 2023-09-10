import { useRef, useState } from "react";

import { campaigngApi } from "@/model/Auth.model";
import { useNavigate } from "react-router-dom";
import Loading from "@/component/loading/Loading";

import { useCampaignQuery } from "@/queries/campaignQueries";
const Content = () => {
  const clickButton = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState("제목");
  const listItem = useRef<HTMLDivElement>(null);
  const [inputSearch, setInputSearch] = useState("");

  const navigate = useNavigate();

  const pageParam = useRef({
    page: "0",
    page_size: "12",
    search_value: "",
  });

  const { data, isLoading, refetch } = useCampaignQuery(pageParam.current);
  console.log(isLoading);

  const handleClickSelect = () => {
    listItem.current?.classList.toggle("hidden");
    const addClass = "border-[#0075DC]";

    clickButton.current?.classList.toggle(addClass);
  };
  //css input
  const autoResizeInput = (input: HTMLInputElement) => {
    setPlaceholder(input.value);
    if (input.value.length > 7 && input.value.length <= 30) {
      input.style.width = (input.value.length + "ch") as string;
      input.style.height = "auto";
      input.style.margin = "none";
    } else {
      input.style.width = "80px";
    }
  };
  //handle sreach
  const handleClickSearch = () => {
    pageParam.current.search_value = inputSearch.toString();
    pageParam.current.page = "0";
    refetch();
  };
  //handle click index list
  const handleClickIndexList = (index: number) => {
    pageParam.current.page = index.toString();
    refetch();
  };

  return (
    <div
      id="searchCampaign"
      onClick={() => {
        listItem.current?.classList.add("hidden");
        clickButton.current?.classList.remove("border-[#0075DC]");
      }}
      className=" w-full flex justify-center flex-col items-center mb-[100px]"
    >
      {isLoading ? <Loading /> : ""}
      <div className="max-[1024px]:flex-col max-[1024px]:items-start my-[60px] flex justify-between  w-3/4 px-[40px] items-center">
        <div>
          {" "}
          <h1 className="font-semibold text-[24px] pl-[10px] border-l-[4px] border-solid border-[#0075DC]">
            공지사항
          </h1>
        </div>
        <div className="flex items-center max-[1024px]:mt-[28px] max-[1024px]:w-full min-[100px]:flex-col min-[100px]:items-start min-[1024px]:flex-row min-[1024px]:items-center ">
          <div className="max-[1024px]:mx-0  cursor-pointer relative flex  mx-[8px] ">
            <div
              onClick={(e) => {
                handleClickSelect();
                e.stopPropagation();
              }}
              ref={clickButton}
              className=" border-solid border-[2px] p-[6px]"
            >
              <input
                id="input"
                maxLength={30}
                value={placeholder}
                type="text"
                className="resize w-[80px] outline-none placeholder-gray-400 cursor-pointer placeholder-shown:border-gray-500"
                onChange={(e) => autoResizeInput(e.target as HTMLInputElement)}
              />

              <i className="bi bi-caret-down-fill absolute right-[6px] pointer-events-none"></i>
            </div>
            <div
              ref={listItem}
              className="hidden absolute bottom-[-42px] left-0 right-0 bg-white shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] rounded-md"
            >
              <p
                className="p-[6px] "
                onClick={() => {
                  setPlaceholder("제목");
                  handleClickSelect();
                  clickButton.current?.classList.remove("border-[#0075DC]");
                }}
              >
                제목
              </p>
            </div>
          </div>
          <div className="flex min-[100px]:mt-[24px] min-[100px]:w-full min-[1024px]:w-auto min-[1024px]:mt-0">
            {/* input search */}
            <input
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              className="p-[6px] px-[8px] border-solid border-[1px] border-[#C0C0C0] outline-none w-[400px] "
              placeholder="공지사항 검색"
              type="text"
            />
            <div
              onClick={handleClickSearch}
              className="cursor-pointer flex bg-[#0066C1] p-[7px] text-white px-[20px] flex-nowrap h-[38px] "
            >
              <i className="bi bi-search mr-[8px] "></i>
              <p className="whitespace-nowrap">검색</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5   min-h-[580px] ">
        <div className=" px-[50px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full">
          {data?.data &&
            data.data.map((item: campaigngApi, index: number) => (
              <div
                onClick={() => {
                  navigate(`/campaign/${item.id}`);
                }}
                key={index}
                className=" hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.2)]  cursor-pointer border-solid border-[1px]  bg-[#D4E9FC] mx-[27px] mt-[60px] hover:bg-[#0066C1] hover:text-white hover:border-[#0066C1] transition-all ease-in-out duration-200 rounded-sm"
              >
                <img
                  className="object-cover h-[300px] w-full bg-white"
                  src={item?.image || ""}
                  alt="img"
                />
                <div className=" text-center px-[16px] py-[14px]">
                  <p className="break-words">{item.title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {data && data.data.length > 0 ? (
        <div className="my-[60px] flex justify-center">
          {data.maxMinListData[0] !== pageParam.current.page ? (
            <>
              <a
                href="#searchCampaign"
                onClick={() => {
                  pageParam.current.page = data.maxMinListData[0];
                  refetch();
                }}
                className=" bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
              >
                <i className="bi bi-chevron-double-left"></i>
              </a>
              <a
                href="#searchCampaign"
                onClick={() => {
                  pageParam.current.page = (
                    Number(pageParam.current.page) - 1
                  ).toString();
                  refetch();
                }}
                className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
              >
                <i className="bi bi-chevron-left"></i>
              </a>
            </>
          ) : (
            ""
          )}

          {data &&
            data.totlalListData &&
            data.totlalListData.map((item, index) => (
              <a
                href="#searchCampaign"
                key={index}
                onClick={() => handleClickIndexList(index)}
                className="p-[8px] px-[14px]  border-[1px] text-black border-solid border-[#CCCCCC]  mx-[6px]"
                style={{
                  backgroundColor:
                    pageParam.current.page === index.toString()
                      ? "#0066C1"
                      : "",
                  color:
                    pageParam.current.page === index.toString() ? "white" : "",
                }}
              >
                {index + 1}
              </a>
            ))}

          {data.maxMinListData[1] !== pageParam.current.page ? (
            <>
              <a
                href="#searchCampaign"
                onClick={() => {
                  pageParam.current.page = (
                    Number(pageParam.current.page) + 1
                  ).toString();
                  refetch();
                }}
                className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
              >
                <i className="bi bi-chevron-right"></i>
              </a>
              <a
                href="#searchCampaign"
                onClick={() => {
                  pageParam.current.page = data.maxMinListData[1];
                  refetch();
                }}
                className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
              >
                <i className="bi bi-chevron-double-right"></i>
              </a>
            </>
          ) : (
            " "
          )}
        </div>
      ) : data?.isEmpty ? (
        <div className="flex justify-center mt-[60px] absolute">
          현재 사용 가능한 데이터가 없습니다.
        </div>
      ) : (
        <div className="flex justify-center mt-[60px] absolute">Loading...</div>
      )}
    </div>
  );
};

export default Content;
