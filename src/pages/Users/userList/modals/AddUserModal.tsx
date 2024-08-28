import React from "react";
import { IModalProps } from "./type";
import { Modal } from "antd";
import * as z from "zod";
import { RenderIf } from "@/shared/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserMutation } from "@/redux/api/usersApi";

//! Schemalar hansi faylda saxlanilsin?
const schema = z
  .object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
    lastName: z.string().min(1, { message: "Lastname is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    phone: z.z
      .string()
      .min(1, { message: "Phone is required" })
      .regex(/^\d+$/, { message: "Only numbers are allowed" }),
    password: z
      .string()
      .min(8, { message: "Password must be minimum 8 character" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})/, {
        message:
          "Password must consist of an uppercase letter, a lowercase letter, a number and a character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be minimum 8 character" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})/, {
        message:
          "Password must consist of an uppercase letter, a lowercase letter, a number and a character.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const AddUserModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  type TField =
    | "firstName"
    | "lastName"
    | "password"
    | "confirmPassword"
    | "phone"
    | "email";

  const validateField = (field: TField) => {
    trigger(field);
  };

  const [addUser, { isLoading }] = useAddUserMutation();

  const onSubmit = (data: any) => {
    console.log(data);
    addUser(data);
  };

  return (
    <Modal
      title="Add User"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="right-side-modal"
    >
      <div className="h-screen bg-white p-4 rounded-none">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Firstname"
                onBlur={() => validateField("firstName")}
                required
              />
            )}
          />
          <RenderIf condition={errors.firstName?.message?.length}>
            <span className="text-red-500">{errors.firstName?.message}</span>
          </RenderIf>

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Lastname"
                onBlur={() => validateField("lastName")}
                required
              />
            )}
          />
          <RenderIf condition={errors.lastName?.message?.length}>
            <span className="text-red-500">{errors.lastName?.message}</span>
          </RenderIf>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Email"
                onBlur={() => validateField("email")}
                required
              />
            )}
          />
          <RenderIf condition={errors.email?.message?.length}>
            <span className="text-red-500">{errors.email?.message}</span>
          </RenderIf>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div className="mt-3 flex items-center border border-gray-300 rounded">
                <span className="px-3 text-gray-500">994</span>
                <input
                  {...field}
                  type="text"
                  className="flex-1 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-tr-md-md rounded-br-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                  placeholder="Phone"
                  onBlur={() => validateField("phone")}
                  required
                />
              </div>
            )}
          />
          <RenderIf condition={errors.phone?.message?.length}>
            <span className="text-red-500">{errors.phone?.message}</span>
          </RenderIf>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Password"
                onBlur={() => validateField("password")}
                required
              />
            )}
          />
          <RenderIf condition={errors.password?.message?.length}>
            <span className="text-red-500">{errors.password?.message}</span>
          </RenderIf>

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Confirm Password"
                onBlur={() => validateField("confirmPassword")}
                required
              />
            )}
          />
          <RenderIf condition={errors.confirmPassword?.message?.length}>
            <span className="text-red-500">
              {errors.confirmPassword?.message}
            </span>
          </RenderIf>

          <div className="mt-3 flex justify-between">
            <button
              onClick={onClose}
              type={"button"}
              className="px-4 py-2 font-semibold leading-6 text-sm rounded-md bg-gray-200"
            >
              Close
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-white bg-green-500 disabled:bg-green-400"
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
    </Modal>
  );
};

export default AddUserModal;
