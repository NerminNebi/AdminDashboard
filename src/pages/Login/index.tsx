import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RenderIf } from "@/shared/components";
import logo from "@/assets/images/logo-img.png";
import { useLoginUserMutation } from "@/redux/api/authApi";

const schema = z.object({
  userName: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  type TData = {
    userName: string;
    password: string;
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = (data: TData) => {
    loginUser(data);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        <div className="flex flex-col justify-between lg:w-2/5 w-full bg-login bg-no-repeat p-10">
          {/* <img src={logo} className="h-10 object-contain object-left" /> */}
          <div className="hidden lg:flex justify-content-between mt-10">
            <div className="opacity-70 font-bold text-sm">
              ©
              <span className="font-bold mr-2">{new Date().getFullYear()}</span>
              <a href="" target="_blank" rel="noopener noreferrer">
                Created by Narmin Askarzade
              </a>
            </div>
          </div>
        </div>

        {/* Login Form Wrapper */}
        <div className="flex flex-col flex-auto justify-center items-center p-10 bg-white">
          <div className="flex flex-col justify-center items-center w-full lg:w-2/4">
            <div className="mb-10 lg:mb-20 text-center w-full">
              <h3 className="font-bold text-3xl mb-2">Login Account</h3>
              <span className="text-gray-400 text-sm">
                Enter your email and password
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <Controller
                name="userName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    name="userName"
                    className="bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                    placeholder="Email and agent number"
                    required
                  />
                )}
              />
              <RenderIf condition={errors.userName?.message?.length}>
                <span className="text-red-500">{errors.userName?.message}</span>
              </RenderIf>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    name="password"
                    className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                    placeholder="Password"
                    required
                  />
                )}
              />
              <RenderIf condition={errors.password?.message?.length}>
                <span className="text-red-500">{errors.password?.message}</span>
              </RenderIf>

              <div className="flex justify-between items-center mt-3">
                <span>Forgot password</span>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-green-500 disabled:bg-green-400"
                >
                  Submit
                  <svg
                    className={`${
                      isLoading ? "inline-block" : "hidden"
                    } motion-reduce:hidden animate-spin ml-1 mr-3 h-5 w-5 text-white`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
