import React, { useState } from "react";
import { motion } from "framer-motion";
import { createProduct } from "@/services/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateProductModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        brand: "",
        category: "",
        short_description: "",
        description: "",
        price: "",
        discount_price: "",
        stock_quantity: "0",
        is_available: true,
    });

    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages(selectedFiles);

            const previews = selectedFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            body.append(key, value as any);
        });
        images.forEach(img => body.append('images', img));

        try {
            await createProduct(body);
            alert('Produto criado com sucesso!');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Erro ao criar produto');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-blue-900">Criar Produto</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Marca"
                        value={formData.brand}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="number"
                        name="category"
                        placeholder="ID da Categoria"
                        value={formData.category}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Preço"
                        value={formData.price}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        name="discount_price"
                        placeholder="Preço com desconto"
                        value={formData.discount_price}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="number"
                        name="stock_quantity"
                        placeholder="Estoque"
                        value={formData.stock_quantity}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_available"
                            checked={formData.is_available}
                            onChange={handleChange}
                        />
                        Disponível?
                    </label>

                    <textarea
                        name="short_description"
                        placeholder="Descrição curta"
                        value={formData.short_description}
                        onChange={handleChange}
                        className="border rounded p-2 col-span-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Descrição completa"
                        value={formData.description}
                        onChange={handleChange}
                        className="border rounded p-2 col-span-full"
                    />

                    <div className="col-span-full">
                        <label className="block mb-1 font-medium">Imagens do Produto</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border p-2 rounded"
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {imagePreviews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`preview-${index}`}
                                    className="w-20 h-20 object-cover rounded border"
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="col-span-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Criar Produto
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateProductModal;
