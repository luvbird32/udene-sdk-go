import { useUsersList } from "../useUsersList";
import { useUserMutations } from "../useUserMutations";
import { useCurrentUser } from "../useCurrentUser";

export const useAdminUsers = () => {
  const { data: users = [], isLoading: isLoadingUsers, error } = useUsersList();
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { updateUser } = useUserMutations();

  const isLoading = isLoadingUsers || isLoadingCurrentUser;

  return {
    users,
    isLoading,
    error,
    currentUser,
    updateUser,
  };
};