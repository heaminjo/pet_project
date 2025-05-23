import { useEffect } from "react";
import MemberApi from "../../api/MemberApi";

export default function MyPage() {
  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    const result = MemberApi.detail();
    console.log(result);
  };
  return <></>;
}
