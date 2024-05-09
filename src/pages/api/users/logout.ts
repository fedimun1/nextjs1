import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' }); // Handle non-GET requests
  }

  try {
    // Handle logout logic here (e.g., clear session data)
    const response=  res.json({
      message: "Login Successful",
      success: true,
  });
  response.cookies.set("token","",{
    HttpOnly:true,
          expires:new Date(0)

  })
    return response

    // const response =res.json({
    //   message: "Logged out successfully",
    //   success: true,
    // });

    //  response.cookies.set("token","a",{
    //   HttpOnly:true,
    //   expires:new Date(0)
    // });
    return response

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
}
