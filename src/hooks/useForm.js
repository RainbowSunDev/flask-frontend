// useForm.js
import { useState, useEffect, useContext } from 'react';
import globalContext from '../context/global/globalContext';
import modalContext from '../context/modal/modalContext';

export const useForm = (initialFormData, initialSavedData) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [uploadedImage, setUploadedImage] = useState(initialFormData.image);
    const [validationError, setValidationError] = useState("");
    const [savedFormData, setSavedFormData] = useState(
        initialSavedData || JSON.parse(localStorage.getItem("formData")) || {}
    );
    const { setIsLoading } = useContext(globalContext);
    const { closeModal, openModal } = useContext(modalContext);

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
        
        const sendFormData = new FormData();
        sendFormData.append('image', formData.image)
        sendFormData.append('hair_color', formData.hairColor)
        sendFormData.append('eye_color', formData.eyeColor)
        sendFormData.append('comments', formData.comments)
        setIsLoading(true)
        fetch('https://color-season.onrender.com/analyze', {
                method: 'POST',
                body: sendFormData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setIsLoading(false)

            openModal(
                () => {
                    <p>Modal</p>
                },
                data.description,
                "ddd",
                () => {
                    closeModal();
                },
                () => {
                    closeModal();
                }
            );
        })
        .catch(error => console.error('Error:', error));
        
        // Clear form data and localStorage
        setSavedFormData({})
        localStorage.removeItem("formData")
    }

    const isValidEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return pattern.test(email)
    }

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
    };
};
