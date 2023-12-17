import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"
import { Link, useParams } from 'react-router-dom'


function Cuisine() {

    const [cuisine, setCuisine] = useState([])
    let params = useParams()

    const fetchCuisine = async(name) =>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ebbb33ca04e54326a40256cc799992b8&cuisine=${name}`)
        
        const recipes = await data.json()
        setCuisine(recipes.results)
    }

    useEffect(()=>{
        fetchCuisine(params.type)
        console.log(params.type)
    },[params.type])

    

  

    return (
        <Grid
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration: 0.5}}
        >
            {cuisine && cuisine.map((item) => (
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            ))}
        </Grid>
    );
    
}

const Grid = styled(motion.div)`
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`

export default Cuisine