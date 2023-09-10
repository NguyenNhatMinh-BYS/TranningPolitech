import HeaderSearch from "@/component/headerSearch/HeaderSearch";
import { useRef, useEffect, useState } from "react";
import { content, delContent } from "@/services/apiContent";
import { DataNotice } from "@/model/Auth.model";
import dayjs from "dayjs";
import Pagination from "@/component/pagination/Pagination";
import NoticeTitle from "@/pages/announcement-page/component/NoticeTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "@/component/loading/Loading";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { campaign, delCampaign } from "@/services/apiCampaign";
import {
  useCampaignDeletion,
  useCampaignQuery,
} from "@/queries/campaignQueries";
const ContentAdmin = () => {
  const listItem = useRef<HTMLDivElement>(null);
  const clickButton = useRef<HTMLDivElement>(null);
  // const [dataList, setDataList] = useState([]);
  // const [page, setPage] = useState<string>("0");
  // const [totalList, setTotalList] = useState<number>(2);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalChecked, setTotalChecked] = useState<string[]>([]);
  const [noticeEdit, setNoticeEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const itemChecked = useRef<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const searchValue = useRef("");
  const pageParam = useRef({
    page: "0",
    page_size: "12",
    search_value: "",
  });
  const { data, isLoading, refetch } = useCampaignQuery(pageParam.current);
  const getData = (search_by?: string, search_value?: string) => {
    pageParam.current.search_value = search_value || "";
    refetch();
  };
  const mutation = useCampaignDeletion();

  const handleCloseNoticeEdit = () => {
    setNoticeEdit(false);
    setIsDelete(false);
  };
  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      setIsAdmin(JSON.parse(dataUser).role);
    }
  }, []);
  const setColDataCurrent = (pageChange: string) => {
    pageParam.current.page = pageChange;
    refetch();

    // setPage(pageChange);
  };
  const handleAcceptDelete = () => {
    dispatch(activeLoading(true));
    const token = localStorage.getItem("token") || " ";
    const ids = itemChecked.current.map((item) => {
      return item;
    });
    mutation.mutate(
      { ids, token },
      {
        onSuccess: () => {
          itemChecked.current = [];
        },
      }
    );

    setNoticeEdit(false);
    dispatch(activeLoading(false));
  };
  const handleClickEdit = () => {
    if (itemChecked.current.length === 1) {
      navigate(`/campaign/edit/${itemChecked.current}`, {
        state: { infor: itemChecked.current },
      });
    } else if (itemChecked.current.length > 1) {
      setNoticeEdit(true);
    }
  };
  const handleDelete = () => {
    if (itemChecked.current.length >= 1) {
      setNoticeEdit(true);
      setIsDelete(true);
    }
  };
  const handleCreate = () => {
    navigate(`/campaign/create`, {
      state: { infor: "" },
    });
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
  return (
    <div
      id="searchCampaignAdmin"
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
        searchAuthor={false}
        listItem={listItem}
        clickButton={clickButton}
        getData={getData}
        manageUser={false}
        searchBy={true}
      />
      <div className="w-3/4 relative">
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
            {data &&
              data.data &&
              data.data.map((item: DataNotice, index: number) => (
                <tr
                  key={item?.id}
                  className="border-b-[1px] border-solid cursor-pointer "
                  onClick={() => navigate(`/campaign/${item?.id}`)}
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
        <div className="mt-[60px] mb-[20px] relative z-40 w-full flex justify-center">
          {data && (
            <Pagination
              totalList={data.totalData}
              page={pageParam.current.page}
              setColDataCurrent={setColDataCurrent}
              sizePage={10}
              href={"#searchCampaignAdmin"}
            />
          )}
        </div>
        {isAdmin ? (
          <div className="flex justify-center xl:mt-[20px] xl:absolute xl:right-0 xl:bottom-[28px] cursor-pointer z-40 max-[1200px]:mb-[20px] ">
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
          ""
        )}
      </div>
    </div>
  );
};

export default ContentAdmin;
