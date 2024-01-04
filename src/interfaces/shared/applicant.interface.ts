import Experience from "./experience.interface";
import Skill from "./skill.interface";

export default interface Applicant {
  first_name: string;
  last_name: string;
  education_level: {
    id: number;
    education_level: string;
  };
  age: number;
  gender: string;
  skills: Skill[];
  experiences: Experience[];
  cv: string;
  work_type: {
    id: number;
    work_type: string;
  };
  seniority_level: number;
  position: {
    id: number;
    position_name: string;
  };
  home_location: {
    longitude: number;
    latitude: number;
  };
  work_location_max_distance: number;
  contract_type: {
    id: number;
    contract_type: string;
  };
  min_salary: number;
}
