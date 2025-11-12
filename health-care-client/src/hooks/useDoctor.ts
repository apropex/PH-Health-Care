import { iDoctorQuery } from "@/interfaces/query.interfaces";
import { iDoctor } from "@/interfaces/user.interfaces";
import { fetchHelper } from "@/utility/_fetch";
import mergeApi from "@/utility/merge-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDoctor(searchParams?: iDoctorQuery) {
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams();

  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const typedKey = key as keyof iDoctorQuery;
      const value = searchParams[typedKey];
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryKey = ["DOCTORS", searchParams ? Object.fromEntries(queryParams) : "all"];

  const getDoctors = useQuery({
    queryKey,
    enabled: searchParams !== undefined,
    queryFn: async () => await fetchHelper<iDoctor[]>(mergeApi("/doctor")),
  });

  const createDoctor = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetchHelper<iDoctor>(mergeApi("/doctor/create-doctor"), {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },
  });

  const updateDoctor = useMutation({
    mutationFn: async ({ payload, id }: { payload: FormData; id: string }) => {
      return await fetchHelper<iDoctor>(mergeApi("/doctor", id), {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },
  });

  const deleteDoctor = useMutation({
    mutationFn: async (id: string) => {
      return await fetchHelper<null>(mergeApi("/doctor", id), { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },
  });

  return { getDoctors, createDoctor, updateDoctor, deleteDoctor };
}
