import { Navigate } from "react-router-dom";

type RouteGuardProps = {
  children: React.ReactNode;
};

const authRoutes = ["/login", "/register", "/forget-password"];

export default function RouteGuard({ children }: RouteGuardProps) {
  const token = localStorage.getItem("token");
  if (token && authRoutes.includes(window.location.pathname)) {
    return <Navigate to={"/"} />;
  } else if (!token && !authRoutes.includes(window.location.pathname)) {
    return <Navigate to={"/login"} />;
  } else {
    return <> {children}</>;
  }
}
