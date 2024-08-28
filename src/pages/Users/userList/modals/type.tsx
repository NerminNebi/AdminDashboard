import { IUser } from "@/redux/api/usersApi/type";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: IUser;
}
