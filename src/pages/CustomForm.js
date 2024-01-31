// CustomForm.js
import React, { memo } from 'react';
import { useForm } from '../hooks/useForm'; // Import the custom hook
import { motion } from "framer-motion"
import previewImage from '../assets/preview.webp'

const CustomForm = memo((props) => {
    // Initialize form state
    const initialFormData = {
        image: previewImage,
        hairColor: "",
        eyeColor: "",
        comments: "",
        name: "",
        email: "",
    };

    // Use the custom hook
    const {
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
    } = useForm(initialFormData);

    const sectionTitles = [
        "",
        "Hair and Eye Color",
        "Final Comments",
        "Contact Information",
        "Review and Submit",
    ]
    // Render functions and other component logic...
    const renderFormStep = () => {
        let heading = ""
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className='flex flex-row justify-center items-center w-full max-h-[300px] rounded-2xl mb-5 overflow-hidden'>
                            <input
                                type="file"
                                id="imageInput"
                                name="image"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <span  className={`flex flex-row items-center justify-center w-48 h-9 bg-gray-900 text-white rounded-full cursor-pointer text-sm font-bold text-center ${
                                    currentStep === 1 ? "mx-auto" : ""
                                }`}>
                                <label
                                    htmlFor="imageInput"
                                >
                                    Upload Your Image
                                </label>
                            </span>
                            {currentStep !== 1 && (
                                <span className='absolute top-2 right-2 text-sm text-[#ff0000]'>*</span>
                            )}
                            {props.overlayImage && (
                                <img
                                    src={props.overlayImage}
                                    alt="Overlay"
                                    className='absolute top-0 left-0 w-full object-cover pointer-events-none'
                                />
                            )}
                        </div>
                    </div>
                )
            case 2:
                heading = "Hair and Eye Color"
                return (
                    <div>
                        <div className='flex flex-col mb-5 w-full relative'>
                            <label className='mb-2 text-xs font-medium'>Hair Color</label>
                            <input
                                type="text"
                                name="hairColor"
                                placeholder="Enter hair color"
                                onChange={handleInputChange}
                                className='h-9 w-full border rounded-lg px-2'
                                required
                                value={
                                    formData.hairColor ||
                                    savedFormData.hairColor ||
                                    ""
                                }
                            />
                            <span className='absolute top-2 right-2 text-sm text-[#ff0000]'>*</span>
                        </div>
                        <div className='flex flex-col mb-5 w-full relative'>
                            <label className='mb-2 text-xs font-medium'>Eye Color</label>
                            <input
                                type="text"
                                name="eyeColor"
                                placeholder="Enter eye color"
                                onChange={handleInputChange}
                                className='h-9 w-full border rounded-lg p-2'
                                required
                                value={
                                    formData.eyeColor ||
                                    savedFormData.eyeColor ||
                                    ""
                                }
                            />
                            <span className='absolute top-2 right-2 text-sm text-[#ff0000]'>*</span>
                        </div>
                    </div>
                )
            case 3:
                heading = "Final Comments"
                return (
                    <div>
                        <div className='flex flex-col mb-5 w-full relative'>
                            <label className='mb-2 text-xs font-medium'>
                                Any final comments?
                            </label>
                            <textarea
                                name="comments"
                                placeholder="Your comments"
                                onChange={handleInputChange}
                                className='h-9 w-full border rounded-lg p-2'
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
                        <div className='flex flex-col mb-5 w-full relative'>
                            <label className='mb-2 text-xs font-medium'>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                                className='h-9 w-full border rounded-lg px-2'
                                required
                                value={
                                    formData.name || savedFormData.name || ""
                                }
                            />
                            <span className='absolute top-2 right-2 text-sm text-[#ff0000]'>*</span>
                        </div>
                        <div className='flex flex-col mb-5 w-full relative'>
                            <label className='mb-2 text-xs font-medium'>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                                className='h-9 w-full border rounded-lg px-2'
                                required
                                value={
                                    formData.email || savedFormData.email || ""
                                }
                            />
                            <span className='absolute top-2 right-2 text-sm text-[#ff0000]'>*</span>
                            {validationError && (
                                <div className='text-sm text-[#ff0000]'>
                                    {validationError}
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 5:
                heading = "Review and Submit"
                return (
                    <div className='mb-2 text-xs font-medium'>
                        <p className='text-[13px]'>Please review your information before submitting:</p>
                        <ul className='ml-8 my-4 list-disc'>
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

    // Return the JSX for the component using Tailwind CSS for styling
    return (
        <div className="md:mt-10 md:mb-36">
            <h1 className="text-2xl mt-4 mb-1 md:text-6xl md:mb-8 font-medium text-center">Discover Your Color Season</h1>
            <h1 className="text-2xl mb-4 md:text-6xl md:mb-28 font-medium text-center">For Free</h1>
            <div className="flex justify-center items-center h-full mb-4">
                <motion.div
                    className="m-6 p-5 flex flex-col items-center justify-center rounded-3xl shadow-[1px_1px_12px_1px_rgba(219,219,219,1)] max-w-72 md:max-w-96 w-full relative"
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
                        <h2 className="mb-3 mt-3 font-bold text-lg">
                            {sectionTitles[currentStep - 1]}
                        </h2>
                    )}
                    {renderFormStep()}
                    <div className="text-[#ff0000] text-center text-xs font-medium">
                        {validationError}
                    </div>
                    <div className="flex justify-between items-center w-full px-6 mt-4">
                        {currentStep > 1 && (
                            <button
                                onClick={previousStep}
                                className="w-40 h-9 bg-gray-700 text-white rounded-full cursor-pointer text-lg font-bold mr-2 flex items-center justify-center"
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 5 && (
                            <button
                                onClick={nextStep}
                                className={` h-9 bg-gray-900 text-white rounded-full cursor-pointer  font-bold ${
                                    currentStep === 1 ? "mx-auto text-sm w-48" : "text-lg w-40"
                                }`}
                            >
                                {currentStep === 1 ? "Start" : "Next"}
                            </button>
                        )}
                        {currentStep === 5 && (
                            <button onClick={handleSubmit} className="w-40 h-9 bg-gray-900 text-white rounded-full cursor-pointer text-lg font-bold">
                                Submit
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
});

export default CustomForm;
