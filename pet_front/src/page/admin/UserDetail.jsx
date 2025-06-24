import { useLocation, useNavigate } from "react-router-dom";
import UserDetailComp from "./UserDetailStyle";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import UserData from "../../components/admin/UserData";

export default function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    //만약 email이 없는 경우 (임시회원)

    const result = await AdminApi.getUserData(id);

    setUser(result);
    console.log(result);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getUserData();
  }, []);

  return (
    <UserDetailComp>
      <div className="detail_container">
        <UserData user={user} setUser={setUser} navigate={navigate} />
      </div>
    </UserDetailComp>
  );
}
