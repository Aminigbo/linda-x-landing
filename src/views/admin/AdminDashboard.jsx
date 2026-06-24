"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, Settings, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  buildChartSeries,
  computeSidebarStats,
  DATE_PRESET_LABELS,
  filterPostsByRange,
  getFilterChipLabel,
} from "@/lib/admin/dashboardInsights";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import InsightsChart from "@/components/admin/InsightsChart";

const DATE_PRESETS = Object.keys(DATE_PRESET_LABELS);

export default function AdminDashboard() {
  const [datePreset, setDatePreset] = useState("last30");
  const [filterOpen, setFilterOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data, error } = await supabase
        .from("stories")
        .select("id, title, content, published, published_at, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(
    () => filterPostsByRange(posts, datePreset),
    [posts, datePreset]
  );

  const stats = useMemo(() => computeSidebarStats(filteredPosts), [filteredPosts]);

  const chartSeries = useMemo(
    () => buildChartSeries(posts, datePreset),
    [posts, datePreset]
  );

  const metricCards = [
    { label: "Total Posts", value: String(stats.totalPosts) },
    { label: "Published", value: String(stats.publishedPosts) },
    { label: "Drafts", value: String(stats.draftPosts) },
    { label: "This Month", value: String(stats.thisMonthPosts) },
  ];

  const handlePresetSelect = (preset) => {
    setDatePreset(preset);
    setFilterOpen(false);
  };

  const handleRemoveFilter = () => {
    setDatePreset(null);
    setFilterOpen(false);
  };

  if (loading) {
    return (
      <AdminLayout rightSidebar={<AdminAnalytics loading />}>
        <div className="insights-dashboard">
          <div className="insights-loading">Loading insights...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout rightSidebar={<AdminAnalytics posts={filteredPosts} />}>
      <div className="insights-dashboard">
        <div className="insights-header">
          <h1 className="insights-title">Insights</h1>
          <Link href="/admin/settings" className="insights-settings-btn" aria-label="Settings">
            <Settings size={18} />
          </Link>
        </div>

        <div className="insights-filters" ref={filterRef}>
          <div className="insights-filter-dropdown">
            <button
              type="button"
              className={`insights-filter-btn${filterOpen ? " is-open" : ""}`}
              onClick={() => setFilterOpen((open) => !open)}
              aria-expanded={filterOpen}
              aria-haspopup="listbox"
            >
              <Calendar size={16} />
              Filter by date
            </button>

            {filterOpen && (
              <div className="insights-filter-menu" role="listbox">
                {DATE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    role="option"
                    aria-selected={datePreset === preset}
                    className={`insights-filter-option${datePreset === preset ? " is-active" : ""}`}
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {DATE_PRESET_LABELS[preset]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {datePreset && (
            <span className="insights-filter-chip">
              {getFilterChipLabel(datePreset)}
              <button
                type="button"
                className="insights-filter-chip-close"
                onClick={handleRemoveFilter}
                aria-label="Remove date filter"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>

        <div className="insights-metrics">
          {metricCards.map((metric) => (
            <div key={metric.label} className="insights-metric-card">
              <span className="insights-metric-label">{metric.label}</span>
              <span className="insights-metric-value">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="insights-chart-card">
          <h2 className="insights-chart-title">Social posts</h2>
          <InsightsChart series={chartSeries} datePreset={datePreset} posts={posts} />
        </div>
      </div>
    </AdminLayout>
  );
}
