import { Database } from "./database";

export type MLModel = Database['public']['Tables']['ml_models']['Row'];
export type MLModelInsert = Database['public']['Tables']['ml_models']['Insert'];
export type MLModelUpdate = Database['public']['Tables']['ml_models']['Update'];

export type TrainingDataset = Database['public']['Tables']['training_datasets']['Row'];
export type TrainingDatasetInsert = Database['public']['Tables']['training_datasets']['Insert'];
export type TrainingDatasetUpdate = Database['public']['Tables']['training_datasets']['Update'];