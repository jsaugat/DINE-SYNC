import { useEffect, useRef, useState } from "react";
import { Container } from "../master";
import { Button } from "@/shadcn/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // to get user data from state and also dispatch
import { useLoginMutation } from "@/slices/api/authApiSlice"; // hit backend api
import { setCredentials } from "@/slices/authSlice"; // after hitting backend api and getting data we gotta set it to STATE and LOCAL-STORAGE
import "../Styles/App.scss";
// toast
import { useToast } from "@/shadcn/ui/use-toast";
import { ToastAction } from "@/shadcn/ui/toast";
// loader
import Loader from "@/components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
  // check auth state in devtools
  // (notion: https://shorturl.at/eDKZ0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      //? Step1: hit backend api and retrieve data
      const res = await login({ email, password }).unwrap(); // unwrap unwraps the promise?
      console.log("Login Response", res);
      //? Step2: dispatch
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast({
        // variant: "minimal",
        title: `Logged in as ${res.name}`,
        description: "Your preferences are now personalized.",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
        className: "px-7 py-4",
      });
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast({
        variant: "destructive",
        title: err?.data?.message || err.error,
        description: "There was a problem in your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "px-7 py-4",
      });
    }
  };

  const inputCSS =
    "rounded-lg px-3 py-1 bg-transparent border border-onyx/70 focus:ring-white/20 focus:border-white/20 w-[20rem]";

  return (
    <Container>
      <form
        className="h-[84vh] flex flex-col justify-start bg-cardBlack border border-onyx/50 rounded-[30px] w-fit px-14 py-14 mx-auto text-[.9rem]"
        onSubmit={loginHandler}
      >
        <h3
          className="text-4xl font-semibold mb-[4rem]"
          // style={{
          //   background: "linear-gradient(to right, #ffffff, #ffffff, #8B8B8B)",
          //   webkitBackgroundClip: "text",
          //   color: "transparent",
          // }}
        >
          Log In
        </h3>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="mb-1 mt-3 font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            ref={ref}
            className={`${inputCSS}`}
          />
          <label htmlFor="" className="mb-1 mt-3 font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className={`${inputCSS}`}
          />
          {isLoading && <Loader />}
          <Button disabled={isLoading} className="mt-14 w-full">
            Log in
          </Button>
        </div>
        <div className="mt-12">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </div>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </Container>
  );
}

export default Login;
