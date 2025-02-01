/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyInfo, UserInfo } from "@/types";
import { LocalStorage } from "@/utils";

type InitialState = {
  userInfo: UserInfo;
  companyInfo: CompanyInfo;
  breadcrumb: string[];
  currentDocument: any;
};

export const initialState: InitialState = {
  userInfo: LocalStorage("userInfo"),
  companyInfo: LocalStorage("companyInfo"),
  breadcrumb: ["test", "test2", "test3", "test4"],
  currentDocument: "",
};

export function systemReducer(state: any, action: any) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "logout":
      return {
        ...state,
        userInfo: null,
      };

    case "breadCrumb":
      return {
        ...state,
        breadcrumb: action.payload,
      };

    case "currentDocument":
      return {
        ...state,
        currentDocument: action.payload,
      };

    default:
      return;
  }
}
