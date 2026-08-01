interface RoleData {
  _id: string;
  roleDisplayName: string;
  role: string;
  desc: string;
}

export interface Profile {
   _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_pic: string;
  deviceToken: string;
  deviceType: string;
  register_type: string;
  isActive: boolean;
  createdAt: string;  
  updatedAt: string;  
  role_data: RoleData;
}


export interface ProfileRes {
  status: string, 
  data: Profile,
  message: string
}

