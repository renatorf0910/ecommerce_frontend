// pages/ProductsList.tsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProducts } from "@/services/api";
import Loading from "@/loading/Loading";
import { Link } from "react-router-dom";
import { useCart, CartProvider } from "@/hooks/CartContext";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  color: "orange" | "cyan" | "pink";
  images: {
    id: string;
    image: string;
  }[];
};

const colorMap = {
  orange: "bg-orange-400",
  cyan: "bg-cyan-500",
  pink: "bg-pink-300",
};

const ProductCard: React.FC<Product> = (product) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[260px] rounded-xl shadow-md overflow-hidden bg-white"
    >
      <Link to={`/produto/${product.id}`}>
        <div className={`relative h-40 ${colorMap[product.color]} flex items-center justify-center`}>
          <div className="absolute w-full h-1/2 bg-white bottom-0 rounded-t-full"></div>

          {product.images.length > 0 && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={product.images[currentImageIndex].id}
                src={product.images[currentImageIndex].image}
                alt={`Imagem ${currentImageIndex + 1}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-28 h-28 object-contain border-4 border-white"
              />
            </AnimatePresence>
          )}

          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 z-20"
              >
                ◀
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 z-20"
              >
                ▶
              </button>
            </>
          )}
        </div>

        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-blue-900">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="my-4 text-blue-800 font-bold text-xl">${product.price}</div>
        </div>
      </Link>
      <div className="flex justify-center">
        <button
          className="bg-blue-900 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-800 transition mb-3"
          onClick={() => addToCart(product.id)}
        >
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
};

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-10 max-w-full mx-auto w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 justify-items-center">
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} {...product} />
        ))}
      </div>
    </div>
  );
};

const ProductsListWithProvider: React.FC = () => (
  <CartProvider>
    <ProductsList />
  </CartProvider>
);

export default ProductsListWithProvider;
