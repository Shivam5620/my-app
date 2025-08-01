import { NavigationMenu } from "./component/navbar/Header";
import ProductPage from "./product/page";

export default function Home() {
  return (
    <div>
      <header className="text-center">
        <h1 className="text-3xl font-bold mt-4">Welcome to My Store</h1>
        <p className="text-gray-600 mt-2">Explore our latest products</p>
        <ProductPage />
      </header>
    </div>
  );
}
