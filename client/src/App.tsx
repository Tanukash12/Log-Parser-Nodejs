import { ChangeEvent, MouseEvent, useEffect, useState, FC } from "react";
import { FolderIcon } from "@heroicons/react/24/solid";

import Modal from "./components/Modal";

interface Props {}

const App: FC = (props: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [jsonData, setJsonData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (jsonData) {
            setLoading(true);
            handleDownload();
            setLoading(false);
        }
    }, [jsonData]);

    const handleDownload = (): void => {
        const json = JSON.stringify(jsonData);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName.split(".")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
        setFile(event.target.files ? event.target.files[0] : null);
        setFileName(event.target.files ? event.target.files[0].name : "");
    }

    const handleFileUpload = async (e: MouseEvent<HTMLButtonElement>) => {
        let modifiedFileName = fileName.split(".")[0];

        if (!file || !fileName) {
            setError("Please select a file to upload!");
            throw new Error("Please Select A File To Upload!");
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        try {
            const res = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/api/logParser/file`, {
                        method: "POST",
                        body: formData,
                        
                    }
            );
            const response = await res.json();
            setLoading(false); 
            setJsonData(response);
        } catch (err) {
            setLoading(false);
            setError(
                "Sorry could not parse the data, Please try after sometime!"
            );
        }
    };

    function handleError(valueFromChild: string) {
        setError(valueFromChild);
    }

   

return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-300 via-blue-200 to-pink-200 flex flex-col items-center justify-center font-sans transition-all duration-500">
            {error && <Modal error={error} handleError={handleError} />}
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="bg-white/80 backdrop-blur-lg max-w-xl rounded-3xl space-y-7 p-12 flex flex-col justify-center items-center shadow-2xl border border-indigo-100 animate-fade-in">
                    {/* Heading */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <h2 className="font-extrabold text-5xl text-indigo-700 tracking-wide drop-shadow-lg animate-bounce">
                            Upload your file
                        </h2>
                        <p className="font-medium text-base text-pink-500">
                            File should be of the format <span className="font-semibold text-indigo-500">.txt</span>
                        </p>
                    </div>

                    {/* Upload Container */}
                    <div className="flex items-center justify-center p-8 space-y-5 flex-col border-2 border-dashed border-indigo-400 rounded-2xl bg-indigo-50/60 h-fit w-full shadow-md animate-fade-in">
                        <FolderIcon className="fill-pink-400 h-20 w-20 mb-2 animate-wiggle" />
                        <p className="font-normal text-lg text-indigo-600">
                            Drag & drop or select your file below.
                        </p>
                        <form>
                            <label className="block m-1">
                                <span className="sr-only">Choose File</span>
                                <input
                                    name="test"
                                    type="file"
                                    onChange={handleFileSelect}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 transition-all duration-200"
                                />
                            </label>
                        </form>
                        <button
                            className="flex items-center justify-center gap-2 rounded-2xl text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 p-3 h-fit w-44 shadow-lg shadow-indigo-200 active:shadow-xl active:scale-105 transition border-gray-500 text-white hover:from-pink-400 hover:to-indigo-400"
                            onClick={handleFileUpload}
                            disabled={loading}
                        >
                            {loading && (
                                <span className="animate-spin inline-block border-indigo-600 w-6 h-6 border-4 rounded-full border-t-transparent"></span>
                            )}
                            Upload
                        </button>
                        {fileName && (
                            <span className="text-xs text-indigo-700 mt-2 animate-fade-in">
                                Selected file: <span className="font-semibold">{fileName}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="w-full text-center py-6 mt-12 bg-gradient-to-r from-indigo-200 to-pink-200 shadow-inner border-t border-indigo-100 animate-fade-in">
                <span className="text-indigo-700 text-base font-semibold tracking-wide flex items-center justify-center gap-2">
                    <span className="text-xl">&copy;</span>
                    Made by <span className="text-pink-600 font-bold">Tanushka Kashyap</span> 2025
                </span>
            </footer>
            {/* Animations */}
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in { animation: fade-in 1s ease; }
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-8deg);}
                    50% { transform: rotate(8deg);}
                }
                .animate-wiggle { animation: wiggle 1.5s infinite; }
                `}
            </style>
        </div>
    );
};


export default App;
