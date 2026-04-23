"use client";

import { useState } from "react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
}

export default function LeadTestPage() {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lead-test");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={handleTest}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch Leads"}
      </button>

      {leads.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Lead ID</th>
                <th className="px-4 py-2 border-b text-left">First Name</th>
                <th className="px-4 py-2 border-b text-left">Last Name</th>
                <th className="px-4 py-2 border-b text-left">Full Name</th>
                <th className="px-4 py-2 border-b text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{lead.id}</td>
                  <td className="px-4 py-2 border-b">{lead.firstName}</td>
                  <td className="px-4 py-2 border-b">{lead.lastName}</td>
                  <td className="px-4 py-2 border-b">{lead.fullName}</td>
                  <td className="px-4 py-2 border-b">{lead.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
