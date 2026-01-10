-- =====================================================
-- FUNNEL SUBMISSIONS TABLE WITH LOCALE TRACKING
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create the funnel_submissions table
CREATE TABLE IF NOT EXISTS funnel_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  locale TEXT DEFAULT 'de',
  last_step TEXT,
  
  -- Quiz answers
  status TEXT,
  interest TEXT,
  pain_point TEXT,
  budget TEXT,
  timeline TEXT,
  
  -- Lead data
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_locale ON funnel_submissions(locale);
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_created_at ON funnel_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_last_step ON funnel_submissions(last_step);
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_session ON funnel_submissions(session_id);

-- Enable Row Level Security
ALTER TABLE funnel_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking from website)
CREATE POLICY "Allow anonymous inserts" ON funnel_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous updates (for upsert functionality)
CREATE POLICY "Allow anonymous updates" ON funnel_submissions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow authenticated reads (for dashboard)
CREATE POLICY "Allow authenticated reads" ON funnel_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- =====================================================
-- USEFUL QUERIES FOR YOUR DASHBOARD
-- =====================================================

-- Count submissions by language
-- SELECT locale, COUNT(*) as count FROM funnel_submissions GROUP BY locale;

-- Get all English quiz starters
-- SELECT * FROM funnel_submissions WHERE locale = 'en' ORDER BY created_at DESC;

-- Conversion rate by language
-- SELECT 
--   locale,
--   COUNT(*) as total,
--   COUNT(CASE WHEN last_step = 'submission_completed' THEN 1 END) as completed,
--   ROUND(COUNT(CASE WHEN last_step = 'submission_completed' THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as conversion_rate
-- FROM funnel_submissions 
-- GROUP BY locale;
