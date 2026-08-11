import {
  UpdateItem,
  StateItem,
  ImportantDateItem,
  DocumentItem,
  CollegeItem,
  CutoffItem,
  SeatMatrixItem,
  MccSection,
  ContactMessage,
  AdminLog,
  MediaFile,
} from "@/types";

export const INITIAL_UPDATES: UpdateItem[] = [
  {
    id: "upd-1",
    title: "MCC Round 1 Registration Started for NEET UG 2026",
    slug: "mcc-round-1-registration-started-2026",
    short_description: "MCC has officially opened the registration window for All India Quota 15% seats and Deemed/Central Universities.",
    content: "The Medical Counselling Committee (MCC) has released the detailed schedule for NEET UG 2026 Counselling. Round 1 registration has commenced today. Eligible candidates can register on the official portal mcc.nic.in.\n\nKey Highlights:\n- 15% All India Quota Seats\n- 100% Deemed & Central Universities (AMU, BHU, DU, VMMC)\n- AFMC Pune registration\n- Choice Locking starts from August 14, 2026.",
    category: "MCC",
    authority: "Medical Counselling Committee (MCC)",
    round: "Round 1",
    pdf_url: "/docs/mcc-information-bulletin-2026.pdf",
    official_source_name: "Official MCC Portal",
    official_source_url: "https://mcc.nic.in",
    published_at: new Date().toISOString(),
    is_breaking: true,
    is_pinned: true,
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "upd-2",
    title: "Rajasthan NEET UG 2026 Online Application Notice Released",
    slug: "rajasthan-neet-ug-2026-online-application-notice",
    short_description: "The State Medical & Dental Counselling Board Jaipur has published the detailed notification for State Quota seats.",
    content: "The NEET UG Medical & Dental Admission Board Rajasthan has published the official notification for state quota MBBS/BDS admissions 2026. Online registration starts today.\n\nCandidates are advised to upload proper Domicile Certificates and Category Certificates as per the state prescribed format.",
    category: "State",
    state_slug: "rajasthan",
    authority: "State Board Jaipur",
    round: "Round 1",
    pdf_url: "/docs/rajasthan-counselling-rules-2026.pdf",
    official_source_name: "RajUGMedical Board",
    official_source_url: "https://rajugmedical2026.com",
    published_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    is_breaking: true,
    is_pinned: false,
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "upd-3",
    title: "UP NEET UG 2026 Counselling Schedule Announced",
    slug: "up-neet-ug-2026-counselling-schedule-announced",
    short_description: "DGME UP has released the complete timeline for Round 1, Round 2 and Mop-Up rounds.",
    content: "Directorate of Medical Education and Training, Uttar Pradesh has published the detailed schedule for UP NEET UG Counselling 2026. Online registration will begin on August 15, 2026. Verification will be done at designated Nodal Centers across the state.",
    category: "State",
    state_slug: "uttar-pradesh",
    authority: "DGME UP",
    round: "Round 1",
    official_source_name: "UPDGME Portal",
    official_source_url: "https://upneet.gov.in",
    published_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    is_breaking: false,
    is_pinned: false,
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "upd-4",
    title: "Karnataka KEA Document Verification Notification 2026",
    slug: "karnataka-kea-document-verification-notification-2026",
    short_description: "Karnataka Examinations Authority issues list of centers for offline document verification.",
    content: "KEA has notified all registered candidates regarding the document verification schedule for NEET UG 2026 Karnataka State Quota seats. Verification will take place according to rank order at designated KEA centers.",
    category: "State",
    state_slug: "karnataka",
    authority: "KEA",
    round: "Round 1",
    official_source_name: "KEA Official Portal",
    official_source_url: "https://cetonline.karnataka.gov.in/kea/",
    published_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    is_breaking: false,
    is_pinned: false,
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "upd-5",
    title: "MCC Seat Matrix Round 1 Published for Deemed Universities",
    slug: "mcc-seat-matrix-round-1-deemed-universities",
    short_description: "Check category-wise available MBBS and BDS seats in Deemed and Central Medical Colleges across India.",
    content: "MCC has released the preliminary seat matrix for Round 1 of NEET UG 2026 Counselling. Over 10,000 MBBS seats in Deemed Universities and Central Institutions are open for choice filling.",
    category: "Seat Matrix",
    authority: "MCC",
    round: "Round 1",
    official_source_name: "MCC Website",
    official_source_url: "https://mcc.nic.in",
    published_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    is_breaking: false,
    is_pinned: false,
    status: "published",
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_STATES: StateItem[] = [
  {
    id: "st-1",
    name: "Rajasthan",
    slug: "rajasthan",
    counselling_authority: "NEET UG Medical & Dental Admission Board (SMS Medical College, Jaipur)",
    official_website: "https://rajugmedical2026.com",
    registration_link: "https://rajugmedical2026.com/register",
    eligibility: "Candidates who have qualified NEET UG 2026 and meet Rajasthan Domicile criteria (or non-domicile for Private/Management seats).",
    counselling_process: "1. Online Registration & Application Fee Payment\n2. Document Verification\n3. State Merit List Publication\n4. Online Choice Filling & Locking\n5. Seat Allotment Result\n6. Physical Reporting & Document Submission at Allotted College",
    fees_info: "Registration Fee: ₹2,000 (General/OBC), ₹1,000 (SC/ST). Security Deposit: ₹10,000 (Govt Medical), ₹1,00,000 to ₹2,00,000 (Private Medical).",
    documents_required: "NEET UG 2026 Admit Card, Scorecard, Class 10th & 12th Marksheet, Rajasthan Domicile Certificate, Category Certificate (OBC-NCL / EWS / SC / ST), PwD Certificate (if applicable), Aadhar Card, 8 Passport Photographs.",
    status: "active",
  },
  {
    id: "st-2",
    name: "Delhi",
    slug: "delhi",
    counselling_authority: "Medical Counselling Committee (MCC) & GGSIPU / DU Admissions",
    official_website: "https://mcc.nic.in",
    registration_link: "https://mcc.nic.in/pgcounselling",
    eligibility: "15% AIQ via MCC. 85% State Quota: DU Colleges (MAMC, LHMC, UCMS) via MCC, IPU Colleges (VMMC, BSA) via GGSIPU portal.",
    counselling_process: "Online choice filling via MCC for 85% DU Quota and 15% AIQ. Separate IPU portal registration for GGSIPU medical colleges.",
    fees_info: "MCC Registration fee + Security deposit applies as per AIQ norms.",
    documents_required: "NEET Score Card, Class 10/12 Marksheets, Delhi Schooling Certificate (for 85% State Quota), Category Certificate.",
    status: "active",
  },
  {
    id: "st-3",
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    counselling_authority: "Directorate of Medical Education and Training (DGME UP)",
    official_website: "https://upneet.gov.in",
    registration_link: "https://upneet.gov.in/registration",
    eligibility: "Qualified NEET 2026. UP Domicile required for Govt medical seats. Open to all state candidates for Private Medical colleges.",
    counselling_process: "Online Registration -> Document Verification at Nodal Center -> State Merit List -> Choice Filling -> Allotment -> Admission.",
    fees_info: "Registration Fee: ₹2,000. Security Deposit: ₹30,000 (Govt), ₹2,00,000 (Private Govt seats), ₹1,00,000 (Private Dental).",
    documents_required: "NEET Scorecard, Class 10 & 12 Certificate, UP Domicile Certificate, Caste Certificate, Security Deposit Payment Receipt.",
    status: "active",
  },
  {
    id: "st-4",
    name: "Maharashtra",
    slug: "maharashtra",
    counselling_authority: "State Common Entrance Test Cell (CET Cell), Maharashtra",
    official_website: "https://cetcell.mahacet.org",
    registration_link: "https://cetcell.mahacet.org/neet-ug-2026",
    eligibility: "Maharashtra Domicile and passed Class 10 & 12 from Maharashtra (with exceptions as per state rulebook).",
    counselling_process: "Online Registration -> Publication of Provisional State Merit List -> Choice Filling (CAP Rounds 1, 2, 3) -> Allotment.",
    fees_info: "Registration Fee: ₹1,000. Institutional quota fees as per Fee Regulating Authority (FRA).",
    documents_required: "CET Cell Registration Slip, NEET Rank Card, Class 10 & 12 Marksheets, Domicile Certificate, Category & Validity Certificate.",
    status: "active",
  },
  {
    id: "st-5",
    name: "Karnataka",
    slug: "karnataka",
    counselling_authority: "Karnataka Examinations Authority (KEA)",
    official_website: "https://cetonline.karnataka.gov.in/kea/",
    registration_link: "https://cetonline.karnataka.gov.in/kea/neet2026",
    eligibility: "Karnataka Domicile for Govt seats. Open seats in Private Colleges available for All India candidates.",
    counselling_process: "Registration -> Document Verification (Offline/Online) -> Verification Slip Generation -> Option Entry -> Mock Allotment -> Real Allotment.",
    fees_info: "Registration Fee: ₹500 (SC/ST), ₹1,000 (Gen/OBC), ₹2,000 (NRI/Foreign). Govt seat fee approx ₹1.4 Lakh/yr, Pvt seat ₹10 Lakh/yr.",
    documents_required: "KEA Verification Slip, NEET Score Card, SSLC & 2nd PUC Marks Card, Study Certificate (7 years in KA), Caste/Income Certificate.",
    status: "active",
  },
  {
    id: "st-6",
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    counselling_authority: "Selection Committee, Directorate of Medical Education (DME TN)",
    official_website: "https://tnmedicalselection.net",
    registration_link: "https://tnmedicalselection.net/apply",
    eligibility: "Tamil Nadu Native candidates. 7.5% preferential quota for TN Govt School students.",
    counselling_process: "Separate Application for Govt Quota and Management Quota -> State Merit List -> Online Choice Filling -> Allotment.",
    fees_info: "Application Fee: ₹500. Security Deposit: Exempted for Govt, ₹1,00,000 for Management Quota.",
    documents_required: "NEET UG Scorecard, Class 10, 11 & 12 Marksheet, Nativity Certificate, Community Certificate, Transfer Certificate.",
    status: "active",
  },
  {
    id: "st-7",
    name: "Kerala",
    slug: "kerala",
    counselling_authority: "Commissioner for Entrance Examinations (CEE Kerala)",
    official_website: "https://cee.kerala.gov.in",
    registration_link: "https://cee.kerala.gov.in/keam2026",
    eligibility: "Keralite category for Govt/Self-Financing seats. Non-Keralite 1 (NK1) and NK2 eligible as per guidelines.",
    counselling_process: "KEAM Registration -> Submission of NEET Scores -> State Rank List -> Option Confirmation -> Allotment -> Fee Payment.",
    fees_info: "Application Fee: ₹500. Annual tuition fee: Govt ~₹25,000/yr, Self-Financing ~₹7 Lakh - ₹8 Lakh/yr.",
    documents_required: "KEAM Data Sheet, NEET Scorecard, Class 10 & 12 Certificates, Nativity Certificate, Caste/Community Certificate.",
    status: "active",
  },
  {
    id: "st-8",
    name: "West Bengal",
    slug: "west-bengal",
    counselling_authority: "West Bengal Main Computerised Counselling (WBMCC)",
    official_website: "https://wbmcc.nic.in",
    registration_link: "https://wbmcc.nic.in/registration",
    eligibility: "WB Domicile (proforma a1/a2/b) for Govt seats & State Quota Pvt seats. Management seats open to all.",
    counselling_process: "Online Registration & Fee Payment -> Physical Document Verification at allotted centers -> Choice Filling -> Seat Allotment.",
    fees_info: "Registration Fee: ₹2,000. Security Deposit: ₹10,000 (Govt), ₹1,00,000 (Private).",
    documents_required: "WBMCC Acknowledgement Slip, NEET Rank Card, Class 10 & 12 Marksheet, WB Domicile Proforma, Caste Certificate.",
    status: "active",
  },
  {
    id: "st-9",
    name: "Punjab",
    slug: "punjab",
    counselling_authority: "Baba Farid University of Health Sciences (BFUHS), Faridkot",
    official_website: "https://bfuhs.ac.in",
    registration_link: "https://bfuhs.ac.in/neetug2026",
    eligibility: "Punjab Domicile candidates for State Quota seats in Govt and Private Colleges.",
    counselling_process: "Online Registration -> Document Verification -> State Rank List -> Online Preference Filling -> Allotment.",
    fees_info: "Registration Fee: ₹5,900 (incl. GST). Tuition fees set by BFUHS as per Govt notification.",
    documents_required: "NEET Admit Card & Score Card, Matric & 10+2 Certificate, Punjab Domicile Certificate, Caste Certificate.",
    status: "active",
  },
  {
    id: "st-10",
    name: "Gujarat",
    slug: "gujarat",
    counselling_authority: "Admission Committee for Professional Undergraduate Medical Educational Courses (ACPUGMEC)",
    official_website: "https://medadmgujarat.org",
    registration_link: "https://medadmgujarat.org/ug/home.aspx",
    eligibility: "Passed 10th & 12th from Gujarat school and Gujarat Domicile.",
    counselling_process: "PIN Purchase from AXIS Bank -> Online Registration -> Document Verification at Help Center -> Choice Filling -> Allotment.",
    fees_info: "PIN Fee: ₹1,000 + Security Deposit: ₹10,000.",
    documents_required: "PIN slip, NEET Marksheet, Standard 10 & 12 Marksheets, School Leaving Certificate, Domicile Certificate, Caste Certificate.",
    status: "active",
  },
  {
    id: "st-11",
    name: "Haryana",
    slug: "haryana",
    counselling_authority: "Pandit Bhagwat Dayal Sharma University of Health Sciences, Rohtak",
    official_website: "https://uhsr.ac.in",
    registration_link: "https://hry.onlinecounseling.co.in",
    eligibility: "Haryana Resident / Domicile for 85% State Quota seats.",
    counselling_process: "Online Registration -> Document Verification -> Online Choice Filling -> Seat Allotment -> Joining.",
    fees_info: "Registration Fee: ₹4,000 (Gen), ₹1,000 (Reserved). Annual bond fee as per Haryana Medical Policy.",
    documents_required: "NEET Scorecard, Class 10 & 12 Certificates, Resident Certificate of Haryana, Caste & EWS Certificate.",
    status: "active",
  },
  {
    id: "st-12",
    name: "Bihar",
    slug: "bihar",
    counselling_authority: "Bihar Combined Entrance Competitive Examination Board (BCECEB)",
    official_website: "https://bceceboard.bihar.gov.in",
    registration_link: "https://bceceboard.bihar.gov.in/UGMAC",
    eligibility: "Bihar Domicile candidates for State Quota Govt & Private MBBS seats.",
    counselling_process: "Online Registration (UGMAC) -> Rank Card Download -> Choice Filling -> Allotment -> Offline Reporting.",
    fees_info: "Registration Fee: ₹1,200 (Gen/OBC), ₹600 (SC/ST).",
    documents_required: "UGMAC Registration Form Part A & B, NEET Scorecard, Class 10/12 Passing Certificate, Residential Certificate.",
    status: "active",
  }
];

export const INITIAL_DATES: ImportantDateItem[] = [
  {
    id: "dt-1",
    event_name: "MCC NEET UG Round 1 Choice Filling & Locking",
    authority: "Medical Counselling Committee (MCC)",
    start_date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
    description: "Online Choice Filling and Locking for 15% AIQ, Central & Deemed Universities.",
    official_link: "https://mcc.nic.in",
  },
  {
    id: "dt-2",
    event_name: "Rajasthan Round 1 Registration Window",
    authority: "NEET UG Board Rajasthan",
    state_slug: "rajasthan",
    start_date: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    description: "Online Registration and fee payment for Rajasthan State Medical Counselling.",
    official_link: "https://rajugmedical2026.com",
  },
  {
    id: "dt-3",
    event_name: "UP NEET UG Merit List Announcement",
    authority: "DGME UP",
    state_slug: "uttar-pradesh",
    start_date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    description: "Publication of State Merit List of registered candidates for UP Counselling.",
    official_link: "https://upneet.gov.in",
  },
  {
    id: "dt-4",
    event_name: "Maharashtra CET Cell Registration Deadline",
    authority: "CET Cell MH",
    state_slug: "maharashtra",
    start_date: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 1 * 24 * 3600 * 1000).toISOString(),
    description: "Last date to submit online application form and upload documents on CET Cell portal.",
    official_link: "https://cetcell.mahacet.org",
  },
  {
    id: "dt-5",
    event_name: "KEA Karnataka Option Entry Round 1",
    authority: "KEA",
    state_slug: "karnataka",
    start_date: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
    description: "First round Option Entry for verified candidates in Karnataka Medical colleges.",
    official_link: "https://cetonline.karnataka.gov.in/kea/",
  },
  {
    id: "dt-6",
    event_name: "MCC Round 1 Seat Allotment Result",
    authority: "Medical Counselling Committee (MCC)",
    start_date: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    end_date: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    description: "Publication of Round 1 provisional and final seat allotment list.",
    official_link: "https://mcc.nic.in",
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    title: "NEET UG 2026 MCC Information Bulletin",
    description: "Complete official brochure for 15% All India Quota, Deemed, Central Universities counselling.",
    category: "MCC",
    pdf_url: "/docs/mcc-information-bulletin-2026.pdf",
    file_size: "4.2 MB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "doc-2",
    title: "Rajasthan State Counselling Guidelines 2026",
    description: "Official state prospectus and rulebook for Rajasthan MBBS/BDS admissions.",
    category: "State Counselling",
    pdf_url: "/docs/rajasthan-counselling-rules-2026.pdf",
    file_size: "2.8 MB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "doc-3",
    title: "Proforma for OBC-NCL Certificate (Central Format)",
    description: "Prescribed format for OBC Non-Creamy Layer certificate required for AIQ & Central Seats.",
    category: "Category",
    pdf_url: "/docs/obc-ncl-central-format.pdf",
    file_size: "450 KB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "doc-4",
    title: "Standard Domicile Proforma Guidelines",
    description: "List of valid domicile proof documents required for State Quota seats across Indian states.",
    category: "Domicile",
    pdf_url: "/docs/domicile-certificate-guidelines.pdf",
    file_size: "620 KB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "doc-5",
    title: "NRI Sponsorship Certificate Format",
    description: "Format of undertaking and court affidavit for candidates applying under NRI quota.",
    category: "NRI",
    pdf_url: "/docs/nri-sponsorship-undertaking.pdf",
    file_size: "380 KB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "doc-6",
    title: "General Verification Checklist for Medical Admission",
    description: "Master document checklist required during physical reporting at all medical colleges.",
    category: "General",
    pdf_url: "/docs/admission-document-checklist.pdf",
    file_size: "510 KB",
    uploaded_at: new Date().toISOString(),
  }
];

export const INITIAL_COLLEGES: CollegeItem[] = [
  {
    id: "col-1",
    name: "Sawai Man Singh (SMS) Medical College",
    slug: "sms-medical-college-jaipur",
    state_slug: "rajasthan",
    city: "Jaipur",
    is_govt: true,
    university: "Rajasthan University of Health Sciences (RUHS)",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹53,500 / year",
    hostel_available: true,
    stipend_amount: "₹17,000 / month",
    bond_details: "2 Years Service Bond or ₹5 Lakh Penalty",
    counselling_authority: "Rajasthan NEET UG Board / MCC",
    website_url: "https://education.rajasthan.gov.in/smsmcjaipur",
  },
  {
    id: "col-2",
    name: "Maulana Azad Medical College (MAMC)",
    slug: "maulana-azad-medical-college-delhi",
    state_slug: "delhi",
    city: "New Delhi",
    is_govt: true,
    university: "University of Delhi",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹4,445 / year",
    hostel_available: true,
    stipend_amount: "₹26,000 / month",
    bond_details: "1 Year Service Bond or ₹3 Lakh Penalty",
    counselling_authority: "MCC (Delhi University 85% + 15% AIQ)",
    website_url: "https://mamc.ac.in",
  },
  {
    id: "col-3",
    name: "King George's Medical University (KGMU)",
    slug: "king-georges-medical-university-lucknow",
    state_slug: "uttar-pradesh",
    city: "Lucknow",
    is_govt: true,
    university: "KGMU Autonomous",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹54,600 / year",
    hostel_available: true,
    stipend_amount: "₹18,000 / month",
    bond_details: "2 Years Service Bond or ₹10 Lakh Penalty",
    counselling_authority: "DGME UP / MCC",
    website_url: "https://kgmu.org",
  },
  {
    id: "col-4",
    name: "Grant Medical College & Sir JJ Group of Hospitals",
    slug: "grant-medical-college-mumbai",
    state_slug: "maharashtra",
    city: "Mumbai",
    is_govt: true,
    university: "Maharashtra University of Health Sciences (MUHS)",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹1,14,000 / year",
    hostel_available: true,
    stipend_amount: "₹18,000 / month",
    bond_details: "1 Year Service Bond or ₹10 Lakh Penalty",
    counselling_authority: "MH CET Cell / MCC",
    website_url: "https://gmcjjh.org",
  },
  {
    id: "col-5",
    name: "Bangalore Medical College and Research Institute (BMCRI)",
    slug: "bangalore-medical-college-bangalore",
    state_slug: "karnataka",
    city: "Bengaluru",
    is_govt: true,
    university: "Rajiv Gandhi University of Health Sciences (RGUHS)",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹70,000 / year",
    hostel_available: true,
    stipend_amount: "₹30,000 / month",
    bond_details: "1 Year Rural Service Bond",
    counselling_authority: "KEA / MCC",
    website_url: "https://bmcri.edu.in",
  },
  {
    id: "col-6",
    name: "Madras Medical College",
    slug: "madras-medical-college-chennai",
    state_slug: "tamil-nadu",
    city: "Chennai",
    is_govt: true,
    university: "The Tamil Nadu Dr. M.G.R. Medical University",
    nmc_status: "Recognized",
    mbbs_seats: 250,
    fees_annual: "₹18,073 / year",
    hostel_available: true,
    stipend_amount: "₹25,000 / month",
    bond_details: "5 Years Service Bond or ₹5 Lakh Penalty",
    counselling_authority: "TN Selection Committee / MCC",
    website_url: "https://mmc.ac.in",
  }
];

export const INITIAL_CUTOFFS: CutoffItem[] = [
  {
    id: "cut-1",
    college_id: "col-1",
    college_name: "Sawai Man Singh (SMS) Medical College",
    year: 2025,
    state_slug: "rajasthan",
    category: "General",
    quota: "AIQ",
    round: "Round 1",
    opening_rank: 120,
    closing_rank: 1150,
  },
  {
    id: "cut-2",
    college_id: "col-1",
    college_name: "Sawai Man Singh (SMS) Medical College",
    year: 2025,
    state_slug: "rajasthan",
    category: "OBC",
    quota: "AIQ",
    round: "Round 1",
    opening_rank: 450,
    closing_rank: 1820,
  },
  {
    id: "cut-3",
    college_id: "col-2",
    college_name: "Maulana Azad Medical College (MAMC)",
    year: 2025,
    state_slug: "delhi",
    category: "General",
    quota: "AIQ",
    round: "Round 1",
    opening_rank: 1,
    closing_rank: 85,
  },
  {
    id: "cut-4",
    college_id: "col-3",
    college_name: "King George's Medical University (KGMU)",
    year: 2025,
    state_slug: "uttar-pradesh",
    category: "General",
    quota: "State Quota",
    round: "Round 1",
    opening_rank: 50,
    closing_rank: 650,
  },
  {
    id: "cut-5",
    college_id: "col-4",
    college_name: "Grant Medical College & Sir JJ Group of Hospitals",
    year: 2025,
    state_slug: "maharashtra",
    category: "General",
    quota: "State Quota",
    round: "Round 1",
    opening_rank: 300,
    closing_rank: 2450,
  },
  {
    id: "cut-6",
    college_id: "col-5",
    college_name: "Bangalore Medical College and Research Institute (BMCRI)",
    year: 2025,
    state_slug: "karnataka",
    category: "General",
    quota: "State Quota",
    round: "Round 1",
    opening_rank: 210,
    closing_rank: 1980,
  }
];

export const INITIAL_SEAT_MATRIX: SeatMatrixItem[] = [
  {
    id: "sm-1",
    college_id: "col-1",
    college_name: "Sawai Man Singh (SMS) Medical College",
    state_slug: "rajasthan",
    course: "MBBS",
    category: "General",
    quota: "AIQ",
    round: "Round 1",
    available_seats: 37,
  },
  {
    id: "sm-2",
    college_id: "col-1",
    college_name: "Sawai Man Singh (SMS) Medical College",
    state_slug: "rajasthan",
    course: "MBBS",
    category: "OBC",
    quota: "AIQ",
    round: "Round 1",
    available_seats: 25,
  },
  {
    id: "sm-3",
    college_id: "col-2",
    college_name: "Maulana Azad Medical College (MAMC)",
    state_slug: "delhi",
    course: "MBBS",
    category: "General",
    quota: "AIQ",
    round: "Round 1",
    available_seats: 38,
  },
  {
    id: "sm-4",
    college_id: "col-3",
    college_name: "King George's Medical University (KGMU)",
    state_slug: "uttar-pradesh",
    course: "MBBS",
    category: "General",
    quota: "State Quota",
    round: "Round 1",
    available_seats: 170,
  }
];

export const INITIAL_MCC_INFO: MccSection[] = [
  {
    id: "mcc-1",
    section_key: "overview",
    title: "MCC NEET UG Counselling Overview",
    content: "The Medical Counselling Committee (MCC) under Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare, Govt. of India conducts online counselling for 15% All India Quota (AIQ), 100% Deemed Universities, Central Universities (DU, AMU, BHU), ESIC Medical Colleges, and AFMC Pune.",
    updated_at: new Date().toISOString(),
  },
  {
    id: "mcc-2",
    section_key: "eligibility",
    title: "Who Can Participate in MCC Counselling",
    content: "1. Candidates who have qualified NEET UG 2026 by securing the minimum cut-off percentile.\n2. Indian Nationals, NRIs, OCIs, PIOs, and Foreign Nationals (as per Supreme Court guidelines).\n3. For Deemed Universities, all NEET qualified candidates are eligible irrespective of state domicile.",
    updated_at: new Date().toISOString(),
  },
  {
    id: "mcc-3",
    section_key: "process",
    title: "Complete MCC Counselling Process",
    content: "Step 1: Online Registration & Payment of Counselling Fee + Security Deposit.\nStep 2: Choice Filling and Choice Locking.\nStep 3: Processing of Seat Allotment by MCC.\nStep 4: Publication of Seat Allotment Result.\nStep 5: Physical Reporting & Original Document Verification at allotted College.",
    updated_at: new Date().toISOString(),
  }
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: "cnt-1",
    name: "Ramesh Sharma",
    email: "ramesh.sharma@example.com",
    phone: "+91 98765 43210",
    message: "Kindly clarify if Rajasthan Domicile Certificate format proforma A is required for private medical college management quota.",
    status: "new",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "cnt-2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 99887 76655",
    message: "What is the expected security deposit refund timeline for MCC Round 1 if I join the college allotted in State Round 1?",
    status: "in_progress",
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  }
];

