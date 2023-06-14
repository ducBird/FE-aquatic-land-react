import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ShoppingCart from "./components/CheckCart/ShoppingCart";
import CheckOut from "./components/CheckCart/CheckOut";
import Register from "./components/Auth/Register";
import Footer from "./components/layout/Footer";
import FooterTool from "./components/layout/FooterToolbar";
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
        <section style={{ marginTop: "70px" }}>
          <Routes>
            <Route
              path="/component/checkcart/shoppingcart"
              element={<ShoppingCart />}
            />
            <Route
              path="/component/checkcart/checkout"
              element={<CheckOut />}
            />
            <Route path="/component/auth/register" element={<Register />} />
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
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
