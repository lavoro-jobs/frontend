import Experience from "@/interfaces/shared/experience";

export default interface FormState {
  first_name?: string;
  last_name?: string;
  education_level_id?: number | undefined;
  age?: number | undefined;
  gender?: string;
  skill_id_list?: number[];
  cv?: string;
  work_type_id?: number | undefined;
  seniority_level_id?: number | undefined;
  position_id?: number | undefined;
  home_location?: {
    longitude?: number | undefined;
    latitude?: number | undefined;
  };
  work_location_max_distance?: number | undefined;
  contract_type_id?: number | undefined;
  min_salary?: number | undefined;
  experiences?: Experience[];
}
