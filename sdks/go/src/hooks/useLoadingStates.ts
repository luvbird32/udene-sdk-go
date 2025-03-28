import { useUsersList } from "./useUsersList";
import { useCurrentUser } from "./useCurrentUser";

export const useLoadingStates = () => {
  const { isLoading: isLoadingUsers } = useUsersList();
  const { isLoading: isLoadingCurrentUser } = useCurrentUser();

  return {
    isLoadingUsers,
    isLoadingCurrentUser,
    isLoading: isLoadingUsers || isLoadingCurrentUser
  };
};