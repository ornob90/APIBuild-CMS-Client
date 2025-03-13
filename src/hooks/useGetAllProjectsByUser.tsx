/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAppSelector } from "@/store/store-hooks";
import { ApiStatus } from "@/types/globals.types";
import { useEffect } from "react";
import { useAxios } from "./useAxios";
import { useDispatch } from "react-redux";
import { setTopRowValueOfProjects } from "@/store/features/projectsSlice";
import { getToken } from "@/libs/auth.libs";

const useGetAllProjectsByUser = () => {
  const projectSlice = useAppSelector((state) => state.project);

  const { fetchStatus } = projectSlice;

  const axiosPrivate = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(
        setTopRowValueOfProjects({
          fetchStatus: ApiStatus.PENDING,
        })
      );
      const token = await getToken();

      try {
        const response = await axiosPrivate.get("/projects?all=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          setTopRowValueOfProjects({
            projects: response.data?.data?.projects || [],
            fetchStatus: ApiStatus.FINISH,
          })
        );
      } catch {
        dispatch(
          setTopRowValueOfProjects({
            fetchStatus: ApiStatus.ERROR,
          })
        );
      }
    };

    if (fetchStatus === ApiStatus.IDLE) {
      fetchProjects();
    }
  }, [fetchStatus]);

  return projectSlice;
};

export default useGetAllProjectsByUser;
