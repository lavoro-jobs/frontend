import Assignee from "../shared/assignee";
import Skill from "../shared/skill";

export default interface FormState {
  id?: string;
  position?: {
    id?: number;
    position_name?: string;
  };
  description?: string;
  education_level?: {
    id?: number;
    education_level?: string;
  };
  skills?: Skill[];
  work_type?: {
    id?: number;
    work_type?: string;
  };
  seniority_level?: number;
  work_location?: {
    longitude?: number;
    latitude?: number;
  };
  contract_type?: {
    id?: number;
    contract_type?: string;
  };
  salary_min?: number;
  salary_max?: number;
  end_date?: string;
  assignees?: Assignee[];
  education_level_id?: number;
  position_id?: number;
  contract_type_id?: number;
  work_type_id?: number;
}
