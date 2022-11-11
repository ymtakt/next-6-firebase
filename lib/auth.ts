import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User, getAuth, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

import { app } from "./firebase";

type UserState = User | null

//認証するユーザーを保持するRecoilの状態・・ログインしているときはUser、していない時はnull
const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

//ログイン、グーグルログインにリダイレクト
export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

//ログアウト
export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

//ユーザ認証の監視
export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(app);

    //ユーザ認証を監視して変更があった際は引数のコールバック関数を実行
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      //ユーザの認証中の場合はtrue
      setIsLoading(false);
    });

  }, [setUser]);

  return isLoading;
};

//userStateを他のコンポーネントで利用するための関数・・・(認証するユーザーを保持するRecoilの状態)
export const useUser = (): UserState => {
  return useRecoilValue(userState);
};

