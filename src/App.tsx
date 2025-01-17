import { DndProvider } from "react-dnd";
import Editor from "./pages/editor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Flow from "./pages/flow";
import ErrorBoundary from "./common/errorBoundary/ErrorBoundary";
import Test from "./pages/test";
import NotFound from "./common/notFound";

function App() {

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DndProvider backend={HTML5Backend}>
                <Editor />
              </DndProvider>
            }
          />

          <Route path="/flow" element={<Flow />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} /> {/* 捕捉所有未匹配的路由 */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
