import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import { ROUTES } from "./routes";

const router = createBrowserRouter(
    
      ROUTES
      // ROUTES.map((route) => (
      //   <Route key={route.path} path={route.path} element={route.element}>
      //     {/* map child routes */}
      //     {route.children?.map((child) => (
      //       <Route
      //         key={child.path}
      //         path={child.path}
      //         element={child.element}
      //       />
      //     ))}

      //   </Route>
      // ))
    
  );
  

  export default router;