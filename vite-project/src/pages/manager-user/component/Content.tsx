import { delUserNormal, manageUser } from "@/services/apiMangeUser";
import React, { useEffect, useState, useRef } from "react";
import Loading from "@/component/loading/Loading";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { useDispatch } from "react-redux";
import { dataUser } from "@/model/Auth.model";
import HeaderSearch from "@/component/headerSearch/HeaderSearch";
import Pagination from "@/component/pagination/Pagination";
import NoticeTitle from "@/pages/announcement-page/component/NoticeTitle";

const Content = () => {
  const [page, setPage] = useState("0");
  const listItem = useRef<HTMLDivElement>(null);
  const clickButton = useRef<HTMLDivElement>(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const inputSearchBy = useRef("name");
  const searchValue = useRef("");
  const [totalList, setTotalList] = useState<number>(2);
  const [noticeEdit, setNoticeEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState("");
  const totalDatas = useRef<number>(0);
  const id = useRef("");
  const [isEmpty, setIsEmpty] = useState(false);
  const getData = async (search_by?: string, search_value?: string) => {
    dispatch(activeLoading(true));
    try {
      const token = localStorage.getItem("token");

      inputSearchBy.current = search_by || "";
      searchValue.current = search_value || "";
      const response = await manageUser(
        {
          page_size: "10",
          page: page,
          search_by: search_by || "",
          search_value: search_value || "",
        },
        token || ""
      );

      let data = response.data.data?.list;
      const totalData = response.data.data?.total;
      totalDatas.current = totalData;
      totalData > 0 ? setIsEmpty(false) : setIsEmpty(true);
      if (totalData > 0) {
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
      }
      setData(data);

      setTotalList(totalData);
    } catch (e) {
      console.log(e);
    }
    dispatch(activeLoading(false));
  };
  useEffect(() => {
    getData();
  }, [page]);
  const setColDataCurrent = (pageChange: string) => {
    console.log(pageChange);

    setPage(pageChange);
  };
  const handleDelete = (name: string, username: string, idUser: string) => {
    setItemDelete(`${name} (${username})`);
    id.current = idUser;
    setNoticeEdit(true);
    setIsDelete(true);
  };
  const handleCloseNoticeEdit = () => {
    setNoticeEdit(false);
    setIsDelete(false);
  };
  const handleAcceptDelete = async () => {
    dispatch(activeLoading(true));
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await delUserNormal(id.current, token);
        setNoticeEdit(false);
        getData();
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(activeLoading(false));
  };
  return (
    <div
      className="w-full flex flex-col justify-around items-center h-full"
      onClick={() => {
        listItem.current?.classList.add("hidden");
        clickButton.current?.classList.remove("border-[#0075DC]");
      }}
    >
      <Loading />{" "}
      {noticeEdit ? (
        <NoticeTitle
          isDeleted={isDelete}
          itemDeleted={itemDelete}
          handleCloseNoticeEdit={handleCloseNoticeEdit}
          handleAcceptDelete={handleAcceptDelete}
        />
      ) : (
        " "
      )}
      <div className="w-full flex justify-center">
        {" "}
        <HeaderSearch
          searchAuthor={true}
          listItem={listItem}
          clickButton={clickButton}
          getData={getData}
          manageUser={true}
          searchBy={true}
        />
      </div>
      <div className="w-3/4 relative min-h-[580px]">
        <div>
          <table className="w-full ">
            <thead className="bg-[#b4dcfff7] text-[14px]">
              <tr>
                <th className="py-[10px]   font-bold ">
                  <p className="border-solid border-[#82aaff]  border-r-[1px] py-[10px]">
                    번호
                  </p>
                </th>

                <th className="py-[10px]    font-bold ">
                  <p>이름</p>
                </th>

                <th className="py-[10px] max-[1280px]:hidden  font-bold">
                  <p className="border-solid border-[#82aaff] min-[1281px]:border-x-[1px] py-[10px] max-[1280px]:border-l-[1px]">
                    아이디
                  </p>
                </th>

                <th className="py-[10px]   font-bold max-[1280px]:hidden  w-[30%]">
                  이메일
                </th>

                <th className="py-[10px]   font-bold max-[1280px]:hidden">
                  <p className="border-solid border-[#82aaff] border-l-[1px] py-[10px]">
                    이메일
                  </p>
                </th>

                <th className="py-[10px]    font-bold ">
                  <p className="border-solid border-[#82aaff] border-l-[1px] py-[10px]"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: dataUser) => (
                <tr key={item.id}>
                  <th className="py-[10px]  font-normal ">
                    <p className=" ">{item.index}</p>
                  </th>

                  <th className="py-[10px]   font-normal ">
                    <p>{item.full_name}</p>
                  </th>

                  <th className="py-[10px]  font-normal max-[1280px]:hidden">
                    <p className=" ">{item.username}</p>
                  </th>

                  <th className="py-[10px]  font-normal max-[1280px]:hidden w-[30%]">
                    <p> {item.email}</p>
                  </th>

                  <th className="py-[10px]  font-normal max-[1280px]:hidden">
                    <p className="">{item.phone_number}</p>
                  </th>

                  <th
                    className="py-[10px] w-[10%]  font-normal "
                    onClick={() =>
                      handleDelete(
                        item.full_name || "",
                        item.username,
                        item.id || " "
                      )
                    }
                  >
                    <p className="border-[1px] border-solid border-[#50505078] mx-[10px] py-[4px]    ">
                      탈퇴
                    </p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalDatas.current > 0 ? (
          <div className="my-[40px] relative  z-30 w-full flex justify-center">
            <Pagination
              totalList={totalList}
              page={page}
              setColDataCurrent={setColDataCurrent}
              sizePage={10}
            />
          </div>
        ) : isEmpty ? (
          <div className="flex justify-center mt-[60px]">
            현재 사용 가능한 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex justify-center mt-[60px]">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Content;
