import { lazy, type ReactNode } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  getLocalizedSlugVariants,
  getProductSlugVariants,
  STATIC_ROUTE_PATHS,
} from '../i18n/routeSlugs';

const Home = lazy(() => import('../views/Home'));
const Shop = lazy(() => import('../views/Shop'));
const ProductDetails = lazy(() => import('../views/ProductDetails'));
const Cart = lazy(() => import('../views/Cart'));
const Checkout = lazy(() => import('../views/Checkout'));
const AdminDashboard = lazy(() => import('../views/AdminDashboard'));
const Blog = lazy(() => import('../views/Blog'));
const BlogPost = lazy(() => import('../views/BlogPost'));
const Profile = lazy(() => import('../views/Profile'));
const Orders = lazy(() => import('../views/Orders'));
const Wishlist = lazy(() => import('../views/Wishlist'));
const Search = lazy(() => import('../views/Search'));
const Categories = lazy(() => import('../views/Categories'));
const Login = lazy(() => import('../views/Login'));
const FAQ = lazy(() => import('../views/FAQ'));
const Shipping = lazy(() => import('../views/Shipping'));
const Contact = lazy(() => import('../views/Contact'));
const Terms = lazy(() => import('../views/Terms'));
const Privacy = lazy(() => import('../views/Privacy'));
const RefundReturns = lazy(() => import('../views/RefundReturns'));
const PeptideGuide = lazy(() => import('../views/PeptideGuide'));
const AboutUs = lazy(() => import('../views/AboutUs'));
const PeptideCalculator = lazy(() => import('../views/PeptideCalculator'));
const COALibrary = lazy(() => import('../views/COALibrary'));
const PeptideInformation = lazy(() => import('../views/PeptideInformation'));
const PeptideResearch = lazy(() => import('../views/PeptideResearch'));

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
