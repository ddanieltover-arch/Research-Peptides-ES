import { pool } from '../server/src/db';

async function main() {
  try {
    await pool.query(`
      DROP POLICY IF EXISTS "orders_public_insert" ON public.orders;
      CREATE POLICY "orders_public_insert" ON public.orders FOR INSERT TO public WITH CHECK (true);
      
      DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
      CREATE POLICY "orders_select_own" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid());
    `);
    console.log('Policies applied successfully');
  } catch (error) {
    console.error('Error applying policies:', error);
  } finally {
    await pool.end();
  }
}

main();
