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
