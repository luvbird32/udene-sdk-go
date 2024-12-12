import { Json } from '../database';

export interface MLModelsTable {
  Row: {
    id: string;
    model_type: string;
    version: string;
    is_active: boolean | null;
    training_date: string | null;
    training_size: number | null;
    metrics: Json | null;
    hyperparameters: Json | null;
    validation_metrics: Json | null;
    created_at: string | null;
  };
  Insert: {
    id?: string;
    model_type: string;
    version: string;
    is_active?: boolean | null;
    training_date?: string | null;
    training_size?: number | null;
    metrics?: Json | null;
    hyperparameters?: Json | null;
    validation_metrics?: Json | null;
    created_at?: string | null;
  };
  Update: {
    id?: string;
    model_type?: string;
    version?: string;
    is_active?: boolean | null;
    training_date?: string | null;
    training_size?: number | null;
    metrics?: Json | null;
    hyperparameters?: Json | null;
    validation_metrics?: Json | null;
    created_at?: string | null;
  };
}

export interface TrainingDatasetsTable {
  Row: {
    id: string;
    transaction_id: string | null;
    features: Json;
    label: boolean;
    dataset_version: string;
    created_at: string | null;
    split_type: string | null;
  };
  Insert: {
    id?: string;
    transaction_id?: string | null;
    features: Json;
    label: boolean;
    dataset_version: string;
    created_at?: string | null;
    split_type?: string | null;
  };
  Update: {
    id?: string;
    transaction_id?: string | null;
    features?: Json;
    label?: boolean;
    dataset_version?: string;
    created_at?: string | null;
    split_type?: string | null;
  };
}