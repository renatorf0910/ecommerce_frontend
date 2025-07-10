import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "@/services/api";

interface Props {
    productId: number;
}

const FavoriteButton: React.FC<Props> = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await axios.get("/favorites/");
                const productIds = res.data.map((fav: any) => fav.product);
                setIsFavorite(productIds.includes(productId));
            } catch (error) {
                console.error("Erro ao carregar favoritos", error);
            }
        };

        fetchFavorites();
    }, [productId]);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`/favorites/${productId}/`);
            } else {
                await axios.post("/favorites/", { product: productId });
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Erro ao atualizar favorito", error);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`text-2xl mb-6 transition-colors ${
                isFavorite ? "text-red-600" : "text-gray-400"
            }`}
            aria-label="Favoritar produto"
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default FavoriteButton;
