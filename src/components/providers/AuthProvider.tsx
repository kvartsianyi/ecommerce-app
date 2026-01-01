// import { useState } from 'react';

// // import { AuthContext } from '@/context/AuthContext';
// // import type { AuthTokens } from '@/types/auth';
// // import tokenManager from '@/lib/tokenManager';

// type AuthTokens = {
//   accessToken: string | null;
//   refreshToken: string | null;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const initialState = { accessToken: null, refreshToken: null };
//   // const initialState = tokenManager.getTokens();
//   const [tokens, setTokens] = useState<AuthTokens>(initialState);

//   const handleSetTokens = (tokens: AuthTokens) => {
//     setTokens(tokens);
//     // tokenManager.setTokens(tokens);
//   };

//   const handleLogout = () => {
//     setTokens({ accessToken: null, refreshToken: null });
//     // tokenManager.clearTokens();
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         tokens,
//         setTokens: handleSetTokens,
//         logout: handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
