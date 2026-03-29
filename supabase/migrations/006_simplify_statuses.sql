-- Simplify client status model
-- Old: partial, lead, call_scheduled, proposal, client, completed, lost
-- New: partial, lead, client, churned

-- Map old statuses to new ones
UPDATE clients SET status = 'lead'    WHERE status IN ('call_scheduled', 'proposal');
UPDATE clients SET status = 'churned' WHERE status IN ('completed', 'lost');

-- Recreate the check constraint with the simplified set
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_status_check;
ALTER TABLE clients ADD CONSTRAINT clients_status_check
  CHECK (status IN ('partial', 'lead', 'client', 'churned'));

-- Insert realistic test clients
INSERT INTO clients (name, email, company, industry, team_size, revenue, status, lead_score, source, preferred_contact, metadata, created_at, updated_at)
VALUES
  (
    'Sarah Chen',
    'sarah@vertexlegal.com',
    'Vertex Legal Group',
    'Legal',
    'medium',
    '$15k - $50k / month',
    'lead',
    78,
    'LinkedIn',
    'imessage',
    '{
      "whyWork": "We are drowning in document review and client intake. Our paralegals spend half their day on tasks that feel like they should be automatable.",
      "whatToBuild": "Automated client intake and document summarization. Maybe a voice agent for initial consultations.",
      "timeline": "asap",
      "commitment": "100",
      "biggestChallenge": "Getting buy-in from the senior partners. They are skeptical but the associate attorneys are excited.",
      "currentTools": ["Clio", "Google Workspace", "DocuSign"],
      "priorAI": "We tried ChatGPT but no one used it consistently. No real implementation."
    }'::jsonb,
    now() - interval '3 days',
    now() - interval '3 days'
  ),
  (
    'Marcus Rivera',
    'marcus@brightpath.io',
    'Brightpath Education',
    'Education / Training',
    'large',
    '$50k+ / month',
    'client',
    85,
    'Someone referred me',
    'whatsapp',
    '{
      "whyWork": "We run online cohorts for 500+ students at a time and support is a constant bottleneck. We need to scale without scaling headcount.",
      "whatToBuild": "AI tutor and support agent that handles student questions 24/7, escalating only when needed.",
      "timeline": "1-3 months",
      "commitment": "100",
      "biggestChallenge": "Keeping the AI responses aligned with our curriculum and tone.",
      "currentTools": ["Circle", "Notion", "Intercom", "Stripe"],
      "priorAI": "Built a basic FAQ bot with Intercom. It covers about 30% of tickets.",
      "referredBy": "Jordan at ScaleHQ"
    }'::jsonb,
    now() - interval '45 days',
    now() - interval '2 days'
  ),
  (
    'Jessica Patel',
    'jess@novahealth.co',
    'Nova Health',
    'Healthcare / Wellness',
    'small',
    '$10k - $15k / month',
    'lead',
    62,
    'Google search',
    'imessage',
    '{
      "whyWork": "Patient scheduling and follow-up reminders are eating up front-desk time. We also get a lot of after-hours calls for things that are not urgent.",
      "whatToBuild": "Appointment booking automation and an after-hours voice agent.",
      "timeline": "3-6 months",
      "commitment": "75",
      "biggestChallenge": "HIPAA compliance. We need to make sure anything we build is compliant.",
      "currentTools": ["Jane App", "Google Workspace"],
      "priorAI": "Nothing beyond basic email templates."
    }'::jsonb,
    now() - interval '8 days',
    now() - interval '8 days'
  ),
  (
    'David Kim',
    'david@atlascommerce.com',
    'Atlas Commerce',
    'E-commerce / Retail',
    'solo',
    '$5k - $10k / month',
    'churned',
    45,
    'YouTube',
    'imessage',
    '{
      "whyWork": "I handle everything myself and customer support emails are piling up. Need something to handle the basic stuff.",
      "whatToBuild": "Customer support email automation and returns/refunds handling.",
      "timeline": "asap",
      "commitment": "50",
      "biggestChallenge": "Budget. I am a solo operator so I need to see ROI quickly.",
      "currentTools": ["Shopify", "Gmail", "Gorgias"],
      "priorAI": "Tried Gorgias AI. It was okay but not smart enough for edge cases.",
      "churnReason": "Budget constraints. Paused the engagement after setup."
    }'::jsonb,
    now() - interval '120 days',
    now() - interval '30 days'
  ),
  (
    'Rachel Torres',
    'rachel@stonebridge.law',
    'Stonebridge & Associates',
    'Legal',
    'medium',
    '$50k+ / month',
    'lead',
    91,
    'Someone referred me',
    'whatsapp',
    '{
      "whyWork": "We are a 12-attorney firm and our operational overhead is unsustainable. Intake, document drafting, research memos - all of it takes too long. I have been looking for someone who actually understands law firm workflows, not just generic AI tools.",
      "whatToBuild": "End-to-end intake automation, contract review with issue flagging, and a research assistant trained on our practice areas (real estate and corporate M&A).",
      "timeline": "asap",
      "commitment": "100",
      "biggestChallenge": "Data security and client confidentiality. We handle sensitive M&A deals. Any system needs to be airtight.",
      "currentTools": ["Clio", "NetDocuments", "Microsoft 365", "Westlaw"],
      "priorAI": "We piloted Harvey AI for a few months. Powerful but expensive and hard to customize for our specific workflows. Looking for something more tailored.",
      "budget": "We have budget allocated. This is a priority for Q2.",
      "referredBy": "Michael at Thornton Capital"
    }'::jsonb,
    now() - interval '1 day',
    now() - interval '1 day'
  );
