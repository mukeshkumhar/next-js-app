// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response


    // const imagekitAuthentication = getUploadAuthParams({
    //   privateKey: process.env.Next_ImageKit_Private_Key as string, // Never expose this on client side
    //   publicKey: process.env.Next_ImageKit_Public_Key as string,
    // });

    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.Next_ImageKit_Private_Key as string, // Never expose this on client side
            publicKey: process.env.Next_ImageKit_Public_Key as string,
          // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
          // token: "random-token", // Optional, a unique token for request
        });
    
        return Response.json({
            token,
            expire,
            signature,
            publicKey: process.env.Next_ImageKit_Public_Key,
        });
    } catch (error) {
        console.error("Error generating upload auth params:", error);
        return Response.json("Imagekit auth error", { status: 500 });
        
    }

    // return Response.json({
    //   imagekitAuthentication,
    //   publicKey: process.env.Next_ImageKit_Public_Key,
    // });
}
