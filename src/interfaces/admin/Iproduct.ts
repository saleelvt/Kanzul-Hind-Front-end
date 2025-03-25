export interface ProductForm {
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    price: number | "";
    unit: string;
    stock: number;
    isAvailable: boolean;
    images:  (string | File)[];  // Allow both strings (URLs) and File objects
  }
  