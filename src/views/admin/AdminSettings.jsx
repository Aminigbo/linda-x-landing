"use client";

import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--gray-200)'
      }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: '600',
          marginBottom: 'var(--space-6)',
          color: 'var(--gray-900)'
        }}>
          General Settings
        </h2>

        <form>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              color: 'var(--gray-700)',
              marginBottom: 'var(--space-2)'
            }}>
              Site Title
            </label>
            <input
              type="text"
              defaultValue="Untitled Design & Photography Journal"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              color: 'var(--gray-700)',
              marginBottom: 'var(--space-2)'
            }}>
              Site Description
            </label>
            <textarea
              rows={4}
              defaultValue="The Untitled UI Journal features carefully selected good works from studios, designers, architects, photographers, and creators from all around the globe."
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-8)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              color: 'var(--gray-700)',
              marginBottom: 'var(--space-2)'
            }}>
              Author Name
            </label>
            <input
              type="text"
              defaultValue="Linda Author"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  )
} 