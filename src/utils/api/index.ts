import { create } from "apisauce";
import {ActivateUserData, ResetPasswordConfirmationData, SignInData, SignUpUserData} from "src/redux/@types";
import { PER_PAGE } from "src/utils/constants";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
  //   это основной url, к которому хвостики присоединяем нужных запросов
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
  //   пишем после API. запрос и в скобках хвостик запроса и тело запроса с типом который мы создали в @types.ts
};

const getPosts = (offset: number, search?: string, ordering?: string) => {
  return API.get("/blog/posts/", { limit: PER_PAGE, offset, search, ordering });
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const createToken = (data: SignInData) => {
  return API.post("/auth/jwt/create/", data);
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const getMyPosts = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const addPost = (token: string, data: any) => {
  return API.post("/blog/posts/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deletePost = (token: string, id: number) => {
  return API.delete(
    `/blog/posts/${id}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const editPost = (token: string, id: number, data: any) => {
  return API.put(`/blog/posts/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const resetPassword = (email: string) => {
  return API.post("/auth/users/reset_password/", { email });
};

const resetPasswordConfirmation = (data: ResetPasswordConfirmationData) => {
  return API.post("/auth/users/reset_password_confirm/", data);
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  createToken,
  getUserInfo,
  verifyToken,
  refreshToken,
  getMyPosts,
  addPost,
  deletePost,
  editPost,
  resetPassword,
  resetPasswordConfirmation,
};
