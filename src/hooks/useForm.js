// useForm.js
import { useState, useEffect } from 'react';

export const useForm = (initialFormData, initialSavedData) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [validationError, setValidationError] = useState("");
    const [savedFormData, setSavedFormData] = useState(
        initialSavedData || JSON.parse(localStorage.getItem("formData")) || {}
    );

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(savedFormData));
    }, [savedFormData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            if (isValidEmail(value)) {
                setValidationError("")
            } else {
                setValidationError("Please enter a valid email address.")
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setFormData({ ...formData, image: file })

        const reader = new FileReader()
        reader.onload = (e) => {
            setUploadedImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const nextStep = () => {
        if (currentStep === 1 && !formData.image) {
            setValidationError("Please upload an image to continue.")
            return
        } else if (
            currentStep === 2 &&
            (!formData.hairColor || !formData.eyeColor)
        ) {
            setValidationError("Please fill in all fields.")
            return
        } else if (currentStep === 4 && (!formData.name || !formData.email)) {
            setValidationError("Please fill in all fields.")
            return
        }

        setValidationError("")
        setCurrentStep(currentStep + 1)
        setSavedFormData({ ...savedFormData, ...formData })
    }

    const previousStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleSubmit = () => {
        // Construct the message data
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Analyze the following data:" },
            { role: "assistant", content: "Category: Photo" },
            { role: "user", content: "Here is the uploaded image:" },
            { role: "assistant", content: formData.image },
            { role: "assistant", content: "Category: Hair Color" },
            {
                role: "user",
                content: "The hair color is " + formData.hairColor,
            },
            { role: "assistant", content: "Category: Eye Color" },
            { role: "user", content: "The eye color is " + formData.eyeColor },
            { role: "assistant", content: "Category: Comments" },
            {
                role: "user",
                content: "Additional comments: " + formData.comments,
            },
        ]


        // Send the form data to the Replit server
        fetch("https://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: formData.image,
                text_prompt: JSON.stringify(messages), // Convert messages to JSON string
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data) => {
                // Handle the response from the server as needed
                console.log(data)
            })
            .catch((error) => {
                console.error("Error sending form data:", error)
                // Handle the error and return an error response
                console.log({ error: error.message })
            })

        // Clear form data and localStorage
        setSavedFormData({})
        localStorage.removeItem("formData")
    }

    const isValidEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return pattern.test(email)
    }
    // Additional functions like handleImageChange, nextStep, etc...

    return {
        currentStep,
        formData,
        savedFormData,
        uploadedImage,
        validationError,
        handleInputChange,
        handleImageChange,
        nextStep,
        previousStep,
        handleSubmit
        // Export other handlers as needed
    };
};
