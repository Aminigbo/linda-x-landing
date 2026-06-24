"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Editor } from '@tinymce/tinymce-react'
import SimpleEditor from '@/components/admin/SimpleEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import { Save, ArrowLeft } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

export default function NewPost() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    description: '',
    image_url: '',
    tags: '',
    published: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [useSimpleEditor, setUseSimpleEditor] = useState(false)
  const router = useRouter()

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const shareToFacebook = async (post) => {
    try {
      const response = await fetch('/api/share/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          slug: post.slug,
          imageUrl: post.image_url || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('ShareViral error:', data)
        return { success: false, error: data.error || 'Failed to share to Facebook' }
      }

      console.log('Shared to Facebook via ShareViral:', data.result)
      return { success: true, result: data.result }
    } catch (error) {
      console.error('Error sharing to Facebook:', error)
      return { success: false, error: error.message }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const slug = generateSlug(formData.title)
      const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []

      const postData = {
        ...formData,
        slug,
        tags,
        published_at: formData.published ? new Date().toISOString() : null
      }

      const { data, error } = await supabase
        .from('stories')
        .insert([postData])
        .select()
        .single()

      if (error) throw error

      if (formData.published) {
        const shareResult = await shareToFacebook(data)
        if (!shareResult.success) {
          console.warn('Post saved but Facebook share failed:', shareResult.error)
        }
      }

      router.push('/admin')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <AdminLayout>
      <div className="page">
        <div className="container container-lg">
          <div className="page-header">
            <button
              onClick={() => router.push('/admin')}
              className="btn btn-icon btn-secondary"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="page-title">Create New Post</h1>
          </div>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your post title..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subtitle" className="form-label">
                    Subtitle
                  </label>
                  <textarea
                    id="subtitle"
                    rows={3}
                    className="form-input form-textarea"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Brief description of the post..."
                  />
                </div>

                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => handleInputChange('image_url', url)}
                  label="Featured Image"
                />

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="form-input form-textarea"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the post..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tags" className="form-label">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    className="form-input"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="technology, blog, tutorial"
                  />
                </div>

                <div className="form-group">
                  <div className="flex justify-between items-center editor-toggle">
                    <label className="form-label">
                      Content
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseSimpleEditor(!useSimpleEditor)}
                      className="btn btn-sm btn-secondary"
                    >
                      {useSimpleEditor ? 'Use Rich Editor' : 'Use Simple Editor'}
                    </button>
                  </div>

                  {useSimpleEditor ? (
                    <SimpleEditor
                      value={formData.content}
                      onChange={(content) => handleInputChange('content', content)}
                    />
                  ) : (
                    <div>
                      <Editor
                        apiKey="xhp78cbonuugtr21er5xb0evucrvp39jalvox88zw6788bp8"
                        value={formData.content}
                        onEditorChange={(content) => handleInputChange('content', content)}
                        onInit={() => console.log('TinyMCE Editor loaded successfully')}
                        onLoadContent={() => console.log('TinyMCE content loaded')}
                        init={{
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                            'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount'
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help | \
                          link image media | preview fullscreen | code',
                          branding: false,
                          promotion: false,
                          content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }',
                          setup: (editor) => {
                            editor.on('LoadContent', () => {
                              console.log('TinyMCE setup completed')
                            })
                            editor.on('Error', (e) => {
                              console.error('TinyMCE Error:', e)
                              setUseSimpleEditor(true)
                            })
                          }
                        }}
                      />
                      <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
                        If the rich editor doesn't load, click "Use Simple Editor" above
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      className="form-checkbox"
                      checked={formData.published}
                      onChange={(e) => handleInputChange('published', e.target.checked)}
                    />
                    <label htmlFor="published" className="form-label" style={{ marginBottom: 0 }}>
                      Publish immediately (will also post to Facebook if configured)
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="form-error">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    <Save size={16} />
                    {loading ? 'Saving...' : 'Save Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/admin')}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 