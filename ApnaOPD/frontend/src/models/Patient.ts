// Patient.ts
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string | null;
  email: string | null;
  symptoms: string;
  findings: string | null;
  appointment_date: string | null;
}
