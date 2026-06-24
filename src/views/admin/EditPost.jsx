"use client";

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Editor } from '@tinymce/tinymce-react'
import SimpleEditor from '@/components/admin/SimpleEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import { Save, ArrowLeft } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

export default function EditPost() {
  const { id } = useParams()
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
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [useSimpleEditor, setUseSimpleEditor] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        content: data.content || '',
        description: data.description || '',
        image_url: data.image_url || '',
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        published: data.published || false
      })
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Failed to load post')
    } finally {
      setPageLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
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

      const { error } = await supabase
        .from('stories')
        .update(postData)
        .eq('id', id)

      if (error) throw error

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

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="container">
          <div className="text-center fade-in">
            <h2>Loading post...</h2>
          </div>
        </div>
      </AdminLayout>
    )
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
          <h1 className="page-title">Edit Post</h1>
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
                  placeholder="Brief subtitle for the post..."
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
                    Published
                  </label>
                </div>
              </div>

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <div className="flex gap-4" style={{ marginTop: 'var(--space-8)' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  <Save size={16} />
                  {loading ? 'Updating...' : 'Update Post'}
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
