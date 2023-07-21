import { create } from "apisauce";
import {ActivateUserData, SignInData, SignUpUserData} from "src/redux/@types";
import {PER_PAGE} from "src/utils/constants";

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
  return API.post('/auth/jwt/create/', data);
}

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
  return API.post('/blog/posts/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}


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
};