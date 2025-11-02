import { iDoctor } from "@/interfaces/user.interfaces";
import { _fetch } from "@/utility/_fetch";
import mergeApi from "@/utility/merge-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDoctor() {
  const queryClient = useQueryClient();

  const getDoctors = useQuery({
    queryKey: ["DOCTORS"],
    queryFn: async () => await _fetch<iDoctor[]>(mergeApi("/doctors")),
  });

  const createDoctor = useMutation({
    mutationFn: async (data: FormData) => {
      return await _fetch<iDoctor>(mergeApi("/doctors"), {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },
  });

  const deleteDoctor = useMutation({
    mutationFn: async (id: string) => {
      return await _fetch<null>(mergeApi("/doctors", id), { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOCTORS"] });
    },
  });

  return { getDoctors, createDoctor, deleteDoctor };
}
