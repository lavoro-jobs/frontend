
export interface Recruiter {
  account_id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  recruiter_role: string;
}

export default interface CompanyState {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  recruiters: Recruiter[];
}