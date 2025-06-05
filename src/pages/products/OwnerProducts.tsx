import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreateProductModal from "./CreateProductModal";
import { getProductsOwner } from "@/services/api";
import Loading from "@/loading/Loading";

type Product = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    color: "orange" | "cyan" | "pink";
    status: "ativo" | "vendido";
};

const colorMap = {
    orange: "bg-orange-400",
    cyan: "bg-cyan-500",
    pink: "bg-pink-300",
};

const statusColorMap = {
    ativo: "bg-green-500",
    vendido: "bg-gray-400",
};


const ProductCard: React.FC<Product> = (product) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[260px] rounded-xl shadow-md overflow-hidden bg-white relative"
    >
        <div
            className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white font-semibold ${statusColorMap[product.status]
                }`}
        >
            {product.status.toUpperCase()}
        </div>

        <div className={`relative h-40 ${colorMap[product.color]} flex items-center justify-center`}>
            <div className="absolute w-full h-1/2 bg-white bottom-0 rounded-t-full"></div>
            <img
                src={product.image}
                alt={product.title}
                className="relative z-10 w-28 h-28 object-cover rounded-full border-4 border-white"
            />
        </div>
        <div className="p-4 text-center">
            <h2 className="text-lg font-bold text-blue-900">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="my-4 text-blue-800 font-bold text-xl">R$ {product.price}</div>
            <button className="bg-blue-900 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-800 transition">
                EDITAR
            </button>
        </div>
    </motion.div>
);


const OwnerProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await getProductsOwner();
                const mappedProducts: Product[] = data.map((item: any) => ({
                    id: item.id,
                    title: item.name,
                    description: item.description || "Sem descrição",
                    price: item.price,
                    image: item.images?.[0]?.image || "https://via.placeholder.com/150",
                    color: "orange",
                    status: item.is_available ? "ativo" : "vendido",
                }));

                setProducts(mappedProducts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-10 max-w-full mx-auto w-full">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold text-blue-900">Meus Produtos</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                >
                    + Criar Produto
                </button>
            </div>
            <CreateProductModal isOpen={showModal} onClose={() => setShowModal(false)} />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 justify-items-center">
                {products?.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};


export default OwnerProducts;
