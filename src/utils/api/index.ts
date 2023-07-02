import { create } from "apisauce";
import {ActivateUserData, SignUpUserData} from "src/redux/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
//   это основной url, к которому хвостики присоединяем нужных запросов
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
//   пишем после API. запрос и в скобках хвостик запроса и тело запроса с типом который мы создали в @types.ts
};

const getPosts = () => {
  return API.get("/blog/posts/?limit=12");
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
};