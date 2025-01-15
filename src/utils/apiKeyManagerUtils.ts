import { useToast } from "@/hooks/use-toast";
import { generateSecureApiKey } from "@/utils/apiKeyUtils";
import { supabase } from "@/integrations/supabase/client";

type TableName = 'api_keys' | 'client_api_keys';

export const useApiKeyMutations = (queryClient: any, tableName: TableName) => {
  const { toast } = useToast();

  const createApiKey = async (
    projectName: string, 
    projectDescription: string, 
    userId?: string,
    projectId?: string,
    keyType: 'testing' | 'production' = 'testing'
  ) => {
    if (!projectName.trim()) {
      throw new Error("Project name is required");
    }

    const newApiKey = generateSecureApiKey(32);
    const insertData = {
      key_value: newApiKey,
      name: projectName.trim(),
      description: projectDescription.trim() || null,
      status: 'active',
      key_type: keyType,
      project_id: projectId || null,
      ...(userId && { user_id: userId }),
    };

    const { data, error } = await supabase
      .from(tableName)
      .insert([insertData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteApiKey = async (keyId: string) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', keyId);

    if (error) throw error;
  };

  return {
    createApiKey,
    deleteApiKey,
  };
};