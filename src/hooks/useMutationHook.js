import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (cb) => {
    // Call API
    const mutation = useMutation({
        mutationFn: cb,
    });
    return mutation;
};
