export default interface Auth {
  email: string;
  role: Role;
}

export enum Role {
  APPLICANT = "applicant",
  RECRUITER = "recruiter",
}
