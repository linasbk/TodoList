// "use client";
// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { useSession } from 'next-auth/react';

// interface User {
//   id: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { data: session, status } = useSession();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (status === 'loading') {
//       setLoading(true);
//     } else {
//       setLoading(false);
//     }
//   }, [session, status]);

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         isAuthenticated: !!session,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };