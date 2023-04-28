import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    //isModelLoading is a boolean that determines if the MobileNet model is still loading or not.
    const [model, setModel] = useState(null)
    //model is the instance of the MobileNet model that will be used to identify objects in the image.
    const [imageURL, setImageURL] = useState(null);
    //imageURL is the URL of the image that will be identified.
    const [results, setResults] = useState([])
    //results is an array that will hold the results of the image identification
    
    const [notImage, setImgErr] = useState(false)

    const imageRef = useRef()
    //imageRef is a reference to the <img> tag that will display the uploaded image.
    const textInputRef = useRef()
    //textInputRef is a reference to the input field where the user can enter the image URL.
    const fileInputRef = useRef()
    //fileInputRef is a reference to the file input field where the user can upload an image.

    //loadModel is an asynchronous function that loads the MobileNet model using 
    //the mobilenet.load() method provided by the @tensorflow-models/mobilenet package. 
    //It sets the model state to the loaded model instance and the isModelLoading state to false. If there is an error, 
    //it logs the error to the console and sets the isModelLoading state to false.

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }
    //uploadImage is a function that takes an event object as an argument and sets
    //the imageURL state to the URL of the uploaded image. If there are no uploaded files, it sets the imageURL state to null.

    const uploadImage = (e) => {
        const fileExtension = ["png", "jpeg", "webp", "jpg", "svg"];
        let notNice = true
        for (let i = 0; i < fileExtension.length; i++) {
            if (e.target.value.indexOf(fileExtension[i]) > -1) {
                setImgErr(false)
                notNice = false;
                break;
            }
        }
        if (!notNice) {
            const { files } = e.target
            if (files.length > 0) {
                const url = URL.createObjectURL(files[0])
                setImageURL(url)
            } else {
                setImageURL(null)
            }
        }
        else {
            setResults([]);
            setImageURL(null)
            setImgErr(true);
        }

    }

    //identify is an asynchronous function that sets the results state to the results of 
    //the MobileNet model's classify() method called on the imageRef reference. It also sets the textInputRef value to an empty string.

    const identify = async () => {
        if (!notImage) {
            textInputRef.current.value = ''
            console.log(imageRef.current);
            const results = await model.classify(imageRef.current)
            setResults(results)
        }
        else {
            console.log("Lawde Image Upload Karna")
        }
    }
    
    //handleOnChange is a function that takes an event object as an argument and sets 
    //the imageURL state to the value of the text input field. It also sets the results state to an empty array.
    const handleOnChange = (e) => {
        setImageURL(e.target.value)
        setResults([])
    }

    //triggerUpload is a function that triggers the click event of the fileInputRef reference.
    const triggerUpload = () => {
        fileInputRef.current.click()
    }
    
//The first useEffect hook runs the loadModel function when the component mounts.
    useEffect(() => {
        loadModel()
    }, [])
    
//The second useEffect hook runs whenever the imageURL state changes. If imageURL is truthy, it adds the URL to the beginning of the history state array.
    // useEffect(() => {
    //     if (imageURL) {
    //         setHistory([imageURL, ...history])
    //     }
    // }, [imageURL])

    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }

    return (
        <div className="App">
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' id='input-img' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {notImage == true && <div>Upload Image</div>}
                    {notImage == false  && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
        </div>
    );
}

export default App;
