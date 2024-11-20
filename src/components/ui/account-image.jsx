import { useDropzone } from "react-dropzone";
import { X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DROPZONE_IMAGE_FORMAT,
  ICON,
  MAX_FILE_SIZE,
} from "../../utils/constants";
import { validateDropzoneSingleFile } from "../../utils/helper";
import { useState } from "react";

export const AccountImage = (props) => {
  const { isLoading, onUpload, onCancel, imageUrl } = props;
  const [imagePreview, setImagePreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...DROPZONE_IMAGE_FORMAT,
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      validateDropzoneSingleFile(rejectedFiles, MAX_FILE_SIZE);
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        onUpload(file);
      }
    },
    disabled: isLoading,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const cancelHandler = (e) => {
    e.stopPropagation();
    if (isLoading) {
      return;
    }
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onCancel();
  };

  return (
    <div className="w-[90px] h-[90px] relative" {...getRootProps({})}>
      {imageUrl || imagePreview ? (
        <Button
          type="button"
          onClick={cancelHandler}
          variant="destructive"
          className="rounded-full hover:bg-destructive absolute bottom-0 p-0 w-[30px] h-[30px] right-[-8px] z-10"
          size="icon"
        >
          <X color="#fff" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="md"
          className="rounded-full absolute bottom-0 p-0 w-[30px] h-[30px] right-[-8px] z-10"
          size="icon"
        >
          <img src={ICON.icons.edit} className="w-[30px] h-[30px]" />
        </Button>
      )}
      <Avatar className="m-auto w-full h-full">
        <AvatarImage
          className="object-cover"
          src={
            !isLoading
              ? imagePreview
                ? imagePreview
                : imageUrl
                ? imageUrl
                : ""
              : ""
          }
          alt="account image"
        />
        <AvatarFallback className="text-4xl bg-primary text-background uppercase">
          {isLoading ? (
            <Loader2 color="#fff" className="h-[30px] w-[30px] animate-spin" />
          ) : (
            <></>
          )}
        </AvatarFallback>
      </Avatar>
      <input {...getInputProps()} />
    </div>
  );
};
