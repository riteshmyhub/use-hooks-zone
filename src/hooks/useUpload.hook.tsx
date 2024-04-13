import { DragEvent, useState } from "react";

interface FileItem extends Blob {
   name: string;
   size: number;
   type: string;
   image?: string;
   base64?: string;
}

type Props = {
   sizeLimit: number;
   limit: number;
   allowExtensions: string[];
   dragAndDrop: boolean;
   base64: boolean;
   defaultFileIcon: string;
};

export function useFileUploader({ sizeLimit, limit, allowExtensions, dragAndDrop, base64, defaultFileIcon }: Props) {
   const [files, setFiles] = useState<FileItem[]>([]);
   const [isDragging, setDragging] = useState<boolean>(false);
   const [errors, setErrors] = useState<string[]>([]);

   const fileSizeUnit = (size: number): string => {
      let value = +(size / 1000).toFixed(2);
      if (value < 1000) {
         return `${value} KB`;
      }
      if (value >= 1000 && value <= 1000000) {
         return `${(value / 1000).toFixed(2)} MB`;
      }
      if (value > 1000000) {
         return `${(value / 1000000).toFixed(2)} GB`;
      }
      if (value > 1000000000 && value <= 1000000000000) {
         return `${(value / 1000000000).toFixed(2)} TB`;
      }
      return `${value}`;
   };

   const onSetFile = (files: FileList) => {
      setFiles((preFiles) => {
         let fileList: FileItem[] = [];
         const errorsList: string[] = [];
         [...Array.from(preFiles), ...Array.from(files)].forEach((file: FileItem, idx) => {
            const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

            if (idx + 1 > limit) {
               errorsList.push(`${limit} files can be upload!`);
               return;
            }

            if (allowExtensions && !allowExtensions.includes(fileExtension)) {
               errorsList.push(`${file.name} invalid extensions file!`);
               return;
            }

            if (file.size / 1000 >= sizeLimit) {
               errorsList.push(`${file.name} is too large file size!`);
               return;
            }

            if (fileList.some((item) => item?.name === file?.name)) {
               errorsList.push(`${file.name} is already exist file!`);
               return;
            }

            file.image = typeof file === "object" && file.type.split("/")[0].includes("image") ? URL.createObjectURL(file) : defaultFileIcon;

            if (base64) {
               let fileReader = new FileReader();
               fileReader.onload = (e) => {
                  const { result } = e.target as FileReader;
                  if (result) {
                     file.base64 = result as string;
                     setFiles((prevFiles) => [...prevFiles]);
                  }
               };
               fileReader.readAsDataURL(file);
            }
            //
            fileList.push(file);
         });

         setErrors([...new Set(Array.from(errorsList))]);
         return fileList;
      });
   };

   const deleteFile = (idx: number) => {
      setFiles((pre) => {
         let list = pre.filter((_, index) => index !== idx);
         return list;
      });
   };

   const dragAndDropProps = dragAndDrop
      ? {
           events: {
              onDrop: (event: DragEvent<HTMLDivElement>) => {
                 event.preventDefault();
                 setDragging(false);
                 const droppedFiles = event.dataTransfer.files;
                 onSetFile(droppedFiles);
              },
              onDragOver: (event: DragEvent<HTMLDivElement>) => {
                 event.preventDefault();
                 const hasFiles = Array.from(event.dataTransfer.types).includes("Files");
                 setDragging(hasFiles);
              },
              onDragLeave: (event: DragEvent<HTMLDivElement>) => {
                 event.preventDefault();
                 setDragging(false);
              },
           },
           isDragging,
        }
      : {};

   return { files, onSetFile, deleteFile, fileSizeUnit, dragAndDropProps, errors, sizeLimit, allowExtensions };
}

/*
   const { files, onSetFile, deleteFile, fileSizeUnit, dragAndDropProps, errors } = useFileUploader({
      base64: true,
      dragAndDrop: true,
      sizeLimit: 1024, //1 MB,
      limit: 3,
      allowExtensions: ["png", "jpg", "jpeg", "webp"],
   });

*/
