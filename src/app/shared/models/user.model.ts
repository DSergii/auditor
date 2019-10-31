export interface User {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  location: {
    id: number;
    name: string;
    org: number;
  },
  organization: {
    id: number
    name: string;
    type: number
  },
  user_type: {
    id: number
    name: string;
  }
}