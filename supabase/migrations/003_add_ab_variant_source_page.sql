-- =====================================================
-- ADD AB_VARIANT AND SOURCE_PAGE COLUMNS
-- Run this in Supabase SQL Editor
-- =====================================================

-- A/B Variante für Lead Attribution (welche Headline-Version gesehen)
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS ab_variant TEXT;

-- Herkunftsseite (z.B. 'landing', 'hautberatung', 'quiz')
ALTER TABLE funnel_submissions ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Indizes für schnelle Abfragen im Dashboard
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_ab_variant ON funnel_submissions(ab_variant);
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_source_page ON funnel_submissions(source_page);
