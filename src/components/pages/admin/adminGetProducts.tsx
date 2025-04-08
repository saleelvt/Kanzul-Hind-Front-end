/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  DeleteProductByIdAction,
  GetProductsAction,
  UpdateProductAction,
} from "../../../reduxKit/actions/admin/ProductActions";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { ProductForm } from "../../../interfaces/admin/Iproduct";
import { FaEdit, FaTrash, FaUpload, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SaudiRiyal } from "lucide-react";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { useSelector } from "react-redux";

const AdminProductList = React.memo(() => {
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [Ploading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductForm>();
  const [formData, setFormData] = useState<ProductForm>({
    _id: "",
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    price: "",
    unit: "",
    stock: 0,
    isAvailable: false,
    images: [],
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {loading}=useSelector((state:RootState)=>state.product)

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await dispatch(GetProductsAction());
        if (response.payload.success) {
          console.log(
            "my response on the product fetching : ",
            response.payload
          );
          await setProducts(response.payload.data);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          background: "#fff",
          color: "#5c9478",
          iconColor: "#f44336",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  if (products) {
    console.log("data data ", products);
  }

  const handleEdit = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        ...product,
        price: typeof product.price === "number" ? product.price : "",
      });
      setShowModal(true);

      // Reset image states
      setNewImages([]);
      setImagesPreviews([]);
    }
  };

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c9478",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Delete product with ID:", productId);
        const response = dispatch(DeleteProductByIdAction(productId));
        console.log("delete response ", response);

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      const data = products.filter((x) => x._id !== productId);
      setProducts(data);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else if (name === "price") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : parseFloat(value),
      });
    } else if (name === "stock") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages((prevImages) => [...prevImages, ...filesArray]);

      // Create previews for the new images
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setImagesPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prevImages) => {
      const updated = [...prevImages];
      updated.splice(index, 1);
      return updated;
    });

    setImagesPreviews((prevPreviews) => {
      const updated = [...prevPreviews];
      URL.revokeObjectURL(updated[index]); // Clean up object URL
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a new FormData object to handle file uploads
      const productFormData = new FormData();

      // Add all the form fields except images
      productFormData.append("_id", formData._id);
      productFormData.append("name", formData.name);
      productFormData.append("nameAr", formData.nameAr);
      productFormData.append("description", formData.description);
      productFormData.append("descriptionAr", formData.descriptionAr);
      productFormData.append("price", formData.price.toString());
      productFormData.append("unit", formData.unit);
      productFormData.append("stock", formData.stock.toString());
      productFormData.append("isAvailable", formData.isAvailable.toString());

      // Add only new images (files) to FormData
      newImages.forEach((file) => {
        productFormData.append("images", file); // Send new images only
      });

      // Call the update action with FormData
      const response = await dispatch(UpdateProductAction(productFormData));
      console.log("updated product resodofdfi", response);

      if (response.payload?.success) {
        const updatedProducts = products.map((p) =>
          p._id === formData._id ? response.payload.data : p
        );
        setProducts(updatedProducts);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setShowModal(false);

        // Clean up image previews
        imagesPreviews.forEach(URL.revokeObjectURL);
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update product",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update product",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="">
      <AdminNavbar />

      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <button
              onClick={() => {
                navigate("/adminAddProduct");
              }}
              type="button"
              className="bg-customGreen hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <span className="mr-2">Add Product</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {Ploading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {products.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No products found.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-16 w-16">
                            {Array.isArray(product.images) &&
                            product.images.length > 0 &&
                            typeof product.images[0] === "string" ? (
                              <img
                                className="h-16 w-16 rounded-md object-cover"
                                src={product.images[0]}
                                alt={product.name}
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">
                                  No Image
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description.length > 50
                              ? `${product.description.substring(0, 50)}...`
                              : product.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex">
                            {" "}
                            <span className="font-mono">
                              <SaudiRiyal />
                            </span>
                            {typeof product.price === "number"
                              ? product.price.toFixed(2)
                              : "0.00"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Per {product.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Product
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name (English)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name (Arabic)
                  </label>
                  <input
                    type="text"
                    name="nameAr"
                    value={formData.nameAr}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Arabic)
                  </label>
                  <textarea
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SaudiRiyal className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="e.g., kg, piece, box"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available for purchase
                    </span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Images
                  </label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {Array.isArray(formData.images) &&
                    formData.images.length > 0 ? (
                      formData.images.map(
                        (image, index) =>
                          typeof image === "string" && (
                            <div
                              key={`existing-${index}`}
                              className="relative group"
                            >
                              <img
                                src={image}
                                alt={`Product ${index}`}
                                className="h-24 w-24 rounded-md object-cover border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveExistingImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaTimes className="h-3 w-3" />
                              </button>
                            </div>
                          )
                      )
                    ) : (
                      <div className="text-gray-500">No images available</div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Images
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 flex items-center"
                    >
                      <FaUpload className="mr-2" />
                      Upload Images
                    </button>
                  </div>

                  {/* Preview for new images */}
                  {imagesPreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        New Images Preview:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {imagesPreviews.map((preview, index) => (
                          <div key={`new-${index}`} className="relative group">
                            <img
                              src={preview}
                              alt={`New upload ${index}`}
                              className="h-24 w-24 rounded-md object-cover border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTimes className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    // Clean up image previews before closing
                    imagesPreviews.forEach(URL.revokeObjectURL);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-customGreen hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

export default AdminProductList;
