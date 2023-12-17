import Pages from "./pages/Pages";
import Category from "./components/Category"
import {BrowserRouter} from "react-router-dom"
import Search from "./components/Search"
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to={'/'}>Culinary-Connect</Logo>
      </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}