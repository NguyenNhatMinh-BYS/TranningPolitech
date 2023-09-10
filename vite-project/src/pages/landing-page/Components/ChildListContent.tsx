import { useEffect, useState } from "react";
import { other } from "@/services/apiNotice";



import { Link } from "react-router-dom";
interface Prop {
  url: string;
}
const ChildListContent = ({ url }: Prop) => {
  const [dataListContent, setdataListContent] = useState([]);
  

  const getData = async () => {
   

    try {
      const responsive = await other(url);
      // console.log(responsive.data.data?.list.slice(0, 4));

      setdataListContent(responsive.data.data?.list.slice(0, 4));
    } catch (err) {
      console.log(err);
    }

   
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="border-y-[2px] border-main mt-[12px] min-h-[200px]">
    
      <ul className="list-square">
        {dataListContent.length === 0 ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <div>
            {dataListContent &&
              dataListContent.map(
                (item: { title: string; id?: string }, index: number) => (
                  <Link
                    key={index}
                    to={`${url === "/free-board" ? "/freeboard" : url}/${
                      url === "/content" ? "" : item.id
                    }`}
                  >
                    <li className=" cursor-pointer   hover:bg-hoverContent">
                      <div className="p-2 flex items-center justify-between w-full  ">
                        <div className="bg-black w-[8px] h-[8px] mx-[2px] "></div>
                        <div className="w-4/5 flex  items-center truncate overflow-hidden">
                          <span className="truncate ">{item.title}</span>
                        </div>
                        <i className="bi bi-chevron-right p-1 "></i>
                      </div>
                    </li>
                  </Link>
                )
              )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChildListContent;
