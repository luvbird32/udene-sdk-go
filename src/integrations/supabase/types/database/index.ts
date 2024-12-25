import { Tables } from '../tables';
import { Json } from '../core';

export interface Database {
  public: {
    Tables: {
      [K in keyof Tables]: {
        Row: Tables[K];
        Insert: Omit<Tables[K], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Tables[K]>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type { Json };
export type { Tables, TablesInsert, TablesUpdate } from '../core';