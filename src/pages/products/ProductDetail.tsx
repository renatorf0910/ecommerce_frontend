import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProductImageById } from "@/services/api";
import Loading from "@/loading/Loading";
import FavoriteButton from "./Favorites/FavoriteButton";

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

interface ProductImage {
    id: number;
    image: { image: string }[];
    alt_text: string;
    is_thumbnail: boolean;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [imageProduct, setImageProduct] = useState<ProductImage | null>(null);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        if (!id) return;

        const fetchProductImage = async () => {
            try {
                const data = await getProductImageById(id);
                setImageProduct(data);
            } catch (err) {
                console.error("Erro ao buscar imagem do produto:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductImage();
    }, [id]);

    console.log('imageProduct: ', imageProduct)


    if (loading) return <Loading />;
    console.log('product: ', product?.images[0]?.image)
    if (!product) return <div className="text-center mt-10 text-red-600">Produto não encontrado.</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-20">
            <div className="flex justify-center items-center">
                <img
                    src={product.images?.[0]?.image || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="rounded-xl border shadow-md w-full max-w-sm object-cover"
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>


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
                <div className="flex justify-between items-start mb-4">
                    <button className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
                        Adicionar ao Carrinho
                    </button>
                    Favoritar produto <FavoriteButton productId={product.id} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
