import instance from "./api";
import { User } from "model/Auth.model";
import { FormValueRegister } from "model/Auth.model";

const Login = (user: User) => {
  return instance.post("/user/login", user);
};
const Register = (data: FormValueRegister) => {
  console.log(data);

  return instance.post("/user/register", data);
};
export { Login, Register };
