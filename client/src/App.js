import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import PersonCars from "./pages/PersonCars";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/person/:id" element={<PersonCars />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
