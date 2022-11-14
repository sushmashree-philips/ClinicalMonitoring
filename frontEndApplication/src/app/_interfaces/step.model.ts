export interface StepCompletionStatus {
  isCompleted: boolean;
  endIndex: number;
}

export interface StepContentInfo {
  title: string;
  content: string[];
}

export interface PatientData {
  procedure: string;
  remainingTime: string;
}
