import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import LabelDesigner from "./pages/LabelDesigner";
import SquareLabelDesigner from "./pages/SquareLabelDesigner";
import RectangularLabelDesigner from "./pages/RectangularLabelDesigner";
import MixedLabelDesigner from "./pages/MixedLabelDesigner";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/products"
                element={
                  <RequireAuth>
                    <Products />
                  </RequireAuth>
                }
              />
              <Route
                path="/designer"
                element={
                  <RequireAuth>
                    <LabelDesigner />
                  </RequireAuth>
                }
              />
              <Route
                path="/designer/square"
                element={
                  <RequireAuth>
                    <SquareLabelDesigner />
                  </RequireAuth>
                }
              />
              <Route
                path="/designer/rectangular"
                element={
                  <RequireAuth>
                    <RectangularLabelDesigner />
                  </RequireAuth>
                }
              />
              <Route
                path="/designer/mixed"
                element={
                  <RequireAuth>
                    <MixedLabelDesigner />
                  </RequireAuth>
                }
              />
              <Route
                path="/orders"
                element={
                  <RequireAuth>
                    <Orders />
                  </RequireAuth>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Navigate to="/products" replace />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
