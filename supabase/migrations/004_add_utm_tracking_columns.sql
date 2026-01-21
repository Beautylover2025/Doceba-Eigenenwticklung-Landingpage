-- =====================================================
-- ADD UTM TRACKING COLUMNS TO FUNNEL_SUBMISSIONS
-- Run this in Supabase SQL Editor
-- =====================================================

-- Traffic source label (z.B. 'Facebook', 'Direct', 'Google')
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS traffic_source TEXT;

-- Volle UTM-Parameter für detaillierte Attribution
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS utm_content TEXT;

-- Index für Traffic Source Abfragen
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_traffic_source ON funnel_submissions(traffic_source);
