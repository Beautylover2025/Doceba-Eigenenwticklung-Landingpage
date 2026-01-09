"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, TrendingUp, Users, MousePointerClick, MessageSquare } from "lucide-react";
import { getStartOfToday, getEndOfToday, getStartOfYesterday, getEndOfYesterday, formatGermanDate } from "@/lib/dateUtils";

type TimeFilter = "today" | "yesterday" | "last7days" | "last14days" | "last30days" | "last45days" | "last60days" | "custom";

type MetricCard = {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    change?: string;
};

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("today");
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");
    const [metrics, setMetrics] = useState({
        pageViews: 0,
        quizStarts: 0,
        conversionRate: 0,
    });
    const [quizAnswers, setQuizAnswers] = useState<any[]>([]);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (!loading) {
            fetchAnalytics();
        }
    }, [timeFilter, loading]);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const getDateRange = () => {
        const now = new Date();

        if (timeFilter === "today") {
            return { start: getStartOfToday(), end: getEndOfToday() };
        } else if (timeFilter === "yesterday") {
            return { start: getStartOfYesterday(), end: getEndOfYesterday() };
        } else if (timeFilter === "last7days") {
            const start = new Date(now);
            start.setDate(start.getDate() - 7);
            return { start: start.toISOString(), end: getEndOfToday() };
        } else if (timeFilter === "last14days") {
            const start = new Date(now);
            start.setDate(start.getDate() - 14);
            return { start: start.toISOString(), end: getEndOfToday() };
        } else if (timeFilter === "last30days") {
            const start = new Date(now);
            start.setDate(start.getDate() - 30);
            return { start: start.toISOString(), end: getEndOfToday() };
        } else if (timeFilter === "last45days") {
            const start = new Date(now);
            start.setDate(start.getDate() - 45);
            return { start: start.toISOString(), end: getEndOfToday() };
        } else if (timeFilter === "last60days") {
            const start = new Date(now);
            start.setDate(start.getDate() - 60);
            return { start: start.toISOString(), end: getEndOfToday() };
        } else if (timeFilter === "custom" && customStartDate && customEndDate) {
            return {
                start: new Date(customStartDate).toISOString(),
                end: new Date(customEndDate + "T23:59:59").toISOString()
            };
        }

        return { start: getStartOfToday(), end: getEndOfToday() };
    };

    const fetchAnalytics = async () => {
        const { start, end } = getDateRange();

        // Page Views
        const { count: pageViewCount } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "page_view")
            .gte("created_at", start)
            .lte("created_at", end);

        // Quiz Starts
        const { count: quizStartCount } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "quiz_start")
            .gte("created_at", start)
            .lte("created_at", end);

        // Quiz Answers
        const { data: answersData } = await supabase
            .from("quiz_responses")
            .select("*")
            .gte("created_at", start)
            .lte("created_at", end)
            .order("created_at", { ascending: false });

        const conversionRate = pageViewCount ? ((quizStartCount || 0) / pageViewCount) * 100 : 0;

        setMetrics({
            pageViews: pageViewCount || 0,
            quizStarts: quizStartCount || 0,
            conversionRate: Math.round(conversionRate * 10) / 10,
        });

        setQuizAnswers(answersData || []);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Lädt...</div>
            </div>
        );
    }

    const metricCards: MetricCard[] = [
        {
            title: "Page Views",
            value: metrics.pageViews,
            icon: <Users className="w-6 h-6 text-medical-blue" />,
        },
        {
            title: "Quiz Starts",
            value: metrics.quizStarts,
            icon: <MousePointerClick className="w-6 h-6 text-cyan-500" />,
        },
        {
            title: "Conversion Rate",
            value: `${metrics.conversionRate}%`,
            icon: <TrendingUp className="w-6 h-6 text-green-500" />,
        },
        {
            title: "Quiz Antworten",
            value: quizAnswers.length,
            icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                            alt="DOCEBA"
                            className="h-8 w-auto"
                        />
                        <div className="h-6 w-px bg-gray-200" />
                        <h1 className="text-xl font-display font-bold text-gray-900">Analytics Dashboard</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Abmelden</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Time Filter */}
                <div className="mb-8">
                    <span className="text-sm font-bold text-gray-700 mb-3 block">Zeitraum:</span>

                    {/* Preset Filters */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            { value: "today", label: "Heute" },
                            { value: "yesterday", label: "Gestern" },
                            { value: "last7days", label: "Letzte 7 Tage" },
                            { value: "last14days", label: "Letzte 14 Tage" },
                            { value: "last30days", label: "Letzte 30 Tage" },
                            { value: "last45days", label: "Letzte 45 Tage" },
                            { value: "last60days", label: "Letzte 60 Tage" },
                        ].map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setTimeFilter(filter.value as TimeFilter)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${timeFilter === filter.value
                                        ? "bg-medical-blue text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                        <button
                            onClick={() => setTimeFilter("custom")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${timeFilter === "custom"
                                    ? "bg-medical-blue text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            Benutzerdefiniert
                        </button>
                    </div>

                    {/* Custom Date Range Picker */}
                    {timeFilter === "custom" && (
                        <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Von:</label>
                                <input
                                    type="date"
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Bis:</label>
                                <input
                                    type="date"
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={() => fetchAnalytics()}
                                disabled={!customStartDate || !customEndDate}
                                className="px-4 py-2 bg-medical-blue text-white rounded-lg font-medium text-sm hover:bg-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anwenden
                            </button>
                        </div>
                    )}
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metricCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl">{card.icon}</div>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                            <p className="text-3xl font-display font-bold text-gray-900">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Funnel Visualization */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Conversion Funnel</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-700">Landing Page Views</span>
                                <span className="text-lg font-bold text-gray-900">{metrics.pageViews}</span>
                            </div>
                            <div className="h-12 bg-medical-blue rounded-lg" style={{ width: "100%" }} />
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-700">Quiz Starts</span>
                                <span className="text-lg font-bold text-gray-900">{metrics.quizStarts}</span>
                            </div>
                            <div
                                className="h-12 bg-cyan-500 rounded-lg"
                                style={{ width: `${metrics.pageViews ? (metrics.quizStarts / metrics.pageViews) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Quiz Answers Table */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Quiz Antworten</h2>
                    {quizAnswers.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Keine Antworten im gewählten Zeitraum</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Zeit</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Frage</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Antwort</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizAnswers.map((answer, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {formatGermanDate(new Date(answer.created_at), "dd.MM.yyyy HH:mm")}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                                                {answer.question_text}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-700">{answer.answer_text}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
