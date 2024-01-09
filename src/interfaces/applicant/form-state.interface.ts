import Experience from "@/interfaces/shared/experience.interface";

export default interface FormState {
  profile_picture?: string;
  first_name?: string;
  last_name?: string;
  education_level_id?: number;
  age?: number;
  gender?: string;
  skill_ids?: number[];
  cv?: string;
  work_type_id?: number;
  seniority_level?: number;
  position_id?: number;
  home_location?: {
    longitude?: number;
    latitude?: number;
  };
  work_location_max_distance?: number;
  contract_type_id?: number;
  min_salary?: number;
  experiences?: Experience[];
}
