import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getConnection } from '@/dbConfig/dbConfig'; // Assuming dbConfig/dbConfig contains the connection logic
import bcryptjs from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const connection = await getConnection();

        const existingUserQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUserValues = [credentials.username];
        const [existingUserResults] = await connection.query(existingUserQuery, existingUserValues);

        if (!existingUserResults.length > 0) { // Check for empty result
          return null;
        }
        const validPassword = await bcryptjs.compare(credentials.password, existingUserResults[0].password);
        if (!validPassword) {
          return null;
        }

        return existingUserResults[0]; // User object if credentials are valid
      },
    }),
  ],
  secret: process.env.Token_Secret,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Add role to token
      return session;
    },
  },
});
