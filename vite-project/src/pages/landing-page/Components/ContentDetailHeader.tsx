import { Link } from "react-router-dom";
interface Prop {
  title?: string;
  to?: string;
}
const ContentDetailHeader = ({ title, to }: Prop) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <h1 className="text-2xl font-bold text-main ">{title}</h1>
      <div className="bg-main rounded-sm  cursor-pointer flex justify-center">
        <Link to={to === "/free-board" ? "/freeboard" : to || ""}>
          <div className="w-[38px] h-[40px] hover:animate-[spin180_ease-in-out_1s] flex justify-center">
            <i className="bi bi-plus-lg text-[26px] bg-transparent text-white overflow-hidden   px-[4px] "></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ContentDetailHeader;
