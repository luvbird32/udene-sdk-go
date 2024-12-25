import type { Json } from '../core';

export interface Database {
  public: {
    Tables: {
      [K: string]: {
        Row: any;
        Insert: any;
        Update: any;
        Relationships: any[];
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
  };
}

export type { Json };
export type { Tables, TablesInsert, TablesUpdate } from '../core';