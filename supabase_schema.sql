-- ==========================================
-- NEET UG COUNSELLING PORTAL - SUPABASE SCHEMA
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. UPDATES TABLE
CREATE TABLE IF NOT EXISTS updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'MCC', -- 'MCC', 'State', 'General', 'Cutoff', 'Seat Matrix'
    state_slug VARCHAR(100),
    authority VARCHAR(100) DEFAULT 'MCC',
    round VARCHAR(50), -- 'Round 1', 'Round 2', 'Mop-Up', 'Stray Vacancy', 'All'
    image_url TEXT,
    pdf_url TEXT,
    official_source_name VARCHAR(150),
    official_source_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    is_breaking BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published', -- 'draft', 'published', 'scheduled', 'archived'
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. STATES TABLE
CREATE TABLE IF NOT EXISTS states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    counselling_authority VARCHAR(200) NOT NULL,
    official_website TEXT NOT NULL,
    registration_link TEXT,
    eligibility TEXT,
    counselling_process TEXT,
    fees_info TEXT,
    documents_required TEXT,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive'
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. IMPORTANT DATES TABLE
CREATE TABLE IF NOT EXISTS important_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(255) NOT NULL,
    authority VARCHAR(150) NOT NULL,
    state_slug VARCHAR(100), -- Null for MCC / All India
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    description TEXT,
    official_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- 'General', 'MCC', 'State Counselling', 'Category', 'Domicile', 'NRI', 'Other'
    pdf_url TEXT NOT NULL,
    file_size VARCHAR(50),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    state_slug VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    is_govt BOOLEAN DEFAULT TRUE,
    university VARCHAR(255),
    nmc_status VARCHAR(100) DEFAULT 'Recognized',
    mbbs_seats INT DEFAULT 150,
    fees_annual VARCHAR(100),
    hostel_available BOOLEAN DEFAULT TRUE,
    stipend_amount VARCHAR(100),
    bond_details TEXT,
    counselling_authority VARCHAR(150),
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CUTOFFS TABLE
CREATE TABLE IF NOT EXISTS cutoffs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    college_name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    state_slug VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'General', 'OBC', 'SC', 'ST', 'EWS', 'PWD'
    quota VARCHAR(50) NOT NULL, -- 'AIQ', 'State Quota', 'Management', 'NRI'
    round VARCHAR(50) NOT NULL, -- 'Round 1', 'Round 2', 'Round 3', 'Stray'
    opening_rank INT,
    closing_rank INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SEAT MATRIX TABLE
CREATE TABLE IF NOT EXISTS seat_matrix (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    college_name VARCHAR(255) NOT NULL,
    state_slug VARCHAR(100) NOT NULL,
    course VARCHAR(50) DEFAULT 'MBBS',
    category VARCHAR(50) NOT NULL,
    quota VARCHAR(50) NOT NULL,
    round VARCHAR(50) NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. MCC COUNSELLING TABLE
CREATE TABLE IF NOT EXISTS mcc_counselling (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(100) UNIQUE NOT NULL, -- 'overview', 'eligibility', 'registration', 'choice_filling', 'allotment', 'reporting', 'fees', 'faqs'
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new', -- 'new', 'in_progress', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. ADMIN LOGS TABLE
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email VARCHAR(150) NOT NULL,
    action VARCHAR(100) NOT NULL,
    content_type VARCHAR(100),
    content_id VARCHAR(100),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ==========================================
-- INDEXES FOR FAST QUERYING
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_updates_status ON updates(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_updates_breaking ON updates(is_breaking);
CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);
CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state_slug);
CREATE INDEX IF NOT EXISTS idx_cutoffs_college ON cutoffs(college_id, year, category);
CREATE INDEX IF NOT EXISTS idx_seat_matrix_college ON seat_matrix(college_id, round);
CREATE INDEX IF NOT EXISTS idx_important_dates_dates ON important_dates(start_date, end_date);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seat_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcc_counselling ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access for published updates, active states, colleges, dates, docs, etc.
CREATE POLICY "Public Read Updates" ON updates FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read States" ON states FOR SELECT USING (status = 'active');
CREATE POLICY "Public Read Dates" ON important_dates FOR SELECT USING (true);
CREATE POLICY "Public Read Documents" ON documents FOR SELECT USING (true);
CREATE POLICY "Public Read Colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Public Read Cutoffs" ON cutoffs FOR SELECT USING (true);
CREATE POLICY "Public Read Seat Matrix" ON seat_matrix FOR SELECT USING (true);
CREATE POLICY "Public Read MCC" ON mcc_counselling FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);

