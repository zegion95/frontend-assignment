import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import TodoList from "./components/Todo-List";
import DataGroup from "./components/Data-Group";

function App() {
  const pages = ["TodoList", "API"];

  return (
    <Router>
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={`/${page}`}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/TodoList" element={<TodoList />} />
          <Route path="/API" element={<DataGroup />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
