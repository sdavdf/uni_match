import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(clearCredentials());
  };

  return {
    isAuthenticated: !!token,
    user,
    logout,
  };
};