-- Public INSERT for contact form
CREATE POLICY "Public Insert Contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin Full Access (Authenticated users)
CREATE POLICY "Admin Full Access Updates" ON updates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access States" ON states FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Dates" ON important_dates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Documents" ON documents FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Colleges" ON colleges FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Cutoffs" ON cutoffs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Seat Matrix" ON seat_matrix FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access MCC" ON mcc_counselling FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Contact" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Logs" ON admin_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ==========================================
-- INITIAL SEED DATA
-- ==========================================

-- Seed States
INSERT INTO states (name, slug, counselling_authority, official_website, registration_link, eligibility, counselling_process, fees_info, documents_required) VALUES
('Rajasthan', 'rajasthan', 'NEET UG Medical & Dental Admission Board (SMS Medical College, Jaipur)', 'https://rajugmedical2026.com', 'https://rajugmedical2026.com/register', 'Candidates who have qualified NEET UG 2026 and meet Rajasthan Domicile criteria (or non-domicile for Private/Management seats).', '1. Online Registration\n2. Document Verification\n3. State Merit List Publication\n4. Online Choice Filling\n5. Seat Allotment Result\n6. Physical Reporting & College Joining', 'Registration Fee: ₹2,000 (General/OBC), ₹1,000 (SC/ST). Security Deposit: ₹10,000 (Govt Medical), ₹1,00,000 to ₹2,00,000 (Private Medical).', 'NEET UG 2026 Admit Card, Scorecard, 10th & 12th Marksheet, Rajasthan Domicile Certificate, Category Certificate, PwD Certificate (if applicable), Aadhar Card, Passport Photos.'),
('Delhi', 'delhi', 'Medical Counselling Committee (MCC) & IPU / DU Admissions', 'https://mcc.nic.in', 'https://mcc.nic.in/pgcounselling', '15% AIQ via MCC. 85% State Quota: DU (MAMC, LHMC, UCMS) via MCC, IPU (VMMC, BSA) via GGSIPU portal.', 'Online choice filling via MCC for 85% DU Quota and 15% AIQ. Separate IPU portal for GGSIPU colleges.', 'MCC Registration fee + Security deposit applies as per AIQ norms.', 'NEET Score Card, Class 10/12 Marksheets, Delhi Schooling Certificate for 85% State Quota, Category Certificate.'),
('Uttar Pradesh', 'uttar-pradesh', 'Directorate of Medical Education and Training (DGME UP)', 'https://upneet.gov.in', 'https://upneet.gov.in/registration', 'Qualified NEET 2026. UP Domicile required for Govt seats. Open to all state candidates for Private Medical seats.', 'Online Registration -> Document Verification at Nodal Center -> Choice Filling -> Allotment -> College Admission.', 'Registration Fee: ₹2,000. Security Deposit: ₹30,000 (Govt), ₹2,00,000 (Private Govt seats), ₹1,00,000 (Private Dental).', 'NEET Scorecard, Class 10 & 12 Certificate, UP Domicile Certificate, Caste Certificate, Security Deposit Receipt.'),
('Maharashtra', 'maharashtra', 'State Common Entrance Test Cell (CET Cell), Maharashtra', 'https://cetcell.mahacet.org', 'https://cetcell.mahacet.org/neet-ug-2026', 'Maharashtra Domicile and passed Class 10 & 12 from Maharashtra (with exceptions as per brochure).', 'Online Registration -> Publication of Provisional State Merit List -> Choice Filling (CAP Rounds 1, 2, 3) -> Allotment.', 'Registration Fee: ₹1,000. Institutional quota fees vary by college.', 'CET Cell Registration Slip, NEET Rank Card, Class 10 & 12 Marksheets, Domicile Certificate, Category & Validity Certificate.'),
('Karnataka', 'karnataka', 'Karnataka Examinations Authority (KEA)', 'https://cetonline.karnataka.gov.in/kea/', 'https://cetonline.karnataka.gov.in/kea/neet2026', 'Karnataka Domicile for Govt seats (Clause A to Z). Open seats in Private Colleges available for All India candidates.', 'Registration -> Document Verification (Offline/Online) -> Verification Slip Generation -> Option Entry -> Mock Allotment -> Real Allotment.', 'Registration Fee: ₹500 (SC/ST), ₹1,000 (Gen/OBC), ₹2,000 (NRI/Foreign). Govt seat fee approx ₹1.4 Lakh/yr, Pvt seat ₹10 Lakh/yr.', 'KEA Verification Slip, NEET Score Card, SSLC & 2nd PUC Marks Card, Study Certificate (7 years in KA), Caste/Income Certificate.'),
('Tamil Nadu', 'tamil-nadu', 'Selection Committee, Directorate of Medical Education (DME TN)', 'https://tnmedicalselection.net', 'https://tnmedicalselection.net/apply', 'Tamil Nadu Native candidates. 7.5% preferential quota for TN Govt School students.', 'Separate Application for Govt Quota and Management Quota -> Merit List -> Online Choice Filling -> Allotment.', 'Application Fee: ₹500. Security Deposit: Exempted for Govt, ₹1,00,000 for Management Quota.', 'NEET UG Scorecard, Class 10, 11 & 12 Marksheet, Nativity Certificate, Community Certificate, Transfer Certificate.'),
('Kerala', 'kerala', 'Commissioner for Entrance Examinations (CEE Kerala)', 'https://cee.kerala.gov.in', 'https://cee.kerala.gov.in/keam2026', 'Keralite category for Govt/Self-Financing seats. Non-Keralite 1 (NK1) and NK2 eligible as per guidelines.', 'KEAM Registration -> Submission of NEET Scores -> State Rank List -> Option Confirmation -> Allotment -> Fee Payment.', 'Application Fee: ₹500. Annual tuition fee: Govt ~₹25,000/yr, Self-Financing ~₹7 Lakh - ₹8 Lakh/yr.', 'KEAM Data Sheet, NEET Scorecard, Class 10 & 12 Certificates, Nativity Certificate, Caste/Community Certificate.'),
('West Bengal', 'west-bengal', 'West Bengal Main Computerised Counselling (WBMCC)', 'https://wbmcc.nic.in', 'https://wbmcc.nic.in/registration', 'WB Domicile (proforma a1/a2/b) for Govt seats & State Quota Pvt seats. Management seats open to all.', 'Online Registration & Fee Payment -> Physical Document Verification at allotted centers -> Choice Filling -> Seat Allotment.', 'Registration Fee: ₹2,000. Security Deposit: ₹10,000 (Govt), ₹1,00,000 (Private).', 'WBMCC Acknowledgement Slip, NEET Rank Card, Class 10 & 12 Marksheet, WB Domicile Proforma, Caste Certificate.');

