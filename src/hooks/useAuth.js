// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

export const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    user,
    token,
    isAuthenticated,
    logout: handleLogout
  }
}