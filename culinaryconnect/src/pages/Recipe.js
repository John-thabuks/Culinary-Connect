import React, { useState, useEffect } from "react";


function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
  
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=ebbb33ca04e54326a40256cc799992b8`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };
  
    useEffect(() => {
      fetchDetails();
    }, [params.name]);
  
    return (
      <DetailsWrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} />
        </div>
  
        <Info>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            </div>
          )}
          {/* {activeTab === "ingredients" && (
                  <ul>
                      {details.extendedIngredients.map((ingredient) => 
                          <li key={ingredient.id}>{ingredient.original}</li>
                      )}
                  </ul>
                  )} */}
  
          {details &&
            details.extendedIngredients &&
            activeTab === "ingredients" && (
              <ul>
                {details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            )}
        </Info>
      </DetailsWrapper>
    );
  }