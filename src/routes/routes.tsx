import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Layout, Profile, ForgetPassword } from "@/app/index";
import { Suspense } from "react";
import AboutPage from "../app/About";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ClassesPage from "@/app/Classes";
import PagesLoader from "@/components/common/pages-loader/pages-loader";
import Healthy from "@/app/Healthy";
import ErrorBoundary from "@/components/error-boundry/error-boundry";
import NotFound from "@/app/not-found/not-found-page";
import RouteGuard from "@/components/providers/components/route-guard";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PagesLoader />}>
          <RouteGuard>
            <Login />
          </RouteGuard>
        </Suspense>
      </ErrorBoundary>
    ),
  },

  {
    path: "/register",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PagesLoader />}>
          <RouteGuard>
            <Register />
          </RouteGuard>
        </Suspense>
      </ErrorBoundary>
    ),
  },

  {
    path: "/forget-password",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PagesLoader />}>
          <RouteGuard>
            <ForgetPassword />
          </RouteGuard>
        </Suspense>
      </ErrorBoundary>
    ),
  },

  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PagesLoader />}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<PagesLoader />}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "about",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<PagesLoader />}>
                <AboutPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "classes",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<PagesLoader />}>
                <ClassesPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "profile",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<PagesLoader />}>
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "healthy",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PagesLoader />}>
              <Healthy />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
