# use-hooks-zone Package

## Overview

`use-hooks-zone` is a comprehensive npm package tailored specifically for React applications, offering a diverse range of custom hooks to enhance development efficiency and streamline common tasks. With a focus on simplicity, performance, and versatility, this package empowers developers to seamlessly integrate powerful functionalities into their React projects with minimal effort.

## Installation

You can install `use-hooks-zone` via npm or yarn:

```bash
npm install use-hooks-zone

```

## Usage

```jsx
import { all hooks..... } from "use-hooks-zone";

```

## hooks

### 1 . useFileUploader

```jsx
import React from "react";
import { useFileUploader } from "use-hooks-zone";

function App() {
   const { files, onSetFile, deleteFile, fileSizeUnit, dragAndDropProps, errors, sizeLimit, allowExtensions } = useFileUploader({
      defaultFileIcon: "https://static.thenounproject.com/png/375312-200.png",
      base64: true,
      dragAndDrop: true,
      sizeLimit: 2 * 1000 * 1000, //1 MB,
      limit: 8,
      allowExtensions: ["png", "jpg", "jpeg", "webp", "pdf"],
   });

   return (
      <div style={{ width: "40%", margin: "auto" }}>
         {/* upload box */}
         <div {...dragAndDropProps.events}>
            {dragAndDropProps.isDragging ? ( "Dragging...") : (
               <label htmlFor="upload">
                  Upload / file size limit : {fileSizeUnit(sizeLimit)} / allow file : {allowExtensions.join(" , ")}
                  <input type="file" id="upload" onChange={(e) => onSetFile(e.target.files as FileList)} hidden />
               </label>
            )}
         </div>

         {/* upload list */}
         {files?.length ? (
            <React.Fragment>
               {files.map((file, idx) => (
                  <div key={idx}>
                     <img src={file.image} alt="file.image" height={50} width={50} />
                     <div>{file.name}</div>
                     <div>{fileSizeUnit(file.size)}</div>
                     <div>{file.type}</div>
                     <button onClick={() => deleteFile(idx)}>delete</button>
                  </div>
               ))}
               <button style={{ width: "100%" }} onClick={() => console.log(files)}>
                  Upload Files
               </button>
            </React.Fragment>
         ) : (
            <div>No File</div>
         )}

         {/* errors */}
         {!!errors.length && errors?.map((error, index) => <div key={index}>error : {error}</div>)}
      </div>
   );
}

export default App;

```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to this project.

## License

This package is open-source and available under the MIT License.
