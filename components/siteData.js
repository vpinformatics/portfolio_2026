export const siteUrl = 'https://vpinformatics.in';

export const logoUrl = `${siteUrl}/VPInformatics-logo.png`;

export const orgData = {
  name: 'VP Informatics',
  legalName: 'VP Informatics',
  description:
    'VP Informatics helps manufacturing businesses reduce operational dependency, eliminate bottlenecks, and improve production visibility through custom software, automation, and industrial IoT systems.',
  url: siteUrl,
  email: 'vpinformatics365@gmail.com',
};

export const navLinks = [
  ['/#outcomes', 'Outcomes'],
  ['/#solutions', 'Solutions'],
  ['/#portfolio', 'Case Studies'],
  ['/#process', 'Process'],
  ['/#decision', 'Decision Framework'],
];

export const faqData = [
  ['Do we need to replace our ERP?', 'No. Most projects extend, automate, or integrate with existing systems. We eliminate the operational gaps around your ERP, spreadsheets, people, and production workflows.'],
  ['What happens if key personnel leave?', 'The objective is to move operational knowledge into workflows and systems so planning, approvals, allocation, and visibility remain consistent even when specific people are unavailable.'],
  ['Is custom software expensive?', 'The goal is measurable operational ROI, not software ownership. We focus on reducing long-term inefficiencies, manual dependency, repeated errors, and visibility gaps.'],
  ['What kind of companies are the best fit?', 'Manufacturers where planning, inventory, approvals, dispatch, or reporting still depend on spreadsheets, phone calls, manual decisions, or highly experienced employees.']
];

export const businessCards = [
  { icon: '⏱️', title: 'Production Planning', problem: 'Planning 3 complex production jobs required nearly 4 hours every day.', solution: 'Automated job orchestration and validation.', outcome: '4 Hours → 30 Minutes', points: ['8× Faster Planning', 'Better Delivery Confidence', 'Reduced Planning Bottlenecks'] },
  { icon: '📉', title: 'Material Optimization', problem: 'Material calculations depended on manual decisions.', solution: 'Intelligent sheet optimization and planning.', outcome: 'Up To 15% Waste Reduction', points: ['Lower Material Cost', 'Better Margin Control', 'Predictable Consumption'] },
  { icon: '🏭', title: 'Production Forecasting', problem: 'Shortages were discovered only after production delays occurred.', solution: 'Real-time machine input forecasting.', outcome: 'Predictive Production Visibility', points: ['Better Utilization', 'Earlier Bottleneck Detection', 'More Reliable Production Planning'] },
  { icon: '✅', title: 'Quality Control', problem: 'Manual approvals increased dispatch risk.', solution: 'Automated quality gates.', outcome: 'Controlled Production Release', points: ['Lower Rejection', 'Higher Process Discipline', 'Safer Dispatch Decisions'] },
  { icon: '📦', title: 'Inventory Visibility', problem: 'Inventory verification was manual.', solution: 'Live stock movement intelligence.', outcome: '99.8% Inventory Accuracy', points: ['Better Stock Confidence', 'Fewer Production Delays', 'Lower Verification Effort'] },
  { icon: '🚚', title: 'Smart Dispatch', problem: 'Dispatch planning consumed operational time.', solution: 'Automated logistics and trip execution.', outcome: 'Faster Shipment Release', points: ['Less Paperwork', 'Audit-Ready Operations', 'Faster Dispatch Execution'] }
];

