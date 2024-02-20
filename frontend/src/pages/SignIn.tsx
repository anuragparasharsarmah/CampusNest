import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg boxss" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold text-center">Sign In</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-700 text-sm font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border rounded py-2 px-3 focus:outline-none"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-gray-700 text-sm font-bold">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="border rounded py-2 px-3 focus:outline-none"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>
      <div className="text-sm">
        Not Registered?{" "}
        <Link className="underline text-blue-600" to="/register">
          Create an account here
        </Link>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 font-bold rounded-lg hover:bg-blue-500 transition-colors duration-300"
      >
        Login
      </button>
    </form>

  );
};

export default SignIn;
