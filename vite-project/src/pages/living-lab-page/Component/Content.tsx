import { useEffect, useRef } from "react";
import { useState } from "react";
import { notice } from "@/services/apiNotice";
import { DataNotice } from "@/model/Auth.model";
import dayjs from "dayjs";
import NoticeTitle from "@/pages/announcement-page/component/NoticeTitle";
import { useNavigate } from "react-router-dom";
import Loading from "@/component/loading/Loading";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { delLivingLab, livingLab } from "@/services/apiLivingLab";
import HeaderSearch from "@/component/headerSearch/HeaderSearch";
import Pagination from "@/component/pagination/Pagination";
import { toast } from "react-toastify";
const Content = () => {
  const listItem = useRef<HTMLDivElement>(null);
  const clickButton = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState([]);
  const [totalListData, setTotalListData] = useState(10);
  const [colDataCurrent, setColDataCurrent] = useState("0");
  const [isAdmin, setIsadmin] = useState(false);
  const dispath = useDispatch();
  const searchValue = useRef("");
  const inputSearchBy = useRef("title");
  const itemChecked = useRef<string[]>([]);
  const navigate = useNavigate();
  const [noticeEdit, setNoticeEdit] = useState(false);
  const [totalChecked, setTotalChecked] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const userName = useRef("");
  const [isClient, setIsClient] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const totalDatas = useRef<number>(0);
  //set data
  const getData = async (placeholder?: string, inputSearch?: string) => {
    dispath(activeLoading(true));

    inputSearchBy.current = placeholder || "";
    searchValue.current = inputSearch || "";
    let response;
    if (isAdmin || isClient) {
      response = await livingLab({
        page_size: "10",
        page: colDataCurrent,
        search_value: inputSearch,
        search_by: placeholder,
      });
    } else {
      response = await livingLab({
        page_size: "10",
        page: colDataCurrent,
        search_value: userName.current,
        search_by: "author",
      });
    }
    let data = response?.data.data?.list;
    data.length > 0 ? setIsEmpty(false) : setIsEmpty(true);

    const totalData = response?.data.data?.total;
    totalDatas.current = totalData;
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
    setTotalListData(totalData);

    dispath(activeLoading(false));
    return data;
  };
  //get api
  useEffect(() => {
    let dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      if (JSON.parse(dataUser).role === "Admin") {
        setIsadmin(true);
      } else {
        userName.current = JSON.parse(dataUser).username;
      }
    }
    if (!dataUser) {
      setIsClient(true);
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

  const handleClickEdit = () => {
    if (itemChecked.current.length === 1) {
      navigate(`/living-lab/edit/${itemChecked.current}`, {
        state: { infor: itemChecked.current },
      });
    } else if (itemChecked.current.length > 1) {
      setNoticeEdit(true);
    }
  };
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
  const handleCloseNoticeEdit = () => {
    setNoticeEdit(false);
    setIsDelete(false);
  };
  const handleAcceptDelete = () => {
    const token = localStorage.getItem("token") || " ";
    const ids = itemChecked.current.map((item) => {
      return item;
    });
    try {
      (async () => {
        await delLivingLab(ids, token);
        toast.success("Delete successfully");
        itemChecked.current = [];
        getData(inputSearchBy.current, searchValue.current);
      })();
    } catch (e) {
      toast.error("Error");
    }
    setNoticeEdit(false);
  };
  const handleDelete = () => {
    if (itemChecked.current.length >= 1) {
      setNoticeEdit(true);
      setIsDelete(true);
    }
  };
  const handleCreate = () => {
    navigate(`/living-lab/create`, {
      state: { infor: "" },
    });
  };
  return (
    <div
      onClick={() => {
        listItem.current?.classList.add("hidden");
        clickButton.current?.classList.remove("border-[#0075DC]");
      }}
      id="living-lab"
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
      <div className="flex justify-center w-full px-[10px]">
        <HeaderSearch
          searchAuthor={true}
          getData={getData}
          listItem={listItem}
          clickButton={clickButton}
          manageUser={false}
          searchBy={true}
        />
      </div>
      {/* list contents */}
      <div className="w-4/5 px-[40px] relative min-h-[560px]">
        {/* header list contents */}
        <div className="flex bg-[#b4dcfff7] py-[10px] rounded-sm ">
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
            listData.map((item: DataNotice, index) => (
              <div
                onClick={() => {
                  dispath(activeLoading(true));
                  navigate(`/living-lab/${item.id}`, {
                    state: {
                      search_by: isAdmin ? inputSearchBy.current : "author",
                      search_value: searchValue.current,
                    },
                  });
                }}
                key={index}
                className=" flex  py-[10px] border-b-[1px] border-solid cursor-pointer"
              >
                <div className="w-[100px] py-[10px] relative flex items-center max-[1260px]:flex-col justify-around max-[1260px]:items-center">
                  {isAdmin || userName.current !== "" ? (
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
            ))}
        </div>
        {/* footer list contents */}
        {totalDatas.current > 0 ? (
          <div className="w-full flex justify-center my-[40px] ">
            <Pagination
              totalList={totalListData}
              page={colDataCurrent}
              setColDataCurrent={setColDataCurrent}
              sizePage={10}
              href={"#living-lab"}
            />
          </div>
        ) : isEmpty ? (
          <div className="flex justify-center mt-[60px]">
            현재 사용 가능한 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex justify-center mt-[60px]">Loading...</div>
        )}

        {isAdmin || userName.current !== "" ? (
          <div className="flex justify-center mt-[20px] xl:absolute xl:right-0 xl:bottom-[48px] cursor-pointer max-[1280px]:mb-[20px] ">
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
  );
};

export default Content;
