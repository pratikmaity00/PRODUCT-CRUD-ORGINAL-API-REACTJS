export interface Product {
  _id: string;
  title: string;
  user_id?: string;
  description: string;
  image: string;
  status: string;       
  isDeleted: boolean;
  createdAt: string;    
  updatedAt: string;    
}



export interface ProductDetails {
  _id: string,
  title: string,
  description: string,
  image: string,
  status: string,
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
}


export interface ProdThunkRes {
  status: string,
  data: ProductDetails,
  message: string
}

export interface ProdListRes { 
  status: string,
  data: Product[],
  currentPage: number,
  perPage: number,
  totalPages: number,
  totalRecord: number,
  message: string
}