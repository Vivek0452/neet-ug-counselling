# NEET UG Counselling Information Portal & CMS 2026

![Next.js](https://img.shields.io/badge/Next.js-14.2-2563EB?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

A fast, mobile-friendly, trustworthy **NEET UG Counselling Information Portal** built for students and parents across India, accompanied by a powerful non-technical **Admin CMS Panel** for daily updates, real-time breaking news, college directories, and cutoff/seat matrix bulk CSV imports.

---

## 🌟 Key Features

### 🏛️ Public Portal
* **Real-Time Live Updates**: Subscribed notice feed with instant breaking news marquee ticker without requiring manual page refresh.
* **Instant Global Search**: Unified search across notices, authorities, states, medical colleges, cutoffs, and documents.
* **MCC Counselling Guide (`/mcc-counselling`)**: Visual guide for 15% All India Quota, Central Universities, and Deemed Institutions with registration process, fee structure, and FAQs.
* **State Wise Portals (`/state-counselling`, `/state-counselling/[slug]`)**: 28+ state portals detailing official registration links, eligibility rules, admission steps, fees, required documents, and state notices.
* **Medical Colleges Directory (`/colleges`, `/colleges/[slug]`)**: Searchable directory by Govt/Private, State, and City with MBBS seats, fees, hostel availability, stipend, and service bond details.
* **Cutoff & Seat Matrix Analysis (`/cutoff`, `/seat-matrix`)**: Multi-filter search tools by Year, State, Quota, Category (General, OBC, SC, ST, EWS), and Round.
* **Important Dates Timeline (`/important-dates`)**: Auto-calculated event status (*Upcoming*, *Ongoing*, *Completed*).
* **Official Downloads (`/documents`)**: Categorized PDF proformas (OBC-NCL central format, EWS, Domicile rules, and verification checklists).
* **Student Helpdesk (`/contact`)**: Contact form with confirmation and direct CMS routing.

### 🛡️ Admin CMS Panel (`/admin/*`)
* **Dashboard Analytics**: Metrics for Published, Draft, and Scheduled updates, state portals, colleges, cutoffs, seat matrix records, and contact enquiries.
* **Updates CMS**: Full CRUD, Draft/Publish/Schedule toggle, Pinned toggle, Breaking News switch, and PDF upload handler.
* **Bulk CSV Importer**: Reusable CSV file importer for Cutoffs and Seat Matrix records with automatic column parsing and preview before commit.
* **State & MCC CMS**: Manage authority links, eligibility rules, fees, and state guidelines without touching code.
* **Enquiry Manager & Export**: Manage student queries (*New*, *In Progress*, *Resolved*) and export submissions to CSV.
* **Admin Audit Trail**: Logs admin actions including publishes, edits, deletes, and configuration updates.
* **SEO Settings**: Global title tags, meta descriptions, canonical URLs, dynamic `sitemap.xml`, and `robots.txt`.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Vivek0452/neet-ug-counselling.git
cd neet-ug-counselling

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin CMS Access

* **URL**: `http://localhost:3000/admin/login`
* Enter your administrator credentials to access the CMS Dashboard.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

A complete production DDL schema script is available in `supabase_schema.sql`:

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard).
2. Copy and execute `supabase_schema.sql`.
3. Add environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

*(Note: The web application includes built-in fallback data so all features work immediately out-of-the-box!)*

---

## 🛠️ Build & Deployment

```bash
# Create production build
npm run build

# Start production server
npm start
```

Easily deployable to **Vercel**, **Netlify**, or any Node.js hosting platform.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
