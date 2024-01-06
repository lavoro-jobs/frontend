import Applicant from "../shared/applicant.interface"

export default interface FormStateApplication {
  job_post_id?: string,
  applicant_account_id?: string,
  created_on_date?: string,
  approved_by_company?: boolean,
  comments?: []
  applicant: Applicant
};
