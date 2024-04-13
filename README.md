# use-hooks-zone

use hooks zone package is helper hooks for building react project.

## hooks
  - useFileUploader hook

## 1 useFileUploader

```bash
npm i use-hooks-zone
```

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
            {dragAndDropProps.isDragging ? (
               "Dragging..."
            ) : (
               <label htmlFor="upload">
                  Upload
                  <br /> file size limit : {fileSizeUnit(sizeLimit)}
                  <br /> allow file : {allowExtensions.join(" , ")}
                  <input //
                     type="file"
                     id="upload"
                     onChange={(e) => onSetFile(e.target.files as FileList)}
                     hidden
                  />
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