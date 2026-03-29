/** Lightweight client reference used in dropdowns and relation joins */
export type ClientRef = {
  id: string;
  name: string;
  company: string;
};

/** Lightweight client reference returned from a join that only selects name + company */
export type ClientNameRef = {
  name: string;
  company: string | null;
};

/** Call row with the related client joined (id, name, company) */
export type CallWithClient = {
  id: string;
  client_id: string;
  call_date: string;
  title: string | null;
  notes: string | null;
  clients: ClientRef | null;
};

/** Upcoming-call row used on the dashboard (subset of fields + client name/company join) */
export type UpcomingCall = {
  id: string;
  call_date: string;
  title: string | null;
  clients: ClientNameRef | null;
};

/** Full client record from the clients table */
export type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  website: string | null;
  industry: string | null;
  team_size: string | null;
  revenue: string | null;
  status: string;
  lead_score: number | null;
  source: string | null;
  preferred_contact: string | null;
  notes: string | null;
};

export type Call = {
  id: string;
  client_id: string;
  call_date: string;
  title: string | null;
  notes: string | null;
};
