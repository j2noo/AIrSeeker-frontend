import { atom } from "recoil";
// const { persistAtom } = recoilPersist({
//   key: "recoilPersistTest",
//   storage: sessionStorage,
// });

export type HeaderSelectedType =
  | "none"
  | "list"
  | "myTeam"
  | "myProfile"
  | "login"; //추가 가능

export const headerSelectedState = atom<HeaderSelectedType>({
  key: "headerSelectedState",
  default: "none",
});

export const kakaoAccessTokenState = atom({
  key: "kakaoAccessTokenState",
  default: "",
  // effects_UNSTABLE: [persistAtom],
});
// export const loginInfoState = atom<LoginInfo>({
//   key: "loginState",
//   default: {
//     isLogin: false,
//   },
//   effects_UNSTABLE: [persistAtom],
// });
//리뷰 state

export const reviewMemberIndexState = atom<number>({
  key: "reviewIndex",
  default: 0,
});
export const reviewCommentState = atom<string>({
  key: "reviewComment",
  default: "",
});

//GlobalModal
export const loginModalState = atom({
  key: "loginModal",
  default: false,
});
export const needKakaoReviewModalState = atom({
  key: "needKakaoReviewModal",
  default: false,
});
export const joinTeamCompleteModalState = atom({
  key: "joinTeamCompleteModal",
  default: false,
});
export const joinTeamRefusedModalState = atom({
  key: "joinTeamRefusedModal",
  default: false,
});
