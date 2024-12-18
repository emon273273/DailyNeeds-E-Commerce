import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const AddProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(null);
    const [category, setCategory] = useState("");

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.allCategory);
            } else {
                toast.error("API fetching error");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            if (photo) {
                formData.append("photo", photo);
            }

            const { data } = await axios.post(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/create-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.success) {
                toast.success(`Product ${name} created successfully`);
                navigate("/dashboard/admin/all-products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                {/* Admin Sidebar */}
                <div className="w-full lg:w-64 bg-gray-800 text-white flex flex-col">
                    <div className="p-6 text-2xl font-bold border-b border-gray-700">
                        Admin Dashboard
                    </div>
                    <div className="flex-grow">
                        <AdminMenu />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6">
                    <div className="bg-white shadow rounded-lg p-8 md:p-6 sm:p-4">
                        <div className="lg:max-w-[600px]">
                            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
                            <div>
                                <Select
                                    bordered={false}
                                    showSearch
                                    onChange={(value) => setCategory(value)}
                                    size='large'
                                    className="form-select mb-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                    placeholder="Select Category"
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>

                                {/* Image upload */}
                                <div className="bg-slate-400 py-3 text-center border-none rounded-md mb-4">
                                    <label className="block text-md font-medium text-gray-700 cursor-pointer">
                                        {photo ? photo.name : "Upload Image"}
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Display uploaded image */}
                                {photo && (
                                    <div className="text-center py-2 mb-4">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="upload image"
                                            className="mx-auto h-48 w-48 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Form fields */}
                                <div>
                                    {/* Name input field */}
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Product Name"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>

                                    {/* Description input field */}
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Product Description"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>

                                    {/* Price input field */}
                                    <div className="mt-4">
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="Product Price"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>

                                    {/* Quantity input field */}
                                    <div className="mt-4">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder="Product Quantity"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>

                                    {/* Shipping input field */}
                                    <div className="mt-4">
                                        <Select
                                            bordered={false}
                                            onChange={(value) => setShipping(value === "1")}
                                            showSearch
                                            size='large'
                                            placeholder="Select Shipping"
                                            className="w-full py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                        >
                                            <Option value="1">Yes</Option>
                                            <Option value="0">No</Option>
                                        </Select>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={handleCreate}
                                            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Add Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
