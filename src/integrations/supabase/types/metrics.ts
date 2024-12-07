export interface Metric {
  id: string
  metric_name: string
  metric_value: number
  timestamp: string | null
}

export interface MetricInsert {
  id?: string
  metric_name: string
  metric_value: number
  timestamp?: string | null
}

export interface MetricUpdate {
  id?: string
  metric_name?: string
  metric_value?: number
  timestamp?: string | null
}