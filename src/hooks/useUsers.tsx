import { User } from "@/types/users";
import { useUsersList } from "./useUsersList";
import { useUserMutations } from "./useUserMutations";
import { useCurrentUser } from "./useCurrentUser";

export const useUsers = () => {
  const { data: users = [], isLoading } = useUsersList();
  const { data: currentUser } = useCurrentUser();
  const { updateUser } = useUserMutations();

  return {
    users,
    isLoading,
    currentUser,
    updateUser,
  };
};