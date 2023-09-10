import ContentDetailHeader from "./ContentDetailHeader";
import { useEffect } from "react";
import { useRef } from "react";
import ChildListContent from "./ChildListContent"
const listCol = [
  {
    title: "콘텐츠",
    url: "/content",
  },
  {
    title: "리빙랩",
    url: "/living-lab",
  },
  {
    title: "캠페인",
    url: "/campaign",
  },
  {
    title: "자유게시판",
    url: "/free-board",
  },
];
const ContentList = () => {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleScroll() {
      let scrollY = window.scrollY;
      const addClass = "opacity-0 mt-140";
      if (scrollY > 700) {
        scroller &&
          scroller.current &&
          scroller.current.classList.remove(...addClass.split(" "));
      } else if (scrollY < 600) {
        scroller &&
          scroller.current &&
          scroller.current.classList.add(...addClass.split(" "));
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="flex justify-center mt-140  ">
      <div
        className="w-80 flex justify-between mt-140 opacity-0 duration-500 transition-all flex-wrap"
        ref={scroller}
      >
        {listCol &&
          listCol.map((item, index: number) => (
            <div key={index} className="lg:w-1/5 mt-8 min-[180px]:w-full ">
              <ContentDetailHeader title={item.title} to={item.url} />
              <ChildListContent url={item.url} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContentList;