-- Seed Important Dates
INSERT INTO important_dates (event_name, authority, state_slug, start_date, end_date, description, official_link) VALUES
('MCC NEET UG Round 1 Choice Filling', 'MCC', NULL, NOW() - INTERVAL '2 days', NOW() + INTERVAL '4 days', 'Online Choice Filling and Locking for 15% AIQ, Central & Deemed Universities.', 'https://mcc.nic.in'),
('Rajasthan Round 1 Registration Window', 'NEET UG Board Rajasthan', 'rajasthan', NOW() - INTERVAL '1 day', NOW() + INTERVAL '5 days', 'Online Registration and fee payment for Rajasthan State Medical Counselling.', 'https://rajugmedical2026.com'),
('UP NEET UG Merit List Announcement', 'DGME UP', 'uttar-pradesh', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days', 'Publication of State Merit List of registered candidates for UP Counselling.', 'https://upneet.gov.in'),
('Maharashtra CET Cell Registration Deadline', 'CET Cell MH', 'maharashtra', NOW() - INTERVAL '5 days', NOW() + INTERVAL '1 day', 'Last date to submit online application form and upload documents on CET Cell portal.', 'https://cetcell.mahacet.org'),
('KEA Karnataka Option Entry Round 1', 'KEA', 'karnataka', NOW() + INTERVAL '6 days', NOW() + INTERVAL '10 days', 'First round Option Entry for verified candidates in Karnataka Medical colleges.', 'https://cetonline.karnataka.gov.in/kea/');

-- Seed Updates
INSERT INTO updates (title, slug, short_description, content, category, state_slug, authority, round, is_breaking, is_pinned, status, published_at, official_source_name, official_source_url) VALUES
('MCC Round 1 Registration Started for NEET UG 2026', 'mcc-round-1-registration-started-2026', 'MCC has officially opened the registration window for All India Quota 15% seats and Deemed/Central Universities.', 'The Medical Counselling Committee (MCC) has released the detailed schedule for NEET UG 2026 Counselling. Round 1 registration has commenced today. Eligible candidates can register on the official portal mcc.nic.in.\n\nKey Highlights:\n- 15% All India Quota Seats\n- 100% Deemed & Central Universities (AMU, BHU, DU, VMMC)\n- AFMC Pune registration\n- Choice Locking starts from August 14, 2026.', 'MCC', NULL, 'MCC', 'Round 1', TRUE, TRUE, 'published', NOW(), 'Official MCC Portal', 'https://mcc.nic.in'),
('Rajasthan NEET UG 2026 Online Application Notice Released', 'rajasthan-neet-ug-2026-online-application-notice', 'The State Medical & Dental Counselling Board Jaipur has published the detailed notification for State Quota seats.', 'The NEET UG Medical & Dental Admission Board Rajasthan has published the official notification for state quota MBBS/BDS admissions 2026. Online registration starts today.\n\nCandidates are advised to upload proper Domicile Certificates and Category Certificates as per the state prescribed format.', 'State', 'rajasthan', 'State Board Jaipur', 'Round 1', TRUE, FALSE, 'published', NOW() - INTERVAL '3 hours', 'RajUGMedical Board', 'https://rajugmedical2026.com'),
('UP NEET UG 2026 Counselling Schedule Announced', 'up-neet-ug-2026-counselling-schedule-announced', 'DGME UP has released the complete timeline for Round 1, Round 2 and Mop-Up rounds.', 'Directorate of Medical Education and Training, Uttar Pradesh has published the detailed schedule for UP NEET UG Counselling 2026. Online registration will begin on August 15, 2026. Verification will be done at designated Nodal Centers across the state.', 'State', 'uttar-pradesh', 'DGME UP', 'Round 1', FALSE, FALSE, 'published', NOW() - INTERVAL '6 hours', 'UPDGME Portal', 'https://upneet.gov.in'),
('Karnataka KEA Document Verification Notification 2026', 'karnataka-kea-document-verification-notification-2026', 'Karnataka Examinations Authority issues list of centers for offline document verification.', 'KEA has notified all registered candidates regarding the document verification schedule for NEET UG 2026 Karnataka State Quota seats. Verification will take place according to rank order at designated KEA centers.', 'State', 'karnataka', 'KEA', 'Round 1', FALSE, FALSE, 'published', NOW() - INTERVAL '1 day', 'KEA Official Website', 'https://cetonline.karnataka.gov.in/kea/');

-- Seed Colleges
INSERT INTO colleges (name, slug, state_slug, city, is_govt, university, nmc_status, mbbs_seats, fees_annual, hostel_available, stipend_amount, bond_details, counselling_authority, website_url) VALUES
('SMS Medical College, Jaipur', 'sms-medical-college-jaipur', 'rajasthan', 'Jaipur', TRUE, 'Rajasthan University of Health Sciences (RUHS)', 'Recognized', 250, '₹53,500 / year', TRUE, '₹17,000 / month', '2 Years Service Bond or ₹5 Lakh Penalty', 'Rajasthan NEET UG Board / MCC', 'https://education.rajasthan.gov.in/smsmcjaipur'),
('Maulana Azad Medical College (MAMC), New Delhi', 'maulana-azad-medical-college-delhi', 'delhi', 'New Delhi', TRUE, 'University of Delhi', 'Recognized', 250, '₹4,445 / year', TRUE, '₹26,000 / month', '1 Year Service Bond or ₹3 Lakh Penalty', 'MCC (Delhi University 85% + 15% AIQ)', 'https://mamc.ac.in'),
('King George''s Medical University (KGMU), Lucknow', 'king-georges-medical-university-lucknow', 'uttar-pradesh', 'Lucknow', TRUE, 'KGMU Autonomous', 'Recognized', 250, '₹54,600 / year', TRUE, '₹18,000 / month', '2 Years Service Bond or ₹10 Lakh Penalty', 'DGME UP / MCC', 'https://kgmu.org'),
('Grant Medical College & Sir JJ Group of Hospitals, Mumbai', 'grant-medical-college-mumbai', 'maharashtra', 'Mumbai', TRUE, 'Maharashtra University of Health Sciences (MUHS)', 'Recognized', 250, '₹1,14,000 / year', TRUE, '₹18,000 / month', '1 Year Service Bond or ₹10 Lakh Penalty', 'MH CET Cell / MCC', 'https://gmcjjh.org'),
('Bangalore Medical College and Research Institute (BMCRI)', 'bangalore-medical-college-bangalore', 'karnataka', 'Bengaluru', TRUE, 'Rajiv Gandhi University of Health Sciences (RGUHS)', 'Recognized', 250, '₹70,000 / year', TRUE, '₹30,000 / month', '1 Year Rural Service Bond', 'KEA / MCC', 'https://bmcri.edu.in'),
('Madras Medical College, Chennai', 'madras-medical-college-chennai', 'tamil-nadu', 'Chennai', TRUE, 'The Tamil Nadu Dr. M.G.R. Medical University', 'Recognized', 250, '₹18,073 / year', TRUE, '₹25,000 / month', '5 Years Service Bond or ₹5 Lakh Penalty', 'TN Selection Committee / MCC', 'https://mmc.ac.in');

-- Seed Cutoffs
INSERT INTO cutoffs (college_id, college_name, year, state_slug, category, quota, round, opening_rank, closing_rank)
SELECT id, name, 2025, state_slug, 'General', 'AIQ', 'Round 1', 120, 1150 FROM colleges WHERE slug = 'sms-medical-college-jaipur';
INSERT INTO cutoffs (college_id, college_name, year, state_slug, category, quota, round, opening_rank, closing_rank)
SELECT id, name, 2025, state_slug, 'OBC', 'AIQ', 'Round 1', 450, 1820 FROM colleges WHERE slug = 'sms-medical-college-jaipur';
INSERT INTO cutoffs (college_id, college_name, year, state_slug, category, quota, round, opening_rank, closing_rank)
SELECT id, name, 2025, state_slug, 'General', 'AIQ', 'Round 1', 1, 85 FROM colleges WHERE slug = 'maulana-azad-medical-college-delhi';
INSERT INTO cutoffs (college_id, college_name, year, state_slug, category, quota, round, opening_rank, closing_rank)
SELECT id, name, 2025, state_slug, 'General', 'State Quota', 'Round 1', 50, 650 FROM colleges WHERE slug = 'king-georges-medical-university-lucknow';

-- Seed Seat Matrix
INSERT INTO seat_matrix (college_id, college_name, state_slug, course, category, quota, round, available_seats)
SELECT id, name, state_slug, 'MBBS', 'General', 'AIQ', 'Round 1', 37 FROM colleges WHERE slug = 'sms-medical-college-jaipur';
INSERT INTO seat_matrix (college_id, college_name, state_slug, course, category, quota, round, available_seats)
SELECT id, name, state_slug, 'MBBS', 'OBC', 'AIQ', 'Round 1', 25 FROM colleges WHERE slug = 'sms-medical-college-jaipur';
INSERT INTO seat_matrix (college_id, college_name, state_slug, course, category, quota, round, available_seats)
SELECT id, name, state_slug, 'MBBS', 'General', 'State Quota', 'Round 1', 170 FROM colleges WHERE slug = 'king-georges-medical-university-lucknow';

-- Seed Documents
INSERT INTO documents (title, description, category, pdf_url, file_size) VALUES
('NEET UG 2026 MCC Information Bulletin', 'Complete official brochure for 15% All India Quota, Deemed, Central Universities counselling.', 'MCC', '/docs/mcc-information-bulletin-2026.pdf', '4.2 MB'),
('Rajasthan State Counselling Guidelines 2026', 'Official state prospectus and rulebook for Rajasthan MBBS/BDS admissions.', 'State Counselling', '/docs/rajasthan-counselling-rules-2026.pdf', '2.8 MB'),
('Proforma for OBC-NCL Certificate (Central Format)', 'Prescribed format for OBC Non-Creamy Layer certificate required for AIQ & Central Seats.', 'Category', '/docs/obc-ncl-central-format.pdf', '450 KB'),
('Standard Domicile Proforma Guidelines', 'List of valid domicile proof documents required for State Quota seats across Indian states.', 'Domicile', '/docs/domicile-certificate-guidelines.pdf', '620 KB'),
('NRI Sponsorship Certificate Format', 'Format of undertaking and court affidavit for candidates applying under NRI quota.', 'NRI', '/docs/nri-sponsorship-undertaking.pdf', '380 KB');

-- Seed MCC Counselling Info
INSERT INTO mcc_counselling (section_key, title, content) VALUES
('overview', 'MCC NEET UG Counselling Overview', 'The Medical Counselling Committee (MCC) under Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare, Govt. of India conducts online counselling for 15% All India Quota (AIQ), 100% Deemed Universities, Central Universities (DU, AMU, BHU), ESIC Medical Colleges, and AFMC Pune.'),
('eligibility', 'Who Can Participate in MCC Counselling', '1. Candidates who have qualified NEET UG 2026 by securing the minimum cut-off percentile.\n2. Indian Nationals, NRIs, OCIs, PIOs, and Foreign Nationals (as per Supreme Court guidelines).\n3. For Deemed Universities, all NEET qualified candidates are eligible irrespective of state domicile.'),
('process', 'Complete MCC Counselling Process', 'Step 1: Online Registration & Payment of Counselling Fee + Security Deposit.\nStep 2: Choice Filling and Choice Locking.\nStep 3: Processing of Seat Allotment by MCC.\nStep 4: Publication of Seat Allotment Result.\nStep 5: Physical Reporting & Original Document Verification at allotted College.');
