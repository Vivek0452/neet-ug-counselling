export type UpdateCategory = 'MCC' | 'State' | 'General' | 'Cutoff' | 'Seat Matrix';
export type UpdateStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type DateStatus = 'Upcoming' | 'Ongoing' | 'Completed';
export type ContactStatus = 'new' | 'in_progress' | 'resolved';

export interface UpdateItem {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  content: string;
  category: UpdateCategory;
  state_slug?: string;
  authority: string;
  round?: string;
  image_url?: string;
  pdf_url?: string;
  official_source_name?: string;
  official_source_url?: string;
  published_at: string;
  scheduled_at?: string;
  is_breaking: boolean;
  is_pinned: boolean;
  status: UpdateStatus;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
}

export interface StateItem {
  id: string;
  name: string;
  slug: string;
  counselling_authority: string;
  official_website: string;
  registration_link?: string;
  eligibility?: string;
  counselling_process?: string;
  fees_info?: string;
  documents_required?: string;
  status: 'active' | 'inactive';
  seo_title?: string;
  seo_description?: string;
}

export interface ImportantDateItem {
  id: string;
  event_name: string;
  authority: string;
  state_slug?: string;
  start_date: string;
  end_date?: string;
  description?: string;
  official_link?: string;
  status?: DateStatus;
}

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  category: 'General' | 'MCC' | 'State Counselling' | 'Category' | 'Domicile' | 'NRI' | 'Other';
  pdf_url: string;
  file_size?: string;
  uploaded_at: string;
}

export interface CollegeItem {
  id: string;
  name: string;
  slug: string;
  state_slug: string;
  city: string;
  is_govt: boolean;
  university?: string;
  nmc_status?: string;
  mbbs_seats: number;
  fees_annual?: string;
  hostel_available: boolean;
  stipend_amount?: string;
  bond_details?: string;
  counselling_authority?: string;
  website_url?: string;
}

export interface CutoffItem {
  id: string;
  college_id: string;
  college_name: string;
  year: number;
  state_slug: string;
  category: string; // General, OBC, SC, ST, EWS, PWD
  quota: string; // AIQ, State Quota, Management, NRI
  round: string; // Round 1, Round 2, Round 3, Mop-Up, Stray
  opening_rank?: number;
  closing_rank: number;
}

export interface SeatMatrixItem {
  id: string;
  college_id: string;
  college_name: string;
  state_slug: string;
  course: string;
  category: string;
  quota: string;
  round: string;
  available_seats: number;
}

export interface MccSection {
  id: string;
  section_key: string;
  title: string;
  content: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_email: string;
  action: string;
  content_type?: string;
  content_id?: string;
  details?: string;
  created_at: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploaded_at: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'update' | 'state' | 'college' | 'document' | 'date';
  url: string;
  snippet?: string;
  categoryOrState?: string;
}
