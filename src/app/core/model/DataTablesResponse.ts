import { Personas } from "./Personas.model";

export interface DataTablesResponse {
  data: Personas[],
  message: String,
  status: number
}
