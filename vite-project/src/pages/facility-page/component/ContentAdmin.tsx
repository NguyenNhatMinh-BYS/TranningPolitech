import React from "react";
import { useRef, useState, useEffect } from "react";
import HeaderSearch from "@/component/headerSearch/HeaderSearch";
import { FacilityData } from "@/model/Auth.model";
import { table } from "console";
import Pagination from "@/component/pagination/Pagination";
const ContentAdmin = ({ data, isLoad }: any) => {
  const totalData = useRef<Array<Array<FacilityData>>>([]);
  const [renderData, setRednerData] = useState<Array<FacilityData>>([]);
  const [page, setPage] = useState<number>(0);
  const totalList = useRef<number>(1);
  const filterData = useRef<Array<FacilityData>>([]);
  const tottalItems = useRef<number>(0);
  let listData: any = [];
  data.forEach((item: FacilityData) => listData.push(item));

  const getData = (search?: string) => {
    totalData.current = [];
    totalList.current = Math.ceil(listData.length / 10);

    filterData.current = listData;
    if (search !== "" && search) {
      filterData.current = listData.filter((item: FacilityData) =>
        item.spotname?.includes(search)
      );
    }
    tottalItems.current = filterData.current.length;
    let lengthData: number = filterData.current.length;
    for (let i = 0; i < totalList.current; i++) {
      let tmp: Array<FacilityData> = [];
      for (let j = i * 10; j < i * 10 + 10; j++) {
        if (filterData.current[j]) {
          filterData.current[j].index = lengthData;
          tmp.push(filterData.current[j]);
          lengthData--;
        }
      }
      totalData.current.push(tmp);
    }
    setRednerData(totalData.current[page]);
  };

  useEffect(() => {
    getData();
  }, [listData.length]);

  const setColDataCurrent = (pageChange: string) => {
    console.log(pageChange);
    setRednerData(totalData.current[parseInt(pageChange)]);
    setPage(parseInt(pageChange));
  };
  return (
    <div
      id="facilityAdmin"
      className="w-full flex justify-center flex-col items-center"
    >
      <div className="max-[1024px]:flex-col  flex justify-center  w-full  items-center">
        <HeaderSearch
          searchAuthor={false}
          getData={getData}
          manageUser={false}
          searchBy={false}
          searchDefault={true}
        />
      </div>
      <div className="w-3/4  mb-[64px] ">
        <table className="w-full">
          <thead className="bg-[#b4dcfff7] text-[14px] w-full ">
            <tr>
              <th className="py-[10px]">
                <p className=" py-[10px] border-solid border-[#82aaff] border-r-[1px]">
                  번호
                </p>
              </th>
              <th className="py-[10px]">
                <p className=" py-[10px] border-solid border-[#82aaff] border-r-[1px]">
                  행정구역
                </p>
              </th>

              <th className="py-[10px]">
                <p className=" py-[10px] border-solid border-[#82aaff] border-r-[1px]">
                  행정구역
                </p>
              </th>
              <th className="py-[10px]">
                <p className=" py-[10px] border-solid border-[#82aaff] border-r-[1px]">
                  시설명
                </p>
              </th>
              <th className="py-[10px]">
                <p className=" py-[10px] border-solid border-[#82aaff] border-r-[1px]">
                  시설규모
                </p>
              </th>
              <th className="py-[10px]">
                <p className=" py-[10px] ">이미지</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {renderData &&
              renderData.map((item: FacilityData, index: number) => (
                <tr className="cursor-pointer" key={item.index}>
                  <th className="py-[10px]">
                    <p className=" font-normal py-[10px] ">{item.index}</p>
                  </th>
                  <th className="py-[10px] ">
                    <p className=" py-[10px] font-normal ">{item.district}</p>
                  </th>

                  <th className="py-[10px]">
                    <p className=" font-normal py-[10px] ">{item.kinds}</p>
                  </th>
                  <th className="py-[10px]">
                    <p className=" font-normal py-[10px] ">{item.spotname}</p>
                  </th>
                  <th className="py-[10px]">
                    <p className=" font-normal py-[10px] ">
                      길이 {item.length} / 폭 {item.breadth}
                    </p>
                  </th>
                  <th className="py-[10px] w-[15%]">
                    <img
                      src={`data:image/png;base64, ${item.img}`}
                      alt="img"
                      className="h-[80px] w-[140px] mr-0 pr-0 inline-block object-cover"
                    />
                  </th>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              {isLoad ? (
                <th className="absolute text-center left-0 right-0 py-[20px] text-[16px]">
                  <p> Loading...</p>
                </th>
              ) : (!isLoad && listData.length === 0) ||
                tottalItems.current === 0 ? (
                <th className="absolute text-center left-0 right-0 py-[20px] text-[16px]">
                  <p> 현재 사용 가능한 데이터가 없습니다.</p>{" "}
                </th>
              ) : (
                ""
              )}
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <Pagination
          totalList={filterData.current.length}
          page={page.toString()}
          setColDataCurrent={setColDataCurrent}
          sizePage={10}
          href={"#facilityAdmin"}
        />
      </div>
    </div>
  );
};

export default ContentAdmin;
