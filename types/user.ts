export interface User {
  name: string;        
  phone: string;       
  avatar?: string;     
}

// ---------- AUTH ----------
export interface RegisterRequest {
  name: string;
  phone: string;       
  password: string;
}

export interface LoginRequest {
  phone: string;       
  password: string;
}