export enum UiState {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export enum Status {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export const stepDetails = [
  'Procedure has started. Completion Period = 45mints',
  'Patient is moved to the pre-procedure room , Completion Period = 45 mints',
  'Injecting the contrast via nasil is in progress.',
  'Contrast in take is completed.',
  'Patient is coping with the procedure, process is going smooth.',
  'Patient is in pre-procedure looby',
  'Moved to scanning room.',
  'Scan is started and in progress',
  'Upper Abdomen is completed',
  'Lower Abdomen scan is in progress',
  'Scan is completed, Patient moving to post procedure room',
  'Offloading the contrast in progress, resting period = 5 mints',
  'Procedure completed, please wait for the patient in lobby.',
];

export const enum CompletionString {
  PRE_PROCEDURE_COMPLETED = 'Pre-procedure completed',
  SCAN_COMPLETED = 'Scan completed',
  POST_PROCEDURE_COMPLETED = 'Post-procedure completed',
}
