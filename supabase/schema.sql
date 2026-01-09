-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);

-- Quiz Responses Table
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  question_index INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_question ON quiz_responses(question_index);

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON analytics_events
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated reads (for dashboard)
CREATE POLICY "Allow authenticated reads" ON analytics_events
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated reads" ON quiz_responses
  FOR SELECT
  USING (auth.role() = 'authenticated');
