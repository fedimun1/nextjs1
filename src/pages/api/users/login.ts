'use client'
import { getConnection } from '@/dbConfig/dbConfig'; // Assuming dbConfig/dbConfig contains the connection logic
import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await getConnection();

            const username = req.body.username
            const password = req.body.password
    const existingUserQuery = 'SELECT * FROM users WHERE username = ?';
    const existingUserValues = [username];
    const [existingUserResults] = await connection.query(existingUserQuery, existingUserValues);
   
    if (existingUserResults.length > 0)
    {
     
        const validPassword = await bcryptjs.compare(password,existingUserResults[0].password)
        if(validPassword)
            {

                const tokenData = {
                    id: existingUserResults[0].id,
                    username : existingUserResults[0].username, 
            
                }
                const token = await jwt.sign(tokenData,process.env.Token_Secret!,{expiresIn:"1h"})

                res.setHeader('Set-Cookie', `token=${token}; HttpOnly=true`); // Set the cookie header
             
            //    console.log(response)

            return res.json({
                message: "Login Successful",
                success: true,
            });

                // return res.status(200).json({message : "SucessFuly Loged In"})
            }

            else
            {
                return res.status(400).json({ message: "Invalid Pass Word" }); // Use 409 for conflict

            }
      }
      else
      {
        const ldapApi = "https://dummyjson.com/products/1"
        const response = await axios.get(ldapApi);
        if(response.data != null)
          {
            //   console.log(response.data.id)
              
          }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const values = [username, hashedPassword]; // Use hashedPassword
  
      await connection.query(query, values);
      connection.release(); // Release the connection back to the pool
  
      res.status(200).json({ message: 'User created successfully' }); // Send a success response
      }

  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error creating user' }); // Send an error response
  }
}

export default createUser;  // Export the handler function with a descriptive name

