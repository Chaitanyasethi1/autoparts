import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, CheckCircle, XCircle, Clock, Check, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsRefreshing(true);
      // Ensure supabase is configured correctly in your lib/supabase.js
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking?')) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking.');
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit border";
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <span className={`${baseClasses} bg-green-50 text-green-700 border-green-200`}><CheckCircle size={14} /> Confirmed</span>;
      case 'completed':
        return <span className={`${baseClasses} bg-blue-50 text-blue-700 border-blue-200`}><Check size={14} /> Completed</span>;
      case 'cancelled':
        return <span className={`${baseClasses} bg-red-50 text-red-700 border-red-200`}><XCircle size={14} /> Cancelled</span>;
      default: // pending
        return <span className={`${baseClasses} bg-amber-50 text-amber-700 border-amber-200`}><Clock size={14} /> Pending</span>;
    }
  };

  if (loading && !isRefreshing) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl text-center space-y-3">
        <XCircle className="mx-auto text-red-500" size={32} />
        <p className="text-red-600 font-medium">{error}</p>
        <button onClick={fetchBookings} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bookings Manager</h1>
          <p className="text-gray-500 mt-1">Manage and track all customer appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchBookings}
            disabled={isRefreshing}
            className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
            title="Refresh bookings"
          >
            <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-200/60 flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Total:</span>
            <span className="font-bold text-gray-900 text-lg">{bookings.length}</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide">Customer Details</th>
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide">Service Info</th>
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide">Date & Time</th>
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide">Status</th>
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 text-gray-400">
                      <Clock size={48} className="opacity-20" />
                      <p className="text-lg font-medium text-gray-500">No bookings found yet.</p>
                      <p className="text-sm">When customers book, they will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="font-semibold text-gray-900">{booking.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{booking.email}</div>
                      {booking.phone && <div className="text-sm text-gray-400 mt-0.5">{booking.phone}</div>}
                    </td>
                    <td className="p-5">
                      <div className="font-medium text-gray-800">{booking.service || 'General Appointment'}</div>
                      {booking.notes && (
                        <div className="text-xs text-gray-500 mt-1.5 max-w-[200px] truncate" title={booking.notes}>
                          {booking.notes}
                        </div>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="font-medium text-gray-900">
                        {booking.date ? new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </div>
                      {booking.time && <div className="text-sm text-gray-500 mt-0.5">{booking.time}</div>}
                    </td>
                    <td className="p-5">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-end gap-3">
                        <div className="relative">
                          <select
                            value={booking.status || 'Pending'}
                            onChange={(e) => updateStatus(booking.id, e.target.value)}
                            className="appearance-none text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow cursor-pointer hover:bg-gray-100"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
