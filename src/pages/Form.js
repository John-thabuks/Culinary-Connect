import React, { useState } from 'react';
import '../../src/index.css'; // Import your CSS file

function Form() {
    const cloudName = 'dqztn9qnj';
    const presentName = 'dzisx7sk';

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setName('');
        setTitle('');
        setSelectedImage(null);
        setInstructions('');
        setIngredients('');
    };

    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', selectedImage);
            formData.append('upload_preset', presentName);

            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!cloudinaryResponse.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const cloudinaryData = await cloudinaryResponse.json();

            // Send form data to your server
            const newFormData = {
                user: name,
                title: title,
                image: cloudinaryData.secure_url || cloudinaryData.public_id,
                instructions: instructions,
                ingredients: ingredients,
            };

            const serverResponse = await fetch('http://localhost:3005/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            });

            if (!serverResponse.ok) {
                throw new Error('Failed to submit form data to server');
            }

            // Clear the form after both fetch operations are successful
            resetForm();
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Form submission error:', error.message);

            // Log additional details from the server response
            if (error instanceof Response) {
                const responseBody = await error.text();
                console.error('Server response:', responseBody);
            }

            // Reset the form to handle the error state
            resetForm();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h4 className="form-header">My Recipes</h4>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            placeholder="User name"
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
                            onChange={setImage}
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
                            onChange={(e) => setInstructions(e.target.value)}
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
                </fieldset>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default Form;

