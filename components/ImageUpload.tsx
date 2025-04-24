'use client'
import React, { useRef, useState } from 'react'
import { Image, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitProvider, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/next'
import config from '@/lib/config'
// import ImageKit from 'imagekit'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
// import {} from '@imagekit/next'


// const {
//   env: {
//     imagekit: {
//       publicKey,
//       urlEndpoint,
//     }
//   }
// } = config

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/upload-auth`);

    if(!response.ok){
      const errorText = await response.text();
      throw new Error(`Response failed with status:${response.status}:${errorText}`)
    }

    const data = await response.json();
    const{signature, expire, token, publicKey} = data;
    return {signature, expire, token, publicKey};
  } catch (error: any) {
    throw new Error(`Authentification request failed: ${error.message}`)
    // console.error('Authentification error:', error);
  }
}

const ImageUpload = (
  {onFileChange} : {
    onFileChange: (filePath: string) => void;
  }
) => {
  const [progress, setProgress] = useState(0);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  // const [file, setFile] = useState<{filePath: string} | null>(null);
  const [showBtn, setShowBtn] = useState(false);
  const abortController = new AbortController();

  // const onError = (error: any) => {
  //   console.log(error);
  //   toast('Your Image could not be uploaded. Please try again!!')
  // }

  // const onSuccess = (res: any) => {
  //   setFile(res);
  //   onFileChange(res.filePath)
  //   toast('Image uploaded successfully')
  // }

  const handleUpload = async () => {
    // ()=> !setShowBtn;
    const fileUpload = fileUploadRef.current;

    if(!fileUpload || !fileUpload.files || fileUpload.files.length === 0){
      alert('Please select a file to Upload');
      return;
    }

    const file = fileUpload.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error('Failed to authenticate for upload:', authError);
      return;
    }

    const {signature, expire, token, publicKey} = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,

        onProgress: (event) => {
          setProgress((event.loaded/event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      console.log('Upload response:', uploadResponse);

      // return file;
    } catch (error) {
      if (error instanceof ImageKitAbortError){
        console.error('Upload Aborted:', error.reason);
      } else if (error instanceof ImageKitInvalidRequestError){
        console.error('Invalid request:', error.message);
      } else if (error instanceof ImageKitUploadNetworkError){
        console.error('Network error:', error.message);
      } else if (error instanceof ImageKitServerError){
        console.error('Server error:', error.message);
      } else {
        console.error('Upload error:', error)
      }
    }

    // return file;
  }

  return (
    <>
      <Input type='file' ref={fileUploadRef} />
      {/* {file && (
        <Image
          alt={file.filePath}
          src={file.filePath}
          width={500}
          height={500}
        />
      )} */}
      <div className={cn(
         'flex gap-2 items-center'
      )}>
        <Button type='button' className='text-dark-400 w-full cursor-pointer' onClick={handleUpload}>Upload File</Button>
         <p className={cn(
          showBtn ? 'text-sm text-light-700 flex items-center gap-2' : 'hidden'
         )}>Upload Progress: <progress className='rounded-md' value={progress} max={100}></progress></p>
      </div>
     
    </>
  )
}

export default ImageUpload