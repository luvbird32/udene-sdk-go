export interface Transaction {
  amount: number
  card_present: boolean
  created_at: string | null
  customer_id: string
  device_id: string
  id: string
  ip_address: string
  is_fraudulent: boolean | null
  location: string
  merchant_id: string
  recurring: boolean
  risk_score: number | null
  timestamp: string
  transaction_type: string
  updated_at: string | null
}

export interface TransactionInsert {
  amount: number
  card_present: boolean
  created_at?: string | null
  customer_id: string
  device_id: string
  id?: string
  ip_address: string
  is_fraudulent?: boolean | null
  location: string
  merchant_id: string
  recurring: boolean
  risk_score?: number | null
  timestamp?: string
  transaction_type: string
  updated_at?: string | null
}

export interface TransactionUpdate {
  amount?: number
  card_present?: boolean
  created_at?: string | null
  customer_id?: string
  device_id?: string
  id?: string
  ip_address?: string
  is_fraudulent?: boolean | null
  location?: string
  merchant_id?: string
  recurring?: boolean
  risk_score?: number | null
  timestamp?: string
  transaction_type?: string
  updated_at?: string | null
}