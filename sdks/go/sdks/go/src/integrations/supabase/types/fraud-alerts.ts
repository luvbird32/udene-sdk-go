export interface FraudAlert {
  alert_type: string
  created_at: string | null
  description: string
  id: string
  severity: string
  status: string
  transaction_id: string | null
  updated_at: string | null
}

export interface FraudAlertInsert {
  alert_type: string
  created_at?: string | null
  description: string
  id?: string
  severity: string
  status?: string
  transaction_id?: string | null
  updated_at?: string | null
}

export interface FraudAlertUpdate {
  alert_type?: string
  created_at?: string | null
  description?: string
  id?: string
  severity?: string
  status?: string
  transaction_id?: string | null
  updated_at?: string | null
}