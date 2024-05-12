import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@/shadcn/ui/use-toast";
import { useEffect } from "react";

export default function AdminRoute() {
  const { isAdmin } = useSelector((state) => state.auth.userInfo);
  const { toast } = useToast();
  useEffect(() => {
    if (!isAdmin) {
      toast({
        // variant: "minimal",
        description: "You cannot access this page.",
      });
    }
  }, []);
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
