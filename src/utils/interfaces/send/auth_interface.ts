export interface SignUpAuth {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirm_password: string,
  profile_pic: FileList
}

export interface SignInAuth {
  email: string,
  password: string
}
