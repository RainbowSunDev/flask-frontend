import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

export default function CustomForm(props) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        image: null,
        hairColor: "",
        eyeColor: "",
        comments: "",
        name: "",
        email: "",
    })

    const [uploadedImage, setUploadedImage] = useState(null)
    const [validationError, setValidationError] = useState("")
    const [savedFormData, setSavedFormData] = useState(
        JSON.parse(localStorage.getItem("formData")) || {}
    )

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(savedFormData))
    }, [savedFormData])

    const handleInputChange = (event) => {
        const { name, value } = event.target

        if (name === "email") {
            if (isValidEmail(value)) {
                setValidationError("")
            } else {
                setValidationError("Please enter a valid email address.")
            }
        }

        setFormData({ ...formData, [name]: value })
    }

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
        fetch("https://test-1-aistylista.replit.app/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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

    const imageContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        maxHeight: "300px",
        borderRadius: "20px",
        marginBottom: "20px",
    }

    const questionContainerStyle = {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        width: "100%",
        position: "relative",
    }

    const requiredAsteriskStyle = {
        position: "absolute",
        top: "8px",
        right: "8px",
        color: "red",
        fontSize: "14px",
    }

    const questionLabelStyle = {
        marginBottom: "8px",
    }

    const inputStyle = {
        height: "35px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "8px",
        fontSize: "14px",
    }

    const buttonStyle = {
        width: "125px",
        height: "39px",
        border: "none",
        borderRadius: "20px",
        backgroundColor: "#333",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
    }

    const startButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#333",
        margin: "0 auto",
        width: "180px",
        height: "36px",
        fontSize: "14px",
    }

    const overlayImageStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
    }

    const sectionTitles = [
        "",
        "Hair and Eye Color",
        "Final Comments",
        "Contact Information",
        "Review and Submit",
    ]

    const renderFormStep = () => {
        let heading = ""
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div style={imageContainerStyle}>
                            <input
                                type="file"
                                id="imageInput"
                                name="image"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <label
                                htmlFor="imageInput"
                                style={{
                                    ...startButtonStyle,
                                    cursor: "pointer",
                                }}
                            >
                                Upload Your Image
                            </label>
                            {currentStep !== 1 && (
                                <span style={requiredAsteriskStyle}>*</span>
                            )}
                            {props.overlayImage && (
                                <img
                                    src={props.overlayImage}
                                    alt="Overlay"
                                    style={overlayImageStyle}
                                />
                            )}
                        </div>
                    </div>
                )
            case 2:
                heading = "Hair and Eye Color"
                return (
                    <div>
                        <div style={questionContainerStyle}>
                            <label style={questionLabelStyle}>Hair Color</label>
                            <input
                                type="text"
                                name="hairColor"
                                placeholder="Enter hair color"
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                                value={
                                    formData.hairColor ||
                                    savedFormData.hairColor ||
                                    ""
                                }
                            />
                            <span style={requiredAsteriskStyle}>*</span>
                        </div>
                        <div style={questionContainerStyle}>
                            <label style={questionLabelStyle}>Eye Color</label>
                            <input
                                type="text"
                                name="eyeColor"
                                placeholder="Enter eye color"
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                                value={
                                    formData.eyeColor ||
                                    savedFormData.eyeColor ||
                                    ""
                                }
                            />
                            <span style={requiredAsteriskStyle}>*</span>
                        </div>
                    </div>
                )
            case 3:
                heading = "Final Comments"
                return (
                    <div>
                        <div style={questionContainerStyle}>
                            <label style={questionLabelStyle}>
                                Any final comments?
                            </label>
                            <textarea
                                name="comments"
                                placeholder="Your comments"
                                onChange={handleInputChange}
                                style={inputStyle}
                                value={
                                    formData.comments ||
                                    savedFormData.comments ||
                                    ""
                                }
                            ></textarea>
                        </div>
                    </div>
                )
            case 4:
                heading = "Contact Information"
                return (
                    <div>
                        <div style={questionContainerStyle}>
                            <label style={questionLabelStyle}>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                                value={
                                    formData.name || savedFormData.name || ""
                                }
                            />
                            <span style={requiredAsteriskStyle}>*</span>
                        </div>
                        <div style={questionContainerStyle}>
                            <label style={questionLabelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                                value={
                                    formData.email || savedFormData.email || ""
                                }
                            />
                            <span style={requiredAsteriskStyle}>*</span>
                            {validationError && (
                                <div style={{ color: "red" }}>
                                    {validationError}
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 5:
                heading = "Review and Submit"
                return (
                    <div>
                        <p>Please review your information before submitting:</p>
                        <ul>
                            <li>
                                <strong>Image Uploaded:</strong>{" "}
                                {formData.image ? "✓" : "✗"}
                            </li>
                            <li>
                                <strong>Hair Color:</strong>{" "}
                                {formData.hairColor ||
                                    savedFormData.hairColor ||
                                    "N/A"}
                            </li>
                            <li>
                                <strong>Eye Color:</strong>{" "}
                                {formData.eyeColor ||
                                    savedFormData.eyeColor ||
                                    "N/A"}
                            </li>
                            <li>
                                <strong>Comments:</strong>{" "}
                                {formData.comments ||
                                    savedFormData.comments ||
                                    "N/A"}
                            </li>
                            <li>
                                <strong>Name:</strong>{" "}
                                {formData.name || savedFormData.name || "N/A"}
                            </li>
                            <li>
                                <strong>Email:</strong>{" "}
                                {formData.email || savedFormData.email || "N/A"}
                            </li>
                        </ul>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="mt-10 mb-36">
            <h1 className="text-7xl mb-36 font-medium">GPT4 vision API Web App</h1>
            <div className="flex justify-center items-center h-full">
                <motion.div
                    className="m-6 p-5 flex flex-col items-center justify-center rounded-lg shadow-md max-w-sm w-full bg-white relative"
                    style={{ backgroundColor: props.tint }}
                >
                    <div className="flex justify-center items-center overflow-hidden w-full max-h-300px rounded-lg mb-5">
                        {uploadedImage && (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        )}
                    </div>
                    {currentStep !== 1 && (
                        <h2 className="mb-3 mt-3">
                            {sectionTitles[currentStep - 1]}
                        </h2>
                    )}
                    {renderFormStep()}
                    <div className="text-red-500 text-center">
                        {validationError}
                    </div>
                    <div className="flex justify-between items-center w-full px-6 mt-4">
                        {currentStep > 1 && (
                            <button
                                onClick={previousStep}
                                className="w-32 h-10 bg-gray-700 text-white rounded-full cursor-pointer text-lg font-bold mr-2 flex items-center justify-center"
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 5 && (
                            <button
                                onClick={nextStep}
                                className={`w-32 h-10 bg-gray-900 text-white rounded-full cursor-pointer text-lg font-bold ${
                                    currentStep === 1 ? "mx-auto" : ""
                                }`}
                            >
                                {currentStep === 1 ? "Start" : "Next"}
                            </button>
                        )}
                        {currentStep === 5 && (
                            <button onClick={handleSubmit} className="w-32 h-10 bg-gray-900 text-white rounded-full cursor-pointer text-lg font-bold">
                                Submit
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

addPropertyControls(CustomForm, {
    tint: {
        title: "Tint",
        type: ControlType.Color,
        defaultValue: "#09F",
    },
    placeholderImage: {
        title: "Placeholder Image",
        type: ControlType.Image,
        defaultValue: "",
    },
    overlayImage: {
        title: "Overlay Image",
        type: ControlType.Image,
        defaultValue: "",
    },
})
