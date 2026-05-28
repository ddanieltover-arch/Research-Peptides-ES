-- Execute this in the Supabase SQL Editor to create the blog_posts table

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Setup RLS Policies for Blog Posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blog posts
CREATE POLICY "Allow public read access on blog posts"
ON public.blog_posts
FOR SELECT
TO public
USING (true);

-- Allow authenticated admins/service role to insert/update/delete
CREATE POLICY "Allow service role full access on blog posts"
ON public.blog_posts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
