import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('https://backend-1-la1d.onrender.com/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    const deleteFile = (filename) => {
        axios.delete(`https://backend-1-la1d.onrender.com/files/${filename}`)
            .then(response => {
                console.log(response.data);
                // Update the files state to reflect the deletion
                setFiles(prevFiles => prevFiles.filter(file => file.filename !== filename));
            })
            .catch(error => {
                console.error('Error deleting file:', error);
            });
    };
    

    const updateFile = (filename, updatedContent) => {
        axios.put(`https://backend-1-la1d.onrender.com/files/${filename}`, { updatedContent })
            .then(response => {
                console.log(response.data);
                // Optionally update UI or notify user about successful update
            })
            .catch(error => {
                console.error('Error updating file:', error);
            });
    };

    return (
        <div>
            <h1>Uploaded Files</h1>
            <ul>
                {files.map(file => (
                    <li key={file.filename}>
                        <a href={`https://backend-1-la1d.onrender.com/upload/${file.filename}`} target="_blank" rel="noopener noreferrer">
                            {file.filename}
                        </a>
                        <p>{file.description}</p>
                        <button onClick={() => deleteFile(file.filename)}>Delete</button>
                        {/* Add input and button for updating files */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
