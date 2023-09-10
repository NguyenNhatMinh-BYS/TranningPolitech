import React, { useEffect, useRef } from "react";
interface NoticeError {
  handleAcceptDelete: () => void;
  handleCloseNoticeEdit: () => void;
  isDeleted: boolean;
  itemDeleted?: string;
  sizeCheckItem?: number;
}
const NoticeTitle: React.FC<NoticeError> = ({
  handleCloseNoticeEdit,
  isDeleted,
  itemDeleted,
  sizeCheckItem,
  handleAcceptDelete,
}) => {
  const show = useRef<HTMLDivElement>(null);
  useEffect(() => {
    show.current?.classList.remove(
      ..."mt-[400px] opacity-0 pointer-events-none".split(" ")
    );
  });
  return (
    <div className="fixed w-screen h-screen bg-[#9f9f9f70] top-0 z-[103] flex justify-center items-center">
      <div
        ref={show}
        className="bg-white h-[300px] flex flex-col justify-between w-[400px] relative pointer-events-none mt-[400px] opacity-0 transition-all duration-[2s] ease-in-out"
      >
        <i
          className="bi bi-x-lg right-0 m-[20px] absolute px-[4px] border-solid border-[1px]  "
          onClick={handleCloseNoticeEdit}
        ></i>
        <div className="grow-[9] flex items-center justify-center mx-[20px] text-center font-bold">
          {isDeleted
            ? `${
                sizeCheckItem ? sizeCheckItem : itemDeleted ? itemDeleted : ""
              } 건의 게시글을 삭제 하시겠습니까?`
            : "한 번에 하나의 게시글만 수정가능합니다. 하나의 게시글만 선택해주세요."}
        </div>
        <div className="grow-[1] flex items-center justify-center  w-full text-center">
          {isDeleted ? (
            <p
              className="w-1/2 h-full  flex justify-center items-center bg-[#8a8a8a91]"
              onClick={handleCloseNoticeEdit}
            >
              확인
            </p>
          ) : (
            ""
          )}
          <p
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-white  h-full flex justify-center items-center"
            style={isDeleted ? { width: "50%" } : { width: "100%" }}
            onClick={isDeleted ? handleAcceptDelete : handleCloseNoticeEdit}
          >
            확인
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoticeTitle;
