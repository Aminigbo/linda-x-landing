"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase/client';

const YoutubeVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("videos")
                .select("id, url");

            if (error) {
                console.error("Supabase fetch error:", error);
                throw new Error(
                    error.message || "Failed to fetch data from Supabase."
                );
            }

            if (data) {
                setVideos(data);
            }
        } catch (err) {
            console.error("Error fetching videos:", err);
            setError("Failed to load videos. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
            const { error } = await supabase
                .from('videos')
                .insert([{ url: newVideoUrl }]);

            if (error) throw error;

            setNewVideoUrl('');
            setIsModalOpen(false);
            fetchVideos();
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout>
            <div style={{
                padding: '20px',
                position: 'relative'
            }}>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}
                >
                    Add Video
                </button>

                {isModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            width: '90%',
                            maxWidth: '500px'
                        }}>
                            <h2 style={{ marginBottom: '20px' }}>Add YouTube Video</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                    placeholder="Enter YouTube video URL"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginBottom: '15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '10px'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {uploading ? 'Adding...' : 'Add Video'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {videos.map((video) => (
                        <div key={video.id} className="w-[calc(33.33%-16px)]">
                            <iframe
                                className="w-full aspect-video rounded-lg"
                                src={video.url}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default YoutubeVideos;
