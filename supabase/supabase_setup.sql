-- Create blog_posts table for storing blog content
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  categories JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT FALSE,
  "publishedAt" TIMESTAMP WITH TIME ZONE,
  "featuredImage" TEXT,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  keywords TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add new columns if they don't exist (for existing installations)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'categories') THEN
        ALTER TABLE blog_posts ADD COLUMN categories JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'publishedAt') THEN
        ALTER TABLE blog_posts ADD COLUMN "publishedAt" TIMESTAMP WITH TIME ZONE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'featuredImage') THEN
        ALTER TABLE blog_posts ADD COLUMN "featuredImage" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'metaTitle') THEN
        ALTER TABLE blog_posts ADD COLUMN "metaTitle" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'metaDescription') THEN
        ALTER TABLE blog_posts ADD COLUMN "metaDescription" TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'keywords') THEN
        ALTER TABLE blog_posts ADD COLUMN keywords TEXT;
    END IF;
END $$;

-- Create indexes for blog_posts for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author);

-- Enable Row Level Security (RLS) for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blog_posts
-- Allow everyone to read published posts
DROP POLICY IF EXISTS "blog_posts_allow_public_reads" ON blog_posts;
CREATE POLICY "blog_posts_allow_public_reads" ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users (admins) full access to blog posts
DROP POLICY IF EXISTS "blog_posts_allow_authenticated_full" ON blog_posts;
CREATE POLICY "blog_posts_allow_authenticated_full" ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Optional: Create a view for published blog posts
CREATE OR REPLACE VIEW published_blog_posts AS
SELECT
  id,
  title,
  content,
  excerpt,
  author,
  tags,
  slug,
  created_at,
  updated_at
FROM blog_posts
WHERE published = true
ORDER BY created_at DESC;

-- Create primai_form_submissions table for storing form data
CREATE TABLE IF NOT EXISTS primai_form_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  required_service TEXT,
  country_of_origin VARCHAR(255) NOT NULL,
  country_of_residence VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  application_type VARCHAR(50) DEFAULT 'general', -- 'bde' or 'general'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_primai_form_submissions_email ON primai_form_submissions(email);

-- Create index on application_type for filtering
CREATE INDEX IF NOT EXISTS idx_primai_form_submissions_type ON primai_form_submissions(application_type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_primai_form_submissions_created_at ON primai_form_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE primai_form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "primai_allow_public_inserts" ON primai_form_submissions;
DROP POLICY IF EXISTS "primai_allow_authenticated_reads" ON primai_form_submissions;

-- Create policy to allow inserts (for form submissions) - allow anonymous users
CREATE POLICY "primai_allow_public_inserts" ON primai_form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "primai_allow_authenticated_reads" ON primai_form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW primai_form_submissions_view AS
SELECT
  id,
  name,
  required_service,
  country_of_origin,
  country_of_residence,
  mobile_number,
  email,
  application_type,
  created_at
FROM primai_form_submissions
ORDER BY created_at DESC;
