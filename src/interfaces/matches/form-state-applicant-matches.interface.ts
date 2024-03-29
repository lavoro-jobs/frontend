import Skill from "../shared/skill.interface";

export default interface FormState {
  job_post?: {
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
    company?: {
      id?: string;
      name?: string;
      description?: string;
      logo?: string;
    };
  };
  match_score?: number;
  approved_by_applicant?: boolean;
};
