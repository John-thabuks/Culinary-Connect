import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Veggies() {

    const [veggie, setVeggies] = useState([]);

    useEffect(() => {
      const check = localStorage.getItem("veggie");
  
      if (check) {
        setVeggies(JSON.parse(check));
      } else {
        fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=ebbb33ca04e54326a40256cc799992b8&number=9&tags=vegetarian`
        )
          .then((response) => response.json())
          .then((data) => {
             
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggies(data.recipes);
          })
          .catch((error) => console.error('Error fetching recipes:', error));
      }
    }, []);


    return (
        <>
      <Wrapper>
        <h3 className='vegetarianPicks'>Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}
        >
          {veggie &&
            veggie.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/"+recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            ))}
        </Splide>
      </Wrapper>
    </>
    )
}