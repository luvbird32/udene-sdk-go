export interface WhitelistTable {
  Row: {
    id: string;
    entity_type: string;
    entity_id: string;
    reason: string;
    added_at: string | null;
    expires_at: string | null;
  };
  Insert: {
    id?: string;
    entity_type: string;
    entity_id: string;
    reason: string;
    added_at?: string | null;
    expires_at?: string | null;
  };
  Update: {
    id?: string;
    entity_type?: string;
    entity_id?: string;
    reason?: string;
    added_at?: string | null;
    expires_at?: string | null;
  };
}