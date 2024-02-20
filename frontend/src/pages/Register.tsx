import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg boxs" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold text-center">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col flex-1">
          <label htmlFor="firstName" className="text-gray-700 text-sm font-bold">
            First Name
          </label>
          <input
            id="firstName"
            className="border rounded py-2 px-3 focus:outline-none"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="lastName" className="text-gray-700 text-sm font-bold">
            Last Name
          </label>
          <input
            id="lastName"
            className="border rounded py-2 px-3 focus:outline-none"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
          )}
        </div>
      </div>
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
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-bold">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="border rounded py-2 px-3 focus:outline-none"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 font-bold rounded-lg hover:bg-blue-500 transition-colors duration-300"
      >
        Create Account
      </button>
    </form>

  );
};

export default Register;
