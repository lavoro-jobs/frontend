export default interface FormState {
  position_id?: number | undefined;
  education_level_id?: number | undefined;
  seniority_level_id?: number | undefined;
  skill_id_list?: number[];
  work_type_id?: number | undefined;
  contract_type_id?: number | undefined;
  work_location?: {
    longitude?: number | undefined;
    latitude?: number | undefined;
  };
  salary?: number | undefined;
  description?: string | undefined;
}
