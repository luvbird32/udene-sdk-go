import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/client-dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return <AuthFormWrapper />;
};

export default Login;