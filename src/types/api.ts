export interface ApiKey {
  id: string;
  key_value: string;
  name: string;
  description?: string;
  created_at: string;
  status: 'active' | 'revoked';
  project_id: string;
}