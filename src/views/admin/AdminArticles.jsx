"use client";

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { Edit, Trash2, Eye, EyeOff, Plus, Search, ChevronUp, ChevronDown, BarChart3, FileText, TrendingUp, Calendar, Filter, Tag } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

// Right Sidebar Component for Articles Management
function ArticlesRightSidebar({ posts, filteredPosts }) {
  const publishedCount = posts.filter(p => p.published).length
  const draftCount = posts.filter(p => !p.published).length
  const thisMonthCount = posts.filter(post => {
    const postDate = new Date(post.created_at)
    const now = new Date()
    return postDate.getMonth() === now.getMonth() && 
           postDate.getFullYear() === now.getFullYear()
  }).length

  // Get most recent posts
  const recentPosts = posts
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  // Extract unique tags from all posts
  const allTags = posts.reduce((tags, post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
    return tags
  }, []).slice(0, 10) // Show top 10 tags

  return (
    <>
      {/* Quick Stats */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 'var(--space-6)',
        border: '1px solid var(--gray-200)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)'
        }}>
          <BarChart3 size={20} style={{ color: 'var(--blue-500)' }} />
          <h3 style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: '600',
            color: 'var(--gray-900)',
            margin: 0
          }}>
            Article Stats
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--blue-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--blue-100)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <FileText size={16} style={{ color: 'var(--blue-600)' }} />
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--blue-700)',
                fontWeight: '500'
              }}>
                Total Articles
              </span>
            </div>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700',
              color: 'var(--blue-600)'
            }}>
              {posts.length}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--green-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--green-100)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Eye size={16} style={{ color: 'var(--green-600)' }} />
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--green-700)',
                fontWeight: '500'
              }}>
                Published
              </span>
            </div>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700',
              color: 'var(--green-600)'
            }}>
              {publishedCount}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--orange-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--orange-100)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <EyeOff size={16} style={{ color: 'var(--orange-600)' }} />
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--orange-700)',
                fontWeight: '500'
              }}>
                Drafts
              </span>
            </div>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700',
              color: 'var(--orange-600)'
            }}>
              {draftCount}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--purple-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--purple-100)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Calendar size={16} style={{ color: 'var(--purple-600)' }} />
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--purple-700)',
                fontWeight: '500'
              }}>
                This Month
              </span>
            </div>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700',
              color: 'var(--purple-600)'
            }}>
              {thisMonthCount}
            </span>
          </div>
        </div>

        {/* Filter Results */}
        {filteredPosts.length !== posts.length && (
          <div style={{
            marginTop: 'var(--space-4)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--gray-200)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-2)'
            }}>
              <Filter size={14} style={{ color: 'var(--gray-400)' }} />
              <span style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--gray-500)',
                fontWeight: '500'
              }}>
                FILTERED RESULTS
              </span>
            </div>
            <div style={{
              padding: 'var(--space-2) var(--space-3)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--gray-700)'
            }}>
              Showing {filteredPosts.length} of {posts.length} articles
            </div>
          </div>
        )}
      </div>

      {/* Recent Articles */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 'var(--space-6)',
        border: '1px solid var(--gray-200)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)'
        }}>
          <TrendingUp size={20} style={{ color: 'var(--green-500)' }} />
          <h3 style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: '600',
            color: 'var(--gray-900)',
            margin: 0
          }}>
            Recent Articles
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {recentPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: 'var(--gray-500)',
              fontSize: 'var(--font-size-sm)',
              padding: 'var(--space-4)'
            }}>
              No articles yet
            </div>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} style={{
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--gray-100)'
              }}>
                <Link
                  href={`/admin/edit-post/${post.id}`}
                  style={{
                    color: 'var(--gray-900)',
                    textDecoration: 'none',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '500',
                    lineHeight: '1.4',
                    display: 'block',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  {post.title}
                </Link>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-1)'
                }}>
                  <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`} style={{
                    fontSize: 'var(--font-size-xs)',
                    padding: 'var(--space-1) var(--space-2)'
                  }}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <time style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--gray-500)'
                  }}>
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </time>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--gray-200)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)'
          }}>
            <Tag size={20} style={{ color: 'var(--purple-500)' }} />
            <h3 style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: '600',
              color: 'var(--gray-900)',
              margin: 0
            }}>
              Popular Tags
            </h3>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-2)', 
            flexWrap: 'wrap' 
          }}>
            {allTags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--gray-600)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--blue-500)'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--gray-100)'
                  e.target.style.color = 'var(--gray-600)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default function AdminArticles() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('created_at')
  const [sortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (post) => {
    try {
      const { error } = await supabase
        .from('stories')
        .update({ published: !post.published })
        .eq('id', post.id)

      if (error) throw error
      
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ))
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const deletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', postId)

      if (error) throw error
      
      setPosts(posts.filter(p => p.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post =>
        statusFilter === 'published' ? post.published : !post.published
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'status':
          aValue = a.published ? 'published' : 'draft'
          bValue = b.published ? 'published' : 'draft'
          break
        case 'created_at':
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
          break
        case 'updated_at':
          aValue = new Date(a.updated_at || a.created_at)
          bValue = new Date(b.updated_at || b.created_at)
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })

    return filtered
  }, [posts, searchTerm, statusFilter, sortField, sortDirection])

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="sort-button"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        padding: 0
      }}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
      )}
    </button>
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center fade-in">
          <h2>Loading...</h2>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout 
      rightSidebar={
        <ArticlesRightSidebar 
          posts={posts} 
          filteredPosts={filteredAndSortedPosts} 
        />
      }
    >
      <div className="page-header">
        <h1 className="page-title">All Articles</h1>
        <Link
          href="/admin/new-post"
          className="btn btn-primary"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="filters-section" style={{
        display: 'flex',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search 
            size={16} 
            style={{
              position: 'absolute',
              left: 'var(--space-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray-400)'
            }}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3) var(--space-2) var(--space-8)',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--border-radius)',
              fontSize: 'var(--font-size-sm)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--blue-500)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            border: '1px solid var(--gray-300)',
            borderRadius: 'var(--border-radius)',
            fontSize: 'var(--font-size-sm)',
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Results Count */}
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
          {filteredAndSortedPosts.length} of {posts.length} articles
        </div>
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <div className="text-center" style={{ padding: 'var(--space-12) 0' }}>
          {posts.length === 0 ? (
            <>
              <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>
                No articles yet
              </h2>
              <Link
                href="/admin/new-post"
                className="btn btn-primary btn-lg"
              >
                Create your first article
              </Link>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>
                No articles match your filters
              </h2>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="btn btn-secondary"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>
                  <SortButton field="title">Title</SortButton>
                </th>
                <th>
                  <SortButton field="status">Status</SortButton>
                </th>
                <th>
                  <SortButton field="created_at">Created</SortButton>
                </th>
                <th>
                  <SortButton field="updated_at">Updated</SortButton>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: 'var(--space-1)' }}>
                      {post.title}
                    </div>
                    {post.description && (
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)', lineHeight: '1.4' }}>
                        {post.description.substring(0, 100)}...
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </td>
                  <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                    {formatDistanceToNow(new Date(post.updated_at || post.created_at), { addSuffix: true })}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        href={`/admin/edit-post/${post.id}`}
                        className="btn btn-icon btn-secondary"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => togglePublished(post)}
                        className="btn btn-icon btn-secondary"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="btn btn-icon btn-danger"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
} 