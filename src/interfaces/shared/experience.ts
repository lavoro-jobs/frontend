interface Position {
  id: string;
  position_name: string;
}

export default interface Experience {
  position?: Position;
  company_name?: string;
  position_id?: number;
  years?: number;
}
