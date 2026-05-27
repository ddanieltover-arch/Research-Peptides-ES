-- Allow anyone (including anonymous users) to insert new orders
DROP POLICY IF EXISTS "orders_public_insert" ON public.orders;
CREATE POLICY "orders_public_insert"
ON public.orders
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to view their own orders
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
CREATE POLICY "orders_select_own"
ON public.orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
