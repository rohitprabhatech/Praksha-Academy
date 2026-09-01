import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RequireAuth = ({ loginPath = "/login" }) => {
  const { isStudentAuthenticated, isAdminAuthenticated, isTeacherAuthenticated } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin") || loginPath.startsWith("/admin");
  const isTeacherRoute = location.pathname.startsWith("/teacher");

  const isAuth = isAdminRoute
    ? isAdminAuthenticated
    : isTeacherRoute
    ? isTeacherAuthenticated
    : isStudentAuthenticated;

  if (!isAuth) {
    return (
      <Navigate
        to={isAdminRoute ? "/admin/login" : loginPath}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;