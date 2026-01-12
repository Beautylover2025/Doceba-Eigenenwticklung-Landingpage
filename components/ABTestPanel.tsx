"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Beaker, TrendingUp, Award, AlertTriangle } from "lucide-react";
import { AB_TESTS, ABVariant } from "@/hooks/useABTest";

interface ABTestStats {
    variant: ABVariant;
    pageViews: number;
    quizStarts: number;
    leads: number;
    conversionRate: number;
}

interface ABTestPanelProps {
    startDate: string;
    endDate: string;
}

export default function ABTestPanel({ startDate, endDate }: ABTestPanelProps) {
    const [stats, setStats] = useState<ABTestStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchABStats();
    }, [startDate, endDate]);

    const fetchABStats = async () => {
        setIsLoading(true);

        // Fetch page views with ab_variant
        const { data: pageViewsData } = await supabase
            .from("analytics_events")
            .select("event_data")
            .eq("event_type", "page_view")
            .gte("created_at", startDate)
            .lte("created_at", endDate);

        // Fetch quiz starts with ab_variant
        const { data: quizStartsData } = await supabase
            .from("analytics_events")
            .select("event_data")
            .eq("event_type", "quiz_start")
            .gte("created_at", startDate)
            .lte("created_at", endDate);

        // Fetch leads (funnel submissions with ab_variant)
        const { data: leadsData } = await supabase
            .from("funnel_submissions")
            .select("*")
            .gte("updated_at", startDate)
            .lte("updated_at", endDate);

        // Process data by variant
        const variantStats: Record<ABVariant, { pageViews: number; quizStarts: number; leads: number }> = {
            A: { pageViews: 0, quizStarts: 0, leads: 0 },
            B: { pageViews: 0, quizStarts: 0, leads: 0 },
        };

        // Count page views per variant
        pageViewsData?.forEach((event) => {
            const variant = event.event_data?.ab_variant as ABVariant;
            if (variant && variantStats[variant]) {
                variantStats[variant].pageViews++;
            } else {
                // Default to A if no variant (legacy data)
                variantStats.A.pageViews++;
            }
        });

        // Count quiz starts per variant
        quizStartsData?.forEach((event) => {
            const variant = event.event_data?.ab_variant as ABVariant;
            if (variant && variantStats[variant]) {
                variantStats[variant].quizStarts++;
            } else {
                variantStats.A.quizStarts++;
            }
        });

        // Count leads per variant
        leadsData?.forEach((lead) => {
            // ab_variant might be stored in the lead data or as a separate column
            const variant = (lead.ab_variant || lead.data?.ab_variant || 'A') as ABVariant;
            if (variantStats[variant]) {
                variantStats[variant].leads++;
            } else {
                variantStats.A.leads++;
            }
        });

        // Calculate stats array
        const statsArray: ABTestStats[] = (['A', 'B'] as ABVariant[]).map((variant) => ({
            variant,
            pageViews: variantStats[variant].pageViews,
            quizStarts: variantStats[variant].quizStarts,
            leads: variantStats[variant].leads,
            conversionRate: variantStats[variant].pageViews > 0
                ? Math.round((variantStats[variant].leads / variantStats[variant].pageViews) * 1000) / 10
                : 0,
        }));

        setStats(statsArray);
        setIsLoading(false);
    };

    const getWinner = (): ABVariant | null => {
        if (stats.length < 2) return null;
        if (stats[0].conversionRate === stats[1].conversionRate) return null;
        return stats[0].conversionRate > stats[1].conversionRate ? 'A' : 'B';
    };

    const winner = getWinner();
    const activeTest = AB_TESTS.hero_headline;
    const isTestActive = activeTest?.activeVariants.length === 2;

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Beaker className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">A/B Test: Hero Headline</h3>
                </div>
                <div className="text-gray-500 text-sm">Lädt...</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">A/B Test: Hero Headline</h3>
                </div>
                {isTestActive ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Aktiv (50/50)
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Winner: Variante {activeTest?.activeVariants[0]}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat) => (
                    <div
                        key={stat.variant}
                        className={`p-4 rounded-lg border-2 ${winner === stat.variant
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-lg">Variante {stat.variant}</span>
                            {winner === stat.variant && (
                                <Award className="w-5 h-5 text-green-600" />
                            )}
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">PageViews:</span>
                                <span className="font-medium">{stat.pageViews}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Quiz Starts:</span>
                                <span className="font-medium">{stat.quizStarts}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Leads:</span>
                                <span className="font-medium text-green-600">{stat.leads}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-gray-600 font-medium">Conversion:</span>
                                <span className={`font-bold ${winner === stat.variant ? "text-green-600" : "text-gray-900"
                                    }`}>
                                    {stat.conversionRate}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Winner Info */}
            {winner && (stats[0].leads + stats[1].leads) >= 5 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                            <p className="font-medium text-yellow-900">
                                Variante {winner} performt {winner === 'A'
                                    ? Math.round((stats[0].conversionRate / (stats[1].conversionRate || 1) - 1) * 100)
                                    : Math.round((stats[1].conversionRate / (stats[0].conversionRate || 1) - 1) * 100)
                                }% besser!
                            </p>
                            <p className="text-sm text-yellow-800 mt-1">
                                Um den Winner zu aktivieren: In <code className="bg-yellow-100 px-1 rounded">hooks/useABTest.ts</code> den <code className="bg-yellow-100 px-1 rounded">activeVariants</code> Wert auf <code className="bg-yellow-100 px-1 rounded">['{winner}']</code> setzen.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {(stats[0].leads + stats[1].leads) < 5 && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-600">
                                Noch nicht genügend Daten für eine Aussage.
                                Mindestens 5 Leads pro Variante empfohlen.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
