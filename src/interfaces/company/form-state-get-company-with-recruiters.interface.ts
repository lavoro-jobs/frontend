import Recruiter from "../shared/recruiter.interface";

export default interface CompanyRecruitersState {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  recruiters?: Recruiter[];
}
