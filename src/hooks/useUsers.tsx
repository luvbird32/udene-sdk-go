import { User } from "@/types/users";
import { useUsersList } from "./useUsersList";
import { useUserMutations } from "./useUserMutations";
import { useCurrentUser } from "./useCurrentUser";
import { useLoadingStates } from "./useLoadingStates";

export const useUsers = () => {
  const { data: users = [], error } = useUsersList();
  const { data: currentUser } = useCurrentUser();
  const { updateUser } = useUserMutations();
  const { isLoading } = useLoadingStates();

  return {
    users,
    isLoading,
    error,
    currentUser,
    updateUser,
  };
};