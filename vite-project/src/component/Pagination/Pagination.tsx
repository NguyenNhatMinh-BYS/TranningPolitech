import React, { useEffect, useState } from "react";
import { useRef } from "react";
interface DataPagination {
  page: string;
  totalList: number;
  setColDataCurrent: (pageChange: string) => void;
  sizePage: number;
  href: string;
}
const Pagination: React.FC<DataPagination> = ({
  page,
  totalList,
  setColDataCurrent,
  sizePage,
  href,
}) => {
  console.log(totalList, sizePage);

  const firstPage = "0";
  const lastPage = parseInt(Math.ceil(totalList / sizePage).toString());
  const totalColData = Array(
    parseInt(Math.ceil(totalList / sizePage).toString())
  ).fill("1");

  return (
    <a href={href} className="flex justify-center flex-wrap w-[500px] ">
      {firstPage !== page && totalList != 0 ? (
        <>
          <span
            onClick={() => setColDataCurrent(firstPage)}
            className=" my-[4px] bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
          >
            <i className="bi bi-chevron-double-left"></i>
          </span>
          <span
            onClick={() => setColDataCurrent((Number(page) - 1).toString())}
            className="my-[4px] bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid border-[#CCCCCC]  mx-[6px] cursor-pointer hover:bg-[#a5d5ffa7]"
          >
            <i className="bi bi-chevron-left"></i>
          </span>
        </>
      ) : (
        ""
      )}

      {totalColData.map((item, index: number) => {
        if (
          index === 0 ||
          index === totalColData.length - 1 ||
          page === index.toString() ||
          page === (index - 1).toString() ||
          page === (index + 1).toString()
        ) {
          return (
            <a
              href={href}
              key={index}
              onClick={() => setColDataCurrent(index.toString())}
              className="my-[4px] p-[8px] px-[14px]  border-[1px] text-black border-solid border-[#CCCCCC]  mx-[6px]"
              style={{
                backgroundColor: page === index.toString() ? "#0066C1" : "",
                color: page === index.toString() ? "white" : "",
              }}
            >
              {index + 1}
            </a>
          );
        } else if (
          page === (index - 2).toString() ||
          page === (index + 2).toString()
        ) {
          return (
            <a
              href={href}
              key={index}
              onClick={() => setColDataCurrent(index.toString())}
              className="my-[4px] p-[8px] px-[14px]  border-[1px] text-black border-solid border-[#CCCCCC]  mx-[6px]"
              style={{
                backgroundColor: page === index.toString() ? "#0066C1" : "",
                color: page === index.toString() ? "white" : "",
              }}
            >
              ...
            </a>
          );
        }
      })}

      {(lastPage - 1).toString() !== page && totalList != 0 ? (
        <>
          <span
            onClick={() => setColDataCurrent((Number(page) + 1).toString())}
            className="my-[4px] bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
          >
            <i className="bi bi-chevron-right"></i>
          </span>
          <span
            onClick={() => setColDataCurrent((lastPage - 1).toString() || "")}
            className="my-[4px] bg-[#F1F1F1] p-[8px] px-[14px] text-black border-[1px] border-solid mx-[6px] border-[#CCCCCC] cursor-pointer hover:bg-[#a5d5ffa7]"
          >
            <i className="bi bi-chevron-double-right"></i>
          </span>
        </>
      ) : (
        " "
      )}
    </a>
  );
};

export default Pagination;
