import ProductList from "./products/ProductsList";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-100 to-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to the best store</h1>
        <p className="text-gray-600 mb-6">Best products and best deals for you</p>
      </section>
      <ProductList />
    </>
  );
}
