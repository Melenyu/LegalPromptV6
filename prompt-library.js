/* ═══════════════════════════════════════════════════════════
   prompt-library.js — Static Prompt Libraries
   GDPR (10) + DOJ Data Security Program (10)
   Each entry: prompt text + expected output + chain links
═══════════════════════════════════════════════════════════ */

window.PROMPT_LIBRARIES = {

/* ══════════════════════════════════════════════════════════
   GDPR COMPLIANCE FRAMEWORK — 10 Prompts
══════════════════════════════════════════════════════════ */
gdpr: {
  id: 'gdpr',
  name: 'GDPR Compliance Framework',
  flag: '🇪🇺',
  description: 'Complete EU/UK GDPR implementation — from data mapping to breach response. Each prompt is production-ready for Claude Sonnet, GPT-4o, or Harvey.',
  color: '#4A7FBF',
  prompts: [

    {
      id: 'gdpr-01',
      num: '01',
      title: 'Data Mapping & Processing Inventory',
      type: 'chain-step-1',
      chainId: 'gdpr-chain-ropa',
      chainTitle: 'ROPA Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'gdpr-02',
      tags: ['Data Mapping', 'Art. 30', 'Foundation'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '8–12 min',
      description: 'Generates a structured data processing inventory across all business functions. First step in building a ROPA.',
      prompt: `You are a senior data protection counsel with 15+ years of GDPR implementation experience. You are conducting a comprehensive data processing inventory for a health technology company with 16+ million users operating across the EU, UK, and United States.

TASK: Conduct a structured data processing inventory by systematically analysing each business function listed below. For each function, identify and document all personal data processing activities.

BUSINESS FUNCTIONS TO ANALYSE:
1. User onboarding and account management
2. Health data collection (wearable sync, manual input, third-party integrations)
3. AI/algorithmic processing of health metrics
4. Marketing and communications (email, push notifications)
5. Customer support and complaint handling
6. Analytics and product improvement
7. Third-party vendor data sharing
8. HR and employee data
9. Payment processing
10. Legal and compliance record-keeping

FOR EACH PROCESSING ACTIVITY, DOCUMENT:
— Activity name and description
— Categories of personal data processed
— Whether special category data (Art. 9) is involved and which subcategory
— Categories of data subjects
— Purposes of processing
— Proposed legal basis under Art. 6 (and Art. 9 where applicable)
— Recipients / data recipients (internal and external)
— Whether data is transferred outside EEA (and to which countries)
— Retention period or criteria used to determine it
— High-level security measures

OUTPUT FORMAT:
Present as a structured table with the columns above. After the table, add a RISK FLAGS section identifying:
(a) Any processing activities where the legal basis is unclear or contestable
(b) Any special category data without an explicit Art. 9(2) basis
(c) Any transfers without identified transfer mechanism
(d) Any retention periods that appear disproportionate

CONSTRAINTS:
— Do not invent company-specific data; flag where information is needed from the client
— Note where explicit consent records vs. legitimate interest assessments will be required
— Flag any processing that may require a DPIA under Art. 35

This inventory will form the basis of the formal ROPA required under Art. 30 GDPR. Ensure completeness before proceeding to Step 2.`,
      expectedOutput: `## DATA PROCESSING INVENTORY — HealthTech Platform
*Prepared for GDPR Art. 30 ROPA — Draft v1.0*

---

### PROCESSING ACTIVITIES TABLE

| # | Activity | Personal Data Categories | Special Cat. (Art.9)? | Data Subjects | Purpose | Legal Basis | Recipients | EEA Transfer? | Retention |
|---|----------|-------------------------|----------------------|---------------|---------|-------------|------------|---------------|-----------|
| 1 | User Registration | Name, email, DOB, country, password hash | No | End users (consumers) | Account creation, identity verification | Art. 6(1)(b) — contract performance | Internal (Auth systems), AWS | US (AWS) — SCCs required | Duration of account + 30 days post-deletion |
| 2 | Health Metric Collection | Heart rate, HRV, sleep data, step count, biometric baselines | **Yes — Art. 9(1) health data** | App users | Core service delivery, personalised insights | Art. 9(2)(a) — explicit consent; Art. 6(1)(b) | Internal AI/ML pipeline, Apple HealthKit, Google Fit | US (AWS, Apple, Google) | Active subscription + 2 years |
| 3 | AI Health Scoring | Derived health scores, stress index, recovery metrics | **Yes — Art. 9(1) (derived health data)** | App users | Personalised recommendations | Art. 9(2)(a) — explicit consent; Art. 6(1)(f) LIA needed | Internal ML models only | No | Same as health data |
| 4 | Email Marketing | Name, email, engagement data, subscription preferences | No | Users (opted in) | Product updates, health tips, offers | Art. 6(1)(a) — consent (PECR/ePrivacy also applies) | Braze / SendGrid | US — SCCs required | Until unsubscribe + 3 years |
| 5 | Analytics & Product Improvement | Pseudonymised usage events, feature interaction, crash logs | No (if properly pseudonymised) | All users | Product analytics, A/B testing | Art. 6(1)(f) — legitimate interest (LIA required) | Amplitude, Mixpanel | US — SCCs required | 24 months rolling |

*[Table continues for all 10 functions...]*

---

### ⚠️ RISK FLAGS

**1. Contestable Legal Bases**
- Activity #3 (AI health scoring): Use of Art. 6(1)(f) legitimate interest alongside Art. 9(2)(a) consent creates tension — recommend consent as sole basis given sensitivity of derived health data
- Activity #5 (Analytics): Legitimate interest for health-adjacent behavioural data requires a documented LIA; flag for DPIA screening

**2. Special Category Data Without Clear Art. 9(2) Basis**
- Push notification content referencing health status (Activity #4): if personalised based on health scores, this is indirect health data disclosure — consent basis must extend to this

**3. Third-Country Transfers Without Confirmed Mechanism**
- Braze, SendGrid, Amplitude, Mixpanel: Standard Contractual Clauses (SCCs, 2021 version) + Transfer Impact Assessments required
- Apple/Google HealthKit integration: confirm data processing location and DPA status

**4. Disproportionate Retention**
- Health data retained 2 years post-subscription: review proportionality; consider tiered deletion (raw data deleted at subscription end, aggregated retained)

**→ PROCEED TO STEP 2: Convert this inventory into a formal Art. 30 ROPA document**`,
    },

    {
      id: 'gdpr-02',
      num: '02',
      title: 'Art. 30 ROPA — Formal Record of Processing',
      type: 'chain-step-2',
      chainId: 'gdpr-chain-ropa',
      chainTitle: 'ROPA Chain',
      chainStep: 'Step 2 of 2',
      prevPromptId: 'gdpr-01',
      tags: ['ROPA', 'Art. 30', 'Documentation'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '5–7 min',
      description: 'Converts the processing inventory into a formal Art. 30 ROPA with controller and processor sections.',
      prompt: `You are a data protection counsel. Using the processing inventory produced in Step 1 (provided below or in the previous conversation), draft a formal Record of Processing Activities (ROPA) as required under Article 30 GDPR.

ROPA REQUIREMENTS (Art. 30(1) — Controller):
The ROPA must contain, for each processing activity:
(a) Name and contact details of the controller and, where applicable, the joint controller and the DPO
(b) Purposes of the processing
(c) Description of categories of data subjects and personal data
(d) Categories of recipients, including recipients in third countries or international organisations
(e) Where applicable, transfers to third countries including documentation of appropriate safeguards
(f) Where possible, envisaged time limits for erasure
(g) Where possible, a general description of technical and organisational security measures (Art. 32)

ROPA REQUIREMENTS (Art. 30(2) — Processor section, if applicable):
Where the company acts as a processor for B2B clients, include a separate processor ROPA section.

FORMATTING REQUIREMENTS:
— Structure as a formal legal document with version control header (Version, Date, Owner, Next Review)
— Each processing activity as a numbered entry
— Flag any fields where information must be confirmed with the business before finalisation
— Include a DOCUMENT CONTROL section at the end
— Add a CHANGE LOG table for version tracking
— The ROPA must be immediately usable as a live compliance document

CONTROLLER DETAILS TO INSERT:
[Controller name: [TO BE CONFIRMED]]
[Registered address: [TO BE CONFIRMED]]
[DPO: [TO BE CONFIRMED — assess DPO obligation separately]]
[Lead supervisory authority: [TO BE CONFIRMED based on main establishment]]

Use the inventory from Step 1 as source data. Where the inventory identified risk flags, add a [REVIEW REQUIRED] annotation inline rather than omitting the field.`,
      expectedOutput: `# RECORD OF PROCESSING ACTIVITIES
## Controller: [COMPANY NAME] — GDPR Art. 30 Register

**Version:** 1.0 — DRAFT
**Date:** [DATE]
**Owner:** Chief Governance Officer / DPO
**Next Review:** [DATE + 12 months]
**Classification:** CONFIDENTIAL — Legal Privilege

---

## PART A — CONTROLLER DETAILS

| Field | Details |
|-------|---------|
| Controller name | [TO BE CONFIRMED] |
| Registered address | [TO BE CONFIRMED] |
| DPO name & contact | [REVIEW REQUIRED — see DPO assessment] |
| Lead supervisory authority | [TO BE CONFIRMED — determine main establishment under Art. 56] |
| Joint controllers | None identified at this time |

---

## PART B — PROCESSING ACTIVITIES REGISTER

### Entry 001: User Account Registration & Management

| ROPA Field | Detail |
|------------|--------|
| **Purpose** | Creation and management of user accounts; identity verification; service access control |
| **Legal basis** | Art. 6(1)(b) — necessary for performance of contract with the user |
| **Data subjects** | Consumers / app end users |
| **Personal data categories** | Full name, email address, date of birth, country of residence, encrypted password, account preferences |
| **Special category data** | None |
| **Recipients** | Internal: Engineering, Customer Support \| External: AWS (hosting), Auth0 / [identity provider — TO BE CONFIRMED] |
| **Third-country transfers** | United States — AWS and Auth0. Safeguard: Standard Contractual Clauses (EU Commission Implementing Decision 2021/914) + TIA on file |
| **Retention** | Duration of active account. Upon account deletion: 30 days for recovery, then permanent erasure except as required by law |
| **Security measures** | Encryption at rest (AES-256), encrypted transmission (TLS 1.3), MFA available, access controls, annual penetration testing |

---

### Entry 002: Health Data Collection & Processing

| ROPA Field | Detail |
|------------|--------|
| **Purpose** | Collection and processing of health metrics to deliver personalised wellness insights (core service) |
| **Legal basis** | Art. 6(1)(b) contract + **Art. 9(2)(a) explicit consent** for special category health data |
| **Data subjects** | App users who have granted health data permissions |
| **Personal data categories** | Heart rate, HRV, sleep stages, activity data, biometric baselines, wearable device data |
| **Special category data** | **YES — Health data (Art. 9(1))** |
| **Recipients** | Internal ML pipeline only. Third-party integrations (Apple HealthKit, Google Fit, Garmin): data originates from user device — [REVIEW REQUIRED: confirm whether platform acts as joint controller] |
| **Third-country transfers** | US (AWS processing) — SCCs + TIA required |
| **Retention** | Active subscription + 2 years. **[REVIEW REQUIRED: proportionality assessment recommended — consider raw data deletion at subscription end]** |
| **Security measures** | Encryption at rest and in transit, health data stored in isolated database partition, role-based access controls, DPA with AWS |

*[Entries 003–010 continue in same format...]*

---

## PART C — PROCESSOR ROPA
*[Complete if company acts as data processor for B2B clients]*

---

## DOCUMENT CONTROL

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [NAME] | Initial draft — 10 processing activities |

**Next mandatory review:** Annual or upon any material change to processing operations, new vendor onboarding, or regulatory guidance update.`,
    },

    {
      id: 'gdpr-03',
      num: '03',
      title: 'DPIA Screening & Necessity Assessment',
      type: 'chain-step-1',
      chainId: 'gdpr-chain-dpia',
      chainTitle: 'DPIA Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'gdpr-04',
      tags: ['DPIA', 'Art. 35', 'Risk Assessment'],
      model: 'Claude Opus 4',
      time: '6–9 min',
      description: 'Screens all processing activities against Art. 35 DPIA triggers and supervisory authority blacklists to determine which require a full DPIA.',
      prompt: `You are a data protection counsel specialising in privacy risk assessment under GDPR Art. 35. Conduct a DPIA necessity screening for the processing activities listed below.

LEGAL FRAMEWORK:
Art. 35(1) GDPR requires a DPIA where processing is "likely to result in a high risk to the rights and freedoms of natural persons." Art. 35(3) specifies mandatory cases. Supervisory authorities have published lists of processing operations requiring DPIAs (Art. 35(4)).

MANDATORY DPIA TRIGGERS (Art. 35(3)):
(a) Systematic and extensive profiling with significant effects
(b) Large-scale processing of special category data (Art. 9) or criminal conviction data (Art. 10)
(c) Systematic monitoring of a publicly accessible area

WP29/EDPB CRITERIA (any 2 of 9 triggers a DPIA requirement):
1. Evaluation or scoring (including profiling)
2. Automated decision-making with legal or similarly significant effects
3. Systematic monitoring
4. Sensitive data or data of a highly personal nature
5. Data processed on a large scale
6. Datasets that have been matched or combined
7. Data concerning vulnerable data subjects
8. Innovative use or application of new technological solutions
9. Processing that prevents data subjects from exercising a right or accessing a service

PROCESSING ACTIVITIES TO SCREEN:
1. AI health scoring algorithm — produces stress, recovery, and readiness scores from biometric data for 16M users
2. Personalised content recommendations based on health profile
3. Wearable device biometric data sync and storage
4. Email and push notification engagement tracking linked to health data
5. Third-party data sharing with HSA/FSA payment processors (health-linked financial data)
6. Employee health and wellness programme data (HR)
7. Analytics using pseudonymised user behaviour and health correlations
8. Automated subscription renewal decisions
9. SDK data collection for third-party integrations
10. Research partnerships using anonymised health datasets

FOR EACH ACTIVITY:
— List which DPIA triggers apply and why
— State: DPIA REQUIRED / DPIA RECOMMENDED / NO DPIA REQUIRED
— For required DPIAs, identify the specific high risks to address
— Recommend priority order for completing DPIAs

CONSTRAINTS:
Consider guidance from the ICO (UK), CNIL (France), and BfDI (Germany) where divergent from EDPB baseline. Flag any activity that may require prior consultation with supervisory authority under Art. 36.`,
      expectedOutput: `## DPIA NECESSITY SCREENING
*Art. 35 GDPR — HealthTech Platform — [DATE]*

---

### SCREENING RESULTS SUMMARY

| # | Processing Activity | Triggers Met | Decision | Priority |
|---|--------------------|----|---------|----------|
| 1 | AI health scoring algorithm | 1, 4, 5, 6, 8 (5 triggers) | **DPIA REQUIRED** | 🔴 Critical |
| 2 | Personalised health content recommendations | 1, 4, 5 (3 triggers) | **DPIA REQUIRED** | 🔴 High |
| 3 | Biometric wearable data sync | 4, 5, 8 (3 triggers) | **DPIA REQUIRED** | 🔴 High |
| 4 | Health-linked notification tracking | 1, 4, 5 (3 triggers) | **DPIA REQUIRED** | 🟡 Medium |
| 5 | HSA/FSA processor data sharing | 4, 5, 6, 9 (4 triggers) | **DPIA REQUIRED** | 🔴 Critical |
| 6 | Employee health programme | 4, 7, 9 (3 triggers) | **DPIA REQUIRED** | 🟡 Medium |
| 7 | Pseudonymised analytics | 1, 6 (2 triggers) | **DPIA RECOMMENDED** | 🟢 Low |
| 8 | Automated subscription decisions | 2 (1 trigger — monitor) | **No DPIA required** | — |
| 9 | SDK third-party data collection | 5, 6, 8 (3 triggers) | **DPIA REQUIRED** | 🟡 Medium |
| 10 | Research anonymised datasets | 0 (if truly anonymous) | **No DPIA required** | — |

---

### CRITICAL FINDINGS

**Activity #1 — AI Health Scoring: MANDATORY DPIA**
Meets Art. 35(3)(a): systematic and extensive automated profiling with significant effects on individuals' health management. Additionally meets 5 of 9 WP29 criteria. CNIL blacklist explicitly covers "algorithmic profiling of health status."
*Key risks to address in DPIA: discriminatory scoring, lack of explainability, consent validity for derived inferences, data minimisation.*

**Activity #5 — HSA/FSA Health-Financial Data Sharing: MANDATORY DPIA**
Combination of health data + financial data sent to third-party processor creates a novel high-risk data combination (triggers 4, 5, 6, 9). Potential for function creep by payment processor. Prior supervisory authority consultation (Art. 36) may be required if residual risk cannot be mitigated.

---

### RECOMMENDED DPIA SEQUENCE
1. AI health scoring algorithm (Art. 35(3)(a) mandatory)
2. HSA/FSA data sharing (Art. 36 prior consultation risk)
3. Wearable biometric data processing
4. Personalised content recommendations
5. SDK data collection

**→ PROCEED TO STEP 2: Full DPIA for AI Health Scoring Algorithm**`,
    },

    {
      id: 'gdpr-04',
      num: '04',
      title: 'Full DPIA — AI Health Scoring Algorithm',
      type: 'chain-step-2',
      chainId: 'gdpr-chain-dpia',
      chainTitle: 'DPIA Chain',
      chainStep: 'Step 2 of 2',
      prevPromptId: 'gdpr-03',
      tags: ['DPIA', 'AI', 'Art. 35', 'Health Data'],
      model: 'Claude Opus 4',
      time: '12–18 min',
      description: 'Full Art. 35 DPIA for AI/algorithmic processing of health data, including risk matrix and mitigation measures.',
      prompt: `You are a data protection counsel and privacy risk specialist. Conduct a full Data Protection Impact Assessment (DPIA) under Article 35 GDPR for an AI health scoring algorithm.

SYSTEM DESCRIPTION:
The processing system takes biometric data inputs (heart rate, HRV, sleep stages, activity levels, stress indicators) from 16+ million users and produces personalised health scores (stress score, recovery score, readiness index). Scores are used to generate personalised recommendations displayed in the mobile app. Data is processed on AWS infrastructure (US), with the ML model trained on aggregated historical user data.

DPIA STRUCTURE REQUIRED (following EDPB Guidelines 09/2022 and ICO DPIA template):

**SECTION 1 — DESCRIPTION OF PROCESSING**
1.1 Nature of processing
1.2 Scope and context
1.3 Purposes and necessity
1.4 Lawfulness assessment (legal basis + Art. 9 basis)

**SECTION 2 — NECESSITY AND PROPORTIONALITY**
2.1 Is the processing necessary and proportionate to the purpose?
2.2 Data minimisation assessment
2.3 Accuracy and quality of algorithmic outputs
2.4 Transparency obligations (Art. 13/14 — what must be disclosed about the algorithm?)
2.5 Art. 22 applicability (automated decision-making with significant effects)

**SECTION 3 — RISK IDENTIFICATION AND ASSESSMENT**
For each identified risk:
— Description of risk
— Likelihood (1–3: low/medium/high)
— Severity (1–3: low/medium/high)
— Risk score (Likelihood × Severity)
— Source of risk
Risks to assess: discriminatory inference, inaccurate health conclusions leading to harm, re-identification from pseudonymous data, unauthorised third-party access, consent invalidation, lock-in and data portability, model bias against demographic groups.

**SECTION 4 — MITIGATION MEASURES**
For each high or critical risk: specific technical and organisational measures, responsible owner, implementation timeline, residual risk after mitigation.

**SECTION 5 — CONSULTATION**
5.1 DPO opinion (if appointed)
5.2 Data subject consultation (if appropriate)
5.3 Whether Art. 36 prior consultation with SA is required

**SECTION 6 — SIGN-OFF AND REVIEW**
Decision: PROCEED / PROCEED WITH CONDITIONS / DO NOT PROCEED
Review schedule

CONSTRAINTS:
— Flag any finding that would constitute a high residual risk requiring Art. 36 prior consultation
— Note EDPB Opinion 02/2023 on AI and profiling
— Consider ICO Guidance on AI and data protection (2023)
— Be specific about technical mitigations (differential privacy, model explainability, audit trails)`,
      expectedOutput: `# DATA PROTECTION IMPACT ASSESSMENT
## AI Health Scoring Algorithm
*Art. 35 GDPR | Version 1.0 DRAFT | [DATE] | CONFIDENTIAL*

---

## SECTION 1 — DESCRIPTION OF PROCESSING

**1.1 Nature of processing**
Automated processing of special category health data (Art. 9(1)) using machine learning algorithms to generate derived health scores. Processing involves: (i) real-time biometric data ingestion, (ii) ML inference on user health state, (iii) generation of composite scores, (iv) personalised recommendation delivery. Processing is continuous during active usage.

**1.2 Scope and context**
- Data subjects: ~16 million users globally (EU/UK subset: approximately [X] million)
- Processing frequency: Continuous / event-triggered
- Infrastructure: AWS (us-east-1 primary region) — international transfer of EU personal data
- ML model: [architecture — TO BE CONFIRMED: e.g., gradient boosted ensemble]
- Training data: Historical user data (consent basis for training — [REVIEW REQUIRED])

**1.3 Purposes and necessity**
Primary purpose: Deliver the core product service. Necessity: The algorithmic scoring is the product's central function; without it, the service cannot be delivered. Proportionality: **Contested** — the full health profile used for scoring should be reviewed for data minimisation; not all biometric inputs may be necessary for each score component.

**1.4 Lawfulness**
- Art. 6 basis: Art. 6(1)(b) contract performance
- Art. 9 basis: Art. 9(2)(a) explicit consent
- **ISSUE:** Consent granularity — users must specifically consent to algorithmic profiling of health data separate from general health data collection. Current consent flow — **[REVIEW REQUIRED]**

---

## SECTION 3 — RISK ASSESSMENT MATRIX

| Risk | Likelihood | Severity | Score | Rating |
|------|-----------|----------|-------|--------|
| Inaccurate health conclusions causing harm to user decisions | 2 | 3 | **6** | 🔴 HIGH |
| Discriminatory outputs across demographic groups (model bias) | 2 | 3 | **6** | 🔴 HIGH |
| Re-identification via health score inference | 1 | 3 | **3** | 🟡 MEDIUM |
| Consent invalidity — insufficient granularity | 3 | 2 | **6** | 🔴 HIGH |
| Unauthorised third-party access to derived health scores | 1 | 3 | **3** | 🟡 MEDIUM |
| Art. 22 automated decision-making without safeguards | 2 | 2 | **4** | 🟡 MEDIUM |
| Cross-border transfer without adequate safeguards | 1 | 3 | **3** | 🟡 MEDIUM |

---

## SECTION 4 — MITIGATION MEASURES (High Risks)

**Risk: Inaccurate health conclusions**
*Measures:* (1) Mandatory accuracy disclaimers on all score displays; (2) Clinical validation study for scoring algorithm; (3) User ability to flag inaccurate scores; (4) Model performance monitoring with demographic breakdown quarterly
*Owner:* CTO + Medical/Scientific Board | *Timeline:* 90 days | *Residual risk:* MEDIUM

**Risk: Model bias across demographic groups**
*Measures:* (1) Fairness audit of training data for demographic representation; (2) Disaggregated performance metrics by age, sex, geographic region; (3) Bias monitoring in production
*Owner:* Head of AI / Data Science | *Timeline:* 120 days | *Residual risk:* MEDIUM

**Risk: Consent invalidity**
*Measures:* (1) Redesign consent flow — separate, granular consent for algorithmic profiling; (2) Legal review of current consent wording; (3) Re-consent campaign if current consent invalid
*Owner:* Legal / Product | *Timeline:* 60 days | *Residual risk:* LOW after remediation

---

## SECTION 5 — CONSULTATION

**Art. 36 Assessment:** Residual high risks identified in consent validity and model accuracy. **Prior consultation with lead supervisory authority recommended** before full deployment if consent remediation is not complete. DPO sign-off required.

---

## SECTION 6 — DECISION

**PROCEED WITH CONDITIONS** — subject to: (1) consent remediation within 60 days; (2) bias audit within 120 days; (3) accuracy disclaimers implemented immediately.`,
    },

    {
      id: 'gdpr-05',
      num: '05',
      title: 'Art. 28 Processor Agreement Audit',
      type: 'standalone',
      tags: ['Processors', 'Art. 28', 'Vendor Management', 'DPA'],
      model: 'Claude Sonnet 4 or Harvey',
      time: '7–10 min',
      description: 'Reviews an existing vendor DPA for Art. 28 compliance gaps and generates remediation clauses.',
      prompt: `You are a data protection counsel specialising in vendor contracts and GDPR Article 28 processor obligations. You are reviewing a Data Processing Agreement (DPA) with a third-party vendor.

TASK: Conduct a comprehensive Art. 28 compliance audit of the DPA provided [insert DPA text or describe key provisions], then draft remediation language for any gaps identified.

ART. 28(3) MANDATORY CLAUSES CHECKLIST:
Review whether the DPA contains binding obligations that the processor shall:

(a) Process personal data only on documented instructions from the controller
(b) Ensure confidentiality obligations on authorised persons
(c) Take all measures required pursuant to Art. 32 (security)
(d) Respect conditions for engaging sub-processors (Art. 28(2)(4)) — including prior written authorisation and flow-down obligations
(e) Assist the controller with data subject rights (Arts. 12–22)
(f) Assist the controller with security, breach notification, DPIA, and prior consultation obligations (Arts. 32–36)
(g) Delete or return all personal data at end of service, at controller's choice
(h) Make available all information necessary to demonstrate compliance and allow audits

ADDITIONAL REVIEW POINTS:
— Subject matter, duration, nature, and purpose of processing — are these sufficiently specific?
— Whether the processor has appropriate technical and organisational measures (at minimum: encryption, pseudonymisation, confidentiality, availability, resilience, restoration, testing)
— Sub-processor list — is it current? Are there general or specific authorisation mechanisms?
— Governing law — is it EU/UK law?
— Is there a data breach notification obligation with a specific timeframe? (Note: 72-hour window under Art. 33 requires processors to notify "without undue delay" — many DPAs are insufficiently specific)
— International transfers — does the DPA address transfers from processor to sub-processors?
— Audit rights — are they meaningful (not just questionnaire-based)?

OUTPUT FORMAT:
Part 1: COMPLIANCE SCORECARD — rate each Art. 28(3) element as: Compliant / Partially Compliant / Non-Compliant / Missing
Part 2: GAP ANALYSIS — narrative explanation of each gap
Part 3: REMEDIATION CLAUSES — draft contractual language for each gap, ready to send to vendor as a redline

CONSTRAINTS:
— Reference the ICO's template DPA clauses and the EU Standard Contractual Clauses (Processor Annex) where appropriate
— Note any clauses that are common in US vendor boilerplate but non-compliant with GDPR
— Flag clauses that attempt to limit the processor's liability in ways that undermine GDPR obligations
— If the vendor is US-based, note whether SCCs (Module 2 or 3) are incorporated or needed`,
      expectedOutput: `## ART. 28 DPA COMPLIANCE AUDIT
*Vendor: [VENDOR NAME] | Date: [DATE] | Reviewed by: [NAME]*

---

## PART 1 — COMPLIANCE SCORECARD

| Art. 28(3) Requirement | Status | Notes |
|------------------------|--------|-------|
| (a) Instructions only | ✅ Compliant | Clause 4.1 — adequate |
| (b) Confidentiality obligations | ⚠️ Partial | No explicit obligation on sub-processors |
| (c) Art. 32 security measures | ❌ Non-Compliant | Generic "industry standard" — not GDPR-specific |
| (d) Sub-processor conditions | ❌ Non-Compliant | General authorisation only; no flow-down obligation |
| (e) DSR assistance | ⚠️ Partial | Covers erasure only; no access/portability/restriction |
| (f) Art. 32-36 assistance | ❌ Missing | No breach notification obligation; no DPIA assistance |
| (g) Return/deletion of data | ✅ Compliant | Clause 12 — 30-day deletion on termination |
| (h) Audit rights | ⚠️ Partial | Questionnaire only; no on-site audit right |

**Overall: 2 Compliant / 3 Partial / 3 Non-Compliant or Missing**

---

## PART 2 — KEY GAPS

**Critical Gap 1: Breach Notification**
The DPA contains no obligation for the processor to notify the controller of personal data breaches. Under Art. 33(2), processors must notify controllers "without undue delay." The controller's 72-hour notification window to the supervisory authority cannot be met without timely processor notification. **Risk: High.**

**Critical Gap 2: Sub-Processor Flow-Down**
General authorisation for sub-processing without mandatory flow-down of Art. 28(3) obligations means the controller cannot ensure GDPR compliance throughout the processing chain. **Risk: High.**

**Gap 3: Security Measures Specificity**
"Industry standard security" is not a GDPR-compliant description of Art. 32 measures. The DPA must specify encryption standards, access controls, pseudonymisation, resilience measures, and testing frequency.

---

## PART 3 — REMEDIATION CLAUSES

**Add to Section 7 (Security Incidents):**
*"The Processor shall notify the Controller of any personal data breach (as defined in Art. 4(12) GDPR) without undue delay and, where feasible, no later than 24 hours after becoming aware of the breach. Notification shall include: (i) nature of the breach; (ii) categories and approximate number of data subjects affected; (iii) categories and approximate number of records affected; (iv) likely consequences; (v) measures taken or proposed. Where complete information is not available within 24 hours, initial notification shall be made with information available and supplemented without further undue delay."*

**Replace Section 9.2 (Sub-processors):**
*"The Processor shall impose data protection obligations equivalent to those set out in this Agreement on any sub-processor by way of a written contract. The Processor shall remain fully liable to the Controller for the performance of any sub-processor's obligations."*`,
    },

    {
      id: 'gdpr-06',
      num: '06',
      title: 'Data Subject Rights Response Framework',
      type: 'standalone',
      tags: ['DSR', 'Art. 15–22', 'Procedures', 'Operations'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '8–10 min',
      description: 'Builds an end-to-end operational framework for handling all eight categories of data subject rights requests.',
      prompt: `You are a data protection counsel and compliance operations specialist. Design a comprehensive operational framework for handling Data Subject Rights (DSR) requests under GDPR Arts. 15–22.

RIGHTS TO COVER:
— Art. 15: Right of access
— Art. 16: Right to rectification
— Art. 17: Right to erasure ("right to be forgotten")
— Art. 18: Right to restriction of processing
— Art. 19: Notification obligation to third parties
— Art. 20: Right to data portability
— Art. 21: Right to object (including to profiling)
— Art. 22: Rights related to automated decision-making

FRAMEWORK COMPONENTS REQUIRED:

**1. INTAKE & VERIFICATION PROCEDURE**
— How to receive requests (channels: in-app, email, postal)
— Identity verification requirements — what is sufficient? What is proportionate?
— How to handle requests from third parties acting on behalf of data subjects
— Timelines: 1 month standard; 2-month extension criteria and notification requirement

**2. DECISION TREE FOR EACH RIGHT**
For each of the 8 rights:
— Threshold questions to assess validity of request
— Grounds for refusal (and their limits)
— What must be provided / done
— Timeline and format of response

**3. TECHNICAL IMPLEMENTATION CHECKLIST**
— Systems that must be searched / actioned for each right
— Data portability format requirements (Art. 20 — "structured, commonly used, machine-readable")
— Erasure: systems where deletion must be confirmed, including backup systems and processors
— How to handle partial erasure where retention obligations conflict

**4. RESPONSE TEMPLATES**
Draft response letters for: (a) acknowledgment of receipt; (b) identity verification request; (c) fulfillment of access request; (d) refusal with grounds; (e) extension notification

**5. LOGGING & AUDIT TRAIL**
What must be recorded to demonstrate compliance

CONSTRAINTS:
— One-month clock starts from receipt of request, not from verification
— Identity verification delay does not pause the clock unless the request is genuinely unclear
— Manifestly unfounded / excessive requests: document the grounds carefully — this exemption is narrow
— Flag the ICO's position that erasure cannot be refused solely because data is in backup systems (backups must be flagged for deletion at next cycle)`,
      expectedOutput: `## DATA SUBJECT RIGHTS — OPERATIONAL FRAMEWORK
*GDPR Arts. 15–22 | HealthTech Platform | Version 1.0*

---

## 1. INTAKE & VERIFICATION

**Receipt Channels:**
- In-app: Privacy settings → "Your Data" → Submit request (recommended — pre-authenticated)
- Email: privacy@[company].com (monitored daily)
- Postal: [registered address] marked "Data Protection Request"

**Clock Start:** Day 0 = date of receipt regardless of whether identity is verified. Do not pause clock for verification unless identity is genuinely in doubt.

**Identity Verification (proportionate standard):**
- In-app authenticated request: No additional verification required
- Email from registered account address: Verification by account confirmation link
- Email from unregistered address or postal: Government ID or knowledge-based verification — *do not request disproportionate documentation*
- Third-party requests: Written authority from data subject + third party's ID

**Timeline:**
- Standard response: 1 calendar month from Day 0
- Extension: Up to 2 additional months for complex/numerous requests — notify data subject within first month with reasons

---

## 2. DECISION TREE — KEY RIGHTS

**Art. 15 — Access Request**
1. Is requester a data subject whose data we hold? → If no: respond that no data held
2. Does manifestly unfounded/excessive exception apply? → If yes: document grounds in writing before refusing
3. Provide: confirmation of processing, copy of all personal data, all Art. 13/14 information
4. Format: PDF or structured format; redact third-party data
5. Fee: Free (first request); reasonable fee for subsequent manifestly excessive requests

**Art. 17 — Erasure**
1. Does one of Art. 17(1)(a)–(f) grounds apply? (consent withdrawn / no longer necessary / unlawful processing / etc.)
2. Does an Art. 17(3) exception apply? (legal obligation / public interest / legal claims)
3. If erasure required: delete from live systems, flag backup systems for deletion at next scheduled purge cycle (document this), notify processors under Art. 19
4. ⚠️ Health data: Retention obligation under medical/tax law may override — document each case

---

## 4. RESPONSE TEMPLATES

**Template A — Acknowledgment (send within 5 business days):**

*"Dear [Name], We confirm receipt of your data subject rights request dated [DATE] under GDPR Article [X]. We are processing your request and will respond in full within one calendar month of receipt (by [DATE]). Reference number: [REF]. If you have questions, contact [email]."*

**Template D — Refusal:**

*"Dear [Name], We have reviewed your request under GDPR Article [X] dated [DATE]. We are unable to fulfil this request for the following reason(s): [SPECIFIC LEGAL GROUNDS — e.g., 'the processing is necessary for the performance of a contract to which you are party (Art. 6(1)(b)) and the data cannot be erased without terminating the service']. You have the right to lodge a complaint with your supervisory authority [ICO / relevant SA] and to seek a judicial remedy. Contact details: [SA details]."*

---

## 5. AUDIT LOG (mandatory fields per request)
Date received | Requestor identity | Right invoked | Verification method | Response date | Action taken | Grounds for any refusal | Sign-off`,
    },

    {
      id: 'gdpr-07',
      num: '07',
      title: 'Breach Notification Decision & Draft Notice',
      type: 'chain-step-1',
      chainId: 'gdpr-chain-breach',
      chainTitle: 'Breach Response Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'gdpr-08',
      tags: ['Breach', 'Art. 33', 'Art. 34', 'Incident Response'],
      model: 'Claude Sonnet 4',
      time: '5–7 min',
      description: 'Analyses a breach scenario, determines notification obligations to SA and data subjects, and drafts the Art. 33 notification.',
      prompt: `You are a data protection counsel advising on a personal data breach response under GDPR Arts. 33–34. Analyse the incident described below and produce the required legal analysis and notification documents.

INCIDENT DESCRIPTION:
[Insert incident details, e.g.: "At 14:32 on [DATE], our security team identified that a misconfigured S3 bucket had been publicly accessible for approximately 72 hours. The bucket contained CSV exports of health metric data for approximately 38,000 EU users including: user IDs, email addresses, heart rate data, sleep scores, and subscription tier. Logs show 247 external IP addresses accessed the bucket during the exposure window, with 3 IPs downloading complete CSV files. The bucket has been secured. We have no evidence of malicious intent."]

REQUIRED ANALYSIS:

**PART 1 — BREACH CLASSIFICATION**
1. Confirm this is a "personal data breach" under Art. 4(12): breach of security leading to accidental/unlawful destruction, loss, alteration, unauthorised disclosure, or access
2. Categorise: Confidentiality breach / Integrity breach / Availability breach (may be multiple)
3. Does it involve special category data (Art. 9)? → Impact on notification thresholds
4. Risk assessment: Is the breach "unlikely to result in a risk" / likely to result in a risk / likely to result in a HIGH risk to data subjects' rights and freedoms?

**PART 2 — NOTIFICATION DECISION**
Art. 33 — Supervisory Authority notification (required unless "unlikely to result in a risk"):
— Must notify within 72 hours of becoming aware (when did awareness occur in this scenario?)
— If notifying late, provide reasons for delay
— Which SA has jurisdiction? (lead SA if cross-border; local SA if single-country)

Art. 34 — Data subject notification (required if HIGH risk):
— Decision: notify / not notify / defer pending investigation
— If notify: without undue delay

**PART 3 — DRAFT ART. 33 SA NOTIFICATION**
Include all Art. 33(3) mandatory information:
(a) Nature of breach including categories/approximate number of data subjects and records
(b) DPO contact details
(c) Likely consequences
(d) Measures taken or proposed

**PART 4 — DRAFT ART. 34 DATA SUBJECT NOTIFICATION** (if high risk determination)
Plain language, non-technical, include: what happened, what data, what risks, what we're doing, what subjects should do, contact details.

CONSTRAINTS:
— 72-hour clock: "Aware" means when the organisation (not just a front-line employee) has sufficient information to know a breach has occurred — not when full investigation is complete
— Art. 33(4): Can notify in phases where full information not available — initial notification then supplement
— Do not recommend notification solely to manage reputational risk — base recommendation purely on risk to data subjects`,
      expectedOutput: `## BREACH RESPONSE ANALYSIS & NOTIFICATION DRAFTS
*S3 Misconfiguration Incident | [DATE] | CONFIDENTIAL — LEGAL PRIVILEGE*

---

## PART 1 — BREACH CLASSIFICATION

**Breach Type:** Confirmed personal data breach under Art. 4(12) — unauthorised disclosure and access.
**Category:** Confidentiality breach (primary). Integrity: Not affected. Availability: Not affected.
**Special Category Data:** **YES** — heart rate and sleep score data constitutes health data under Art. 9(1). This elevates the risk assessment.

**Risk Assessment: LIKELY HIGH RISK**
Factors: (1) Special category health data involved; (2) Confirmed external downloads by 3 IP addresses (actual exfiltration likely); (3) 38,000 data subjects — large scale; (4) Email addresses included — enables direct targeting/phishing of data subjects; (5) Health data + identity (email) combination creates profiling risk.

**Art. 34 Trigger: Data subject notification REQUIRED** — high risk to rights and freedoms cannot be excluded given confirmed exfiltration.

---

## PART 2 — NOTIFICATION DECISION

**Art. 33 — SA Notification: REQUIRED within 72 hours**
Awareness time: When did first internal report reach controller management level? [CONFIRM]. 72-hour clock runs from that point.
Lead SA: [Confirm based on main EU establishment — likely [SA NAME]].
Status: **[URGENT — confirm hours remaining in 72-hour window]**

**Art. 34 — Data Subject Notification: REQUIRED**
Grounds: Actual exfiltration confirmed (3 IPs with complete downloads); health + identity data combination; large scale. High risk cannot be excluded. Notify without undue delay.

---

## PART 3 — ART. 33 SA NOTIFICATION DRAFT

**TO:** [Lead Supervisory Authority — e.g., ICO / relevant DPA]
**FROM:** [Controller name, DPO contact]
**SUBJECT:** Personal Data Breach Notification — Art. 33 GDPR

**1. Nature of breach:**
On [DATE], a misconfigured AWS S3 storage bucket containing health metric data exports was identified as publicly accessible. The bucket was exposed for approximately 72 hours ([DATE/TIME] to [DATE/TIME]). External access was confirmed via server logs.

**2. Categories and approximate number of data subjects and records:**
Approximately **38,000 EU/EEA data subjects**. Data categories: user identifiers, email addresses, heart rate time-series data, sleep scores, subscription tier. **Includes special category health data (Art. 9(1)).**

**3. Likely consequences:**
(i) Risk of identity-targeted phishing using exposed email addresses; (ii) potential misuse of health data for insurance or employment discrimination purposes; (iii) reputational harm to data subjects.

**4. Measures taken:**
Bucket immediately secured [DATE/TIME]. Access logs preserved. Forensic investigation initiated. Affected user notification in preparation. AWS security configuration audit underway. [Additional measures to follow in supplementary notification.]

---

## PART 4 — DATA SUBJECT NOTIFICATION DRAFT

**Subject line:** Important security notice regarding your [App Name] account

*"We are writing to let you know about a security incident that affected your account.*

*What happened: Between [DATE] and [DATE], some of your data was temporarily accessible due to a configuration error in our storage system. We identified and fixed this immediately.*

*What data was involved: Your email address, and health metrics including heart rate and sleep data from the [App Name] app.*

*What you should do: Be alert to unexpected emails or messages claiming to be from us. We will never ask for your password. If you receive suspicious communications, contact us at [email].*

*What we are doing: We have fixed the issue, launched a full security investigation, and notified the [SA Name] as required by law. We are reviewing all our security configurations.*

*Contact us: [DPO email / privacy contact]*"*`,
    },

    {
      id: 'gdpr-08',
      num: '08',
      title: 'International Transfer Mechanism Selection',
      type: 'standalone',
      tags: ['International Transfers', 'SCCs', 'Art. 44–49', 'TIA'],
      model: 'Claude Opus 4 or Gemini 1.5',
      time: '8–12 min',
      description: 'Analyses all third-country data transfers and selects the appropriate transfer mechanism (SCCs, adequacy, BCRs, derogations) with a Transfer Impact Assessment framework.',
      prompt: `You are a data protection counsel specialising in GDPR Chapter V international data transfer compliance. Conduct a comprehensive international transfers analysis for the organisation's vendor ecosystem.

ORGANISATION PROFILE:
A health technology company (EU/UK controller) transferring EU personal data (including health data) to the following third countries via vendor relationships:
— United States: AWS (infrastructure), Braze (marketing automation), Amplitude (analytics), Stripe (payments), Zendesk (support)
— United Kingdom: [Post-Brexit — adequacy decision in place, currently under review]
— India: [Customer support BPO — data accessed remotely by agents]
— Israel: [Development team — access to pseudonymised data]

FOR EACH TRANSFER, DETERMINE:

**Step 1 — Is there an adequacy decision?**
List current EU Commission adequacy decisions. Note EU-US Data Privacy Framework (DPF) status as of 2025 and any pending legal challenges.

**Step 2 — If no adequacy decision: identify appropriate safeguard under Art. 46**
Options to assess:
(a) Standard Contractual Clauses (EU Commission 2021 — four modules)
— Which module applies? (Controller→Processor / Controller→Controller / Processor→Controller / Processor→Processor)
— Are 2021 SCCs signed? (Note: 2010 SCCs expired September 2021)
(b) Binding Corporate Rules (Art. 47) — for intra-group transfers only
(c) Codes of Conduct / Certification — practical availability
(d) Art. 49 derogations — narrow use, not systematic

**Step 3 — Transfer Impact Assessment (TIA) for each SCC transfer**
Following the EDPB Recommendations 01/2020 six-step methodology:
1. Map the transfer
2. Identify the transfer tool
3. Assess the law and practice of the third country (surveillance laws, data subject rights, effective remedies)
4. Identify and adopt supplementary measures if needed
5. Formal/procedural steps
6. Re-evaluate periodically

**SPECIFIC ANALYSIS REQUIRED:**
— US transfers: Does the relevant vendor participate in the EU-US DPF? If yes, is DPF sufficient given ongoing CJEU scrutiny? If no, do SCCs + TIA suffice given US intelligence surveillance (FISA 702, EO 12333)?
— India: No adequacy decision. No DPF equivalent. SCC Module 2 (Controller→Processor). India DPDP Act 2023 — does this affect TIA analysis?
— Israel: Adequacy decision exists — confirm current status

OUTPUT FORMAT:
1. Transfer mapping table (vendor / country / transfer tool / SCC module / TIA required / status)
2. TIA template for US transfers (health data context)
3. Priority remediation actions for non-compliant transfers
4. Recommended governance process for new vendor onboarding`,
      expectedOutput: `## INTERNATIONAL TRANSFERS ANALYSIS
*GDPR Chapter V | HealthTech Platform | [DATE]*

---

## 1. TRANSFER MAPPING TABLE

| Vendor | Country | Adequacy? | Transfer Tool | SCC Module | TIA Required | Status |
|--------|---------|-----------|---------------|------------|--------------|--------|
| AWS | US | DPF (conditional) | DPF + SCCs backup | Module 2 (C→P) | Yes — health data | ⚠️ Review |
| Braze | US | DPF participant | DPF + SCCs | Module 2 (C→P) | Yes | ⚠️ Review |
| Amplitude | US | DPF participant | DPF + SCCs | Module 2 (C→P) | Yes | ⚠️ Review |
| Stripe | US | DPF participant | DPF + SCCs | Module 2 (C→P) | Yes (financial) | ⚠️ Review |
| Zendesk | US | DPF participant | DPF + SCCs | Module 2 (C→P) | Yes | ⚠️ Review |
| UK vendors | UK | ✅ Adequacy (ICO) | None required | — | No | ✅ Monitor |
| India BPO | India | ❌ No adequacy | SCCs 2021 | Module 2 (C→P) | **Yes — HIGH** | ❌ Action required |
| Israel Dev | Israel | ✅ Adequacy | None required | — | No | ✅ Monitor |

---

## 2. TIA FRAMEWORK — US TRANSFERS (Health Data)

**Step 3 — US Legal Landscape Assessment:**

*Surveillance laws relevant to this transfer:*
- FISA Section 702: Authorises NSA collection of communications of non-US persons from US-based providers. **AWS, Braze, Amplitude are subject to FISA 702 orders.** Health data is within scope of potential collection.
- Executive Order 14086 (2022): Establishes proportionality and necessity limits on US signals intelligence + Data Protection Review Court for EU individuals. Basis for EU-US DPF adequacy determination.

*Assessment:*
For DPF-certified vendors: EU Commission adequacy decision (July 2023) provides a transfer basis. **However:** CJEU challenge filed (2023 — pending). If DPF invalidated (as Safe Harbor 2015 and Privacy Shield 2020 were), controller must have SCCs signed and TIA documented as backup. **Recommendation: Rely on DPF + maintain executed SCCs as contingency.**

*Supplementary measures for health data:*
(1) Encryption in transit and at rest — controller holds keys (not vendor)
(2) Pseudonymisation before transfer where technically feasible
(3) Contractual prohibition on vendor compliance with surveillance orders without notice to controller (except where legally prohibited)
(4) Annual review of DPF certification status for each vendor

---

## 3. PRIORITY REMEDIATION

🔴 **CRITICAL — India BPO:**
No adequacy decision. No DPF equivalent. Current transfer basis unclear. **Actions within 30 days:** (1) Execute 2021 SCCs Module 2; (2) Complete full TIA (India's DPDP Act 2023 — Section 16 cross-border transfers not yet in force but monitor); (3) Assess whether health data should be excluded from India processing scope entirely.

⚠️ **HIGH — All US vendors:**
Confirm: (a) DPF certification current; (b) 2021 SCCs signed (not 2010 version); (c) TIA on file. Assign compliance owner for quarterly DPF status check.`,
    },

    {
      id: 'gdpr-09',
      num: '09',
      title: 'Consent Mechanism & Cookie Compliance Audit',
      type: 'standalone',
      tags: ['Consent', 'Cookies', 'ePrivacy', 'Art. 7'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '6–8 min',
      description: 'Audits the consent architecture for both cookie/tracking compliance and health data processing consent validity under Art. 7 and ePrivacy Directive.',
      prompt: `You are a data protection and digital marketing compliance counsel. Conduct a comprehensive consent mechanism audit covering both GDPR Article 7 consent validity and ePrivacy Directive / national cookie law compliance.

SCOPE OF AUDIT:
A mobile app and companion website for a health technology platform. Consent is collected for: (1) health data processing (special category), (2) marketing communications, (3) analytics and tracking, (4) third-party integrations.

PART A — GDPR ART. 7 CONSENT VALIDITY ANALYSIS

For each consent type, assess against the four Art. 7 + Recital 32/42/43 requirements:

**1. Freely given**
— Is consent bundled with service delivery? (If health data consent is a condition of using the service, is this problematic under Art. 7(4)?)
— Is there a genuine choice? Can the user refuse consent without detriment?
— Is consent granular? (Separate consent for each distinct purpose — one checkbox for all is non-compliant)
— Power imbalance considerations (especially for workplace/employer-provided programmes)

**2. Specific**
— Is each purpose identified with sufficient clarity?
— Is consent obtained before the processing begins?
— Are derived purposes (e.g., ML model training on health data) separately consented?

**3. Informed**
— Does the consent request include: controller identity, purposes, withdrawal mechanism, right to complain, consequences of refusal?
— Is the privacy information provided in plain language?
— For Art. 9 health data: is the explicit consent request clearly distinguished from other consents?

**4. Unambiguous indication of wishes**
— Is there a clear affirmative action? (Pre-ticked boxes are prohibited)
— Is the consent request clearly distinguishable from other terms?
— Is withdrawal as easy as giving consent?

PART B — EPRIVACY / COOKIE COMPLIANCE

For the website and any in-app tracking:
— First-party essential cookies: legal basis? (no consent required for strictly necessary)
— Analytics cookies (Amplitude, Mixpanel): requires consent — assess current mechanism
— Marketing/advertising pixels: requires consent
— Cookie banner design: does it meet the EDPB Guidelines 05/2020 requirements?
  — Is "reject all" as easy as "accept all" (one click)?
  — Are there deceptive design patterns (grey-out reject, hiding options)?
  — Is consent recorded with timestamp and version?

PART C — CONSENT RECORD ARCHITECTURE
Design the technical requirements for a consent management system that:
— Records proof of consent (timestamp, version of consent text shown, IP hash, action taken)
— Enables withdrawal and records it
— Propagates withdrawal to all downstream processors within reasonable time
— Supports audit by supervisory authority

OUTPUT: Compliance scorecard + priority remediation list + redlined consent language`,
      expectedOutput: `## CONSENT MECHANISM AUDIT REPORT
*GDPR Art. 7 + ePrivacy | HealthTech Platform | [DATE]*

---

## COMPLIANCE SCORECARD

| Consent Type | Freely Given | Specific | Informed | Unambiguous | ePrivacy | Overall |
|-------------|-------------|----------|----------|-------------|----------|---------|
| Health data (Art. 9) | ⚠️ | ❌ | ⚠️ | ✅ | N/A | ❌ FAIL |
| Marketing emails | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ PARTIAL |
| Analytics tracking | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ FAIL |
| Third-party integrations | ✅ | ⚠️ | ⚠️ | ✅ | N/A | ⚠️ PARTIAL |

---

## CRITICAL FINDINGS

**Finding 1 — Health Data Consent Not Granular (HIGH RISK)**
Current implementation: Single checkbox "I agree to the Terms and Processing of my Health Data." This bundles: (a) core service health processing; (b) AI scoring; (c) ML model training; (d) personalised recommendations — all under one consent. Under Art. 9(2)(a), explicit consent for health data must be specific to purpose. **ICO enforcement guidance: bundled consent for multiple purposes = not freely given.**

*Remediation: Separate consent requests for: (1) core health metric processing [service delivery]; (2) AI/algorithmic scoring; (3) model training and improvement; (4) research partnerships. Each must have individual opt-in.*

**Finding 2 — Analytics Cookies: No Consent Mechanism (HIGH RISK)**
Amplitude and Mixpanel analytics tracking appears to be set before consent is given. EDPB Guidelines 05/2020 and national law (ePrivacy Directive) require prior consent for analytics cookies/tracking. **No consent banner identified on web version.**

*Remediation: Implement consent management platform (CMP) — recommend OneTrust, Cookiebot, or Usercentrics. Block Amplitude/Mixpanel initialisation until consent given.*

**Finding 3 — Deceptive Design Pattern on Cookie Banner (MEDIUM)**
"Accept All" displayed as primary button; "Manage Preferences" requires additional click. Under EDPB Guidelines 03/2022, this constitutes a dark pattern — reject must be equally accessible. Several EU DPAs (CNIL, APD Belgium) have issued fines specifically for this design.

---

## REMEDIATED HEALTH DATA CONSENT LANGUAGE

*"To provide [App Name]'s core features, we need to process your health data (heart rate, sleep data, activity metrics). Please confirm your consent to each of the following:*

*☐ Processing my health data to display my personal health scores and insights [required for core service]*
*☐ Using my health data to train and improve [App Name]'s AI models [optional — you can use the app without this]*
*☐ Sharing anonymised health data with research partners [optional]*

*You can withdraw any consent at any time in Settings → Privacy. Withdrawal does not affect the lawfulness of processing before withdrawal."*`,
    },

    {
      id: 'gdpr-10',
      num: '10',
      title: 'DPO Appointment Necessity & Mandate',
      type: 'standalone',
      tags: ['DPO', 'Art. 37–39', 'Governance', 'Organisational'],
      model: 'Claude Sonnet 4',
      time: '5–7 min',
      description: 'Analyses whether a DPO appointment is mandatory under Art. 37, defines the DPO mandate, and structures the reporting line to avoid conflicts of interest.',
      prompt: `You are a data protection governance specialist. Conduct a DPO appointment necessity analysis and design the DPO governance structure for a health technology company.

COMPANY PROFILE:
— Health technology platform with 16+ million users across EU/UK and US
— Processes special category health data (Art. 9) at large scale
— Uses AI/algorithmic processing of health metrics
— Employs approximately [X] people; legal team of [X]
— Delaware incorporated; EU operations based in [EU jurisdiction]
— No DPO currently appointed

PART 1 — ART. 37 NECESSITY ANALYSIS

Three mandatory triggers under Art. 37(1):
(a) Public authority or body
(b) Core activities require regular and systematic monitoring of data subjects on a large scale
(c) Core activities consist of large-scale processing of special categories (Art. 9) or criminal conviction data (Art. 10)

For each trigger:
— Does it apply to this company? Analyse with reference to EDPB Guidelines 07/2016 on DPOs
— "Core activities": activities that are central to the controller's main business — not support functions
— "Large scale": consider number of data subjects, volume, variety, geographical extent, duration, scope

Also analyse:
— Whether national law in the EU establishment jurisdiction requires DPO beyond Art. 37(1) (e.g., Germany, France have additional triggers)
— Whether voluntary appointment is advisable even if not mandatory (and its implications — voluntary DPO has same protections and obligations as mandatory DPO)

PART 2 — DPO QUALIFICATION REQUIREMENTS (Art. 37(5))
What qualifications and expertise are required? Assess:
— Legal and regulatory knowledge (GDPR + ePrivacy + national implementations + health data regulation)
— Technical understanding of AI/data processing systems
— Certifications (CIPP/E, CIPM, CIPT — practical value)
— Internal vs. external DPO — pros, cons, risks
— Can the General Counsel or CGO serve as DPO?

PART 3 — DPO MANDATE AND INDEPENDENCE (Art. 38–39)
Design the DPO governance structure:
— Position in organisational hierarchy
— Reporting line (must report to highest management level — Art. 38(3))
— Conflicts of interest: which roles are incompatible with DPO (Art. 38(6))
— Protection from dismissal for performing DPO duties
— Resource requirements (budget, access to data, access to processing systems)
— DPO tasks under Art. 39 (inform, advise, monitor, advise on DPIAs, cooperate with SA, act as contact)

PART 4 — DPO APPOINTMENT DOCUMENTATION
Draft: (a) Board resolution appointing DPO; (b) DPO terms of reference; (c) SA notification (required under Art. 37(7))`,
      expectedOutput: `## DPO APPOINTMENT ANALYSIS & GOVERNANCE FRAMEWORK
*GDPR Arts. 37–39 | HealthTech Platform | [DATE]*

---

## PART 1 — NECESSITY ANALYSIS

**Art. 37(1)(b): Regular and systematic monitoring — APPLICABLE**
The platform's core activity is continuous processing of user health behaviour to generate insights and recommendations. This constitutes "regular and systematic monitoring of data subjects" at large scale (16M users). EDPB Guidelines 07/2016 specifically identify "health monitoring" as a paradigmatic example of this trigger. **Conclusion: Mandatory trigger met.**

**Art. 37(1)(c): Large-scale special category data — APPLICABLE**
Core activities consist of large-scale processing of Art. 9(1) health data. All four EDPB "large scale" indicators are met: number (16M), volume (continuous biometric streams), variety (multiple health data types), geographic extent (15+ jurisdictions). **Conclusion: Mandatory trigger independently met.**

**Result: DPO APPOINTMENT IS MANDATORY.** Both Art. 37(1)(b) and (c) apply independently. This is not borderline.

**National law note:** If main EU establishment is in Germany, §38 BDSG requires DPO where >20 persons are engaged in automated personal data processing — separately mandatory. France: CNIL guidance aligns with Art. 37 thresholds.

---

## PART 2 — QUALIFICATION REQUIREMENTS

**Required expertise for this profile:**
- Deep GDPR knowledge (especially Arts. 9, 22, 35, Chapter V)
- Health data regulatory overlay (EU Medical Device Regulation awareness, national health data laws)
- Understanding of AI/ML processing and algorithmic profiling
- Multi-jurisdictional awareness (EU, UK, US)

**Can the CGO/GC serve as DPO?**
**Not recommended.** Art. 38(6) prohibits DPO roles that create a "conflict of interests." A CGO/GC who also takes business decisions about data processing (budget authority, vendor selection, product design) has an inherent conflict — the DPO must be able to advise against business decisions without career risk. The EDPB has specifically listed "Head of Legal" as a potentially conflicted role. An external DPO or dedicated internal DPO with no business decision authority is required.

---

## PART 3 — DPO GOVERNANCE STRUCTURE

**Reporting Line:** Direct to Board/CEO — not to CTO, CPO, or CFO. The DPO must be able to escalate data protection concerns to the highest management level without intermediate filtering.

**Incompatible roles (Art. 38(6) conflicts):**
— CEO / C-suite (sets processing purposes)
— CTO / Head of Engineering (implements processing)
— Head of Marketing (processes data for business purposes)
— Head of Legal where GC has authority over data-related business decisions

**Resources required:**
- Dedicated budget line (training, external legal counsel, tools)
- Read access to all systems processing personal data
- Attend all DPIA, product design, and vendor selection meetings
- Access to legal and external DPO network

---

## PART 4 — APPOINTMENT DOCUMENTS

**Board Resolution (excerpt):**
*"RESOLVED that [NAME / ENTITY] be appointed as Data Protection Officer of [Company] pursuant to Article 37 GDPR and §38 BDSG [if applicable], effective [DATE]. The DPO shall report directly to the Board and shall not receive instructions regarding the performance of DPO tasks. The DPO shall not be dismissed or penalised for performing DPO tasks. The Board authorises an annual DPO budget of [€X] and confirms that the DPO shall have access to all personal data processing activities and operations of the company."*

**SA Notification:** Submit via [lead SA's online portal] within [reasonable timeframe — guidance varies: immediately recommended]. Notify: DPO name, position, contact details for data subjects and SA. Publish contact details on privacy policy.`,
    },

  ], // end GDPR prompts
}, // end GDPR library

/* ══════════════════════════════════════════════════════════
   DOJ DATA SECURITY PROGRAM — 10 Prompts
   28 CFR Part 202 | EO 14117
══════════════════════════════════════════════════════════ */
dsp: {
  id: 'dsp',
  name: 'DOJ Data Security Program',
  flag: '🇺🇸',
  description: '28 CFR Part 202 compliance — from scope analysis to audit response. Covers covered data transactions, prohibited/restricted party analysis, security requirements, and compliance program design.',
  color: '#BF4A4A',
  prompts: [

    {
      id: 'dsp-01',
      num: '01',
      title: 'Covered Data Transaction Scope Analysis',
      type: 'chain-step-1',
      chainId: 'dsp-chain-scope',
      chainTitle: 'Scope Analysis Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'dsp-02',
      tags: ['Scope', '§ 202.201', 'Covered Transactions', 'Foundation'],
      model: 'Claude Opus 4',
      time: '10–14 min',
      description: 'Determines whether the company engages in "covered data transactions" as defined in 28 CFR § 202.201 and identifies all in-scope data flows.',
      prompt: `You are a national security data compliance attorney with deep expertise in the DOJ Data Security Program (DSP) established under Executive Order 14117 and codified at 28 CFR Part 202. You are advising a health technology company on its compliance obligations.

COMPANY PROFILE:
— Delaware-incorporated health technology platform, 16+ million users
— Processes US persons' health data (heart rate, HRV, sleep, biometrics), geolocation data (device GPS), and personal identifiers (name, email, DOB, device IDs)
— Cloud infrastructure: AWS (US-based, but with international operations teams)
— Vendor relationships including: EU-based analytics vendors, APAC-based data processors, and one vendor with Chinese investment (minority stake)
— Engineering team includes contractors in Russia and Eastern Europe (remote access to production systems)
— Has received investor interest from a sovereign wealth fund with government ties

TASK: Conduct a comprehensive scope analysis to determine whether any of the company's current business activities constitute "covered data transactions" under 28 CFR § 202.201.

ANALYSIS FRAMEWORK:

**Step 1 — Covered Data: Does the company process covered data categories?**
Apply the bulk thresholds from 28 CFR § 202.201:
— Genomic data: >100 US persons
— Biometric identifiers: >1,000 US persons
— Personal health data: >10,000 US persons
— Precise geolocation data: >1,000 US devices/vehicles
— Financial data: >10,000 US persons
— Covered personal identifiers: >100,000 US persons
For each category: (a) does the company process this data type? (b) does it exceed thresholds? (c) what is the estimated volume?

**Step 2 — Covered Persons: Are any counterparties "covered persons"?**
Covered persons include: citizens/residents of Countries of Concern, entities incorporated/headquartered in Countries of Concern, entities owned/controlled/directed by such persons (10% or more ownership interest threshold).
Countries of Concern: China (including Hong Kong/Macau), Russia, Iran, North Korea, Cuba, Venezuela (Maduro regime)
Analyse: Are any current vendors, investors, employees, contractors, or data recipients covered persons?

**Step 3 — Covered Transaction Types: Which transaction categories apply?**
Types under § 202.202:
(a) Data brokerage transactions
(b) Vendor agreements providing access to covered data
(c) Employment/contractor arrangements providing access to covered data
(d) Investment transactions providing access to covered data systems or data
(e) Other arrangements providing covered persons with access to covered data

**Step 4 — Prohibited vs. Restricted vs. Exempt**
For each identified covered transaction: is it prohibited (§ 202.203), restricted (§ 202.204), or potentially exempt (§ 202.205)?

OUTPUT:
1. Covered data determination table (each data type / threshold analysis / finding)
2. Covered persons inventory (vendors, investors, employees with access)
3. Covered transactions list with preliminary prohibited/restricted/exempt classification
4. Immediate risk flags requiring urgent legal attention

CONSTRAINTS:
— Apply the definitions strictly — the DSP uses specific technical definitions
— Note where factual confirmation is needed from the business (don't assume)
— Flag the Chinese-invested vendor as a priority — even minority investment can trigger if accompanied by board rights or information rights
— Russian/Eastern European contractors: assess access to covered data systems`,
      expectedOutput: `## DSP SCOPE ANALYSIS — COVERED DATA TRANSACTION DETERMINATION
*28 CFR Part 202 | HealthTech Platform | [DATE] | ATTORNEY-CLIENT PRIVILEGE*

---

## STEP 1 — COVERED DATA THRESHOLD ANALYSIS

| Data Category | DSP Threshold | Company Volume (est.) | Threshold Met? | Confidence |
|---------------|--------------|----------------------|----------------|------------|
| Genomic data | >100 US persons | None collected | ❌ Not applicable | High |
| **Biometric identifiers** | >1,000 US persons | ~8–10M US users (heart rate, HRV baselines = biometric identifiers under § 202.201) | **✅ THRESHOLD MET** | High |
| **Personal health data** | >10,000 US persons | ~16M total users; US subset est. 4–6M | **✅ THRESHOLD MET** | High |
| **Precise geolocation** | >1,000 US devices | GPS-enabled features present — [CONFIRM volume] | **✅ LIKELY MET** | Medium — confirm |
| Financial data | >10,000 US persons | Subscription payment data via Stripe only | **Borderline — confirm** | Low |
| **Covered personal identifiers** | >100,000 US persons | 16M total, large US base | **✅ THRESHOLD MET** | High |

**Conclusion: Company processes at least 4 categories of covered data above applicable thresholds. DSP applies.**

---

## STEP 2 — COVERED PERSONS INVENTORY

| Counterparty | Nexus to Country of Concern | Access to Covered Data | Risk Level |
|-------------|---------------------------|----------------------|------------|
| Vendor with Chinese minority investment | China (investor) — **must determine: board rights? information rights? ownership %?** | [CONFIRM — likely yes if vendor processes any US data] | 🔴 **CRITICAL** |
| Russian/Eastern European contractors | Russia (citizenship/residency) | Remote access to production systems — likely covered data access | 🔴 **CRITICAL** |
| EU analytics vendors | No CoC nexus identified | Yes — process US health/behavioural data | ✅ Not covered persons |
| Sovereign wealth fund (investor interest) | **[IDENTIFY COUNTRY — if China, Russia, Iran, etc.: covered person]** | Investment stage — assess what data access investment terms provide | 🔴 **INVESTIGATE URGENTLY** |

---

## STEP 3 — COVERED TRANSACTIONS IDENTIFIED

**Transaction A — Chinese-Invested Vendor Agreement: LIKELY COVERED**
If the vendor processes or has access to US persons' covered data AND has a Chinese investor with 10%+ ownership or any governance rights → vendor agreement = covered data transaction under § 202.202(b). **This may be a PROHIBITED transaction if Chinese investor has 50%+ control, or a RESTRICTED transaction requiring security measures.**

**Transaction B — Russian/Eastern European Contractor Arrangements: COVERED**
Employment or service agreements providing Russian/Eastern European nationals with remote access to production systems containing covered data = covered employment/contractor transactions under § 202.202(c). **Prohibited transaction if contractors are Russian government-affiliated; otherwise restricted.**

**Transaction C — Sovereign Wealth Fund Investment: POTENTIALLY COVERED**
Investment transactions from covered-country sovereign funds = covered under § 202.202(d) if the investment provides access to covered data or covered data systems (e.g., board seat, information rights, technical access). **URGENT: Do not proceed with any term sheet until DSP analysis complete.**

---

## IMMEDIATE RISK FLAGS 🔴

1. **Stop: Sovereign wealth fund term sheet** — Do not sign pending DSP legal review
2. **Urgent: Chinese-invested vendor** — Obtain full cap table and governance documents within 5 business days; suspend data flows pending analysis
3. **Urgent: Russian contractor access** — Audit current system access; implement access restrictions pending compliance program design
4. **→ PROCEED TO STEP 2: Prohibited vs. Restricted transaction classification and compliance options**`,
    },

    {
      id: 'dsp-02',
      num: '02',
      title: 'Prohibited vs. Restricted Transaction Classification',
      type: 'chain-step-2',
      chainId: 'dsp-chain-scope',
      chainTitle: 'Scope Analysis Chain',
      chainStep: 'Step 2 of 2',
      prevPromptId: 'dsp-01',
      tags: ['Prohibited Transactions', 'Restricted Transactions', '§ 202.203', '§ 202.204'],
      model: 'Claude Opus 4',
      time: '8–10 min',
      description: 'Classifies identified covered transactions as prohibited or restricted, and determines available compliance paths for restricted transactions.',
      prompt: `You are a national security data compliance attorney. Using the covered transactions identified in Step 1, conduct the prohibited/restricted/exempt classification analysis under 28 CFR §§ 202.203–202.205.

CLASSIFICATION FRAMEWORK:

**PROHIBITED TRANSACTIONS (§ 202.203) — No compliance path available:**
The following are categorically prohibited:
— Any covered data transaction with a "prohibited country" counterparty (certain foreign government entities, entities on OFAC SDN list, certain Chinese military-industrial complex companies)
— Data brokerage transactions to covered persons (no exceptions)
— Bulk transfer of covered data to covered persons above thresholds with no legitimate business justification
Prohibited transactions cannot be licensed or exempted except by specific NSPM or waiver from AG.

**RESTRICTED TRANSACTIONS (§ 202.204) — Permissible subject to security requirements:**
Restricted transactions are permitted if the covered person complies with security requirements in 28 CFR Part 202 Subpart C and applicable CISA Security Requirements. Categories:
(a) Vendor agreements with restricted-country counterparties (not prohibited entities)
(b) Employment/contractor arrangements with covered-country nationals
(c) Investment transactions below 50% control threshold

**SECURITY REQUIREMENTS FOR RESTRICTED TRANSACTIONS (§ 202.301):**
— Data minimisation: provide covered person with only minimum data necessary
— Data masking/pseudonymisation where possible
— Access controls: role-based access, MFA, audit logging
— Contractual controls: data use limitations, prohibition on onward transfer
— Annual certification by the covered person
— Ongoing monitoring

**EXEMPTIONS (§ 202.205) — Neither prohibited nor restricted:**
— Transactions ordinarily incident to travel
— Personal communications not involving data brokerage
— Official US government business
— Investment agreements that do not provide access to covered data or covered data systems
— Intra-entity transactions within a wholly US-owned corporate family

FOR EACH IDENTIFIED TRANSACTION FROM STEP 1:
1. Apply prohibited/restricted/exempt classification
2. If restricted: identify which § 202.301 security requirements apply
3. If potentially prohibited: identify whether any waiver mechanism exists
4. State the business impact of each classification
5. Recommend the compliance approach

ALSO ANALYSE:
— Whether an NSPM-33 compliance program framework applies
— Whether voluntary self-disclosure to DOJ is advisable for any past potential violations
— Timeline for achieving compliance on restricted transactions`,
      expectedOutput: `## TRANSACTION CLASSIFICATION & COMPLIANCE PATHS
*28 CFR §§ 202.203–202.205 | [DATE] | ATTORNEY-CLIENT PRIVILEGE*

---

## CLASSIFICATION TABLE

| Transaction | Classification | Compliance Path | Business Impact |
|-------------|---------------|-----------------|-----------------|
| Chinese-invested vendor (minority, no board seat) | **RESTRICTED** — § 202.204 | Security requirements + contractual controls + annual cert | Vendor relationship may continue with controls |
| Chinese-invested vendor (if board seat or 50%+ control) | **PROHIBITED** — § 202.203 | **None — must terminate** | Terminate data flows immediately |
| Russian contractor access (government-unaffiliated) | **RESTRICTED** — § 202.204(c) | Access controls, MFA, audit logs, data minimisation | Contractor may continue with limited access |
| Russian contractor (if FSB/SVR-affiliated) | **PROHIBITED** — § 202.203 | **None** | Immediate termination required |
| Sovereign wealth fund (China/Russia) — data access investment | **PROHIBITED** — § 202.203 | AG waiver only (narrow) | Do not proceed with term sheet |
| Sovereign wealth fund — passive financial only, no data access | **EXEMPT** — § 202.205 | No controls required | Standard investment diligence only |

---

## RESTRICTED TRANSACTION COMPLIANCE REQUIREMENTS

**For Chinese-invested vendor (minority, no governance rights):**

*Required under § 202.301:*
1. **Data minimisation contract amendment:** Vendor contract must be amended to limit data provided to minimum necessary for contracted service. Identify what US covered data the vendor currently receives and whether it can be reduced.
2. **Pseudonymisation requirement:** US persons' identifiers must be pseudonymised or tokenised before providing to vendor where technically feasible.
3. **Access controls:** Vendor must implement and certify: MFA for all personnel accessing covered data, role-based access controls, audit logs retained 3 years.
4. **Contractual prohibition on onward transfer:** Vendor may not provide US covered data to any other covered person or entity without controller's prior written consent.
5. **Annual certification:** Vendor must annually certify compliance with security requirements.
6. **Controller monitoring:** Company must conduct annual review of vendor's compliance with these requirements.

*Implementation timeline:* 90 days to execute amended vendor agreement; 30 days to implement access controls.

**For Russian contractors:**

*Required:*
1. Audit current access — which covered data systems can contractors access?
2. Implement data segmentation: production systems with covered US data should be isolated; contractors work only in segregated environments with pseudonymised or synthetic data where possible.
3. MFA and audit logging on all contractor access sessions.
4. Contractor agreement amendments with data use limitations.
5. Monthly access review.

---

## VOLUNTARY SELF-DISCLOSURE ANALYSIS

The DOJ has indicated that voluntary self-disclosure of DSP violations will be a significant factor in penalty determination. If the company has been operating any transactions that would now be classified as prohibited (without knowing they were covered transactions), **early voluntary disclosure before any DOJ inquiry begins carries substantially lower penalty risk.**

**Recommendation:** If any current transactions are classified as prohibited, retain outside counsel with national security expertise and engage in DOJ voluntary disclosure process before terminating transactions (the manner of termination matters).

---

## PRIORITY ACTIONS

| Action | Owner | Timeline |
|--------|-------|----------|
| Full audit of Chinese-invested vendor cap table and governance docs | Legal + Finance | 5 business days |
| Suspend new data flows to Russian contractors pending analysis | Engineering + Legal | **Immediate** |
| Do not execute sovereign wealth fund term sheet | CEO + Board | **Immediate** |
| Engage national security outside counsel | GC/CGO | 3 business days |
| Begin § 202.301 security requirements implementation plan | Security + Legal | 30 days |`,
    },

    {
      id: 'dsp-03',
      num: '03',
      title: 'Bulk Data Threshold Calculator & Data Inventory',
      type: 'standalone',
      tags: ['Thresholds', '§ 202.201', 'Data Inventory', 'Quantification'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '5–7 min',
      description: 'Builds a structured methodology for calculating whether data volumes meet DSP bulk thresholds, including edge cases like joint processing and aggregation.',
      prompt: `You are a DSP compliance attorney. Design a bulk data threshold calculation methodology for a health technology company to determine whether its data volumes meet 28 CFR § 202.201 coverage thresholds.

THRESHOLD REFERENCE (28 CFR § 202.201 definitions):
— Genomic data: more than 100 US persons
— Biometric identifiers: more than 1,000 US persons
— Personal health data: more than 10,000 US persons
— Precise geolocation: more than 1,000 US devices/vehicles in a calendar year
— Financial data (defined): more than 10,000 US persons
— Covered personal identifiers (combined with other covered data): more than 100,000 US persons

CALCULATION METHODOLOGY TASK:
Design a step-by-step process the company's data and legal teams can use to:

1. **US PERSON DETERMINATION**
— How to identify "US persons" in the dataset (citizenship vs. residency vs. IP address vs. billing address — which is correct under the DSP definitions?)
— What if user nationality is unknown? Provide safe harbour methodology
— Can the company rely on user-provided country of residence?

2. **BIOMETRIC IDENTIFIER SCOPE**
Under the DSP, "biometric identifiers" means measurable biological or behavioural characteristics used to identify specific individuals. Assess:
— Do heart rate measurements constitute biometric identifiers under the DSP definition?
— Do HRV (heart rate variability) patterns qualify?
— Do sleep stage classifications qualify?
— What about app-derived "stress scores" — are these biometric identifiers or personal health data?
Provide a conservative and a permissive interpretation with legal risk assessment of each.

3. **CONTINUOUS PROCESSING — HOW TO COUNT**
The thresholds apply to data "maintained" or "processed" — does this mean:
— Unique data subjects at any point? Or maximum concurrent?
— In a 12-month rolling period?
— Per data category independently (so a single user could count toward multiple threshold categories)?

4. **DATA MINIMISATION AS THRESHOLD STRATEGY**
Can the company deliberately structure data processing to stay below thresholds? Analyse:
— Is intentional structuring to avoid DSP coverage permissible?
— What does the DOJ's ANPRM/Final Rule say about structuring?
— Safe threshold management vs. prohibited evasion

5. **CALCULATION WORKSHEET**
Create a structured worksheet with formulas/questions the compliance team can complete annually to document threshold determinations.

OUTPUT: Calculation methodology + worksheet template + legal risk assessment of threshold positions`,
      expectedOutput: `## DSP BULK DATA THRESHOLD CALCULATION METHODOLOGY
*28 CFR § 202.201 | HealthTech Platform Compliance Tool | Version 1.0*

---

## 1. US PERSON DETERMINATION METHODOLOGY

**Correct standard under DSP:** "US persons" means US citizens and lawful permanent residents, wherever located globally. The DSP does not use IP address or billing address as a proxy.

**Practical methodology (in order of reliability):**
1. User-declared citizenship at registration → highest reliability if Terms require accurate disclosure
2. User-declared country of residence + cross-reference with IP geolocation → medium reliability
3. IP address alone → not sufficient; only indicates location, not nationality

**Unknown nationality safe harbour:** Where nationality cannot be determined, the DOJ's Final Rule preamble indicates a conservative approach: treat as US person if (a) US billing address, OR (b) persistent US IP address, OR (c) any self-identification with US. Document the methodology used.

---

## 2. BIOMETRIC IDENTIFIER ANALYSIS — CONSERVATIVE VS. PERMISSIVE

| Data Type | Conservative Position | Permissive Position | Recommended |
|-----------|----------------------|---------------------|-------------|
| Heart rate (raw measurement) | Biometric identifier — individual physiological characteristic | Not a biometric identifier — point-in-time measurement, not used for identification | **Treat as biometric — threshold applies** |
| HRV patterns | Biometric identifier — unique individual physiological signature | Not biometric — aggregate metric | **Treat as biometric** |
| Sleep stage data | Personal health data (less likely biometric identifier) | Neither — behavioural, not biological | **Treat as health data** |
| AI-derived stress score | Personal health data (derived inference) | Not biometric — algorithmic output | **Treat as health data** |

**Legal risk note:** Taking a permissive position on biometric identifier definition without DOJ guidance exposes the company to retroactive DSP violation findings. Given the company already clearly exceeds health data thresholds, the biometric identifier question is academically relevant but does not change the compliance obligation.

---

## 3. THRESHOLD CALCULATION WORKSHEET

```
DSP THRESHOLD CALCULATION — ANNUAL COMPLIANCE WORKSHEET
Period: [12 months ending DATE]
Completed by: [NAME / TITLE]  |  Reviewed by: [LEGAL]

STEP 1: US PERSON COUNT
Total registered users: ___________
Users with confirmed US citizenship or LPR status: ___________
Users with US billing address (nationality unknown): ___________
Conservative US person count (sum): ___________

STEP 2: THRESHOLD ANALYSIS BY DATA CATEGORY
                           Threshold    Company Count    Threshold Met?
Genomic data               >100         ___________      Y / N
Biometric identifiers      >1,000       ___________      Y / N  
Personal health data       >10,000      ___________      Y / N
Precise geolocation        >1,000       ___________      Y / N
Financial data             >10,000      ___________      Y / N
Covered personal IDs       >100,000     ___________      Y / N

STEP 3: COVERED TRANSACTION SCREENING
Any counterparty that is a covered person (Y/N): ___
If Y — covered transaction exists: ___
Transaction type (§ 202.202 category): ___________
Prohibited / Restricted / Exempt: ___________

CERTIFICATION:
I certify that the above calculations are based on [methodology] and accurately reflect data processing as of [date].
Signature: ___________  Date: ___________
```

---

## 4. STRUCTURING RISK ASSESSMENT

Intentional data minimisation below thresholds **is permissible** if it reflects genuine business practice and data minimisation principles. The DOJ Final Rule does not prohibit threshold management.

**NOT permissible:** Artificial fragmentation of data processing (e.g., splitting one dataset across multiple entities to stay below threshold per entity) where the entities share common ownership or control. This would likely be treated as a single covered transaction for threshold purposes.

**Recommendation:** If the company can genuinely reduce US health data retention (e.g., delete after 6 months instead of 2 years) for legitimate product and privacy reasons, this simultaneously reduces DSP threshold exposure and improves GDPR data minimisation compliance.`,
    },

    {
      id: 'dsp-04',
      num: '04',
      title: 'Vendor Agreement DSP Compliance Review',
      type: 'chain-step-1',
      chainId: 'dsp-chain-vendor',
      chainTitle: 'Vendor Due Diligence Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'dsp-05',
      tags: ['Vendors', 'Due Diligence', '§ 202.204', 'Contracts'],
      model: 'Claude Sonnet 4 or Harvey',
      time: '7–10 min',
      description: 'Reviews a vendor relationship for DSP exposure — ownership, beneficial control, country of concern nexus, and data access scope.',
      prompt: `You are a national security and data compliance attorney. Conduct a DSP vendor due diligence analysis for a third-party service provider.

VENDOR PROFILE:
[Insert vendor name and description. Example: "CloudAnalytics Ltd — provides product analytics and user behaviour analysis services. Processes clickstream and usage data for approximately 8 million US users. Incorporated in Ireland. Principal investor: Chinese technology company holding 23% equity stake. No board representation. Contract value: $1.2M/year. Has access to raw event data including user IDs, device identifiers, session data, and health metric engagement events."]

PART 1 — OWNERSHIP & CONTROL ANALYSIS

Under 28 CFR § 202.201, a "covered person" includes any entity in which a Country of Concern national owns, directly or indirectly, 10% or more of the equity interest or voting shares; or any entity owned, controlled, or subject to the direction of a Country of Concern government.

Analyse:
— Direct ownership: Is any Country of Concern entity a 10%+ shareholder?
— Indirect ownership: Trace ownership chain — is any CoC entity in the chain?
— Control without majority: Does any CoC entity have:
  (a) Board representation rights?
  (b) Veto rights over material business decisions?
  (c) Information rights that would provide access to covered data?
  (d) Rights to appoint key technical personnel?
— Debt instruments: Do any CoC-affiliated lenders have conversion rights or security interests that could provide data access?

PART 2 — DATA ACCESS SCOPE

Determine whether the vendor's data access reaches DSP-covered data:
— Map what data the vendor actually receives: categories, volume, US person count
— Does any CoC-affiliated investor have contractual rights to access vendor's data?
— Does the vendor share or sub-process data with any CoC-affiliated entities?
— Does vendor store data in any CoC jurisdiction?

PART 3 — TRANSACTION CLASSIFICATION

Based on Parts 1 and 2:
— Is this a covered data transaction?
— If yes: prohibited or restricted?
— What contractual changes are required for restricted transaction compliance?

PART 4 — DUE DILIGENCE CHECKLIST

Generate a due diligence request list for the vendor covering:
— Corporate documents (cap table, shareholder agreements, articles of association)
— Investor agreements (information rights, board rights, data rights)
— Sub-processor list and their ownership chains
— Data storage and processing locations
— Technical architecture for data access controls`,
      expectedOutput: `## DSP VENDOR DUE DILIGENCE REPORT
*CloudAnalytics Ltd | 28 CFR Part 202 | [DATE] | PRIVILEGED & CONFIDENTIAL*

---

## PART 1 — OWNERSHIP ANALYSIS

**Direct ownership finding:** Chinese technology company holds 23% equity → **exceeds 10% threshold under § 202.201 definition of "covered person."** CloudAnalytics Ltd is therefore a covered person for DSP purposes regardless of board representation.

**Control analysis:**
- Board representation: None confirmed — **but must verify via shareholder agreement** (side letters sometimes contain de facto board rights without formal seat)
- Information rights: **UNKNOWN — must obtain investor agreement.** If Chinese investor has contractual right to receive financial reports, operational data, or product data → this information right itself may constitute a covered data transaction if company data flows through
- Veto rights: Unknown — obtain articles of association and shareholder agreement

**Key risk:** Even without board seat, a 23% investor in an EU analytics company that processes US persons' health-adjacent data is a covered person. The question is whether the arrangement constitutes a covered data transaction — which depends on whether the Chinese investor has any form of access to the covered data CloudAnalytics processes.

---

## PART 2 — DATA ACCESS SCOPE

**Data CloudAnalytics receives:**
- User IDs + device identifiers = **covered personal identifiers** (§ 202.201)
- Health metric engagement events (e.g., "user viewed stress score," time spent on health dashboard) = arguably **personal health data** through inference
- Session data for ~8M US users = **covered personal identifier threshold exceeded** (>100,000)

**Conclusion:** CloudAnalytics processes covered personal data above applicable thresholds. **This is a covered data transaction.**

**Sub-processor risk:** Obtain CloudAnalytics sub-processor list — if any sub-processor is also CoC-affiliated, the data chain analysis must continue.

---

## PART 3 — TRANSACTION CLASSIFICATION

**Classification: RESTRICTED TRANSACTION** (assuming Chinese investor has no 50%+ control or prohibited-list status)

Required actions for compliance:
1. **Immediate:** Determine whether Chinese investor has any information rights or data access rights → if yes, this may escalate to PROHIBITED
2. **30 days:** Amend vendor contract to include DSP security requirements (§ 202.301)
3. **60 days:** Implement data minimisation — pseudonymise user IDs before sending to CloudAnalytics; reduce health engagement data to aggregated form where possible
4. **90 days:** Annual certification mechanism in contract

---

## PART 4 — DUE DILIGENCE REQUEST LIST

**Immediate requests to CloudAnalytics:**

1. Complete current cap table (all shareholders, ownership percentages, classes of shares)
2. Full shareholder agreement including all side letters and supplementary agreements
3. Details of all information rights granted to investors
4. Current sub-processor list with parent company ownership information
5. Data storage locations (all data centers, regions, jurisdictions)
6. Technical description of which personnel have access to customer data
7. Incident response and breach notification procedures
8. Most recent SOC 2 report or equivalent security certification
9. Details of any government orders, requests, or inquiries received in last 24 months

**Timeline:** Request all documents within 10 business days. Suspend new data flows to CloudAnalytics pending review completion.`,
    },

    {
      id: 'dsp-05',
      num: '05',
      title: 'DSP Security Requirements Implementation',
      type: 'chain-step-2',
      chainId: 'dsp-chain-vendor',
      chainTitle: 'Vendor Due Diligence Chain',
      chainStep: 'Step 2 of 2',
      prevPromptId: 'dsp-04',
      tags: ['Security Requirements', '§ 202.301', 'CISA', 'Technical Controls'],
      model: 'Claude Sonnet 4',
      time: '8–10 min',
      description: 'Drafts the security requirements addendum to the vendor contract and the internal technical implementation checklist for restricted transaction compliance.',
      prompt: `You are a national security data compliance attorney working with the company's security team. Using the vendor due diligence findings from Step 1, draft the DSP security requirements implementation package for a restricted transaction vendor relationship.

LEGAL FRAMEWORK:
28 CFR § 202.301 requires that restricted transactions comply with security requirements published by CISA (Cybersecurity and Infrastructure Security Agency). The CISA Security Requirements for restricted transactions include requirements in the following domains: (1) data minimisation and data masking, (2) access controls, (3) monitoring and audit logging, (4) data protection (encryption), (5) organisational requirements.

TASK 1 — CONTRACT AMENDMENT (DSP Security Addendum)
Draft a vendor contract addendum that:
— Identifies the vendor as a "covered person" under 28 CFR § 202.201
— Characterises the arrangement as a restricted transaction requiring security measures
— Imposes the following binding obligations on the vendor:
  (a) Data minimisation: vendor shall process only minimum covered data necessary for contracted services; shall implement technical controls to prevent access to covered data beyond contracted scope
  (b) Prohibition on onward transfer: vendor shall not transfer covered data to any other covered person, country of concern, or entity without prior written approval
  (c) Data masking/pseudonymisation: vendor shall process covered data in pseudonymised form where technically feasible; controller shall implement pseudonymisation before transmission
  (d) Access controls: vendor shall implement MFA, role-based access controls limiting covered data access to personnel requiring it; maintain a list of personnel with access
  (e) Audit logging: vendor shall maintain logs of all access to covered data systems for minimum 3 years; provide logs to controller on request
  (f) Annual certification: vendor shall provide annual written certification of compliance with these requirements
  (g) Incident notification: vendor shall notify controller within 24 hours of any actual or suspected unauthorised access to covered data
  (h) Audit rights: controller may audit vendor compliance with these requirements annually, including technical inspection
  (i) Termination: controller may terminate immediately upon vendor's breach of these requirements

TASK 2 — INTERNAL TECHNICAL CONTROLS CHECKLIST
Design a technical implementation checklist for the company's security and engineering teams covering:
— Pseudonymisation implementation: which identifiers to tokenise before sending to vendor
— API configuration: data fields currently sent vs. data fields required; eliminate excess fields
— Access monitoring: how to monitor what data the vendor is actually accessing
— Incident response trigger: what events trigger a DSP security incident report

TASK 3 — ANNUAL COMPLIANCE REVIEW TEMPLATE
Design an annual review process for restricted transaction vendors, including what to verify each year.`,
      expectedOutput: `## DSP SECURITY REQUIREMENTS PACKAGE
*CloudAnalytics Ltd — Restricted Transaction | 28 CFR § 202.301 | [DATE]*

---

## TASK 1 — CONTRACT SECURITY ADDENDUM

**ADDENDUM TO MASTER SERVICES AGREEMENT**
*DSP Security Requirements Addendum — [VENDOR NAME]*

This Addendum is entered into between [Company] ("Controller") and [CloudAnalytics Ltd] ("Vendor") as of [DATE] and is incorporated into and forms part of the Master Services Agreement dated [DATE] ("Agreement").

**1. DSP Classification**
The parties acknowledge that: (a) Controller processes covered data (as defined in 28 CFR § 202.201) including covered personal identifiers and personal health data of US persons above applicable bulk thresholds; (b) Vendor is a covered person under 28 CFR § 202.201 by virtue of [Chinese investor entity]'s ownership interest; (c) The services provided under the Agreement constitute a restricted transaction under 28 CFR § 202.204 subject to the security requirements of 28 CFR § 202.301 and applicable CISA Security Requirements.

**2. Data Minimisation**
Vendor shall: (a) process covered data solely to the extent necessary to perform the contracted analytics services; (b) implement technical controls that prevent Vendor personnel from accessing covered data fields not required for contracted services; (c) upon Controller's request, provide a data access inventory demonstrating which personnel accessed which covered data fields and when.

**3. Prohibition on Disclosure to Covered Persons**
Vendor shall not: (a) disclose, provide, or make accessible any covered data to [Chinese investor entity] or any affiliate thereof; (b) transfer covered data to any entity incorporated, headquartered, or with principal operations in a Country of Concern; (c) process covered data on infrastructure located in a Country of Concern. Vendor shall notify Controller immediately if it receives any request from a government or regulatory authority of a Country of Concern for access to covered data.

**4. Access Controls**
Vendor shall: (a) implement multi-factor authentication for all personnel accessing covered data or systems; (b) maintain role-based access controls limiting covered data access to personnel for whom such access is necessary; (c) maintain and provide to Controller upon request a current list of all personnel with access to covered data.

**5. Audit Logging and Retention**
Vendor shall: (a) implement comprehensive audit logging of all access to covered data and covered data systems; (b) retain audit logs for a minimum of three (3) years; (c) provide audit logs to Controller within five (5) business days of request.

**6. Annual Certification**
By [DATE] each year, Vendor shall provide Controller with a written certification signed by Vendor's [CISO/CTO] confirming compliance with all requirements of this Addendum, identifying any exceptions, and confirming that no covered data has been disclosed to any covered person.

---

## TASK 2 — TECHNICAL CONTROLS CHECKLIST

**Pseudonymisation Implementation:**
- [ ] Replace raw User IDs with rotating pseudonymous tokens before sending events to CloudAnalytics
- [ ] Strip or hash email addresses from all analytics events
- [ ] Ensure health metric field names are generic (not diagnostically informative) in event payloads
- [ ] Implement server-side filtering to remove fields not required for analytics (e.g., health score raw values)

**API Configuration Audit:**
Current fields sent → Required fields:
- `user_id` (raw) → Replace with `token_id` (pseudonymous)
- `email` → **Remove entirely**
- `health_score_value` → Replace with bucketed range (e.g., "low/medium/high")
- `session_health_events` → **Review each field; remove health-diagnostic data**

**Monitoring:**
- [ ] Implement egress monitoring: alert if data volume sent to CloudAnalytics exceeds expected baseline by >20%
- [ ] Quarterly review of CloudAnalytics data access logs

---

## TASK 3 — ANNUAL VENDOR REVIEW TEMPLATE

| Review Item | Method | Pass Criteria |
|-------------|--------|---------------|
| Chinese investor ownership % unchanged | Obtain updated cap table | <50% and no new governance rights |
| Certification received | Obtain signed annual certification | Signed by CISO/CTO, no material exceptions |
| Sub-processor list reviewed | Request updated list | No new CoC-affiliated sub-processors |
| Audit log spot-check | Request sample of access logs | No unexpected access patterns |
| Data fields audit | Technical review of API payloads | No unconsented health-diagnostic data in payload |
| Incident history | Request incident register | No unreported incidents |`,
    },

    {
      id: 'dsp-06',
      num: '06',
      title: 'Employee & Contractor Access Policy',
      type: 'standalone',
      tags: ['Employment', '§ 202.202', 'Contractors', 'HR Policy'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '6–8 min',
      description: 'Designs an employment and contractor screening and access policy for DSP compliance, including covered person identification and ongoing monitoring.',
      prompt: `You are a national security data compliance attorney. Design a comprehensive employee and contractor access policy for DSP compliance under 28 CFR § 202.202(c).

LEGAL CONTEXT:
Under the DSP, an employment agreement, contractor arrangement, or other work arrangement that provides a covered person with access to covered data constitutes a covered transaction. Depending on the classification, this may be prohibited (if the covered person is affiliated with a prohibited entity or Country of Concern government) or restricted (requiring security measures).

COMPANY PROFILE:
— Health technology company with covered data above applicable thresholds
— Workforce includes employees in US, EU, UK; remote contractors globally
— Engineering and data science roles have access to production systems containing US health data
— Current gaps: no nationality screening at hiring, no access segmentation by nationality, no ongoing monitoring

POLICY DESIGN REQUIREMENTS:

**PART 1 — SCREENING REQUIREMENTS**

Design a pre-employment/pre-engagement screening protocol covering:
— Which roles require DSP screening? (Define based on access to covered data systems — not all employees need screening)
— What information must be collected? (Nationality, citizenship, country of residence, prior employment in CoC government entities)
— Process for screening against prohibited entity lists (OFAC SDN, BIS Entity List, DOJ prohibited persons list)
— How to handle dual citizens or persons with historical CoC government employment
— Documentation requirements for screening decisions
— Legal constraints: screening must comply with employment discrimination laws — what can and cannot be asked?

**PART 2 — ACCESS SEGMENTATION ARCHITECTURE**

Design an access control architecture that:
— Identifies "covered data access roles" (roles with access to US persons' covered data above thresholds)
— Creates an access tier system: (Tier 1) No covered data access; (Tier 2) Access to pseudonymised/aggregated data; (Tier 3) Access to identified covered data
— Specifies that covered persons may only hold Tier 1 or Tier 2 roles unless restricted transaction security requirements are fully implemented
— Defines process for moving an existing employee from Tier 3 to Tier 2 (technical remediation)

**PART 3 — ONGOING MONITORING**

Design an ongoing compliance programme:
— Annual re-certification by employees in Tier 2/3 roles
— Trigger events requiring immediate review (change in citizenship, new CoC government affiliation, foreign travel to CoC)
— Process for handling a current employee discovered to be a covered person
— Off-boarding procedure to ensure covered person access is fully revoked

**PART 4 — POLICY DOCUMENT DRAFT**

Draft a concise internal policy document ("Data Security Program — Workforce Access Policy") suitable for distribution to HR, Legal, and Security teams.`,
      expectedOutput: `## DATA SECURITY PROGRAM — WORKFORCE ACCESS POLICY
*28 CFR Part 202 | Version 1.0 | [DATE] | INTERNAL — CONFIDENTIAL*

**Approved by:** [CEO / Board] | **Owner:** Chief Governance Officer + CISO | **Next Review:** [DATE + 12 months]

---

## 1. PURPOSE AND SCOPE

This Policy establishes requirements for screening, access management, and monitoring of employees and contractors who access systems or data covered by the DOJ Data Security Program (28 CFR Part 202). Failure to comply may constitute a covered data transaction with a covered person, which is either prohibited or requires implementation of security measures.

This Policy applies to: all full-time employees, part-time employees, contractors, consultants, interns, and third-party personnel who access company IT systems.

---

## 2. COVERED DATA ACCESS TIERS

| Tier | Description | Access to Covered Data? | Screening Required? |
|------|-------------|------------------------|---------------------|
| Tier 1 | No access to systems processing US covered data | No | No DSP screening required |
| Tier 2 | Access to pseudonymised/aggregated US covered data only | Indirect | Basic screening |
| Tier 3 | Access to identified US covered data (production systems, raw health data) | Direct | Full DSP screening required |

**Tier 3 roles (examples):** Backend engineers with production database access, data scientists with access to raw user datasets, DevOps/SRE with production infrastructure access, DBA, security team.

---

## 3. PRE-EMPLOYMENT SCREENING

**For Tier 2 and Tier 3 roles, collect and review before start date:**

*What may be collected:*
- Nationality and citizenship (all citizenships held)
- Country of current and prior residence (5 years)
- Prior employment with any government or government-affiliated entity
- Ownership or leadership roles in entities incorporated in Countries of Concern

*Legal constraint — employment discrimination:* Nationality screening must be applied consistently to all candidates for covered roles. Decisions may be based on *access requirements and national security compliance obligations*, not on national origin as such. Document the legal basis for each access restriction decision. Engage employment counsel before implementing screening programme.

*Prohibited entity check:*
Screen name and prior employers against: OFAC SDN List, BIS Entity List, DOJ National Security Division guidance on prohibited entities. Use a third-party compliance screening service with automatic list updates.

**Decision matrix:**
- Country of Concern national with no CoC government affiliation → Tier 2 maximum; Tier 3 requires restricted transaction security measures
- Prior CoC government employment → Legal review required before hire into any covered data role
- SDN / prohibited entity match → Do not engage; notify Legal immediately

---

## 4. CURRENT EMPLOYEE REMEDIATION

If a current Tier 3 employee is identified as a covered person:
1. Notify Legal within 24 hours
2. Do not immediately terminate access (may trigger other obligations — consult Legal)
3. Within 5 business days: determine whether restricted transaction security measures can be implemented for this individual's access
4. If restricted transaction path available: implement § 202.301 controls, document as restricted transaction
5. If prohibited transaction: Legal to advise on termination of access and employment law obligations

---

## 5. ONGOING MONITORING AND ANNUAL RE-CERTIFICATION

Tier 2/3 employees complete annual re-certification confirming:
- No change in citizenship or national status
- No new employment or financial relationship with CoC government entities
- Understanding of data handling obligations

Immediate notification required to Legal/HR for:
- Acquisition of CoC citizenship or residency
- New employment, board role, or significant financial interest in CoC-affiliated entity
- Receipt of request from CoC government regarding company data

---

## 6. OFF-BOARDING

Upon separation from Tier 2/3 roles:
- All access credentials revoked on last day (not after)
- Access logs retained per retention policy
- Separation agreement to include confidentiality of covered data accessed during employment`,
    },

    {
      id: 'dsp-07',
      num: '07',
      title: 'Scope Limitation Strategy — No Covered Transactions',
      type: 'standalone',
      tags: ['Scope Limitation', 'Strategy', 'Argumentation', 'Audit Defence'],
      model: 'Claude Opus 4',
      time: '8–10 min',
      description: 'Develops a legal argument that certain business arrangements do not constitute covered data transactions, for use in regulatory inquiries and audit defence.',
      prompt: `You are a national security data compliance attorney specialising in regulatory defence. The company has received a preliminary inquiry from the DOJ NSCD (National Security Division) questioning whether certain business arrangements may constitute covered data transactions requiring compliance under 28 CFR Part 202.

SCENARIO:
The company argues that two of its arrangements are NOT covered transactions:

Arrangement 1: A data analytics agreement with a European company that has a Chinese minority investor (15%). The company argues: (a) the analytics vendor processes only pseudonymised event data without direct health data access; (b) the Chinese investor has no board rights, no information rights, and no contractual right to access customer data; (c) the vendor is subject to EU GDPR which independently prohibits disclosure to third parties; (d) the vendor's technical architecture prevents any investor access to processed data.

Arrangement 2: Remote contractor access for engineers based in Russia. The company argues: (a) contractors work exclusively in a sandboxed development environment with synthetic/test data only; (b) no access to production systems or real US person data; (c) access is monitored via endpoint management tools; (d) all work products are reviewed before being deployed to production.

TASK: Build the strongest possible legal argument that each arrangement does NOT constitute a covered transaction, or alternatively, that it falls within an exemption under § 202.205.

FOR EACH ARRANGEMENT, DEVELOP:

1. THE THRESHOLD ARGUMENT
— Does the arrangement involve "access" to covered data as defined in the DSP?
— What is the definition of "access" — does pseudonymisation break the access chain?
— Does sandbox/synthetic data environment mean no covered data is involved?

2. THE COVERED PERSON ARGUMENT
— For Arrangement 1: Does a 15% minority investor with no governance rights constitute a covered person "controlling" the vendor?
— What is the DOJ's interpretation of "owned, controlled, or subject to the direction of" a CoC government?
— Can contractual data protections substitute for structural ownership analysis?

3. THE EXEMPTION ANALYSIS
— Does § 202.205 offer any applicable exemption for either arrangement?
— Is there a "legitimate business purpose" carve-out that might apply?

4. RISK ASSESSMENT AND DEFENCE STRATEGY
— How strong is each argument? Rate 1–5 (1 = weak, 5 = very strong)
— What documentary evidence should be assembled to support each argument?
— What is the exposure if the DOJ rejects the argument?
— Recommendation: defend the position or proactively remediate?`,
      expectedOutput: `## DSP SCOPE LIMITATION LEGAL ANALYSIS
*Regulatory Defence Memorandum | [DATE] | ATTORNEY-CLIENT PRIVILEGE*

---

## ARRANGEMENT 1 — European Analytics Vendor (15% Chinese Investor)

### Argument 1: Pseudonymisation Breaks the "Access" Chain (Strength: 3/5)

The company's strongest argument is that pseudonymised event data does not constitute "covered data" accessible to the vendor. If user IDs are tokenised such that the vendor cannot re-identify users, and raw health data is aggregated before transmission, the vendor may not have "access" to covered personal data in the regulatory sense.

**Supporting analysis:** The DSP definition of "covered personal identifiers" requires that identifiers be "linked or linkable to a US person." Properly pseudonymised data with controller-held keys may not be "linkable" from the vendor's perspective.

**Weakness:** The DOJ has not issued formal guidance on pseudonymisation sufficiency. If the vendor has any technical capacity to reverse the pseudonymisation (e.g., through correlation with other data), the argument weakens substantially. **Do not rely on this argument without a technical audit confirming the pseudonymisation is operationally robust.**

### Argument 2: 15% Non-Controlling Minority Investor (Strength: 2.5/5)

The § 202.201 definition of covered person includes entities "owned, controlled, or subject to the direction of" a CoC person. The company argues a 15% passive investor without governance rights does not control the vendor.

**Supporting analysis:** There is a reasonable textual argument that 15% minority equity without board rights, veto rights, or information rights falls below the "control" threshold. The 10% ownership trigger in § 202.201 refers to the investor themselves being a covered person — it does not automatically make the investee company a covered person without a control analysis.

**Significant weakness:** The DOJ's framing focuses on *potential* influence, not just formal legal control. A 15% stake in a small analytics company may represent economic leverage disproportionate to the ownership percentage. **This argument is unlikely to succeed as a standalone defence if the DOJ is already inquiring.**

### Recommendation: PROACTIVELY REMEDIATE (do not rely on litigation defence)

Strength of combined arguments: **2.5/5** — insufficient for confident defence posture.

Recommended approach: Implement restricted transaction security measures proactively (cost: low — pseudonymisation already partially implemented). This eliminates the liability and allows the company to certify compliance, which is a significantly better regulatory posture than defending a borderline position under active inquiry.

---

## ARRANGEMENT 2 — Russian Contractors in Sandbox Environment

### Argument: No Covered Data in Sandbox (Strength: 4/5)

This is the company's stronger argument. If contractors access only synthetic/test data with no real US person data, there is no covered data involved in the transaction. The DSP covers access to "covered data" — if the data is genuinely synthetic (generated, not pseudonymised real data), it may fall outside the definition entirely.

**Key requirements for this argument to hold:**
1. Synthetic data must be computationally generated, not derived from real user data through anonymisation
2. Sandbox must be technically isolated — no ability to access production data or production systems
3. No pathway for production data to enter the sandbox environment (even temporarily)
4. Contractor work product (code) must be reviewed before production deployment — code review process must be documented

**Supporting evidence to assemble:**
- [ ] Technical architecture diagram of sandbox environment showing isolation from production
- [ ] Confirmation that synthetic data generation methodology uses no real user data as seed
- [ ] Access control logs demonstrating no production access by contractors
- [ ] Code review procedure documentation

**Remaining exposure:** If a single incident occurred where a contractor accessed production data (even accidentally), the arrangement becomes a covered transaction for that period. Review access logs for any historical production access before asserting this position.

### Recommendation: DEFEND WITH DOCUMENTATION (if sandbox is genuinely isolated)

Strength: **4/5** if documentation is complete and sandbox integrity can be demonstrated.

Document the synthetic data architecture and access controls in a formal technical compliance memorandum. Proactively share this with the DOJ inquiry team as part of a cooperative response posture. Cooperativeness in responding to DSP inquiries is a significant mitigating factor in any subsequent enforcement action.`,
    },

    {
      id: 'dsp-08',
      num: '08',
      title: 'DSP Compliance Program Framework',
      type: 'chain-step-1',
      chainId: 'dsp-chain-program',
      chainTitle: 'Compliance Program Chain',
      chainStep: 'Step 1 of 2',
      nextPromptId: 'dsp-09',
      tags: ['Compliance Program', '§ 202.401', 'Governance', 'Annual Certification'],
      model: 'Claude Sonnet 4',
      time: '8–12 min',
      description: 'Designs a complete DSP compliance program framework including policies, governance structure, training, and audit processes.',
      prompt: `You are a national security data compliance attorney. Design a comprehensive DOJ Data Security Program compliance program for a health technology company.

A well-designed DSP compliance program should demonstrate to the DOJ that the company has taken systematic, good-faith steps to identify and comply with its obligations. The DOJ's enforcement posture rewards documented, proactive compliance programs with substantially reduced penalties in cases of inadvertent violation.

COMPLIANCE PROGRAM COMPONENTS TO DESIGN:

**1. GOVERNANCE STRUCTURE**
— Who owns DSP compliance? (Recommend: designate a DSP Compliance Officer — can be GC, CGO, or CISO with legal oversight)
— Board-level oversight: what should the Board be briefed on and how often?
— Escalation path for identified covered transactions or potential violations
— Relationship between DSP compliance and OFAC/export control compliance programmes (overlap exists)

**2. POLICIES AND PROCEDURES**
Design the following policy documents:
(a) DSP Compliance Policy (top-level — scope, obligations, governance)
(b) Covered Data Inventory Procedure (annual threshold recalculation)
(c) Covered Person Screening Procedure (new vendors, investors, employees)
(d) New Business Activity Review Procedure (when does a new product/partnership require DSP review?)
(e) Incident and Potential Violation Procedure (when to escalate, when to self-disclose)

**3. TRAINING REQUIREMENTS**
— Who must receive DSP training? (Legal, HR, Procurement, Engineering leadership, Business Development/M&A, Finance/IR)
— Training content for each audience (not one-size-fits-all)
— Frequency and format
— Certification and documentation of completion

**4. TRANSACTION SCREENING PROCESS**
Design a transaction screening checklist for new business activities:
— Vendor onboarding: questions to identify covered persons
— Investment/M&A due diligence: DSP risk assessment
— New product features: covered data flow analysis
— New hires for data access roles: covered person screening

**5. AUDIT AND MONITORING**
— Annual internal audit scope
— Documentation to maintain and retention periods
— What constitutes a "material change" requiring immediate compliance review?

**6. VOLUNTARY SELF-DISCLOSURE FRAMEWORK**
— Criteria for when to self-disclose to DOJ NSCD
— Self-disclosure process and what to include
— Benefits and risks of self-disclosure

OUTPUT: Full compliance program framework with policy templates and implementation roadmap.`,
      expectedOutput: `## DSP COMPLIANCE PROGRAM FRAMEWORK
*28 CFR Part 202 | HealthTech Platform | Version 1.0 | [DATE]*

---

## 1. GOVERNANCE STRUCTURE

**DSP Compliance Officer:** Designate the Chief Governance Officer (CGO) as DSP Compliance Officer. The CGO has appropriate legal background, existing vendor oversight function, and access to executive leadership. Supported by: CISO (technical implementation), outside national security counsel (complex determinations).

**Board Oversight:**
- Annual DSP compliance briefing to Board (Audit Committee): covered data inventory status, covered transactions identified, security requirements implementation status, any DOJ inquiries or voluntary disclosures
- Immediate escalation to Board for: any identified prohibited transaction, any DOJ inquiry or investigation, any potential violation requiring self-disclosure decision

**Escalation Path:**
Business development team / Procurement / HR → CGO review → Outside counsel (if complex) → Board notification (if material)

---

## 2. POLICY FRAMEWORK

**Policy A — DSP Compliance Policy (Top Level)**
*Scope:* Applies to all business activities, transactions, and personnel arrangements involving covered data.
*Core principles:* (1) No prohibited transactions; (2) Restricted transactions only with implemented security measures; (3) All covered transactions documented; (4) Good faith compliance demonstrated through records.
*Review frequency:* Annual + upon material regulatory change.

**Policy B — New Business Activity Review Checklist**

Trigger events requiring DSP review before proceeding:
- [ ] New vendor agreement where vendor will access US user data
- [ ] New investor or material change in investor ownership structure
- [ ] Acquisition, joint venture, or partnership involving data access
- [ ] New hire or contractor for Tier 2/3 data access roles
- [ ] New product feature involving new data collection or new data sharing
- [ ] International expansion involving new data processing arrangements

For each trigger: complete Covered Transaction Screening Form → CGO review → document outcome.

---

## 3. TRAINING MATRIX

| Audience | Content | Frequency | Format |
|----------|---------|-----------|--------|
| Legal / CGO / CISO | Full DSP regulation + case studies + updates | Annual + regulatory updates | Live training with outside counsel |
| Procurement / Vendor Management | Covered person screening, vendor due diligence questions, contract requirements | Annual | E-learning + job aid |
| HR / Talent Acquisition | Employee/contractor screening, covered person determination, access tiers | Annual + at onboarding | E-learning + policy briefing |
| Business Development / M&A | Investment and partnership DSP risk analysis | Annual | Live training |
| Engineering Leadership | What is covered data, access tier requirements, sandbox requirements | Annual | Technical briefing |
| All employees (awareness) | What is the DSP, what to report, to whom | Annual | Short e-learning module |

---

## 4. VENDOR SCREENING FORM

*Complete for all new vendors with access to US user data:*

```
VENDOR DSP SCREENING FORM

Vendor name: _______________________
Country of incorporation: ___________
Ultimate parent company: ____________

Ownership screening:
1. Is any entity incorporated/headquartered in China, Russia, Iran, 
   North Korea, Cuba, or Venezuela a 10%+ owner? Y / N / Unknown
2. Does any CoC-affiliated entity hold board rights or information 
   rights? Y / N / Unknown  
3. Is the vendor or any parent/affiliate on OFAC SDN, BIS Entity 
   List, or DOJ prohibited list? Y / N (confirm via screening tool)

Data access:
4. Will vendor access US persons' data? Y / N
5. If yes, data categories: _____________
6. Estimated US person count: __________
7. Thresholds exceeded? Y / N

Determination:
[ ] Not a covered transaction (no covered person / no covered data)
[ ] Covered transaction — RESTRICTED — proceed with security addendum
[ ] Covered transaction — POTENTIAL PROHIBITED — escalate to CGO + outside counsel
[ ] Uncertain — escalate for legal review

Completed by: _____________ Date: _______ CGO sign-off: _________
```

---

## 5. VOLUNTARY SELF-DISCLOSURE CRITERIA

**Self-disclose when:**
(1) A prohibited transaction is discovered that has already occurred
(2) A restricted transaction existed without required security measures in place
(3) The company receives external inquiry suggesting DOJ awareness of a potential violation

**Benefits of early self-disclosure:** DOJ guidance indicates significantly reduced civil monetary penalties and potential avoidance of criminal referral for good-faith self-reporters with remediation.

**Process:** Retain outside national security counsel before disclosure. Disclosure should include: description of transaction, period of non-compliance, covered data involved, measures implemented to remediate, compliance program changes.`,
    },

    {
      id: 'dsp-09',
      num: '09',
      title: 'Board Compliance Certification Package',
      type: 'chain-step-2',
      chainId: 'dsp-chain-program',
      chainTitle: 'Compliance Program Chain',
      chainStep: 'Step 2 of 2',
      prevPromptId: 'dsp-08',
      tags: ['Board Reporting', 'Certification', 'Governance', 'Executive'],
      model: 'Claude Sonnet 4 or GPT-4o',
      time: '6–8 min',
      description: 'Drafts the annual Board compliance certification, executive summary, and audit committee presentation for DSP compliance.',
      prompt: `You are a national security data compliance attorney. Prepare the annual DSP compliance certification package for presentation to the Board of Directors and Audit Committee.

The purpose of this package is to: (1) document the company's compliance status; (2) obtain Board-level awareness and sign-off on the compliance programme; (3) create a record of good-faith compliance demonstrating that senior management has reviewed and certified DSP obligations. This record is material in any DOJ enforcement action.

PACKAGE COMPONENTS:

**DOCUMENT 1 — EXECUTIVE COMPLIANCE SUMMARY (2 pages max)**
Non-technical summary for Board members covering:
— What the DSP is and why it applies to this company (2–3 sentences)
— Current compliance status: green / amber / red
— Key covered transactions identified and their status
— Material risks and mitigations
— Actions required from the Board (e.g., approval of compliance policy, budget)
— Attestation that management has completed required compliance activities

**DOCUMENT 2 — COVERED TRANSACTION REGISTER**
Current register of all identified covered transactions:
— Transaction type and counterparty (pseudonymised for external presentation)
— Prohibited / Restricted classification
— Security measures status: implemented / in progress / planned
— Due date for full implementation
— Responsible owner

**DOCUMENT 3 — ANNUAL COMPLIANCE CERTIFICATION**
A formal certification document to be signed by: CEO, CGO/GC, CISO.
Certifying: (a) the company has conducted a covered data threshold analysis; (b) covered transactions have been identified and classified; (c) prohibited transactions have been terminated or are being terminated; (d) restricted transactions have implemented or are implementing required security measures; (e) a DSP compliance programme is in place; (f) to the best of management's knowledge, no DSP violations exist that have not been disclosed.

**DOCUMENT 4 — AUDIT COMMITTEE PRESENTATION OUTLINE**
10-slide outline covering: regulatory background, company exposure, transactions reviewed, compliance status dashboard, open items, budget request, and Board resolutions required.

CONSTRAINTS:
— Board-level language: avoid regulatory jargon; explain consequences in business terms
— The certification should be legally cautious — do not certify facts that have not been verified
— Include a materiality caveat and scope limitations on the certification`,
      expectedOutput: `## ANNUAL DSP COMPLIANCE PACKAGE — BOARD PRESENTATION
*[COMPANY NAME] | [DATE] | CONFIDENTIAL — BOARD MATERIAL*

---

## DOCUMENT 1 — EXECUTIVE COMPLIANCE SUMMARY

**What is the DSP and why does it apply to us?**
The DOJ Data Security Program (effective 2024) restricts US companies from sharing sensitive personal data of US citizens with entities connected to six designated countries (China, Russia, Iran, North Korea, Cuba, Venezuela). As a health technology platform processing health data, location data, and identifiers of millions of US users, we are subject to these rules. Non-compliance can result in civil penalties of up to $250,000+ per violation and potential criminal liability for wilful violations.

**Current Compliance Status: 🟡 AMBER — Active Remediation**

| Area | Status | Notes |
|------|--------|-------|
| Covered data thresholds | ✅ Determined | Exceeds thresholds in 4 categories |
| Covered transactions identified | ✅ Complete | 3 transactions identified |
| Prohibited transactions | ✅ No prohibited transactions confirmed | 1 under legal review |
| Restricted transaction security measures | 🟡 In progress | 60% complete; target [DATE] |
| Employee/contractor screening policy | 🟡 In progress | Policy drafted; implementation [DATE] |
| Compliance programme | ✅ Established | Board approval requested today |

**Key Risks:**
1. *Vendor with Chinese minority investor:* Legal review ongoing; security addendum being negotiated. No evidence of data access by investor. Low risk of DOJ enforcement if security measures implemented promptly.
2. *Russian contractors:* Sandbox isolation confirmed technically; contractor agreement amendments pending. Low-medium risk pending documentation.
3. *Sovereign wealth fund interest:* No term sheet signed. Legal review complete: deal as structured would be a covered (and likely prohibited) transaction. **Board direction: do not proceed with this investor on current terms.**

**Actions Required from Board Today:**
1. ✅ Approve DSP Compliance Policy
2. ✅ Approve FY[YEAR] DSP compliance budget: $[X] (outside counsel + screening tools + training)
3. ✅ Direct management not to proceed with sovereign wealth fund investment without further legal review
4. ✅ Sign Annual Compliance Certification (Document 3)

---

## DOCUMENT 2 — COVERED TRANSACTION REGISTER

| # | Transaction | Type | Classification | Security Measures | Status | Owner |
|---|-------------|------|---------------|-------------------|--------|-------|
| CT-001 | Analytics Vendor A (EU/CoC-invested) | § 202.202(b) Vendor | RESTRICTED | Pseudonymisation + contract addendum | 🟡 Addendum in negotiation | CGO |
| CT-002 | Engineering Contractors (Russia) | § 202.202(c) Employment | RESTRICTED | Sandbox isolation + contract amendment | 🟡 Documentation pending | CISO |
| CT-003 | Potential investor (SWF) | § 202.202(d) Investment | Potentially PROHIBITED | N/A — do not proceed | 🔴 Hold — Board direction needed | CEO + Legal |

---

## DOCUMENT 3 — ANNUAL COMPLIANCE CERTIFICATION

**ANNUAL DSP COMPLIANCE CERTIFICATION**
*[Company Name] | For the period ending [DATE]*

We, the undersigned officers of [Company Name], hereby certify, to the best of our knowledge and based on reasonable inquiry, that:

1. The Company has conducted a covered data threshold analysis in accordance with 28 CFR § 202.201 and has determined that it processes covered data above applicable thresholds in the following categories: biometric identifiers, personal health data, precise geolocation data, and covered personal identifiers.

2. The Company has conducted a covered transaction review of its vendor, employment, contractor, and investment arrangements and has identified the transactions set forth in the Covered Transaction Register dated [DATE].

3. No arrangement identified in the review constitutes a prohibited transaction under 28 CFR § 202.203, except as noted in the Register (CT-003 — pending Board direction to not proceed).

4. The restricted transactions identified in the Register are subject to ongoing implementation of security measures in accordance with 28 CFR § 202.301, as documented in the Register.

5. The Company has established a DSP compliance programme including a Compliance Policy, covered person screening procedures, and employee training, effective [DATE].

6. This certification is made in good faith based on information available as of the date hereof. It does not certify the completeness of the covered transaction review with respect to matters not known to management at this date.

**Chief Executive Officer:** _________________ Date: _______
**Chief Governance Officer:** _______________ Date: _______
**Chief Information Security Officer:** _____ Date: _______

---

## DOCUMENT 4 — AUDIT COMMITTEE PRESENTATION OUTLINE

*Slide 1:* DSP — What it is, why it matters, penalties
*Slide 2:* Why this company is subject — covered data thresholds exceeded
*Slide 3:* Covered transactions identified — CT-001, CT-002, CT-003
*Slide 4:* Compliance status dashboard (traffic light)
*Slide 5:* CT-001 — Vendor risk and remediation plan
*Slide 6:* CT-002 — Contractor risk and remediation plan
*Slide 7:* CT-003 — Investor risk — Board direction required
*Slide 8:* Compliance programme overview — policies, training, screening
*Slide 9:* Open items and timeline to full compliance
*Slide 10:* Budget request + Board resolutions`,
    },

    {
      id: 'dsp-10',
      num: '10',
      title: 'DOJ Audit Response & Regulator Communication',
      type: 'standalone',
      tags: ['Audit Response', 'DOJ', 'Regulatory', 'Enforcement Defence'],
      model: 'Claude Opus 4 or Harvey',
      time: '8–12 min',
      description: 'Prepares a response strategy and document production framework for a DOJ NSCD inquiry into potential DSP non-compliance.',
      prompt: `You are a national security data compliance attorney with enforcement defence experience. Your client (health technology company) has received a letter from the DOJ National Security Division (NSCD) requesting information about potential data security program compliance obligations.

THE LETTER STATES: "This Office has received information suggesting that [Company] may be engaged in covered data transactions involving covered persons under 28 CFR Part 202. We request that [Company] provide a written response within 30 days addressing: (1) a description of [Company]'s data processing activities; (2) any covered data transactions identified by [Company]; (3) measures taken to ensure compliance with 28 CFR Part 202; and (4) any other information [Company] deems relevant."

NOTE: This is an inquiry letter, not a subpoena or enforcement action. The company has not been accused of any violation.

DEVELOP A COMPREHENSIVE RESPONSE STRATEGY:

**PART 1 — INITIAL RESPONSE PROTOCOL (Days 1–5)**
— What to do immediately upon receipt: who to notify, how to preserve documents, whether to seek an extension
— Outside counsel engagement: what expertise is needed (national security + enforcement defence)
— Internal investigation scope: what to review before responding
— Document hold: what categories of documents should be preserved?

**PART 2 — LEGAL ANALYSIS OF RESPONSE OPTIONS**
Analyse the strategic options:

Option A — Full cooperative response
— Proactively disclose all covered transactions including any that may not fully comply
— Provide comprehensive compliance programme documentation
— Strategic advantages and risks

Option B — Limited factual response
— Provide the requested factual information; do not volunteer beyond the specific questions
— Reserve legal arguments for later
— Strategic advantages and risks

Option C — Deny coverage (scope limitation argument)
— Argue that company does not engage in covered transactions within the meaning of the DSP
— Only viable if scope limitation analysis is genuinely supportable
— Strategic advantages and risks

**PART 3 — DRAFT RESPONSE LETTER**
Draft a response letter that:
— Is cooperative in tone (enforcement cooperation matters significantly in DOJ matters)
— Provides accurate factual responses to the four inquiry questions
— Highlights the company's compliance programme and good-faith efforts
— Does not make legal admissions beyond what is necessary
— Requests a meeting with NSCD counsel to discuss the company's compliance approach
— Is signed by outside national security counsel (not internal counsel alone)

**PART 4 — DOCUMENT PRODUCTION STRATEGY**
If DOJ follows up with a formal document request:
— Which documents demonstrate compliance (should be produced promptly)
— Which documents are protected by attorney-client privilege or work product
— How to handle documents that reflect internal debates about whether certain transactions are covered
— Format and organisation of production

**PART 5 — ONGOING RELATIONSHIP MANAGEMENT**
— How to maintain a constructive dialogue with NSCD
— Proactive compliance briefings to regulators as a best practice
— What success looks like: closing the inquiry without enforcement action`,
      expectedOutput: `## DOJ NSCD INQUIRY — RESPONSE STRATEGY & DRAFT LETTER
*[Company Name] | [DATE] | ATTORNEY-CLIENT PRIVILEGE — DO NOT DISTRIBUTE*

---

## PART 1 — IMMEDIATE RESPONSE PROTOCOL

**Day 1:**
- [ ] CGO/GC to notify CEO and Board Chair
- [ ] Retain outside national security enforcement counsel today (do not respond without NS counsel)
- [ ] Issue internal document hold: all communications relating to vendor relationships with any CoC nexus, all investor communications, all contractor arrangements for CoC nationals, all data processing agreements
- [ ] Do NOT respond to the letter until outside counsel is engaged

**Day 2–3:**
- [ ] Request 15-day extension from NSCD (standard practice; routinely granted; signals cooperation without admission)
- [ ] Begin internal factual investigation with counsel: covered data threshold analysis, covered transaction inventory, security measures status
- [ ] Identify all documents responsive to the four inquiry questions

**Privilege protection:** All internal investigation communications should be directed through outside counsel. Mark all legal analysis documents "Attorney-Client Privilege / Attorney Work Product."

---

## PART 2 — STRATEGY ANALYSIS

**Recommended Strategy: Option A — Full Cooperative Response (with legal framing)**

Rationale: This is an inquiry letter, not an enforcement action. The NSCD is assessing whether an investigation is warranted. A cooperative, well-documented response that demonstrates good-faith compliance programme effort — even if the programme is not yet complete — substantially reduces the risk of escalation to formal enforcement.

The DOJ has repeatedly emphasised in public guidance that companies with documented compliance programmes receive significantly better treatment than those that appear to be concealing or minimising DSP exposure.

**Key principle:** Be accurate and cooperative; do not volunteer legal admissions; present the compliance narrative prominently.

Option C (deny coverage) is not recommended unless scope limitation analysis genuinely supports it and has been fully stress-tested by outside counsel. An unsupportable scope argument, once rejected by NSCD, eliminates good faith credit.

---

## PART 3 — DRAFT RESPONSE LETTER

**[OUTSIDE COUNSEL LETTERHEAD]**
[DATE]

National Security Division
U.S. Department of Justice
950 Pennsylvania Avenue, N.W.
Washington, D.C. 20530

**Re: Response to Inquiry Letter dated [DATE] — [Company Name] DSP Compliance**

Dear [Counsel]:

We write on behalf of [Company Name] ("Company") in response to your letter dated [DATE] requesting information regarding the Company's potential obligations under the DOJ Data Security Program (28 CFR Part 202). We appreciate the opportunity to provide this information and welcome the opportunity to discuss the Company's compliance approach directly with your office.

**Background**
[Company Name] is a Delaware-incorporated health technology company that operates a personal wellness platform used by approximately 16 million users globally. The Company processes certain categories of health and biometric data of US users in connection with providing its core services.

**Response to Inquiry Questions**

*1. Data Processing Activities:* The Company processes the following categories of personal data of US persons: [health data, biometric identifiers, geolocation data, personal identifiers — describe with volume ranges]. A detailed covered data threshold analysis, prepared at the direction of counsel, is attached as Exhibit A.

*2. Covered Data Transactions Identified:* The Company has conducted a thorough review of its vendor, employment, contractor, and investment arrangements. The Company has identified the arrangements set forth in Exhibit B as potential covered data transactions, together with the Company's legal characterisation of each as restricted or exempt. [Note: Use factual description; outside counsel to advise on how much to characterise vs. describe.]

*3. Compliance Measures:* The Company has established a DSP compliance programme, effective [DATE], which includes: a Compliance Policy approved by the Board of Directors; covered person screening procedures for new vendors, investors, and data access employees; security measures for identified restricted transactions; and staff training. Documentation of the compliance programme is attached as Exhibit C.

*4. Additional Information:* The Company wishes to emphasise its good-faith commitment to compliance. We respectfully request the opportunity for a meeting with your office to discuss the Company's compliance approach and to address any follow-up questions your office may have. We believe a direct discussion would be the most efficient way to address your concerns.

We remain available to provide any additional information your office requires.

Respectfully submitted,

[Outside Counsel Name]
[Firm]
Counsel to [Company Name]

---

## PART 4 — DOCUMENT PRODUCTION PRIORITIES

**Produce promptly — demonstrates compliance:**
- Board-approved DSP Compliance Policy
- Covered transaction register
- Security addenda signed with vendors
- Annual compliance certification
- Training completion records
- Covered data threshold analysis

**Protect — privilege applies:**
- Legal memos analysing whether specific transactions are covered
- Internal debates about scope limitation arguments
- Voluntary self-disclosure analysis
- Attorney notes and draft documents

**Handle carefully:**
- Internal emails describing transactions as "potentially covered" — factual; not privileged but context matters
- Business documents discussing Chinese investor relationship — produce with context

---

## PART 5 — SUCCESS METRICS

Inquiry closure without enforcement: achievable if (a) no prohibited transactions confirmed, (b) restricted transactions have implemented security measures, (c) compliance programme is documented and operational.

Timeline to closure: typically 3–9 months for a cooperative, well-documented response. Engage proactively; do not wait for follow-up requests.`,
    },

  ], // end DSP prompts
}, // end DSP library

}; // end PROMPT_LIBRARIES
