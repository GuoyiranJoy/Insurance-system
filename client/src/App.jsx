import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/common/Loading";
import appRouter from "./routes/appRouter";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen h-full">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {appRouter.map((item, i) => (
            <Route
              key={i}
              path={item.path}
              element={
                <Suspense fallback={<Loading />}>
                  {item.path === "main/*" ? (
                    <ProtectedRoute>
                      <item.element />
                    </ProtectedRoute>
                  ) : (
                    <item.element />
                  )}
                </Suspense>
              }
            />
          ))}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
