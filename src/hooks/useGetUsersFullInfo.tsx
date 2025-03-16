/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAppSelector } from "@/store/store-hooks";
import { ApiStatus } from "@/types/globals.types";
import { useEffect } from "react";
import { useAxios } from "./useAxios";
import { useDispatch } from "react-redux";
import { getToken } from "@/libs/auth.libs";
import { setTopRowValueOfTable } from "@/store/features/tablesSlice";
import { setTopRowValueOfUsers } from "@/store/features/usersSlice";
import { setTopRowValueOfProjects } from "@/store/features/projectsSlice";

const useGetUsersFullInfo = () => {
  const usersSlice = useAppSelector((state) => state.users);

  const { fetchStatus } = usersSlice;

  const axiosPrivate = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsersFullInfo = async () => {
      dispatch(
        setTopRowValueOfUsers({
          fetchStatus: ApiStatus.PENDING,
        })
      );
      const token = await getToken();

      try {
        const response = await axiosPrivate.get("/users/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data?.data;

        const projects = responseData?.projects;
        const tables = responseData?.tables;
        // const apis = responseData?.apis;

        dispatch(
          setTopRowValueOfProjects({
            projects,
          })
        );
        dispatch(
          setTopRowValueOfTable({
            tables,
          })
        );

        dispatch(
          setTopRowValueOfUsers({
            fetchStatus: ApiStatus.FINISH,
          })
        );
      } catch {
        dispatch(
          setTopRowValueOfUsers({
            fetchStatus: ApiStatus.ERROR,
          })
        );
      }
    };

    if (fetchStatus === ApiStatus.IDLE) {
      fetchUsersFullInfo();
    }
  }, [fetchStatus]);

  return usersSlice;
};

export default useGetUsersFullInfo;
