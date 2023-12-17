import Assignee from "../shared/assignee";
import Skill from "../shared/skill";

export default interface FormState {
  id?: string | undefined;
  position?: {
    id?: number | undefined;
    position_name?: string | undefined;
  };
  description?: string | undefined;
  education_level?: {
    id?: number | undefined;
    education_level?: string | undefined;
  };
  skills?: Skill[];
  work_type?: {
    id?: number | undefined;
    work_type?: string | undefined;
  };
  seniority_level?: number | undefined;
  work_location?: {
    longitude?: number | undefined;
    latitude?: number | undefined;
  };
  contract_type?: {
    id?: number | undefined;
    contract_type?: string | undefined;
  };
  salary_min?: number | undefined;
  salary_max?: number | undefined;
  end_date?: string | undefined;
  assignees?: Assignee[] | undefined;
}
