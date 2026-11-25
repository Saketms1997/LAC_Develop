import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Trash2, Inbox } from 'lucide-react';
import { useEnquiries, updateEnquiry, deleteEnquiry } from '../../services/store';
import { getWhatsAppPhone } from '../../utils/helpers';

const STATUSES = [
  { value: 'new', label: 'New', cls: 'bg-red-100 text-red-700' },
  { value: 'contacted', label: 'Contacted', cls: 'bg-yellow-100 text-yellow-800' },
  { value: 'closed', label: 'Closed', cls: 'bg-green-100 text-green-700' },
];

const EnquiriesAdmin = () => {
  const enquiries = useEnquiries();
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter);

  const handleDelete = (enq) => {
    if (window.confirm(`Delete the enquiry from ${enq.name}?`)) deleteEnquiry(enq.id);
  };

  const replyLink = (enq) => {
    const digits = (enq.phone || '').replace(/\D/g, '');
    const phone = digits.length === 10 ? `91${digits}` : digits || getWhatsAppPhone();
    const text = encodeURIComponent(`Hello ${enq.name}, thank you for your enquiry with LAC Stones Pvt. Ltd.`);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-1">Enquiries</h1>
      <p className="text-stone-500 mb-6">Messages submitted through the website contact form.</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[{ value: 'all', label: `All (${enquiries.length})` }, ...STATUSES.map((s) => ({
          value: s.value,
          label: `${s.label} (${enquiries.filter((e) => e.status === s.value).length})`,
        }))].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm cursor-pointer ${
              filter === tab.value ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm py-16 text-center text-stone-500">
          <Inbox size={36} className="mx-auto mb-3 text-stone-300" />
          No enquiries to show.
        </div>
      ) : (
        <ul className="space-y-4">
          {visible.map((enq) => (
            <li key={enq.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-stone-900">{enq.name}</p>
                  <p className="text-xs text-stone-400">{new Date(enq.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiry(enq.id, { status: e.target.value })}
                    className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 cursor-pointer ${
                      STATUSES.find((s) => s.value === enq.status)?.cls
                    }`}
                    aria-label="Enquiry status"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(enq)} className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {enq.interestedIn && (
                <p className="text-sm mb-2">
                  <span className="text-stone-400">Interested in:</span> <span className="font-medium">{enq.interestedIn}</span>
                </p>
              )}
              <p className="text-stone-700 whitespace-pre-wrap mb-4">{enq.message}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                {enq.phone && (
                  <a href={`tel:${enq.phone}`} className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900">
                    <Phone size={14} /> {enq.phone}
                  </a>
                )}
                {enq.email && (
                  <a href={`mailto:${enq.email}`} className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900">
                    <Mail size={14} /> {enq.email}
                  </a>
                )}
                <a
                  href={replyLink(enq)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-green-700 hover:text-green-900 font-medium"
                >
                  <MessageCircle size={14} /> Reply on WhatsApp
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnquiriesAdmin;
