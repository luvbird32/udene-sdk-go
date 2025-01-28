import { User } from "@/types/users";
import { useUsersList } from "./useUsersList";
import { useUserMutations } from "./useUserMutations";
import { useCurrentUser } from "./useCurrentUser";

export const useUsers = () => {
  const { data: users = [], isLoading, error } = useUsersList();
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { updateUser, isLoading: isUpdating } = useUserMutations();

  const isLoading = isLoadingUsers || isLoadingCurrentUser || isUpdating;

  return {
    users,
    isLoading,
    error,
    currentUser,
    updateUser,
  };
};