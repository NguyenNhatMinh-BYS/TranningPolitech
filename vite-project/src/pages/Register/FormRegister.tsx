import { Controller, useForm } from "react-hook-form";
import * as yub from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import InputRegister from "./InputRegister";
import { regex } from "utils/regex";
import { Register } from "services/apiUser";
import { FormValueRegister } from "model/Auth.model";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const schema = yub.object().shape({
  username: yub.string().required("Username is required").min(4).max(100),
  password: yub
    .string()
    .required("Password is required")
    .matches(
      regex.password,
      "Contains at least eight characters, at least one number, lowercase letters, uppercase letters, special characters"
    ),
  confirmPassword: yub
    .string()
    .required("Confirm Password is required")
    .oneOf([yub.ref("password")], "Passwords must match"),
  full_name: yub.string().required("Use Name is required"),
  email: yub
    .string()
    .required("Email is required")
    .min(8)
    .max(32)
    .email("Email not Format"),
  phone_number: yub
    .string()
    .required("Phone Number is required")
    .matches(regex.phone_number, "invalid phone number"),
});

const FormRegister = () => {
  const navigate = useNavigate();
  const [policyConfirm, setPolicyConfirm] = useState(true);
  const [policyConfirmActive, setpolicyConfirmActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    trigger,
    formState,
  } = useForm<FormValueRegister>({
    mode: "onChange",
    defaultValues: {
      username: "",
      full_name: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const passwordChange = watch("password");
  useEffect(() => {
    if (formState.dirtyFields.confirmPassword) {
      trigger("confirmPassword");
    }
  }, [passwordChange]);
  const checkBox = useRef<HTMLInputElement>(null);
  //handle click checkbox
  const handleClickCheckBox = () => {
    setpolicyConfirmActive(true);
    setPolicyConfirm(!policyConfirm);
    checkBox &&
      checkBox.current &&
      checkBox.current.classList.toggle("opacity-0");
  };
  //handle submit
  const onSubmit = async (data: FormValueRegister) => {
    if (policyConfirm) {
      setpolicyConfirmActive(true);
    } else {
      try {
        await Register({
          username: data.username,
          password: data.password,
          email: data.email,
          full_name: data.full_name,
          phone_number: data.phone_number,
        });

        toast.success("Register successfully !");
        navigate("/login");
      } catch (err) {
        console.log(err);

        toast.error("User Conflict !");
      }
    }
  };

  return (
    <div className=" border-[1px] border-solid border-[#99999967] w-[860px] m-h-[480px] p-4  my-[20px] text-[16px] ">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <header className="text-center text-[24px] font-extrabold low:m-[10px] m-[40px]">
          <h1>리빙랩 회원가입</h1>
        </header>

        <div className=" flex w-full xl:justify-between min-[320px]:flex-wrap min-[320px]:items-center">
          <div className="w-full">
            <div className="flex justify-between min-[100px]:flex-wrap md:flex-nowrap w-full ">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    register={register}
                    onChange={onChange}
                    errors={errors}
                    title="아이디"
                    dataInput="username"
                  />
                )}
              />
              <Controller
                control={control}
                name="full_name"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    onChange={onChange}
                    errors={errors}
                    title="이름"
                    register={register}
                    dataInput="full_name"
                  />
                )}
              />
            </div>
            <div className="flex justify-between min-[100px]:flex-wrap md:flex-nowrap min-[100px]:flex-col-reverse md:flex-row">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    register={register}
                    onChange={onChange}
                    errors={errors}
                    title="비밀번호"
                    dataInput="password"
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    register={register}
                    onChange={onChange}
                    errors={errors}
                    title="이메일"
                    dataInput="email"
                  />
                )}
              />
            </div>
            <div className="flex justify-between min-[100px]:flex-wrap md:flex-nowrap ">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    register={register}
                    onChange={onChange}
                    errors={errors}
                    title="비밀번호 확인"
                    dataInput="confirmPassword"
                  />
                )}
              />
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { onChange } }) => (
                  <InputRegister
                    register={register}
                    onChange={onChange}
                    errors={errors}
                    title="휴대폰 번호"
                    dataInput="phone_number"
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* checkbox  */}
        <div className="mt-[10px] flex items-center md:pl-[20px]">
          <div
            className="h-[26px] w-[26px] relative "
            onClick={handleClickCheckBox}
          >
            <input
              disabled
              className="h-[26px] w-[26px] rounded-none  text-white"
              type="checkbox"
            />
            <i
              className="text-[#FF4040]  bi bi-check2 absolute left-[5px] top-[0px] opacity-0"
              ref={checkBox}
            ></i>
          </div>
          <span className="ml-[6px] text-[14px]">
            개인정보 수집 및 이용에 동의합니다.
          </span>
        </div>
        {policyConfirm && policyConfirmActive ? (
          <p className="text-red-500 md:pl-[20px]">Accept Policy</p>
        ) : (
          " "
        )}

        {/* submit */}
        <div className="flex flex-col mt-[60px] mb-[20px] px-[20px]  ">
          <button
            type="submit"
            className="hover:opacity-60 opacity-100 h-[60px] border-2 border-solid border-#ACACAC bg-[#F6F6F6] mt-[6px] custom:m-[20px] "
          >
            리빙랩 회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
