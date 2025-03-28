-- Enable row level security
ALTER TABLE fraud_alerts REPLICA IDENTITY FULL;

-- Add table to realtime publication
BEGIN;
  -- remove if exists
  DROP publication IF EXISTS supabase_realtime;
  
  -- re-create
  CREATE publication supabase_realtime;
END;

-- Add fraud_alerts table to publication
ALTER publication supabase_realtime ADD TABLE fraud_alerts;