import React, { useRef, useState } from "react";
interface Props {
  getData?: (inputSearch?: string, placeholder?: string) => void;
  listItem?: React.RefObject<HTMLDivElement>;
  clickButton?: React.RefObject<HTMLDivElement>;
  searchAuthor?: Boolean;
  manageUser?: Boolean;
  searchBy?: Boolean;
  searchDefault?: Boolean;
}
const HeaderSearch: React.FC<Props> = ({
  getData,
  listItem,
  clickButton,
  searchAuthor,
  manageUser,
  searchBy,
  searchDefault,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(
    manageUser === false ? "제목" : "이름"
  );

  const handleClickSelect = () => {
    listItem && listItem.current?.classList.toggle("hidden");
    const addClass = "border-[#0075DC]";

    clickButton && clickButton.current?.classList.toggle(addClass);
  };
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
  const handleClickSearch = () => {
    console.log(inputSearch);

    if (searchDefault === true) {
      getData(inputSearch);
    } else if (placeholder === "제목") getData("title", inputSearch);
    else if (placeholder === "작성자") getData("author", inputSearch);
    else if (placeholder === "이름") getData("name", inputSearch);
    else if (placeholder === "이메일") getData("email", inputSearch);
  };
  return (
    <div className="max-[1024px]:flex-col max-[1024px]:items-start my-[60px] flex justify-between  w-3/4  items-center">
      <div>
        {" "}
        <h1 className="font-semibold text-[24px] pl-[10px] border-l-[4px] border-solid border-[#0075DC]">
          공지사항
        </h1>
      </div>
      <div className="flex items-center max-[1024px]:mt-[28px] max-[1024px]:w-full min-[100px]:flex-col min-[100px]:items-start min-[1024px]:flex-row min-[1024px]:items-center ">
        {searchBy ? (
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
              className="hidden z-30 absolute bottom-[-40px] left-0 right-0 bg-white shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] rounded-md"
              style={searchAuthor ? { bottom: "-80px" } : { bottom: "-40px" }}
            >
              {manageUser === false ? (
                <p
                  className="p-[6px] "
                  onClick={() => {
                    setPlaceholder("제목");
                    clickButton &&
                      clickButton.current?.classList.remove("border-[#0075DC]");
                  }}
                >
                  제목
                </p>
              ) : (
                <p
                  className="p-[6px] "
                  onClick={() => {
                    setPlaceholder("이름");
                    clickButton &&
                      clickButton.current?.classList.remove("border-[#0075DC]");
                  }}
                >
                  이름
                </p>
              )}
              {searchAuthor ? (
                manageUser === false ? (
                  <p
                    className="p-[6px]"
                    onClick={() => {
                      setPlaceholder("작성자");
                      clickButton &&
                        clickButton.current?.classList.remove(
                          "border-[#0075DC]"
                        );
                    }}
                  >
                    작성자
                  </p>
                ) : (
                  <p
                    className="p-[6px]"
                    onClick={() => {
                      setPlaceholder("이메일");
                      clickButton &&
                        clickButton.current?.classList.remove(
                          "border-[#0075DC]"
                        );
                    }}
                  >
                    이메일
                  </p>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          " "
        )}
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
  );
};

export default HeaderSearch;
