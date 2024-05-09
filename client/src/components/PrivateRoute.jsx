import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@/shadcn/ui/use-toast";
import { useEffect } from "react";

export default function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  const { toast } = useToast();
  useEffect(() => {
    if (!userInfo) {
      toast({
        description: "You are required to login first.",
      });
    }
  }, []);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
