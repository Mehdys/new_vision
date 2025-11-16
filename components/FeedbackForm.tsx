'use client';

import { useState } from 'react';

const PROJECT_ID = "default_project"; // later: real ID per website/user

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectId: PROJECT_ID,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
  
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        const errorMsg = data.error || data.hint || 'Request failed';
        setErrorMessage(errorMsg);
        setSubmitStatus('error');
        return;
      }
  
      console.log('Server response:', data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', projectId: PROJECT_ID || "default_project" });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5 p-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-blue-700 mb-2">
          Name ✨
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 shadow-sm"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-blue-700 mb-2">
          Email 📧
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 shadow-sm"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-blue-700 mb-2">
          Message 💬
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-medium text-gray-900 shadow-sm"
          placeholder="Your feedback..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
      >
        {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Feedback'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl text-emerald-800 text-sm font-bold shadow-lg">
          ✅ Thank you! Your feedback has been submitted successfully!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-xl text-red-800 text-sm font-bold shadow-lg">
          ⚠️ {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}
    </form>
  );
}

