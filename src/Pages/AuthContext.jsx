import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/utils/api";

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = "auth_token";
const STORAGE_USER_KEY = "user_data";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user from /me endpoint
    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem(STORAGE_TOKEN_KEY);
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/me");
            const userData = response.data.data;
            setUser(userData);
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // Clear invalid token
            localStorage.removeItem(STORAGE_TOKEN_KEY);
            localStorage.removeItem(STORAGE_USER_KEY);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initialize auth state on mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = useCallback(async (token) => {
        localStorage.setItem(STORAGE_TOKEN_KEY, token);
        await fetchUser();
    }, [fetchUser]);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
        setUser(null);
    }, []);

    const value = {
        user,
        loading,
        login,
        fetchUser,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}