export const portfolioSummary = [
  { id: 'printing-packaging', industry: 'Printing & Packaging', headline: 'End-to-end CRM to production, dispatch, and invoicing', outcome: 'Order-to-invoice visibility', items: [['CRM & Order Capture', 'Cleaner sales-to-production handoff'], ['Production Management', 'Planning, job cards, and status tracking'], ['Dispatch & Invoicing', 'Audit-ready shipment and billing flow']] },
  { id: 'pcb-electronics', industry: 'PCB / Electronics Manufacturing', headline: 'B2C order portal connected to admin production management', outcome: 'Portal-to-production control', items: [['B2C Order Intake', 'Customer orders captured digitally'], ['Admin Production Portal', 'Work allocation and stage tracking'], ['Quality & Traceability', 'Better visibility across batches and jobs']] },
  { id: 'textile-embroidery', industry: 'Textile / Embroidery / Job Work', headline: 'Complex cloth, yarn, pieces, manufacturing, and rate calculation', outcome: 'Consistent costing with less waste', items: [['Requirement Calculation', 'Color-wise cloth, yarn, and piece logic'], ['Rate & Job Work Engine', 'Repeatable pricing and production rules'], ['Waste Reduction Logic', 'Planning designed for least wastage']] },
  { id: 'iot-embroidery', industry: 'Industrial IoT / Embroidery Machine Efficiency', headline: 'Machine efficiency visibility with thread-break and needle/head fault detection', outcome: 'Real-time machine fault visibility', items: [['Thread Break Detection', 'Identify stoppage reason faster'], ['Needle & Head Tracking', 'Know where the break happened'], ['Machine Efficiency Dashboard', 'Track utilization, downtime, and fault patterns']] }
];

