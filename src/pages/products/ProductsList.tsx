import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

// ======= Types & Context Setup =======

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  color: "orange" | "cyan" | "pink";
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ======= Mock de produtos =======

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Cordain",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },

  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
  {
    id: 1,
    title: "Halteres",
    description: "Ideal para treino de força e resistência.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "orange",
  },
  {
    id: 2,
    title: "Corda de Pular",
    description: "Perfeito para cardio e agilidade.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "cyan",
  },
  {
    id: 3,
    title: "Tênis Esportivo",
    description: "Confortável para corrida e caminhada.",
    price: "80",
    image: "https://github.com/renatorf0910.png",
    color: "pink",
  },
];

const colorMap = {
  orange: "bg-orange-400",
  cyan: "bg-cyan-500",
  pink: "bg-pink-300",
};


const ProductCard: React.FC<Product> = (product) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[260px] rounded-xl shadow-md overflow-hidden bg-white"
    >
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
        <div className="my-4 text-blue-800 font-bold text-xl">${product.price}</div>
        <button
          className="bg-blue-900 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-800 transition"
          onClick={() => addToCart(product)}
        >
          ADD TO CART
        </button>
      </div>
      <div className="flex justify-center gap-2 my-3">
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-blue-800"></span>
      </div>
    </motion.div>
  );
};

const ProductsList: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="p-10 max-w-full mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Produtos ({cart.length} no carrinho)
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 justify-items-center">
        {mockProducts.map((product, index) => (
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
