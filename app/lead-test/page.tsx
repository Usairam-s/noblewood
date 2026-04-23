"use client";

import { useState } from "react";

export default function LeadTestPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lead-test");
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: String(error) });
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
        {loading ? "Loading..." : "Lead Test"}
      </button>

      {response && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto max-h-96">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
