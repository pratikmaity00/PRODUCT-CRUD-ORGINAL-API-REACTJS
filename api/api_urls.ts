const base_url: string = 'https://wtsacademy.dedicateddevelopers.us/'
// AUTH END POINTS
const signUp_end: string = 'api/user/signup'
const signIn_end: string = 'api/user/signin'
const profile_end: string = 'api/user/profile-details'

// PRODUCT CRUD END POINTS
const prodCreate_end: string = 'api/product/create'
const prodUpdate_end: string = 'api/product/update'
const prodRemove_end: string = 'api/product/remove'
const prodDetail_end: string = 'api/product/detail/'
const prodList_end: string = 'api/product/list'

// IMAGE URL 
const fetchProfilePic = (media: string):string  => {
  return base_url + '/uploads/user/profile_pic/' + media;
}

const fetchProductsPic = (media: string):string  => {
  return base_url + '/uploads/product/' + media;
}

export {base_url, signIn_end, signUp_end, profile_end, prodCreate_end, prodDetail_end, prodList_end, prodRemove_end, prodUpdate_end, fetchProductsPic, fetchProfilePic}