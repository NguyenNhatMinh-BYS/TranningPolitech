import dayjs from "dayjs";
interface Props {
  title?: string;
  text?: string | TrustedHTML;
  date?: string;
}
const ContentDetailTitle = (props: Props) => {
  const { title, text, date } = props;

  return (
    <div className="flex flex-col h-[166px] min-[180px]:w-full  cursor-pointer w-260 p-6 rounded-2xl border-borderContent duration-150 transition-all border-solid border hover:bg-main hover:text-white hover:transform hover:duration-150 hover:transition-all">
      <h1 className="mb-2 text-15 font-bold truncate overflow-hidden">
        {title}
      </h1>
      <p
        dangerouslySetInnerHTML={{ __html: text || "" }}
        className="mb-2 overflow-hidden line-clamp-3 text-sm flex-[9]"
      />
      <p className="text-xs">{dayjs(date).format("YYYY-MM-DD")}</p>
    </div>
  );
};

export default ContentDetailTitle;
