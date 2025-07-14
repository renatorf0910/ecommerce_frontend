import React, { useEffect, useState } from 'react';
import api, { fetchCart } from '@/services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () =>  {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch (err: any) {
        setError('Erro ao carregar o carrinho');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount_price ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  if (loading) return <p>Carregando carrinho...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Produto</th>
              <th className="text-center py-2">Quantidade</th>
              <th className="text-right py-2">Preço</th>
              <th className="text-right py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems?.items?.length > 0 ?  cartItems?.items?.map(item => {
              const price = item?.product?.price;
              return (
                <tr key={item?.id} className="border-b">
                  <td className="py-2">{item?.product?.name}</td>
                  {/* <td className="text-center">{item?.product?.quantity}</td> */}
                  <td className="text-right">R$ {price}</td>
                  {/* <td className="text-right">R$ {(price * item?.product?.quantity).toFixed(2)}</td> */}
                </tr>
              );
            }) : <></>}
          </tbody>
        </table>
      )}

      {cartItems.length > 0 && (
        <div className="text-right mt-4 text-lg font-semibold">
          Total: R$ {calculateTotal().toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Cart;
