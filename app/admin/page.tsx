"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, TrendingUp, Users, MousePointerClick, MessageSquare } from "lucide-react";
import { getStartOfToday, getEndOfToday, getStartOfYesterday, getEndOfYesterday, formatGermanDate } from "@/lib/dateUtils";
import ABTestPanel from "@/components/ABTestPanel";
import TrafficSourcePanel from "@/components/TrafficSourcePanel";

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
    const [buttonClicks, setButtonClicks] = useState<any[]>([]);
    const [funnelSteps, setFunnelSteps] = useState<{ step: string, label: string, count: number }[]>([]);

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

        // Button Clicks
        const { data: clicksData } = await supabase
            .from("button_clicks")
            .select("*")
            .gte("created_at", start)
            .lte("created_at", end)
            .order("created_at", { ascending: false });

        // Funnel Steps - count unique sessions per step
        const stepCounts: Record<number, Set<string>> = {};
        answersData?.forEach((answer) => {
            const stepIdx = answer.question_index;
            if (!stepCounts[stepIdx]) stepCounts[stepIdx] = new Set();
            stepCounts[stepIdx].add(answer.session_id);
        });

        // Count actual form submissions from funnel_submissions
        const { count: submissionCount } = await supabase
            .from("funnel_submissions")
            .select("*", { count: "exact", head: true })
            .eq("last_step", "submission_completed")
            .gte("updated_at", start)
            .lte("updated_at", end);

        const stepLabels = [
            "Frage 1: Status",
            "Frage 2: Produkttyp",
            "Frage 3: Herausforderung",
            "Frage 4: Budget",
            "Frage 5: Zeitraum",
        ];

        const funnelData = [
            { step: "page_view", label: "Landing Page", count: pageViewCount || 0 },
            { step: "quiz_start", label: "Quiz gestartet", count: quizStartCount || 0 },
            ...stepLabels.map((label, idx) => ({
                step: `step_${idx + 1}`,
                label,
                count: stepCounts[idx]?.size || 0,
            })),
            { step: "form_completed", label: "Formular abgeschickt", count: submissionCount || 0 },
        ];

        setFunnelSteps(funnelData);

        const conversionRate = pageViewCount ? ((quizStartCount || 0) / pageViewCount) * 100 : 0;

        setMetrics({
            pageViews: pageViewCount || 0,
            quizStarts: quizStartCount || 0,
            conversionRate: Math.round(conversionRate * 10) / 10,
        });

        setQuizAnswers(answersData || []);
        setButtonClicks(clicksData || []);
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

                {/* A/B Test Panel + Traffic Source Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ABTestPanel
                        startDate={getDateRange().start}
                        endDate={getDateRange().end}
                    />
                    <TrafficSourcePanel
                        startDate={getDateRange().start}
                        endDate={getDateRange().end}
                    />
                </div>

                {/* Funnel Visualization */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Conversion Funnel</h2>
                    {funnelSteps.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Keine Daten im gewählten Zeitraum</p>
                    ) : (
                        <div className="space-y-3">
                            {funnelSteps.map((step, index) => {
                                const maxCount = funnelSteps[0]?.count || 1;
                                const prevCount = index > 0 ? funnelSteps[index - 1].count : step.count;
                                const dropOff = prevCount > 0 ? Math.round(((prevCount - step.count) / prevCount) * 100) : 0;
                                const widthPercent = maxCount > 0 ? (step.count / maxCount) * 100 : 0;

                                // Color gradient from blue to cyan
                                const colors = [
                                    "bg-medical-blue",
                                    "bg-blue-500",
                                    "bg-blue-400",
                                    "bg-cyan-500",
                                    "bg-cyan-400",
                                    "bg-teal-400",
                                    "bg-teal-300",
                                    "bg-green-400",
                                ];
                                const bgColor = colors[index % colors.length];

                                return (
                                    <div key={step.step} className="relative">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm font-bold text-gray-700">{step.label}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {index > 0 && dropOff > 0 && (
                                                    <span className="text-xs font-medium text-red-500">
                                                        -{dropOff}% Abbruch
                                                    </span>
                                                )}
                                                <span className="text-lg font-bold text-gray-900 min-w-[60px] text-right">
                                                    {step.count}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                                            <div
                                                className={`h-full ${bgColor} rounded-lg transition-all duration-500`}
                                                style={{ width: `${widthPercent}%`, minWidth: step.count > 0 ? '2%' : '0%' }}
                                            />
                                            {/* Percentage label inside bar */}
                                            {step.count > 0 && (
                                                <div className="absolute inset-0 flex items-center px-3">
                                                    <span className="text-xs font-bold text-white drop-shadow-sm">
                                                        {Math.round(widthPercent)}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Button Clicks Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Button Klicks</h2>
                    {buttonClicks.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Keine Button-Klicks im gewählten Zeitraum</p>
                    ) : (
                        <div className="space-y-6">
                            {/* Button Click Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(() => {
                                    const clicksByButton = buttonClicks.reduce((acc: any, click: any) => {
                                        acc[click.button_name] = (acc[click.button_name] || 0) + 1;
                                        return acc;
                                    }, {});

                                    return Object.entries(clicksByButton).map(([buttonName, count]: [string, any]) => (
                                        <div key={buttonName} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="text-sm font-medium text-gray-600 mb-1">{buttonName}</div>
                                            <div className="text-3xl font-display font-bold text-gray-900">{count}</div>
                                            <div className="text-xs text-gray-500 mt-1">Klicks</div>
                                        </div>
                                    ));
                                })()}
                            </div>

                            {/* Recent Clicks Table */}
                            <div className="overflow-x-auto">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Letzte Klicks</h3>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Zeit</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Button</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Position</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buttonClicks.slice(0, 20).map((click, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {formatGermanDate(new Date(click.created_at), "dd.MM.yyyy HH:mm")}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                                                    {click.button_name}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{click.button_location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quiz Answers Table - Aggregated */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Quiz Antworten</h2>
                    {quizAnswers.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Keine Antworten im gewählten Zeitraum</p>
                    ) : (
                        <div className="space-y-6">
                            {/* Aggregate answers by question */}
                            {(() => {
                                // Group by question
                                const aggregated: Record<string, Record<string, number>> = {};
                                quizAnswers.forEach((answer) => {
                                    const q = answer.question_text || 'Unbekannte Frage';
                                    const a = answer.answer_text || 'Keine Antwort';
                                    if (!aggregated[q]) aggregated[q] = {};
                                    aggregated[q][a] = (aggregated[q][a] || 0) + 1;
                                });

                                return Object.entries(aggregated).map(([question, answers]) => {
                                    const totalForQuestion = Object.values(answers).reduce((sum, count) => sum + count, 0);

                                    return (
                                        <div key={question} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <h3 className="font-bold text-gray-900 mb-4 text-lg">{question}</h3>
                                            <div className="space-y-3">
                                                {Object.entries(answers)
                                                    .sort((a, b) => b[1] - a[1]) // Sort by count descending
                                                    .map(([answerText, count]) => {
                                                        const percentage = Math.round((count / totalForQuestion) * 100);
                                                        return (
                                                            <div key={answerText} className="relative">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-sm text-gray-700 font-medium">{answerText}</span>
                                                                    <span className="text-sm font-bold text-gray-900">{count} ({percentage}%)</span>
                                                                </div>
                                                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-medical-blue to-cyan-500 rounded-full transition-all duration-500"
                                                                        style={{ width: `${percentage}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                            <div className="mt-3 text-xs text-gray-500">
                                                Gesamt: {totalForQuestion} Antworten
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
