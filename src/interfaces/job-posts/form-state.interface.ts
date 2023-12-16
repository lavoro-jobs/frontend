export default interface FormState {
  position_id?: number | undefined;
  education_level_id?: number | undefined;
  seniority_level?: number | undefined;
  skill_ids?: number[];
  work_type_id?: number | undefined;
  contract_type_id?: number | undefined;
  work_location?: {
    longitude?: number | undefined;
    latitude?: number | undefined;
  };
  salary_min?: number | undefined;
  salary_max?: number | undefined;
  description?: string | undefined;
  end_date?: string | undefined;
  assignees?: string[] | undefined;
}
