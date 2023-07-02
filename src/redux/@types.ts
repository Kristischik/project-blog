import {PostsList} from "src/@types";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type SignUpUserData = {
  username: string;
  email: string;
  password: string;
};
export type SignUpResponseData = {
  username: string;
  email: string;
  id: number;
};

export type PostListResponseData = {
  count: number;
  next: string;
  previous: null;
  results: PostsList;
}

export type ActivateUserData = {
  uid: string;
  token: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>;
export type ActivateUserPayload = PayloadWithDataAndCallback<ActivateUserData>;

