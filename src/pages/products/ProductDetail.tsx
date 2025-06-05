import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/api";
import Loading from "@/loading/Loading";

interface Product {
    id: number;
    name: string;
    short_description: string;
    description: string;
    sku: string;
    price: number;
    discount_price?: number;
    shipping_info?: string;
    warranty_info?: string;
    images: { image: string }[];
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    console.log('entire')
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Erro ao buscar produto:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;
    console.log('product: ', product)
    if (!product) return <div className="text-center mt-10 text-red-600">Produto não encontrado.</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
            {/* Imagem do Produto */}
            <div className="flex justify-center items-center">
                <img
                    src={product.images?.[0]?.image || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="rounded-xl border shadow-md w-full max-w-sm object-cover"
                />
            </div>

            {/* Detalhes */}
            <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-4">{product.name}</h1>

                <p className="text-gray-700 mb-2">{product.short_description}</p>
                <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>

                <div className="mb-6">
                    <span className="text-4xl text-green-700 font-bold">R$ {product.price}</span>
                    {product.discount_price && (
                        <span className="ml-4 text-gray-500 line-through text-xl">
                            R$ {product.discount_price}
                        </span>
                    )}
                </div>

                <div className="mb-6">
                    <p className="text-lg font-semibold text-blue-800 mb-2">Descrição:</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                </div>

                <div className="mb-6">
                    <p className="text-lg font-semibold text-blue-800 mb-2">Informações de envio:</p>
                    <p className="text-gray-700">{product.shipping_info || "Informações não disponíveis."}</p>
                </div>

                <div className="mb-6">
                    <p className="text-lg font-semibold text-blue-800 mb-2">Garantia:</p>
                    <p className="text-gray-700">{product.warranty_info || "Sem garantia especificada."}</p>
                </div>

                <button className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
