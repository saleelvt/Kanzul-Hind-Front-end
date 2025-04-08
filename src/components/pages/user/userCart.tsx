/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";

const UserCart: React.FC = React.memo(() => {
    const [MyCartproduct,setProduct]=useState<ProductForm[] |any>([])
    const { loading, products, quantity, total } = useSelector(
        (state: RootState) => state.cart
    );


    useEffect(() => {
        // Load from localStorage if available
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProduct(JSON.parse(storedProducts));
        } else {
            setProduct(products);
        }
    }, [products]);

if(MyCartproduct){
console.log("the Y^%%%%%%%%%%%",MyCartproduct,products);

}




    if (loading) return <p>Loading...</p>;
    return (
        <div className="container mx-auto p-6 ">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cart Items Section */}
                <div className="col-span-2 bg-white p-4 shadow rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Product</th>
                                <th className="text-center p-2">Price</th>
                                <th className="text-center p-2">Quantity</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                            {MyCartproduct?.map((product:any) => (
                                <tr key={product._id} className="border-b">
                                    <td className="p-2 flex items-center">
                                        <img
                                            src={product.images[0] as string}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                        />
                                        <span>{product.name}</span>
                                    </td>
                                    <td className="text-center p-2">₹{product.price}</td>
                                    <td className="text-center p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-12 border p-1 text-center"
                                            value={quantity || 1}
                                            readOnly
                                        />
                                    </td>
                                    <td className="text-right p-2">₹{(product.price as number) * (quantity ? quantity : 1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Cart Summary Section */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
                    <div className="flex justify-between py-2 border-b">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{total}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span>Shipping</span>
                        <span className="text-gray-500">Free</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <button
                        className="w-full mt-4 py-2 bg-customGreen hover:bg-green-900 hover:scale-105 text-white font-bold rounded"
                        
                    >
                        Buy Now
                    </button>
                    <button className="w-full mt-2 py-2 text-white font-bold rounded hover:bg-green-900 hover:scale-105 bg-customGreen">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UserCart;

export interface CartState {
    userLanguage: string | null;
    quantity: string | null;
    total: string | null;
    error: string | null;
    loading: boolean;
    products: ProductForm[] | null|undefined;
}

export interface ProductForm {
    _id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    price: number | "";
    unit: string;
    stock: number;
    isAvailable: boolean;
    images: (string | File)[];
}
