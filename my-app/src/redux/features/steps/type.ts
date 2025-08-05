export type stepId =
  | 'BEGIN'
  | 'PREAPPROVAL'
  | 'APPROVED'
  | 'CC_APPROVED'
  | 'DOCUMENT_CREATED'
  | 'PREPARE_DOCUMENTS'
  | 'CREDIT_ISSUED';

export const STEP_ORDER: Record<stepId, number> = {
  'BEGIN': 1,
  'PREAPPROVAL': 2,
  'APPROVED': 3,
  'CC_APPROVED': 4,
  'PREPARE_DOCUMENTS': 5,
  'DOCUMENT_CREATED': 6,
  'CREDIT_ISSUED': 7,
};