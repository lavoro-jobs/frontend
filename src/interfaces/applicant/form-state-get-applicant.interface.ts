import Experience from "../shared/experience";

export default interface FormState {
  first_name: string;
  last_name: string;
  education_level: string;
  age: number | undefined;
  gender: string;
  skills: {
    ids: number[];
    names: string[];
  };
  experiences: Experience[];
  work_type: {
    id: number | undefined;
    work_type_name: string | undefined;
  };
  seniority_level: number | undefined;
  position: {
    id: number | undefined;
    name: string | undefined;
  };
  home_location: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  work_location_max_distance: number | undefined;
  contract_type: {
    id: number | undefined;
    name: string | undefined;
  };
  min_salary: number | undefined;
}
