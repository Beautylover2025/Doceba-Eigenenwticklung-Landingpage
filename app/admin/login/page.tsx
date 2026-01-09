"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                router.push("/admin");
            }
        } catch (err: any) {
            setError(err.message || "Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                        alt="DOCEBA"
                        className="h-12 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 text-sm mt-2">Analytics & Funnel Insights</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-blue focus:border-transparent transition-all"
                                placeholder="rayyyabo@doceba.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                Passwort
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-blue focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-medical-blue text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                        >
                            {loading ? "Wird geladen..." : "Anmelden"}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
