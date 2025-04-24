// import ImageKit from "imagekit";
import config from "@/lib/config";
// import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";


const {
  env: {
    imagekit: {
      publicKey,
      privateKey,
      // urlEndpoint
    }
  }
} = config;

// const imagekit = new ImageKit({
//   publicKey,
//   privateKey,
//   urlEndpoint,  
// })

export async function GET() {
  // return NextResponse.json(imagekit.getAuthenticationParameters());
  const {token, expire, signature} = getUploadAuthParams({
    privateKey,
    publicKey,
  })

  return Response.json({token, expire, signature, publicKey});
}