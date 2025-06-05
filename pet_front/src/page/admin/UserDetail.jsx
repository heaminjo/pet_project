import { useLocation, useNavigate } from "react-router-dom";
import UserDetailComp from "./UserDetailStyle";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import UserData from "../../components/admin/UserData";

export default function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    const result = await AdminApi.getUserData(email);
    setUser(result);
  };

  useEffect(() => {
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
