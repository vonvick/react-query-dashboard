import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSortDown, faSortUp, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import DashboardPage from "./components/pages/Dashboard";

library.add(faSortUp, faSortDown, faCircleNotch);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <DashboardPage/>
    </QueryClientProvider>
  );
}

export default App;
