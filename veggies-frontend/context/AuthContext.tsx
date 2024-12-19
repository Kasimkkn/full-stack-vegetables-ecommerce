"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextProps {
    user: Record<string, any> | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const storedUser = localStorage.getItem("veggies:user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            if (pathname !== "/login") {
                router.push("/login");
            }
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem("veggies:user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
