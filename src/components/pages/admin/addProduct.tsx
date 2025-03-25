/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { AddProductAction } from "../../../reduxKit/actions/admin/ProductActions";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

interface ProductForm {
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

const AddProduct = React.memo(() => {
 
  const {loading}=useSelector((state:RootState)=>state.admin)
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const dispatch=useDispatch<AppDispatch>()





  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    price: "",
    unit: "kg",
    stock: 1,
    isAvailable: true,
    images: [],
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        
        // Store file objects instead of URLs
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...filesArray], 
        }));

        // Generate preview URLs for UI display
        const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
        setImagePreview((prev) => [...prev, ...previewUrls]);
    }
};


  const handleRemoveImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
   

    try {
      
      e.preventDefault();
      if (!formData.name || !formData.nameAr || !formData.description || !formData.descriptionAr) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text:"All Fields Are Required",
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          background: "#fff",
          color: "#5c9478",
          iconColor: "#f44336",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        return;
      }
      if (formData.stock < 1) {
  
         Swal.fire({
                  icon: "error",
                  title: "Validation Error",
                  text:"Stock must be at least 1",
                  timer: 3000,
                  toast: true,
                  showConfirmButton: false,
                  background: "#fff",
                  color: "#5c9478",
                  iconColor: "#f44336",
                  showClass: { popup: "animate__animated animate__fadeInDown" },
                  hideClass: { popup: "animate__animated animate__fadeOutUp" },
                });
        return;
      }
      if (formData.images.length === 0) {
       
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text:"At least one image is required",
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          background: "#fff",
          color: "#5c9478",
          iconColor: "#f44336",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        return;
      }
      
      console.log("Submitted Data:", formData);

          // Create a new FormData object
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("nameAr", formData.nameAr);
          formDataToSend.append("description", formData.description);
          formDataToSend.append("descriptionAr", formData.descriptionAr);
          formDataToSend.append("price", formData.price.toString());
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("stock", formData.stock.toString());
          formDataToSend.append("isAvailable", String(formData.isAvailable));
  
          // Append each file in the images array
          formData.images.forEach((file) => {
              formDataToSend.append("images", file);
          });
      const response= await dispatch(AddProductAction(formDataToSend))
      console.log("the response ",response);
      

    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:error.message,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        background: "#fff",
        color: "#5c9478",
        iconColor: "#f44336",
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
      });     
    }
  };

  return (
    <div className="">
      <AdminNavbar/>

    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-3 border">
      <h2 className="text-2xl font-semibold  text-customGreen m-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Product Name (English)" value={formData.name} onChange={handleChange} className="p-2 border rounded-md" required />
        <input type="text" name="nameAr" placeholder="Product Name (Arabic)" value={formData.nameAr} onChange={handleChange} className="p-2 border rounded-md" required />
        <textarea name="description" placeholder="Description (English)" value={formData.description} onChange={handleChange} className="p-2 border rounded-md" required></textarea>
        <textarea name="descriptionAr" placeholder="Description (Arabic)" value={formData.descriptionAr} onChange={handleChange} className="p-2 border rounded-md" required></textarea>
        <input type="number" name="price" placeholder="Price (SAR)" value={formData.price} onChange={handleChange} className="p-2 border rounded-md" required />
        <select name="unit" value={formData.unit} onChange={handleChange} className="p-2 border rounded-md">
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="pack">pack</option>
          <option value="litre">litre</option>
        </select>
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="p-2 border rounded-md" min="1" required />
        <div className="flex items-center space-x-2">
          <label className="text-customGreen font-medium">Available</label>
          <input type="checkbox" checked={formData.isAvailable} onChange={(e) => setFormData((prev) => ({ ...prev, isAvailable: e.target.checked }))} className="h-5 w-5" />
        </div>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="col-span-2 p-2 border rounded-md" />
        <div className="col-span-2 flex gap-2 mt-2">
          {imagePreview.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
              <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">X</button>
            </div>
          ))}
        </div>
        <button
                type="submit"
                className="col-span-2 bg-customGreen text-white p-2 rounded-md flex items-center justify-center"
                disabled={loading}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-black rounded-full animate-spin"></div>
                ) : (
                    "Submit"
                )}
            </button>
      </form>
    </div>
    </div>
  );
});

export default AddProduct;