export const caseStudies = [
  {
    id: 'printing-packaging',
    label: 'Printing & Packaging',
    title: 'End-to-End CRM, Production Management, Dispatch & Invoicing',
    outcome: 'Order-to-Invoice Operational Visibility',
    intro: 'A connected business system that moves customer requirements from CRM into production planning, job execution, dispatch release, and invoicing without relying on scattered spreadsheets or repeated manual follow-ups.',
    problem: ['Sales orders, production requirements, dispatch details, and invoicing were handled across separate tools and manual communication.', 'Production status depended on people asking the right person at the right time.', 'Dispatch and invoice readiness lacked one connected operational view.'],
    risk: ['Customer commitments could be delayed because order status was not visible across departments.', 'Managers spent time coordinating updates instead of improving throughput.', 'Important production knowledge stayed with experienced staff rather than inside a repeatable system.'],
    solution: ['CRM and customer requirement capture', 'Production job creation and planning workflow', 'Job status, task allocation, and production visibility', 'Dispatch readiness and shipment execution flow', 'Invoice-ready records with cleaner handoff'],
    before: ['CRM / sales entry', 'Manual production handoff', 'Production follow-up by phone or Excel', 'Dispatch coordination', 'Invoice preparation'],
    after: ['Connected order record', 'System-driven production workflow', 'Live job status visibility', 'Dispatch release workflow', 'Invoice-ready operational data'],
    outcomes: ['Cleaner sales-to-production handoff', 'Better delivery confidence', 'Reduced manual coordination', 'Improved dispatch and invoice traceability', 'Less dependency on specific coordinators'],
    relevant: ['CRM, production, dispatch, and invoicing are disconnected', 'Production status updates depend on phone calls or WhatsApp', 'Dispatch readiness is difficult to verify quickly', 'Owners need one view from order to invoice']
  },
  {
    id: 'pcb-electronics',
    label: 'PCB / Electronics Manufacturing',
    title: 'B2C Order Portal With Admin Production Management',
    outcome: 'Customer Orders Converted Into Controlled Production Workflows',
    intro: 'A system where B2C orders are accepted from a customer-facing portal and then managed through an internal admin production portal for tracking, allocation, quality, and production visibility.',
    problem: ['Orders were accepted digitally but production required separate internal coordination.', 'Admin teams needed a reliable way to convert customer orders into production tasks.', 'Production tracking, quality checks, and order status needed better visibility.'],
    risk: ['Customer-facing order growth could increase internal confusion.', 'Production teams could miss priority, specification, or stage information.', 'Without traceability, order investigation and status updates took longer.'],
    solution: ['B2C customer order intake portal', 'Admin portal for order review and production planning', 'Production stage tracking and assignment logic', 'Quality control and order status workflows', 'Traceability between customer order and production execution'],
    before: ['Customer places order', 'Admin manually reviews details', 'Production coordination outside system', 'Status depends on follow-up', 'Customer update requires manual checking'],
    after: ['Customer order enters portal', 'Admin validates and releases production', 'Production stages tracked centrally', 'Quality and progress visible', 'Order status becomes easier to manage'],
    outcomes: ['Better customer-order-to-production control', 'Reduced manual order handling', 'Improved batch and job traceability', 'Faster internal status visibility', 'Cleaner admin production management'],
    relevant: ['You accept orders online but manage production manually', 'Admin teams re-enter customer order details', 'Order status is hard to track after production starts', 'Quality or traceability requires manual checking']
  },
  {
    id: 'textile-embroidery',
    label: 'Textile / Embroidery / Job Work',
    title: 'Complex Cloth, Yarn, Pieces, Manufacturing & Rate Calculation',
    outcome: 'Consistent Costing With Least-Wastage Planning',
    intro: 'A calculation and planning engine for embroidery and job-work operations where different fabric colors, yarn colors, piece quantities, manufacturing steps, and rate logic must be calculated accurately with minimum wastage.',
    problem: ['Requirement calculation depended on experienced staff and manual judgement.', 'Different cloth colors, yarn combinations, pieces, and job-work rates made costing complex.', 'Waste control required planning intelligence rather than simple manual estimation.'],
    risk: ['Costing mistakes could reduce margin.', 'Material planning errors could increase waste or shortage.', 'Work allocation and rate calculation depended heavily on specific people.'],
    solution: ['Color-wise cloth and yarn requirement logic', 'Piece-wise manufacturing calculation', 'Rate calculation engine for job work and production', 'Least-wastage planning rules', 'Repeatable costing and production estimation workflow'],
    before: ['Manual color and material calculation', 'Experienced-person dependency', 'Rate calculation by judgement', 'Waste risk during planning', 'Production estimate varies by person'],
    after: ['System-driven material calculation', 'Repeatable requirement logic', 'Consistent rate engine', 'Least-wastage planning support', 'Clear production and costing output'],
    outcomes: ['More consistent costing', 'Better material consumption planning', 'Reduced dependency on experienced calculators', 'Lower wastage risk', 'Improved margin control'],
    relevant: ['Your costing changes depending on who calculates it', 'Different cloth and yarn colors make planning complex', 'Wastage control affects profitability', 'Job-work rates require repeatable logic']
  },
  {
    id: 'iot-embroidery',
    label: 'Industrial IoT / Embroidery Machine Efficiency',
    title: 'Embroidery Machine Efficiency, Thread Break & Needle/Head Fault Tracking',
    outcome: 'Real-Time Visibility Into Machine Stoppages And Efficiency',
    intro: 'An Industrial IoT system for embroidery machines that tracks machine efficiency and identifies thread breaks, including which needle and head caused the stoppage, so teams can act faster and improve production visibility.',
    problem: ['Machine stoppages were not always visible immediately or accurately.', 'Thread breaks affected output, but the exact needle and head issue required manual observation.', 'Production efficiency depended on after-the-fact reporting rather than real-time signals.'],
    risk: ['Small stoppages could create large productivity losses across multiple heads and shifts.', 'Supervisors spent time investigating the reason instead of correcting it quickly.', 'Management lacked reliable data on machine efficiency, break frequency, and downtime patterns.'],
    solution: ['Machine signal capture through IoT hardware', 'Thread-break event detection', 'Needle and head level fault identification', 'Efficiency, downtime, and event dashboard', 'Alert and reporting layer for supervisors and management'],
    before: ['Machine stops', 'Operator notices issue', 'Supervisor checks manually', 'Reason recorded later or missed', 'Efficiency reviewed after delay'],
    after: ['Machine event captured', 'Thread break detected', 'Needle/head identified', 'Supervisor sees fault location', 'Efficiency data available in dashboard'],
    outcomes: ['Faster fault identification', 'Better embroidery machine utilization visibility', 'Reduced investigation time', 'Improved supervisor response', 'Data-driven efficiency improvement'],
    relevant: ['Thread breaks reduce output but are hard to track', 'You need needle/head-level visibility', 'Machine efficiency is reviewed late or manually', 'Supervisors need faster fault information']
  }
];

export function getCaseStudy(slug) {
  return caseStudies.find((c) => c.id === slug);
}
