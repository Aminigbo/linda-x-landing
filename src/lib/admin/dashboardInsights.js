import { format } from "date-fns";

export const CHART_DAYS = 30;

export const DATE_PRESET_LABELS = {
  last7: "Last 7 days",
  last30: "Last 30 days",
  last90: "Last 90 days",
  thisMonth: "This month",
};

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dayIndex(rangeStart, date) {
  const start = startOfDay(rangeStart).getTime();
  const target = startOfDay(date).getTime();
  return Math.round((target - start) / (1000 * 60 * 60 * 24));
}

export function resolveDateRange(preset, posts = []) {
  const end = startOfDay(new Date());
  let start = new Date(end);

  if (!preset) {
    start.setDate(start.getDate() - 29);

    if (posts.length) {
      const earliest = posts.reduce((min, post) => {
        const created = new Date(post.created_at);
        return created < min ? created : min;
      }, new Date(posts[0].created_at));
      start = startOfDay(earliest);
    }
  } else if (preset === "last7") {
    start.setDate(start.getDate() - 6);
  } else if (preset === "last30") {
    start.setDate(start.getDate() - 29);
  } else if (preset === "last90") {
    start.setDate(start.getDate() - 89);
  } else if (preset === "thisMonth") {
    start = startOfDay(new Date(end.getFullYear(), end.getMonth(), 1));
  }

  const days = Math.max(1, dayIndex(start, end) + 1);
  return { start, end, days };
}

export function getFilterChipLabel(preset) {
  if (!preset) return null;
  return `Date is ${DATE_PRESET_LABELS[preset] || preset}`;
}

export function filterPostsByRange(posts, preset) {
  if (!preset) return posts;

  const { start, end } = resolveDateRange(preset, posts);

  return posts.filter((post) => {
    if (!post.created_at) return false;
    const created = startOfDay(new Date(post.created_at));
    return created >= start && created <= end;
  });
}

export function getChartDateRange(days = CHART_DAYS) {
  const end = startOfDay(new Date());
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  return { start, end, days };
}

export function buildChartSeries(posts, preset = "last30") {
  const { start, days } = resolveDateRange(preset, posts);
  const published = Array(days).fill(0);
  const drafts = Array(days).fill(0);
  const totalPosts = Array(days).fill(0);
  const dailyCreated = Array(days).fill(0);

  const postsBeforeRange = posts.filter(
    (post) => post.created_at && new Date(post.created_at) < start
  ).length;

  posts.forEach((post) => {
    if (post.published) {
      const date = post.published_at || post.created_at;
      if (!date) return;
      const index = dayIndex(start, new Date(date));
      if (index >= 0 && index < days) published[index] += 1;
    }

    if (!post.published && post.created_at) {
      const index = dayIndex(start, new Date(post.created_at));
      if (index >= 0 && index < days) drafts[index] += 1;
    }

    if (post.created_at) {
      const index = dayIndex(start, new Date(post.created_at));
      if (index >= 0 && index < days) dailyCreated[index] += 1;
    }
  });

  let runningTotal = postsBeforeRange;
  for (let day = 0; day < days; day += 1) {
    runningTotal += dailyCreated[day];
    totalPosts[day] = runningTotal;
  }

  return { published, drafts, totalPosts };
}

export function buildChartXLabels(preset = "last30", posts = []) {
  const { start, days } = resolveDateRange(preset, posts);
  const labelCount = 9;
  const step = Math.max(1, Math.floor((days - 1) / (labelCount - 1)));

  const labels = [];
  for (let index = 0; index < days; index += step) {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    labels.push({
      label: format(date, "MMM dd"),
      index,
    });
  }

  const lastIndex = days - 1;
  if (labels[labels.length - 1]?.index !== lastIndex) {
    const date = new Date(start);
    date.setDate(date.getDate() + lastIndex);
    labels.push({
      label: format(date, "MMM dd"),
      index: lastIndex,
    });
  }

  return labels;
}

export function getChartYMax(series) {
  const maxValue = Math.max(
    0,
    ...series.published,
    ...series.drafts,
    ...series.totalPosts
  );

  if (maxValue <= 4) return 4;
  if (maxValue <= 10) return 10;
  return Math.ceil(maxValue / 5) * 5;
}

function wordCount(html = "") {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(" ").length;
}

export function computeSidebarStats(posts) {
  const now = new Date();
  const published = posts.filter((post) => post.published);
  const drafts = posts.filter((post) => !post.published);

  const thisMonthPublished = published.filter((post) => {
    const postDate = new Date(post.published_at || post.created_at);
    return (
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear()
    );
  });

  const totalWords = posts.reduce((sum, post) => sum + wordCount(post.content), 0);
  const avgWords = posts.length ? totalWords / posts.length : 0;
  const avgReadTime = posts.length ? Math.max(1, Math.round(avgWords / 200)) : 0;

  return {
    totalPosts: posts.length,
    publishedPosts: published.length,
    draftPosts: drafts.length,
    thisMonthPosts: thisMonthPublished.length,
    publishRate: posts.length
      ? Math.round((published.length / posts.length) * 100)
      : 0,
    avgReadTime,
  };
}
