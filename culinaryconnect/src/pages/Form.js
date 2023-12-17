import React, { useState } from 'react';
import '../../src/index.css'; // Import your CSS file


function Form() {
    const cloudName = "dqztn9qnj";
    const presentName = "dzisx7sk";

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [instructions, setInstruction] = useState("");
    const [ingredients, setIngredients] = useState("");

    const resetForm = () => {
        setName("");
        setTitle("");
        setSelectedImage(null);
        setInstruction("");
        setIngredients("");
    };

    function handleSubmit(e) {
        e.preventDefault();

        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', presentName); // Replace with your actual Cloudinary upload preset

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Get the Cloudinary URL or public ID from the response
                const cloudinaryUrl = data.secure_url || data.public_id;

                // Now you can send the rest of your form data (including the Cloudinary URL) to your server
                const newFormData = {
                    user: name,
                    title: title,
                    image: cloudinaryUrl,
                    instructions: instructions,
                    ingredients: ingredients,
                };

                // Handle form submission (e.g., send data to server)
                fetch("http://localhost:3005/recipes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newFormData)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data));

                // Clear the form after successful submission
                resetForm();
            })
            .catch(error => console.error('Error uploading image to Cloudinary:', error));
    }

    return (
        <div className="form-container">
            <h4 className="form-header">My Recipes</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        placeholder='User name'
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="title"
                        placeholder="Recipe Title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        onChange={(e) => setInstruction(e.target.value)}
                        id="instructions"
                        name="instructions"
                        placeholder="Recipe instructions"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        onChange={(e) => setIngredients(e.target.value)}
                        id="ingredients"
                        name="ingredients"
                        placeholder="Recipe ingredients"
                        required
                    ></textarea>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
