//

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "antd";
import { IUser } from "@/redux/api/usersApi/type";
import { useUpdateUserMutation } from "@/redux/api/usersApi";
import { RenderIf } from "@/shared/components";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  skip: number;
  take: number;
  sortFiled: string;
  orderBy: boolean;
}

type TData = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const schema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
});

const EditUserModal: React.FC<EditUserModalProps> = ({
  skip,
  take,
  sortFiled,
  orderBy,
  isOpen,
  onClose,
  user,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      id: user.id,
    },
    resolver: zodResolver(schema),
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = (data: TData) => {
    const payload = {
      ...data,
      id: user.id,
      skip,
      take,
      sortField: sortFiled,
      orderBy,
    };

    updateUser(payload)
      .then(() => {
        onClose();
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <Modal
      title="Edit User"
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
              <input
                {...field}
                type="number"
                className="mt-3 bg-gray-100 border-0 focus-visible:outline-none text-gray-700 text-sm rounded-md focus:ring-0 focus:border-0 focus:bg-gray-200 block w-full px-6 py-3 transition"
                placeholder="Phone"
                required
              />
            )}
          />
          <RenderIf condition={errors.phone?.message?.length}>
            <span className="text-red-500">{errors.phone?.message}</span>
          </RenderIf>

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
        </form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
