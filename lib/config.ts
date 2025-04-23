const config = {
  env : {
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      URLEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    }
  }
}