export const INITIAL_LOGS: AdminLog[] = [
  {
    id: "log-1",
    admin_email: "admin@neetugcounselling.in",
    action: "Published Update",
    content_type: "Update",
    content_id: "upd-1",
    details: "Published update 'MCC Round 1 Registration Started for NEET UG 2026' and set as Breaking News.",
    created_at: new Date().toISOString(),
  },
  {
    id: "log-2",
    admin_email: "admin@neetugcounselling.in",
    action: "System Initialization",
    content_type: "System",
    details: "NEET UG Counselling Portal initialized with default state and college records.",
    created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
  }
];

export const INITIAL_MEDIA: MediaFile[] = [
  {
    id: "med-1",
    name: "mcc-information-bulletin-2026.pdf",
    url: "/docs/mcc-information-bulletin-2026.pdf",
    type: "application/pdf",
    size: "4.2 MB",
    uploaded_at: new Date().toISOString(),
  },
  {
    id: "med-2",
    name: "rajasthan-counselling-rules-2026.pdf",
    url: "/docs/rajasthan-counselling-rules-2026.pdf",
    type: "application/pdf",
    size: "2.8 MB",
    uploaded_at: new Date().toISOString(),
  }
];

// In-Memory Data Store & Listener Engine for Client Components
class DataStore {
  updates: UpdateItem[] = [...INITIAL_UPDATES];
  states: StateItem[] = [...INITIAL_STATES];
  dates: ImportantDateItem[] = [...INITIAL_DATES];
  documents: DocumentItem[] = [...INITIAL_DOCUMENTS];
  colleges: CollegeItem[] = [...INITIAL_COLLEGES];
  cutoffs: CutoffItem[] = [...INITIAL_CUTOFFS];
  seatMatrix: SeatMatrixItem[] = [...INITIAL_SEAT_MATRIX];
  mccInfo: MccSection[] = [...INITIAL_MCC_INFO];
  contacts: ContactMessage[] = [...INITIAL_CONTACTS];
  logs: AdminLog[] = [...INITIAL_LOGS];
  media: MediaFile[] = [...INITIAL_MEDIA];

  listeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
    if (typeof window !== "undefined") {
      window.addEventListener("storage", () => {
        this.loadFromStorage();
        this.listeners.forEach((l) => l());
      });
      window.addEventListener("neet_store_updated", () => {
        this.loadFromStorage();
        this.listeners.forEach((l) => l());
      });
    }
  }

  loadFromStorage() {
    if (typeof window !== "undefined") {
      try {
        const savedUpdates = localStorage.getItem("neet_updates");
        if (savedUpdates) this.updates = JSON.parse(savedUpdates);

        const savedStates = localStorage.getItem("neet_states");
        if (savedStates) this.states = JSON.parse(savedStates);

        const savedColleges = localStorage.getItem("neet_colleges");
        if (savedColleges) this.colleges = JSON.parse(savedColleges);

        const savedDates = localStorage.getItem("neet_dates");
        if (savedDates) this.dates = JSON.parse(savedDates);

        const savedCutoffs = localStorage.getItem("neet_cutoffs");
        if (savedCutoffs) this.cutoffs = JSON.parse(savedCutoffs);

        const savedSeats = localStorage.getItem("neet_seat_matrix");
        if (savedSeats) this.seatMatrix = JSON.parse(savedSeats);

        const savedContacts = localStorage.getItem("neet_contacts");
        if (savedContacts) this.contacts = JSON.parse(savedContacts);
      } catch (e) {
        console.error("Failed to load from localStorage", e);
      }
    }
  }

  saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("neet_updates", JSON.stringify(this.updates));
        localStorage.setItem("neet_states", JSON.stringify(this.states));
        localStorage.setItem("neet_colleges", JSON.stringify(this.colleges));
        localStorage.setItem("neet_dates", JSON.stringify(this.dates));
        localStorage.setItem("neet_cutoffs", JSON.stringify(this.cutoffs));
        localStorage.setItem("neet_seat_matrix", JSON.stringify(this.seatMatrix));
        localStorage.setItem("neet_contacts", JSON.stringify(this.contacts));
        window.dispatchEvent(new Event("neet_store_updated"));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }
    }
  }

  subscribe(listener: () => void) {
    this.loadFromStorage();
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.saveToStorage();
    this.listeners.forEach((l) => l());
  }

  // Updates CRUD
  addUpdate(item: Omit<UpdateItem, "id" | "created_at">) {
    const newUpdate: UpdateItem = {
      ...item,
      id: "upd-" + Date.now(),
      created_at: new Date().toISOString(),
    };
    this.updates.unshift(newUpdate);
    this.addLog("Created Update", "Update", newUpdate.id, `Created update: "${newUpdate.title}"`);
    this.notify();
    return newUpdate;
  }

  editUpdate(id: string, updates: Partial<UpdateItem>) {
    const idx = this.updates.findIndex((u) => u.id === id);
    if (idx !== -1) {
      this.updates[idx] = { ...this.updates[idx], ...updates };
      this.addLog("Edited Update", "Update", id, `Updated fields for "${this.updates[idx].title}"`);
      this.notify();
    }
  }

  deleteUpdate(id: string) {
    const item = this.updates.find((u) => u.id === id);
    this.updates = this.updates.filter((u) => u.id !== id);
    if (item) {
      this.addLog("Deleted Update", "Update", id, `Deleted update: "${item.title}"`);
    }
    this.notify();
  }

  toggleBreaking(id: string) {
    const item = this.updates.find((u) => u.id === id);
    if (item) {
      item.is_breaking = !item.is_breaking;
      this.addLog("Toggled Breaking News", "Update", id, `Set breaking to ${item.is_breaking} for "${item.title}"`);
      this.notify();
    }
  }

  togglePinned(id: string) {
    const item = this.updates.find((u) => u.id === id);
    if (item) {
      item.is_pinned = !item.is_pinned;
      this.addLog("Toggled Pinned Status", "Update", id, `Set pinned to ${item.is_pinned} for "${item.title}"`);
      this.notify();
    }
  }

  // States CRUD
  addState(state: Omit<StateItem, "id">) {
    const newState: StateItem = { ...state, id: "st-" + Date.now() };
    this.states.push(newState);
    this.addLog("Added State", "State", newState.id, `Added state: ${newState.name}`);
    this.notify();
    return newState;
  }

  editState(id: string, updates: Partial<StateItem>) {
    const idx = this.states.findIndex((s) => s.id === id);
    if (idx !== -1) {
      this.states[idx] = { ...this.states[idx], ...updates };
      this.addLog("Edited State", "State", id, `Updated state details for ${this.states[idx].name}`);
      this.notify();
    }
  }

  deleteState(id: string) {
    this.states = this.states.filter((s) => s.id !== id);
    this.notify();
  }

  // Dates CRUD
  addDate(date: Omit<ImportantDateItem, "id">) {
    const newDate: ImportantDateItem = { ...date, id: "dt-" + Date.now() };
    this.dates.push(newDate);
    this.addLog("Added Important Date", "Important Date", newDate.id, `Added date event: ${newDate.event_name}`);
    this.notify();
    return newDate;
  }

  editDate(id: string, updates: Partial<ImportantDateItem>) {
    const idx = this.dates.findIndex((d) => d.id === id);
    if (idx !== -1) {
      this.dates[idx] = { ...this.dates[idx], ...updates };
      this.notify();
    }
  }

  deleteDate(id: string) {
    this.dates = this.dates.filter((d) => d.id !== id);
    this.notify();
  }

  // Document CRUD
  addDocument(doc: Omit<DocumentItem, "id" | "uploaded_at">) {
    const newDoc: DocumentItem = {
      ...doc,
      id: "doc-" + Date.now(),
      uploaded_at: new Date().toISOString(),
    };
    this.documents.unshift(newDoc);
    this.addLog("Uploaded Document", "Document", newDoc.id, `Uploaded document: ${newDoc.title}`);
    this.notify();
    return newDoc;
  }

  deleteDocument(id: string) {
    this.documents = this.documents.filter((d) => d.id !== id);
    this.notify();
  }

  // College CRUD
  addCollege(col: Omit<CollegeItem, "id">) {
    const newCollege: CollegeItem = { ...col, id: "col-" + Date.now() };
    this.colleges.push(newCollege);
    this.addLog("Added College", "College", newCollege.id, `Added college: ${newCollege.name}`);
    this.notify();
    return newCollege;
  }

  editCollege(id: string, updates: Partial<CollegeItem>) {
    const idx = this.colleges.findIndex((c) => c.id === id);
    if (idx !== -1) {
      this.colleges[idx] = { ...this.colleges[idx], ...updates };
      this.notify();
    }
  }

  deleteCollege(id: string) {
    this.colleges = this.colleges.filter((c) => c.id !== id);
    this.notify();
  }

  // Cutoffs Import & CRUD
  addCutoff(cutoff: Omit<CutoffItem, "id">) {
    const item: CutoffItem = { ...cutoff, id: "cut-" + Date.now() };
    this.cutoffs.unshift(item);
    this.notify();
    return item;
  }

  importCutoffs(items: Omit<CutoffItem, "id">[]) {
    const newItems = items.map((i, idx) => ({ ...i, id: `cut-${Date.now()}-${idx}` }));
    this.cutoffs = [...newItems, ...this.cutoffs];
    this.addLog("Imported Cutoffs", "Cutoff", undefined, `Imported ${items.length} cutoff records via CSV.`);
    this.notify();
  }

  deleteCutoff(id: string) {
    this.cutoffs = this.cutoffs.filter((c) => c.id !== id);
    this.notify();
  }

  // Seat Matrix Import & CRUD
  addSeatMatrix(sm: Omit<SeatMatrixItem, "id">) {
    const item: SeatMatrixItem = { ...sm, id: "sm-" + Date.now() };
    this.seatMatrix.unshift(item);
    this.notify();
    return item;
  }

  importSeatMatrix(items: Omit<SeatMatrixItem, "id">[]) {
    const newItems = items.map((i, idx) => ({ ...i, id: `sm-${Date.now()}-${idx}` }));
    this.seatMatrix = [...newItems, ...this.seatMatrix];
    this.addLog("Imported Seat Matrix", "Seat Matrix", undefined, `Imported ${items.length} seat matrix records via CSV.`);
    this.notify();
  }

  deleteSeatMatrix(id: string) {
    this.seatMatrix = this.seatMatrix.filter((s) => s.id !== id);
    this.notify();
  }

  // Contacts
  addContact(msg: Omit<ContactMessage, "id" | "status" | "created_at">) {
    const newMsg: ContactMessage = {
      ...msg,
      id: "cnt-" + Date.now(),
      status: "new",
      created_at: new Date().toISOString(),
    };
    this.contacts.unshift(newMsg);
    this.notify();
    return newMsg;
  }

  updateContactStatus(id: string, status: ContactMessage["status"]) {
    const item = this.contacts.find((c) => c.id === id);
    if (item) {
      item.status = status;
      this.notify();
    }
  }

  // Logs
  addLog(action: string, content_type?: string, content_id?: string, details?: string) {
    this.logs.unshift({
      id: "log-" + Date.now(),
      admin_email: "admin@neetugcounselling.in",
      action,
      content_type,
      content_id,
      details,
      created_at: new Date().toISOString(),
    });
  }
}

export const store = new DataStore();
