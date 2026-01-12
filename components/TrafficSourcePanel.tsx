"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Globe, TrendingUp, Users, ArrowUpRight } from "lucide-react";

interface TrafficSource {
    source: string;
    pageViews: number;
    quizStarts: number;
    leads: number;
    conversionRate: number;
}

interface TrafficSourcePanelProps {
    startDate: string;
    endDate: string;
}

export default function TrafficSourcePanel({ startDate, endDate }: TrafficSourcePanelProps) {
    const [sources, setSources] = useState<TrafficSource[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTrafficData();
    }, [startDate, endDate]);

    const fetchTrafficData = async () => {
        setIsLoading(true);

        // Fetch all page views with traffic source
        const { data: pageViewsData } = await supabase
            .from("analytics_events")
            .select("event_data")
            .eq("event_type", "page_view")
            .gte("created_at", startDate)
            .lte("created_at", endDate);

        // Fetch quiz starts
        const { data: quizStartsData } = await supabase
            .from("analytics_events")
            .select("event_data")
            .eq("event_type", "quiz_start")
            .gte("created_at", startDate)
            .lte("created_at", endDate);

        // Fetch leads from funnel submissions
        const { data: leadsData } = await supabase
            .from("funnel_submissions")
            .select("*")
            .gte("updated_at", startDate)
            .lte("updated_at", endDate);

        // Process data by traffic source
        const sourceStats: Record<string, { pageViews: number; quizStarts: number; leads: number }> = {};

        // Helper to ensure source exists
        const ensureSource = (source: string) => {
            if (!sourceStats[source]) {
                sourceStats[source] = { pageViews: 0, quizStarts: 0, leads: 0 };
            }
        };

        // Count page views per source
        pageViewsData?.forEach((event) => {
            const source = event.event_data?.traffic_source || 'Direct';
            ensureSource(source);
            sourceStats[source].pageViews++;
        });

        // Count quiz starts per source
        quizStartsData?.forEach((event) => {
            const source = event.event_data?.traffic_source || 'Direct';
            ensureSource(source);
            sourceStats[source].quizStarts++;
        });

        // Count leads per source
        leadsData?.forEach((lead) => {
            const source = lead.traffic_source || 'Direct';
            ensureSource(source);
            sourceStats[source].leads++;
        });

        // Convert to array and calculate conversion rates
        const sourcesArray: TrafficSource[] = Object.entries(sourceStats)
            .map(([source, stats]) => ({
                source,
                pageViews: stats.pageViews,
                quizStarts: stats.quizStarts,
                leads: stats.leads,
                conversionRate: stats.pageViews > 0
                    ? Math.round((stats.leads / stats.pageViews) * 1000) / 10
                    : 0,
            }))
            .sort((a, b) => b.pageViews - a.pageViews); // Sort by page views

        setSources(sourcesArray);
        setIsLoading(false);
    };

    const getSourceIcon = (source: string) => {
        switch (source.toLowerCase()) {
            case 'facebook':
            case 'instagram':
                return '📘';
            case 'google':
                return '🔍';
            case 'tiktok':
                return '🎵';
            case 'email':
                return '📧';
            case 'linkedin':
                return '💼';
            case 'direct':
                return '🔗';
            default:
                return '🌐';
        }
    };

    const getSourceColor = (source: string) => {
        switch (source.toLowerCase()) {
            case 'facebook':
                return 'bg-blue-100 text-blue-700';
            case 'instagram':
                return 'bg-pink-100 text-pink-700';
            case 'google':
                return 'bg-red-100 text-red-700';
            case 'tiktok':
                return 'bg-gray-900 text-white';
            case 'email':
                return 'bg-yellow-100 text-yellow-700';
            case 'direct':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-cyan-100 text-cyan-700';
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Traffic-Quellen</h3>
                </div>
                <div className="text-gray-500 text-sm">Lädt...</div>
            </div>
        );
    }

    const totalPageViews = sources.reduce((sum, s) => sum + s.pageViews, 0);
    const totalLeads = sources.reduce((sum, s) => sum + s.leads, 0);

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Traffic-Quellen</h3>
                </div>
                <div className="text-sm text-gray-500">
                    {totalPageViews} Views • {totalLeads} Leads
                </div>
            </div>

            {sources.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>Keine Daten für diesen Zeitraum</p>
                    <p className="text-xs mt-2">
                        Tipp: Nutze UTM-Parameter wie<br />
                        <code className="bg-gray-100 px-1 rounded">?utm_source=facebook</code>
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {sources.map((source) => (
                        <div
                            key={source.source}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{getSourceIcon(source.source)}</span>
                                <div>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSourceColor(source.source)}`}>
                                        {source.source}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">{source.pageViews}</div>
                                    <div className="text-xs text-gray-500">Views</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">{source.quizStarts}</div>
                                    <div className="text-xs text-gray-500">Quiz</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-green-600">{source.leads}</div>
                                    <div className="text-xs text-gray-500">Leads</div>
                                </div>
                                <div className="text-right w-16">
                                    <div className="font-medium text-gray-900">{source.conversionRate}%</div>
                                    <div className="text-xs text-gray-500">Conv.</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* UTM Parameter Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-800">
                    <strong>Für Ads verwende UTM-Parameter:</strong><br />
                    <code className="text-blue-600">kosmetikentwicklung.com?utm_source=facebook&utm_medium=paid&utm_campaign=name</code>
                </p>
            </div>
        </div>
    );
}
