import Experience from "../shared/experience";
import Skill from "../shared/skill";

export default interface FormState {
  first_name: string;
  last_name: string;
  education_level: {
    id: number | undefined;
    education_level: string | undefined;
  };
  age: number | undefined;
  gender: string | undefined;
  skills: Skill[];
  experiences: Experience[];
  cv: string | undefined;
  work_type: {
    id: number | undefined;
    work_type: string | undefined;
  };
  seniority_level: number | undefined;
  position: {
    id: number | undefined;
    position_name: string | undefined;
  };
  home_location: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  work_location_max_distance: number | undefined;
  contract_type: {
    id: number | undefined;
    contract_type: string | undefined;
  };
  min_salary: number | undefined;
}
