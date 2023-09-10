import { deleteFreeBoardPost, validateAuthor } from "@/services/apiFreeBoard";
import { useState } from "react";
import NoticeTitle from "../announcement-page/component/NoticeTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface Validate {
  CloseConfirmPW: () => void;
  isDeleted: boolean;
  idItem: string;
  editIteam: (password: string) => void;
}
const ConfirmPassword: React.FC<Validate> = ({
  CloseConfirmPW,
  isDeleted,
  idItem,
  editIteam,
}) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    setMessage(true);
  };
  const navigate = useNavigate();
  const handleAccept = async () => {
    try {
      const response = await validateAuthor(idItem, password);
      console.log(response);

      if (response.status === 200 && isDeleted) {
        setIsTrue(true);
      } else if (response.status === 200 && !isDeleted) {
        editIteam(password);
      }
    } catch (e) {
      toast.error("Password validation failed");
    }
  };
  const handleAcceptDelete = () => {
    try {
      (async () => {
        await deleteFreeBoardPost(idItem, password);
        toast.success("Board deleted successfully");
        navigate(-1);
      })();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {isTrue ? (
        <NoticeTitle
          isDeleted={isDeleted}
          handleCloseNoticeEdit={CloseConfirmPW}
          handleAcceptDelete={handleAcceptDelete}
        />
      ) : (
        <div className="fixed w-screen h-screen bg-[#afafaf6a] z-[200] flex justify-center items-center">
          <div className="bg-white w-[380px] h-[280px] flex flex-col justify-between ">
            <div className="text-right mt-[10px]  mr-[10px] cursor-pointer">
              <i
                className="bi bi-x  px-[4px] border-solid border-[1px] border-[#777c]"
                onClick={CloseConfirmPW}
              ></i>
            </div>
            <div className="text-center">
              <h1>비밀번호를 입력하세요.</h1>
              <input
                className=" border-[1px] border-solid border-[#777c] outline-none py-[10px] px-[20px] my-[10px]"
                type="password"
                value={password}
                onChange={(e) => handleChangePassword(e)}
              />
              {message && password === "" ? (
                <p className="text-red-400 ">입력하세요</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center">
              {/* back  */}
              <h1
                className="grow-[1] text-center bg-[#D9D9D9] py-[10px] cursor-pointer"
                onClick={CloseConfirmPW}
              >
                취소
              </h1>
              {/* accept  */}
              <h1
                className="grow-[1] text-center bg-gradient-to-r from-blue-700 to-blue-400 text-white py-[10px] cursor-pointer"
                onClick={handleAccept}
              >
                확인
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPassword;
