-- Update RLS policy for metrics table
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.metrics;
CREATE POLICY "Enable read access for all users"
ON public.metrics FOR SELECT
TO public
USING (true);