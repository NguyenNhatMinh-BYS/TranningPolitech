import { useEffect, useRef } from "react";
import { useState } from "react";
import { delNotice, notice } from "@/services/apiNotice";
import { DataNotice, Notice } from "@/model/Auth.model";
import dayjs from "dayjs";
import { generatePath, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "@/component/loading/Loading";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import NoticeTitle from "./NoticeTitle";
import { toast } from "react-toastify";
import HeaderSearch from "@/component/headerSearch/HeaderSearch";

const Content = () => {
  const listItem = useRef<HTMLDivElement>(null);
  const clickButton = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState([]);
  const [totalListData, setTotalListData] = useState<string[]>([]);
  const [colDataCurrent, setColDataCurrent] = useState("0");
  const [maxMinListData, setMaxMinListData] = useState<string[]>([]);
  const [isAdmin, setIsadmin] = useState(false);
  const searchValue = useRef("");
  const inputSearchBy = useRef("title");
  const dispath = useDispatch();
  const itemChecked = useRef<string[]>([]);
  const navigate = useNavigate();
  const [noticeEdit, setNoticeEdit] = useState(false);
  const [totalChecked, setTotalChecked] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [totaData, setTotalData] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState(false);
  //set data
  const getData = async (placeholder?: string, inputSearch?: string) => {
    inputSearchBy.current = placeholder || "";
    searchValue.current = inputSearch || "";
    dispath(activeLoading(true));

    const response = await notice({
      page_size: "10",
      page: colDataCurrent,
      search_value: inputSearch,
      search_by: placeholder,
    });

    let data = response.data.data?.list;

    const totalData = response.data.data?.total;

    data.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
    setTotalData(totalData);
    setListData(data);
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
    dispath(activeLoading(false));
    return data;
  };
  //get api
  useEffect(() => {
    let dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      if (JSON.parse(dataUser).role === "Admin") {
        setIsadmin(true);
      }
    }

    (async () => {
      try {
        getData(inputSearchBy.current, searchValue.current);
      } catch (err) {
        console.log(err);
        dispath(activeLoading(false));
      }
    })();
  }, [colDataCurrent]);
  //css input

  //handle click index list
  const handleClickIndexList = (index: number) => {
    window.scrollTo({ top: 0 });
    setColDataCurrent(index.toString());
  };
  //handle sreach

  // change checkbox
  const handleChangeCheckBox = (
    item: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      itemChecked.current = [...itemChecked.current, item];
      setTotalChecked(itemChecked.current);
    } else {
      const filter = itemChecked.current.filter((value) => value !== item);

      itemChecked.current = [...filter];
      setTotalChecked(itemChecked.current);
    }
  };

  // click button edit
  const handleClickEdit = () => {
    if (itemChecked.current.length === 1) {
      navigate(`/announcement/edit/${itemChecked.current}`, {
        state: { infor: itemChecked.current },
      });
    } else if (itemChecked.current.length > 1) {
      setNoticeEdit(true);
    }
  };
  const handleShowDetail = (id: string) => {
    dispath(activeLoading(true));
    navigate(generatePath(`/announcement/:id`, { id }), {
      state: {
        search_by: inputSearchBy.current,
        search_value: searchValue.current,
      },
    });
  };

  // handle set NoticeEdit
  const handleCloseNoticeEdit = () => {
    setNoticeEdit(false);
    setIsDelete(false);
  };

  const handleDelete = () => {
    if (itemChecked.current.length >= 1) {
      setNoticeEdit(true);
      setIsDelete(true);
    }
  };
  const handleAcceptDelete = () => {
    const token = localStorage.getItem("token") || " ";
    const ids = itemChecked.current.map((item) => {
      return item;
    });
    try {
      (async () => {
        await delNotice(ids, token);
        itemChecked.current = [];
        getData();
        toast.success("Delete successfully");
      })();
    } catch (e) {}
    setNoticeEdit(false);
  };
  const handleCreate = () => {
    navigate(`/announcement/create`, {
      state: { infor: "" },
    });
  };
  return (
    <div
      onClick={() => {
        listItem.current?.classList.add("hidden");
        clickButton.current?.classList.remove("border-[#0075DC]");
      }}
      id="search"
      className=" w-full flex justify-center flex-col items-center "
    >
      {" "}
      <Loading />
      {noticeEdit ? (
        <NoticeTitle
          isDeleted={isDelete}
          sizeCheckItem={itemChecked.current.length}
          handleCloseNoticeEdit={handleCloseNoticeEdit}
          handleAcceptDelete={handleAcceptDelete}
        />
      ) : (
        " "
      )}
      {/* search */}
      <HeaderSearch
        searchAuthor={true}
        getData={getData}
        listItem={listItem}
        clickButton={clickButton}
        manageUser={false}
        searchBy={true}
      />
      {/* list contents */}
      <div className="w-3/4 min-h-[580px]">
        {/* header list contents */}
        <div className="flex bg-[#b4dcfff7] py-[10px] rounded-sm">
          <p className="font-semibold py-[10px] w-[100px]  text-center border-r-[2px] border-solid border-[#7DA7CC]">
            번호
          </p>
          <p className="max-[1024px]:border-none font-semibold py-[10px] w-[780px] text-center border-r-[2px] border-solid border-[#7DA7CC]">
            제목
          </p>
          <p className="max-[1024px]:hidden font-semibold py-[10px] w-[180px]  text-center border-r-[2px] border-solid border-[#7DA7CC]">
            작성자
          </p>
          <p className="max-[1024px]:hidden font-semibold py-[10px] w-[180px]  text-center">
            작성일
          </p>
        </div>
        {/* body list contents */}
        <div>
          {listData &&
            listData.map((item: DataNotice) => (
              <div key={item.id} className="cursor-pointer">
                <div
                  onClick={() => {
                    handleShowDetail(item.id);
                  }}
                  className=" flex  my-[10px] border-b-[1px] border-solid"
                >
                  <div className="w-[100px] py-[10px] relative flex items-center max-[1260px]:flex-col justify-around max-[1260px]:items-center">
                    {isAdmin ? (
                      <input
                        checked={totalChecked.includes(item.id)}
                        id={`${item.id}`}
                        onChange={(e) => {
                          handleChangeCheckBox(item.id, e);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // handleChangeCheckBox(
                          //   item.id,
                          //   e as unknown as React.ChangeEvent<HTMLInputElement>
                          // );
                        }}
                        type="checkbox"
                        className=" top-[6px] left-0 z-[20] w-[20px] h-[30px]  checked:accent-[#0066C1] inline-block rounded-none outline-none"
                      />
                    ) : (
                      ""
                    )}
                    <p className="  xl:mr-[30px] text-center  ">{item.index}</p>
                  </div>
                  <div className="  w-[780px]">
                    <p className=" py-[10px] px-[20px]  w-full break-words ">
                      {item.title}
                    </p>
                    <p className="max-[1024px]:block min-[1024px]:hidden px-[20px] opacity-50 ">
                      {dayjs(item.updated_at).format("YYYY-MM-DD")}
                    </p>
                  </div>

                  <p className="max-[1024px]:hidden py-[10px] w-[180px] text-center ">
                    {item.author}
                  </p>
                  <p className="max-[1024px]:hidden py-[10px] w-[180px] text-center">
                    {dayjs(item.updated_at).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {/* footer list contents */}
        <div className="my-[60px] relative">
          {totaData > 0 ? (
            <div className="flex justify-center">
              {maxMinListData[0] !== colDataCurrent ? (
                <>
                  <span
                    onClick={() => setColDataCurrent(maxMinListData[0])}
                    className=" bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </span>
                  <span
                    onClick={() =>
                      setColDataCurrent((Number(colDataCurrent) - 1).toString())
                    }
                    className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </span>
                </>
              ) : (
                ""
              )}

              {totalListData &&
                totalListData.map((item, index) => (
                  <a
                    href="#search"
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
                  <span
                    onClick={() =>
                      setColDataCurrent((Number(colDataCurrent) + 1).toString())
                    }
                    className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </span>
                  <span
                    onClick={() => setColDataCurrent(maxMinListData[1])}
                    className="bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
                  >
                    <i className="bi bi-chevron-double-right"></i>
                  </span>
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
          {isAdmin ? (
            <div className="flex justify-center mt-[20px] xl:absolute xl:right-0 xl:bottom-[4px] cursor-pointer">
              {/* put  */}
              <p
                className="py-[6px] px-[20px] border-[1px] border-solid border-[#969696]"
                onClick={() => handleClickEdit()}
              >
                수정
              </p>
              {/* delete  */}
              <p
                className="py-[6px] px-[20px] border-[1px] border-solid border-[#969696] mx-[12px] bg-[#d1d1d16b]"
                onClick={handleDelete}
              >
                삭제
              </p>
              {/* create */}
              <div
                className="py-[6px] px-[20px] flex bg-[#0066C1] text-white"
                onClick={handleCreate}
              >
                <i className="bi bi-pencil mx-[6px]"></i>
                <p>글쓰기</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
