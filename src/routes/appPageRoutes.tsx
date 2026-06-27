import { lazy } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Profile = lazy(() => import('../pages/Profile'));
const Orders = lazy(() => import('../pages/Orders'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Search = lazy(() => import('../pages/Search'));
const Categories = lazy(() => import('../pages/Categories'));
const Login = lazy(() => import('../pages/Login'));
const FAQ = lazy(() => import('../pages/FAQ'));
const Shipping = lazy(() => import('../pages/Shipping'));
const Contact = lazy(() => import('../pages/Contact'));
const Terms = lazy(() => import('../pages/Terms'));
const Privacy = lazy(() => import('../pages/Privacy'));
const RefundReturns = lazy(() => import('../pages/RefundReturns'));
const PeptideGuide = lazy(() => import('../pages/PeptideGuide'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const PeptideCalculator = lazy(() => import('../pages/PeptideCalculator'));
const COALibrary = lazy(() => import('../pages/COALibrary'));
const PeptideInformation = lazy(() => import('../pages/PeptideInformation'));
const PeptideResearch = lazy(() => import('../pages/PeptideResearch'));

/** Shared page routes for unprefixed Spanish (/) and prefixed locales (/:locale). */
export function createAppPageRoutes() {
  return (
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:slug" element={<ProductDetails />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:id" element={<BlogPost />} />
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="search" element={<Search />} />
      <Route path="categories" element={<Categories />} />
      <Route path="login" element={<Login />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="peptide-guide" element={<PeptideGuide />} />
      <Route path="peptide-calculator" element={<PeptideCalculator />} />
      <Route path="coas" element={<COALibrary />} />
      <Route path="peptide-information" element={<PeptideInformation />} />
      <Route path="peptide-research" element={<PeptideResearch />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="refund-returns" element={<RefundReturns />} />
    </Route>
  );
}
