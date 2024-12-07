export interface ApiKey {
  created_at: string | null
  id: string
  key_value: string
  name: string
  status: string
  updated_at: string | null
}

export interface ApiKeyInsert {
  created_at?: string | null
  id?: string
  key_value: string
  name: string
  status?: string
  updated_at?: string | null
}

export interface ApiKeyUpdate {
  created_at?: string | null
  id?: string
  key_value?: string
  name?: string
  status?: string
  updated_at?: string | null
}