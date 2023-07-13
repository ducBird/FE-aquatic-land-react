import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ShoppingCart from "./components/CheckCart/ShoppingCart";
import CheckOut from "./components/CheckCart/CheckOut";
import Register from "./components/Auth/Register";
import Footer from "./components/layout/Footer";
import FooterTool from "./components/layout/FooterToolbar";
import Home from "./components/layout/Home";
import Shop from "./components/layout/Shop";
import ProductDetail from "./components/layout/Shop/ProductDetail";
import Work from "./components/layout/Work/Work";
import Services from "./components/layout/Services";
import ActivationEmail from "./components/Auth/ActivationEmail";
import HistoryOrderUser from "./components/Auth/HistoryOrderUser";
function App() {
  return (
    // <main className="font-roboto relative overfnlow-hidde">
    //   <Header />
    // </main>
    <div className="App">
      <BrowserRouter>
        <header>
          <main className="font-roboto relative overflow-hidden">
            <Header />
            <div className="md:hidden">
              <FooterTool />
            </div>
          </main>
        </header>
        <section style={{ marginTop: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/component/checkcart/shoppingcart"
              element={<ShoppingCart />}
            />
            <Route
              path="/component/checkcart/checkout"
              element={<CheckOut />}
            />
            <Route path="/component/auth/register" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            <Route path="/product-category/:categoryId" element={<Shop />} />
            <Route
              path="/product-category/:categoryId/sub/:subCategoryId"
              element={<Shop />}
            />

            <Route path="/search-products" element={<Shop />} />
            <Route path="/services" element={<Services />} />
            <Route path="/history-order-user" element={<HistoryOrderUser />} />

            <Route
              path="/customers/activate/:activation_token"
              element={<ActivationEmail />}
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>404 Page not found 😂😂😂</p>
                </main>
              }
            />
          </Routes>
        </section>
        <div className="mt-10">
          <Work />
        </div>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
