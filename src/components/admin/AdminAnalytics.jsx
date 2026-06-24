"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { computeSidebarStats } from "@/lib/admin/dashboardInsights";
import { TrendingUp, FileText, Eye, BarChart3 } from "lucide-react";

export default function AdminAnalytics({ posts: externalPosts, loading: externalLoading }) {
  const [posts, setPosts] = useState(externalPosts || []);
  const [loading, setLoading] = useState(externalLoading ?? !externalPosts);

  useEffect(() => {
    if (externalPosts) {
      setPosts(externalPosts);
      setLoading(false);
      return;
    }

    fetchAnalytics();
  }, [externalPosts]);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from("stories")
        .select("id, content, published, published_at, created_at");

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => computeSidebarStats(posts), [posts]);

  if (loading) {
    return (
      <div className="admin-analytics-card">
        <div className="admin-analytics-loading">Loading analytics...</div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-analytics-card">
        <div className="admin-analytics-card-header">
          <BarChart3 size={20} className="admin-analytics-icon-blue" />
          <h3 className="admin-analytics-card-title">Quick Stats</h3>
        </div>

        <div className="admin-analytics-stat-list">
          <div className="admin-analytics-stat admin-analytics-stat-blue">
            <div className="admin-analytics-stat-label">
              <FileText size={16} />
              <span>Total Posts</span>
            </div>
            <span className="admin-analytics-stat-value">{stats.totalPosts}</span>
          </div>

          <div className="admin-analytics-stat admin-analytics-stat-green">
            <div className="admin-analytics-stat-label">
              <Eye size={16} />
              <span>Published</span>
            </div>
            <span className="admin-analytics-stat-value">{stats.publishedPosts}</span>
          </div>

          <div className="admin-analytics-stat admin-analytics-stat-orange">
            <div className="admin-analytics-stat-label">
              <FileText size={16} />
              <span>Drafts</span>
            </div>
            <span className="admin-analytics-stat-value">{stats.draftPosts}</span>
          </div>
        </div>
      </div>

      <div className="admin-analytics-card">
        <div className="admin-analytics-card-header">
          <TrendingUp size={20} className="admin-analytics-icon-purple" />
          <h3 className="admin-analytics-card-title">Performance</h3>
        </div>

        <div className="admin-analytics-performance">
          <div>
            <div className="admin-analytics-performance-row">
              <span>Publish Rate</span>
              <span>{stats.publishRate}%</span>
            </div>
            <div className="admin-analytics-progress">
              <div
                className="admin-analytics-progress-fill admin-analytics-progress-purple"
                style={{ width: `${stats.publishRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="admin-analytics-performance-row">
              <span>Avg. Read Time</span>
              <span>{stats.avgReadTime}m</span>
            </div>
            <div className="admin-analytics-progress">
              <div
                className="admin-analytics-progress-fill admin-analytics-progress-blue"
                style={{ width: `${Math.min(stats.avgReadTime * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
