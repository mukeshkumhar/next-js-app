const { default: NextAuth } = require("next-auth");
import { authOptions } from "@/lib/auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };