/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAppSelector } from "@/store/store-hooks";
import { ApiStatus } from "@/types/globals.types";
import { useEffect } from "react";
import { useAxios } from "./useAxios";
import { useDispatch } from "react-redux";
import { getToken } from "@/libs/auth.libs";
import { setTopRowValueOfTable } from "@/store/features/tablesSlice";

const useGetAllTablesByUser = () => {
  const tablesSlice = useAppSelector((state) => state.tables);

  const { fetchStatus } = tablesSlice;

  const axiosPrivate = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(
        setTopRowValueOfTable({
          fetchStatus: ApiStatus.PENDING,
        })
      );
      const token = await getToken();

      try {
        const response = await axiosPrivate.get("/tables/user?page=1&limit=1000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          setTopRowValueOfTable({
            tables: response.data?.data?.tables || [],
            fetchStatus: ApiStatus.FINISH,
          })
        );
      } catch {
        dispatch(
          setTopRowValueOfTable({
            fetchStatus: ApiStatus.ERROR,
          })
        );
      }
    };

    if (fetchStatus === ApiStatus.IDLE) {
      fetchProjects();
    }
  }, [fetchStatus]);

  return tablesSlice;
};

export default useGetAllTablesByUser;
