export default interface FormStateComment {
  id: string,
  account_id?: string;
  job_post_id?: string;
  applicant_account_id?: string;
  created_on_date?: string;
  comment_body?: string;
  recruiter?: {
    profile_picture?: string;
    account_id?: string;
    first_name?: string;
    last_name?: string;
    company_id?: string;
    recruiter_role?: string;
  }
};
