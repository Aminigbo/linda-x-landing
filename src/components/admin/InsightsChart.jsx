"use client";

import { useMemo, useState } from "react";
import {
  buildChartXLabels,
  getChartYMax,
} from "@/lib/admin/dashboardInsights";

const CHART_HEIGHT = 280;
const PADDING = { top: 16, right: 24, bottom: 40, left: 36 };

const LEGEND = [
  { key: "published", label: "Published", color: "#0ea5e9" },
  { key: "drafts", label: "Drafts", color: "#f59e0b" },
  { key: "totalPosts", label: "Total Posts", color: "#ef4444" },
];

function getX(index, totalPoints, plotWidth) {
  return PADDING.left + (index / (totalPoints - 1)) * plotWidth;
}

function getY(value, plotHeight, yMax) {
  return PADDING.top + plotHeight - (value / yMax) * plotHeight;
}

function buildLinePath(data, plotWidth, plotHeight, yMax) {
  return data
    .map((value, index) => {
      const x = getX(index, data.length, plotWidth);
      const y = getY(value, plotHeight, yMax);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildYTicks(yMax) {
  const step = yMax <= 4 ? 1 : yMax <= 10 ? 2 : Math.ceil(yMax / 4);
  const ticks = [];
  for (let value = 0; value <= yMax; value += step) {
    ticks.push(value);
  }
  if (ticks[ticks.length - 1] !== yMax) ticks.push(yMax);
  return ticks;
}

function getActiveSeriesKey(tooltip) {
  if (!tooltip) return null;
  if (tooltip.totalPosts >= tooltip.published && tooltip.totalPosts >= tooltip.drafts) {
    return "totalPosts";
  }
  if (tooltip.published >= tooltip.drafts) return "published";
  return "drafts";
}

export default function InsightsChart({ series, datePreset, posts = [] }) {
  const [tooltip, setTooltip] = useState(null);

  const chartData = useMemo(() => {
    const safeSeries = series || {
      published: Array(30).fill(0),
      drafts: Array(30).fill(0),
      totalPosts: Array(30).fill(0),
    };
    const yMax = getChartYMax(safeSeries);
    const xLabels = buildChartXLabels(datePreset, posts);
    const yTicks = buildYTicks(yMax);

    return { safeSeries, yMax, xLabels, yTicks };
  }, [series, datePreset, posts]);

  const totalPoints = chartData.safeSeries.published.length;
  const chartWidth = 900;
  const plotWidth = chartWidth - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const handleMouseMove = (event) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = chartWidth / rect.width;
    const mouseX = (event.clientX - rect.left) * scaleX;

    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let index = 0; index < totalPoints; index += 1) {
      const x = getX(index, totalPoints, plotWidth);
      const distance = Math.abs(mouseX - x);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }

    const x = getX(closestIndex, totalPoints, plotWidth);
    const published = chartData.safeSeries.published[closestIndex];
    const drafts = chartData.safeSeries.drafts[closestIndex];
    const totalPosts = chartData.safeSeries.totalPosts[closestIndex];

    setTooltip({
      index: closestIndex,
      x,
      published,
      drafts,
      totalPosts,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  const activeKey = getActiveSeriesKey(tooltip);
  const activeLegend = LEGEND.find((item) => item.key === activeKey);
  const activeValue = tooltip
    ? tooltip[activeKey || "published"]
    : 0;

  return (
    <div className="insights-chart-wrap">
      <div className="insights-legend">
        {LEGEND.map((item) => (
          <span key={item.label} className="insights-legend-item">
            <span
              className="insights-legend-dot"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      <div className="insights-chart-scroll">
        <svg
          viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
          className="insights-chart-svg"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Social posts chart"
        >
          {chartData.yTicks.map((tick) => {
            const y = getY(tick, plotHeight, chartData.yMax);
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={chartWidth - PADDING.right}
                  y2={y}
                  className="insights-grid-line"
                />
                <text x={PADDING.left - 10} y={y + 4} className="insights-axis-label">
                  {tick}
                </text>
              </g>
            );
          })}

          <path
            d={buildLinePath(
              chartData.safeSeries.totalPosts,
              plotWidth,
              plotHeight,
              chartData.yMax
            )}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
          />
          <path
            d={buildLinePath(
              chartData.safeSeries.drafts,
              plotWidth,
              plotHeight,
              chartData.yMax
            )}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={2}
          />
          <path
            d={buildLinePath(
              chartData.safeSeries.published,
              plotWidth,
              plotHeight,
              chartData.yMax
            )}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={2}
          />

          {tooltip && (
            <>
              <line
                x1={tooltip.x}
                y1={PADDING.top}
                x2={tooltip.x}
                y2={PADDING.top + plotHeight}
                className="insights-tooltip-line"
              />
              <circle
                cx={tooltip.x}
                cy={
                  activeValue > 0
                    ? getY(activeValue, plotHeight, chartData.yMax)
                    : getY(0, plotHeight, chartData.yMax)
                }
                r={5}
                fill={activeLegend?.color || "#ef4444"}
                stroke="#fff"
                strokeWidth={2}
              />
            </>
          )}

          {chartData.xLabels.map(({ label, index }) => (
            <text
              key={`${label}-${index}`}
              x={getX(index, totalPoints, plotWidth)}
              y={CHART_HEIGHT - 12}
              className="insights-axis-label insights-x-label"
            >
              {label}
            </text>
          ))}
        </svg>

        {tooltip && (
          <div
            className="insights-tooltip"
            style={{
              left: `${(tooltip.x / chartWidth) * 100}%`,
            }}
          >
            <div className="insights-tooltip-row">
              <span>Published</span>
              <span>{tooltip.published}</span>
            </div>
            <div className="insights-tooltip-row">
              <span>Drafts</span>
              <span>{tooltip.drafts}</span>
            </div>
            <div className="insights-tooltip-row insights-tooltip-total">
              <span>Total Posts</span>
              <span>{tooltip.totalPosts}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
