import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.status === 200) {
        alert('Message sent successfully!');
      } else {
        alert(`Failed to send message: ${data.errors}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Check console for details.');
    }
  };

  return (
    <div className="bg-slate-900 text-white pt-12 min-h-screen">
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold text-cyan-200">Contact Us!</h1>
        <p className="text-xl mt-4 text-cyan-100">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 container p-12 bg-slate-800 rounded-lg shadow-xl max-w-4xl">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-cyan-200">Reach Out to Us</h2>
            <p className="mb-2">Whether you have a question about our website, need assistance, or just want to give us feedback, here's how to reach us:</p>
            <div>
              <h3 className="text-xl font-bold text-cyan-200">Contact Information</h3>
              <ul className="list-none mt-2">
                <li><strong>Email:</strong> dummy@askteamforouremail.com</li>
                <li><strong>Phone:</strong> (xxx) xxx-xxxx</li>
                <li><strong>Address:</strong> Need an address?, ATL, GA</li>
              </ul>
            </div>
          </div>
          <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="name" className="mb-2">Your Name</label>
              <input type="text" id="name" value={formData.name} className="mb-4 p-2 rounded text-gray-700" placeholder="Your Name..." onChange={handleChange} />

              <label htmlFor="email" className="mb-2">Your Email</label>
              <input type="email" id="email" value={formData.email} className="mb-4 p-2 rounded text-gray-700" placeholder="Your Email..." onChange={handleChange} />

              <label htmlFor="message" className="mb-2">Your Message</label>
              <textarea id="message" value={formData.message} className="mb-6 p-2 rounded text-gray-700" placeholder="Type your message here..." rows={4} onChange={handleChange}></textarea>

              <button type="submit" className="p-2 bg-cyan-500 rounded hover:bg-cyan-400 transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactUs;