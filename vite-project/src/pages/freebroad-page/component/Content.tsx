import HeaderSearch from "@/component/headerSearch/HeaderSearch";
import { useRef, useEffect, useState } from "react";

import { DataNotice } from "@/model/Auth.model";
import dayjs from "dayjs";
import Pagination from "@/component/pagination/Pagination";
import NoticeTitle from "@/pages/announcement-page/component/NoticeTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "@/component/loading/Loading";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { delFreeBoard, freeBoard } from "@/services/apiFreeBoard";
const ContentAdmin = () => {
  const listItem = useRef<HTMLDivElement>(null);
  const clickButton = useRef<HTMLDivElement>(null);
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState<string>("0");
  const [totalList, setTotalList] = useState<number>(2);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalChecked, setTotalChecked] = useState<string[]>([]);
  const [noticeEdit, setNoticeEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const itemChecked = useRef<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputSearchBy = useRef("title");
  const searchValue = useRef("");
  const [isEmpty, setIsEmpty] = useState(false);
  const totalDatas = useRef<number>(0);
  const getData = async (search_by?: string, search_value?: string) => {
    dispatch(activeLoading(true));
    inputSearchBy.current = search_by || "";
    searchValue.current = search_value || "";
    const response = await freeBoard({
      page_size: "10",
      page: page,
      search_by: search_by,
      search_value: search_value,
    });

    let data = response.data.data?.list;
    console.log(data);

    data.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
    const totalData = response.data.data?.total;
    totalDatas.current = totalData;
    for (
      let i = 10 * Number(page), x = 0;
      i <= 10 * Number(page) + 10 && x < 10;
      i++, x++
    ) {
      if (data[x]) {
        data[x].index = totalData - i;
      } else {
        break;
      }
    }
    setDataList(data);

    setTotalList(totalData);
    dispatch(activeLoading(false));
  };
  const handleCloseNoticeEdit = () => {
    setNoticeEdit(false);
    setIsDelete(false);
  };
  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      if (JSON.parse(dataUser).role === "Admin") setIsAdmin(true);
    }
    try {
      (async () => {
        getData(inputSearchBy.current, searchValue.current);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [page]);
  const setColDataCurrent = (pageChange: string) => {
    console.log(pageChange);

    setPage(pageChange);
  };
  const handleClickEdit = () => {
    if (itemChecked.current.length === 1) {
      navigate(`/freeboard/edit/${itemChecked.current}`, {
        state: { infor: itemChecked.current },
      });
    } else if (itemChecked.current.length > 1) {
      setNoticeEdit(true);
    }
  };
  const handleAcceptDelete = () => {
    dispatch(activeLoading(true));
    const token = localStorage.getItem("token") || " ";
    const ids = itemChecked.current.map((item) => {
      return item;
    });
    try {
      (async () => {
        await delFreeBoard(ids, token);
        itemChecked.current = [];
        getData();
        toast.success("Delete successfully");
      })();
    } catch (e) {}
    setNoticeEdit(false);
    dispatch(activeLoading(false));
  };
  const handleDelete = () => {
    if (itemChecked.current.length >= 1) {
      setNoticeEdit(true);
      setIsDelete(true);
    }
  };
  const handleCreate = () => {
    if (!isAdmin) {
      navigate(`/freeboard/create_user`, {
        state: { infor: "" },
      });
    } else {
      navigate(`/freeboard/create`, {
        state: { infor: "" },
      });
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
  const handleDetail = (id: string) => {
    navigate(`/freeboard/${id}`, {
      state: {
        id: id,
        search_by: inputSearchBy.current,
        search_value: searchValue.current,
      },
    });
  };
  return (
    <div
      id="freeboard"
      className="w-full flex justify-center flex-col items-center"
      onClick={() => {
        listItem.current?.classList.add("hidden");
        clickButton.current?.classList.remove("border-[#0075DC]");
      }}
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
      <HeaderSearch
        searchAuthor={true}
        listItem={listItem}
        clickButton={clickButton}
        getData={getData}
        manageUser={false}
        searchBy={true}
      />
      <div className="w-3/4 relative min-h-[580px]">
        <table className="w-full">
          <thead className="bg-[#b4dcfff7] text-[14px]">
            <tr>
              <th className="py-[10px] w-[4%]"></th>
              <th className="py-[10px]   w-[10%]  font-bold ">
                <p>번호</p>
              </th>
              <th className="py-[10px] w-[56%]  font-bold">
                <p className="border-solid border-[#82aaff] min-[1281px]:border-x-[1px] py-[10px] max-[1280px]:border-l-[1px]">
                  제목
                </p>
              </th>
              <th className="py-[10px] w-[15%]  font-bold max-[1280px]:hidden">
                작성자
              </th>
              <th className="py-[10px] w-[15%]  font-bold max-[1280px]:hidden">
                <p className="border-solid border-[#82aaff] border-l-[1px] py-[10px]">
                  작성일
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList &&
              dataList.map((item: DataNotice, index: number) => (
                <tr
                  key={item?.id}
                  className="border-b-[1px] border-solid cursor-pointer"
                  onClick={() => {
                    handleDetail(item?.id);
                  }}
                >
                  <th className="py-[20px] w-[4%] font-normal">
                    {isAdmin ? (
                      <input
                        checked={totalChecked.includes(item.id)}
                        id={`${item.id}`}
                        onChange={(e) => {
                          handleChangeCheckBox(item.id, e);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        type="checkbox"
                        className=" top-[6px] left-0 z-[20] w-[20px] h-[30px]  checked:accent-[#0066C1] inline-block rounded-none outline-none"
                      />
                    ) : (
                      ""
                    )}
                  </th>
                  <th className="py-[20px] w-[10%] font-normal">
                    {item.index}
                  </th>
                  <th className="py-[20px] w-[56%] text-left font-normal px-[20px]">
                    <div>
                      <span>{item?.title}</span>
                      <p className="max-[1280px]:block min-[1281px]:hidden mt-[10px] opacity-50">
                        {dayjs(item?.updated_at).format("YYYY-MM-DD")}
                      </p>
                    </div>
                  </th>
                  <th className="py-[20px] w-[15%] font-normal max-[1280px]:hidden">
                    {item?.author}
                  </th>
                  <th className="py-[20px] w-[15%] font-normal max-[1280px]:hidden">
                    {dayjs(item?.updated_at).format("YYYY-MM-DD")}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {totalDatas.current > 0 ? (
          <div className="my-[40px]   z-40 w-full flex justify-center ">
            <Pagination
              totalList={totalList}
              page={page}
              setColDataCurrent={setColDataCurrent}
              sizePage={10}
              href={"#freeboard"}
            />
          </div>
        ) : isEmpty ? (
          <div className="flex justify-center mt-[60px]">
            현재 사용 가능한 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex justify-center mt-[60px]">Loading...</div>
        )}
        {isAdmin ? (
          <div className="flex justify-center xl:mt-[20px] xl:absolute xl:right-0 xl:bottom-[48px] cursor-pointer z-40 max-[1200px]:mb-[20px]">
            {/* put  */}
            <p
              className="py-[6px] px-[20px] border-[1px] border-solid border-[#969696]"
              onClick={() => {
                handleClickEdit();
              }}
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
          <div
            className="py-[10px] lg:w-[100px] sm:w-full  bg-[#0066C1]  text-white flex justify-center lg:mt-[20px] lg:absolute lg:right-0 bottom-[48px] cursor-pointer z-40 max-[1024px]:mb-[20px] lg:mb-[0]"
            onClick={handleCreate}
          >
            <i className="bi bi-pencil mx-[6px]"></i>
            <p>글쓰기</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentAdmin;
