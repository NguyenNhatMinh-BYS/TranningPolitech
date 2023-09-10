import { useRef, useState } from "react";
import { HTMLProps } from "react";
interface dataInputRegister extends HTMLProps<HTMLInputElement> {
  register: any;
  onChange: any;
  errors: any;
  dataInput: string;
  title: string;
}
const InputRegister = (props: dataInputRegister) => {
  const { register, errors, dataInput, title, ...prop } = props;
  const show = useRef<HTMLDivElement>(null);
  const hidden = useRef<HTMLDivElement>(null);

  const setEye = useRef<HTMLDivElement>(null);
  const [textShow, setTextShow] = useState(true);
  const handleHiddenPassword = () => {
    const classPassword = "opacity-0 pointer-events-none";
    show &&
      show.current &&
      show.current.classList.remove(...classPassword.split(" "));
    hidden &&
      hidden.current &&
      hidden.current.classList.add(...classPassword.split(" "));
    setTextShow(!textShow);
    setEye && setEye.current && setEye.current.setAttribute("type", "text");
  };
  const handleShowPassword = () => {
    const classPassword = "opacity-0 pointer-events-none";
    show &&
      show.current &&
      show.current.classList.add(...classPassword.split(" "));
    hidden &&
      hidden.current &&
      hidden.current.classList.remove(...classPassword.split(" "));
    setTextShow(!textShow);
    setEye && setEye.current && setEye.current.setAttribute("type", "text");
  };
  return (
    <div className="md:w-1/2 md:px-[20px] min-[100px]:w-full">
      <div className="flex flex-col mt-[4px] relative">
        <label className="mt-[4px] mb-[4px]" htmlFor={dataInput}>
          {title}
        </label>
        <input
          ref={setEye}
          placeholder="아이디를 입력하세요."
          className=" focus:outline-none p-[12px] pl-[16px] border-[1px] border-solid border-[#99999967] appearance-none"
          id={dataInput}
          type={
            (dataInput === "password" || dataInput === "confirmPassword") &&
            textShow
              ? "password"
              : "text"
          }
          {...register(`${dataInput}`)}
          {...prop}
        />
        {dataInput === "password" || dataInput == "confirmPassword" ? (
          <div className="absolute top-[38px] right-[13px] select-none cursor-pointer ">
            <i
              onClick={handleHiddenPassword}
              className="bi bi-eye-slash text-[26px] absolute"
              ref={hidden}
            ></i>

            <i
              onClick={handleShowPassword}
              className="bi bi-eye text-[26px] opacity-0 pointer-events-none "
              ref={show}
            ></i>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="text-red-500">{errors[dataInput]?.message}</p>
    </div>
  );
};

export default InputRegister;
