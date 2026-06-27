import { lazy, type ReactNode } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  getLocalizedSlugVariants,
  getProductSlugVariants,
  STATIC_ROUTE_PATHS,
} from '../i18n/routeSlugs';

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

const STATIC_PAGE_ROUTES: Array<{ canonical: string; element: ReactNode }> = [
  { canonical: STATIC_ROUTE_PATHS.shop, element: <Shop /> },
  { canonical: STATIC_ROUTE_PATHS.cart, element: <Cart /> },
  { canonical: STATIC_ROUTE_PATHS.checkout, element: <Checkout /> },
  { canonical: STATIC_ROUTE_PATHS.blog, element: <Blog /> },
  { canonical: STATIC_ROUTE_PATHS.profile, element: <Profile /> },
  { canonical: STATIC_ROUTE_PATHS.orders, element: <Orders /> },
  { canonical: STATIC_ROUTE_PATHS.wishlist, element: <Wishlist /> },
  { canonical: STATIC_ROUTE_PATHS.search, element: <Search /> },
  { canonical: STATIC_ROUTE_PATHS.categories, element: <Categories /> },
  { canonical: STATIC_ROUTE_PATHS.login, element: <Login /> },
  { canonical: STATIC_ROUTE_PATHS.faq, element: <FAQ /> },
  { canonical: STATIC_ROUTE_PATHS.shipping, element: <Shipping /> },
  { canonical: STATIC_ROUTE_PATHS.contact, element: <Contact /> },
  { canonical: STATIC_ROUTE_PATHS.aboutUs, element: <AboutUs /> },
  { canonical: STATIC_ROUTE_PATHS.peptideGuide, element: <PeptideGuide /> },
  { canonical: STATIC_ROUTE_PATHS.peptideCalculator, element: <PeptideCalculator /> },
  { canonical: STATIC_ROUTE_PATHS.coas, element: <COALibrary /> },
  { canonical: STATIC_ROUTE_PATHS.peptideInformation, element: <PeptideInformation /> },
  { canonical: STATIC_ROUTE_PATHS.peptideResearch, element: <PeptideResearch /> },
  { canonical: STATIC_ROUTE_PATHS.terms, element: <Terms /> },
  { canonical: STATIC_ROUTE_PATHS.privacy, element: <Privacy /> },
  { canonical: STATIC_ROUTE_PATHS.refundReturns, element: <RefundReturns /> },
];

/** Shared page routes for unprefixed Spanish (/) and prefixed locales (/:locale). */
export function createAppPageRoutes() {
  const productPrefixes = getProductSlugVariants();

  return (
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      {STATIC_PAGE_ROUTES.flatMap(({ canonical, element }) =>
        getLocalizedSlugVariants(canonical).map((slug) => (
          <Route key={`${canonical}:${slug}`} path={slug} element={element} />
        )),
      )}
      {productPrefixes.map((prefix) => (
        <Route key={`product:${prefix}`} path={`${prefix}/:slug`} element={<ProductDetails />} />
      ))}
      <Route path="admin" element={<AdminDashboard />} />
      {getLocalizedSlugVariants(STATIC_ROUTE_PATHS.blog).map((slug) => (
        <Route key={`blog-post:${slug}`} path={`${slug}/:id`} element={<BlogPost />} />
      ))}
    </Route>
  );
}
