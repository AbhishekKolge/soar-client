import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DROPZONE_IMAGE_FORMAT,
  ICON,
  MAX_FILE_SIZE,
} from "../../utils/constants";
import {
  errorToast,
  getInitials,
  successToast,
  validateDropzoneSingleFile,
} from "../../utils/helper";
import { updateUserInfoHandler } from "../../features/auth/auth-action";

const ProfileImage = (props) => {
  const { showMeData, isLoading, onUpload, onCancel, profileImageId } = props;
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...DROPZONE_IMAGE_FORMAT,
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      validateDropzoneSingleFile(rejectedFiles, MAX_FILE_SIZE);
      if (acceptedFiles[0]) {
        const formData = new FormData();
        formData.append("profileImage", acceptedFiles[0]);
        onUpload(formData)
          .unwrap()
          .then((data) => {
            dispatch(updateUserInfoHandler(data));
            successToast("Profile image uploaded successfully");
          })
          .catch((error) => {
            if (error.data?.msg) {
              errorToast(error.data.msg);
            } else {
              errorToast("Something went wrong!, please try again");
            }
          });
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
    onCancel(profileImageId)
      .unwrap()
      .then(() => {
        dispatch(updateUserInfoHandler({ profileImageUrl: null }));
        successToast("Profile image removed successfully");
      })
      .catch((error) => {
        if (error.data?.msg) {
          errorToast(error.data.msg);
        } else {
          errorToast("Something went wrong!, please try again");
        }
      });
  };

  return (
    <div
      className="w-[100px] h-[100px] md:w-[90px] md:h-[90px] relative"
      {...getRootProps({})}
    >
      {showMeData?.user?.profileImageUrl ? (
        <Button
          type="button"
          onClick={cancelHandler}
          variant="destructive"
          className="rounded-full hover:bg-destructive absolute bottom-0 p-0 w-[30px] h-[30px] right-[-5px] md:right-[-8px] z-10"
          size="icon"
        >
          <X color="#fff" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="md"
          className="rounded-full absolute bottom-0 p-0 w-[30px] h-[30px] right-[-5px] md:right-[-8px] z-10"
          size="icon"
        >
          <img src={ICON.icons.edit} className="w-[30px] h-[30px]" />
        </Button>
      )}
      <Avatar className="m-auto w-full h-full">
        <AvatarImage
          className="object-cover"
          src={!isLoading ? showMeData?.user?.profileImageUrl : ""}
          alt={`@${showMeData?.user?.username}`}
        />
        <AvatarFallback className="text-4xl bg-primary text-background uppercase">
          {isLoading ? (
            <Loader2 color="#fff" className="h-[30px] w-[30px] animate-spin" />
          ) : (
            getInitials(showMeData?.user?.name || "")
          )}
        </AvatarFallback>
      </Avatar>
      <input {...getInputProps()} />
    </div>
  );
};

export default ProfileImage;
