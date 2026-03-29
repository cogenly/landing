ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_status_check;
ALTER TABLE clients ADD CONSTRAINT clients_status_check
  CHECK (status IN ('partial', 'lead', 'call_scheduled', 'proposal', 'client', 'completed', 'lost'));
