import { useGetUsersQuery } from "@/redux/api/usersApi";
import { IFilter } from "@/redux/api/usersApi/type";
import { useState } from "react";

const UserList = () => {
  const [params, setParams] = useState<IFilter>({
    Skip: 0,
    Take: 10,
    SortField: "",
    OrderBy: false,
  });

  const { data, isLoading, isError } = useGetUsersQuery(params);
  return <div>UserList</div>;
};

export default UserList;
