import { Button } from "@/shadcn/ui/button";
import { Container } from "../master.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "@/slices/api/usersApiSlice.js";
import { setCredentials } from "@/slices/authSlice.js"; // after hitting backend api and getting data we gotta set it to STATE and LOCAL-STORAGE
// toast
import { useToast } from "@/shadcn/ui/use-toast";
import { ToastAction } from "@/shadcn/ui/toast";
// loader
import Loader from "@/components/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const signupHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match.",
        description: "Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "px-7 py-4",
      });
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        console.log(error?.data?.message || error.error);
        toast({
          variant: "destructive",
          title: error?.data?.message || error.error,
          description: "Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "px-7 py-4",
        });
      }
    }
  };

  const inputCSS =
    "rounded-sm px-2 py-1 bg-transparent border border-onyx/70 focus:ring-white/20 focus:border-white/10 w-[20rem] placeholder-neutral-700";

  return (
    <Container>
      <form
        className="h-[84vh] flex flex-col justify-start bg-cardBlack border border-onyx/70 rounded-[30px] w-fit px-14 py-10 mx-auto text-[.9rem]"
        onSubmit={signupHandler}
      >
        <h3 className="text-4xl font-semibold mb-[2rem]">Sign up</h3>
        <div className="flex flex-col items-start">
          <label htmlFor="" className="mb-2 ">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            ref={ref}
            className={`${inputCSS}`}
          />
          <label htmlFor="" className="mb-1 mt-3 ">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`${inputCSS}`}
          />
          <label htmlFor="" className="mb-1 mt-3 ">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`${inputCSS}`}
          />
          <label htmlFor="" className="mb-1 mt-3 ">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className={`${inputCSS}`}
          />
          <Button
            className="mt-12 w-full"
            // disabled={isLoading}
          >
            Create an Account
          </Button>
        </div>
        <div className="mt-6">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </Container>
  );
}

export default Signup;
