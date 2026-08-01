export interface SignUpProfile {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  profile_pic: string;
  deviceToken: string;
  deviceType: string;
  register_type: string;
  isDeleted: boolean;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpResponse {
  status: number;
  data: SignUpProfile;
  token: string;
  message: string;
}