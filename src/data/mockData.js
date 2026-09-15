// Anonymized mock dataset conforming strictly to HKAIVERSE Field Rules (Zero PII: no names, roll numbers, fees or marks)

export const INITIAL_DEPARTMENTS = [
  { id: 'lib', name: 'Central Library Desk', code: 'LIB', icon: 'BookOpen', avgManualWaitMins: 45, autoRule: 'Zero unreturned items in catalog', responsibleBuilding: 'Building A, 2nd Floor' },
  { id: 'hst', name: 'Hostel Administration', code: 'HST', icon: 'Home', avgManualWaitMins: 90, autoRule: 'Room key handover & inventory verification', responsibleBuilding: 'Block C Office' },
  { id: 'lab', name: 'Hardware & Physics Lab', code: 'LAB', icon: 'Cpu', avgManualWaitMins: 60, autoRule: 'Oscilloscope & Kit inspection clearance', responsibleBuilding: 'Science Annex, Lab 3' },
  { id: 'spt', name: 'Sports Authority', code: 'SPT', icon: 'Trophy', avgManualWaitMins: 30, autoRule: 'Equipment & locker clearance', responsibleBuilding: 'Sports Complex Desk' },
  { id: 'acc', name: 'Financial Accounts Office', code: 'ACC', icon: 'CreditCard', avgManualWaitMins: 120, autoRule: 'No outstanding semester dues check', responsibleBuilding: 'Admin Block, Room 104' },
  { id: 'hod', name: 'Department Head (HOD)', code: 'HOD', icon: 'Award', avgManualWaitMins: 180, autoRule: 'Final departmental NOC seal', responsibleBuilding: 'Department HOD Office' },
];

export const INITIAL_REQUESTS = [
  {
    id: 'REQ-2026-8941',
    hashId: 'STU-HASH-88A19',
    degreeProgram: 'B.Tech Computer Engineering',
    gradYear: '2026',
    submittedAt: '2026-09-15 09:15 AM',
    status: 'IN_PROGRESS',
    manualTimeSpentMins: 425,
    clearFlowTimeMins: 4.8,
    departmentStatus: {
      lib: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '09:15 AM', note: 'Zero book dues found' },
      hst: { status: 'APPROVED', updatedBy: 'Block C Warden', timestamp: '09:42 AM', note: 'Inventory verified' },
      lab: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '09:15 AM', note: 'Kit #402 returned clean' },
      spt: { status: 'PENDING', updatedBy: 'Sports Desk', timestamp: '-', note: 'Awaiting locker key audit' },
      acc: { status: 'APPROVED', updatedBy: 'Accounts System', timestamp: '09:16 AM', note: 'No pending receipts' },
      hod: { status: 'PENDING', updatedBy: 'HOD Secretariat', timestamp: '-', note: 'Awaiting prerequisite approvals' },
    }
  },
  {
    id: 'REQ-2026-9102',
    hashId: 'STU-HASH-33F42',
    degreeProgram: 'B.Tech Electrical & Electronics',
    gradYear: '2026',
    submittedAt: '2026-09-15 10:30 AM',
    status: 'COMPLETED',
    manualTimeSpentMins: 580,
    clearFlowTimeMins: 5.2,
    departmentStatus: {
      lib: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '10:30 AM', note: 'Zero library dues' },
      hst: { status: 'APPROVED', updatedBy: 'Hostel Desk', timestamp: '10:31 AM', note: 'Room inspection clear' },
      lab: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '10:30 AM', note: 'Breadboard kits cleared' },
      spt: { status: 'APPROVED', updatedBy: 'Sports Desk', timestamp: '10:34 AM', note: 'No gear assigned' },
      acc: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '10:30 AM', note: 'Receipt match 100%' },
      hod: { status: 'APPROVED', updatedBy: 'HOD EEE', timestamp: '10:35 AM', note: 'Final NOC Authorized' },
    }
  },
  {
    id: 'REQ-2026-7734',
    hashId: 'STU-HASH-99B04',
    degreeProgram: 'M.Tech Mechanical Engineering',
    gradYear: '2026',
    submittedAt: '2026-09-14 02:00 PM',
    status: 'FLAGGED',
    manualTimeSpentMins: 320,
    clearFlowTimeMins: 12.0,
    departmentStatus: {
      lib: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: '02:00 PM', note: 'Zero catalog dues' },
      hst: { status: 'APPROVED', updatedBy: 'Hostel Warden', timestamp: '02:15 PM', note: 'Room cleared' },
      lab: { status: 'FLAGGED', updatedBy: 'FabLab Tech', timestamp: '02:40 PM', note: 'Missing 3D printing caliper kit #12' },
      spt: { status: 'APPROVED', updatedBy: 'Sports Desk', timestamp: '02:05 PM', note: 'Gym clearance ok' },
      acc: { status: 'APPROVED', updatedBy: 'Accounts Desk', timestamp: '02:01 PM', note: 'Fees reconciled' },
      hod: { status: 'PENDING', updatedBy: 'HOD Secretariat', timestamp: '-', note: 'Halted due to Lab flag' },
    }
  }
];

export const FIELD_METRICS = {
  observedWorkflow: 'Campus Multi-Department Clearance & NOC Signature Tree',
  buildingsInvolved: 6,
  walkingDistanceMeters: 1850,
  averageManualDays: 4.2,
  averageClearFlowMins: 6.5,
  paperSheetsSavedPerStudent: 14,
  redundantDataEntriesEliminated: 6,
  statusInquiriesReducedPercent: 94.2,
  surveySampleCount: 48,
  fieldObservations: [
    { title: 'Redundant Data Transcription', description: 'Staff manually copied student details into 6 separate physical register ledgers.' },
    { title: 'Absence Bottlenecks', description: 'Single unavailable staff member halts entire student clearance chain for up to 48 hours.' },
    { title: 'Status Update Blindspot', description: '73% of student inquiries were simple status checks: "Is my paper sheet signed yet?"' },
    { title: 'Zero Data Integration', description: 'Library, Hostel, and Finance records exist on separate computers but were verified manually via paper slips.' }
  ]
};
