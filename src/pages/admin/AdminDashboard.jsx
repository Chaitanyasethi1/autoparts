import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, CheckCircle, XCircle, Clock, Check, RefreshCw, Car, Mail, Phone, Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsRefreshing(true);
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        toast.error('Could not load bookings. Check database connection.');
        return;
      }

      const mapped = (data || []).map(b => ({
        id: String(b.id),
        name: b.name || 'N/A',
        email: b.email || '',
        phone: b.phone || '',
        service: b.service_type || b.service || 'General Service',
        date: b.preferred_date || b.date || '',
        time: b.preferred_time || b.time || '',
        vehicle_details: b.vehicle_details || '',
        notes: b.message || b.notes || '',
        status: b.status || 'Pending',
        created_at: b.created_at || new Date().toISOString(),
      }));

      setBookings(mapped);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error('Database error. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };


  const updateStatus = async (id, newStatus) => {
    const stringId = String(id);

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setBookings(prev => prev.map(booking => 
        String(booking.id) === stringId ? { ...booking, status: newStatus } : booking
      ));
      toast.success(`Status updated: ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status. Try again.');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking?')) return;
    
    const stringId = String(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setBookings(prev => prev.filter(booking => String(booking.id) !== stringId));
      toast.success('Booking deleted successfully.');
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast.error('Failed to delete booking. Try again.');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading leads & bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leads & Bookings Manager</h1>
          <p className="text-gray-500 mt-1">Real-time incoming customer appointment requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchBookings}
            disabled={isRefreshing}
            className="p-2.5 text-gray-500 hover:text-primary hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
            title="Refresh bookings"
          >
            <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          
          <button 
            onClick={() => {
              if (bookings.length === 0) {
                toast.error('No leads available to download');
                return;
              }
              const headers = ['Name', 'Phone', 'Email', 'Service', 'Vehicle', 'Date', 'Time', 'Status', 'Notes', 'Submitted At'];
              const csvContent = [
                headers.join(','),
                ...bookings.map(b => {
                  const row = [
                    b.name || '',
                    b.phone || '',
                    b.email || '',
                    b.service || '',
                    b.vehicle_details || '',
                    b.date || '',
                    b.time || '',
                    b.status || '',
                    b.notes || '',
                    b.created_at ? new Date(b.created_at).toLocaleString() : ''
                  ];
                  return row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
                })
              ].join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.setAttribute('href', url);
              link.setAttribute('download', `primetech_leads_${new Date().toISOString().split('T')[0]}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast.success('Leads downloaded as CSV');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl shadow-sm text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download CSV</span>
          </button>

          <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-200/60 flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Total Leads:</span>
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
                <th className="p-5 font-semibold text-gray-600 text-sm tracking-wide">Vehicle & Service</th>
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
                      <p className="text-lg font-medium text-gray-500">No leads found yet.</p>
                      <p className="text-sm">When customers book on the website, they will appear here automatically.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="font-semibold text-gray-900">{booking.name || 'N/A'}</div>
                      {booking.phone && (
                        <div className="text-sm text-gray-600 mt-0.5 flex items-center gap-1.5">
                          <Phone size={13} className="text-gray-400" />
                          <a href={`tel:${booking.phone}`} className="hover:text-primary transition-colors">{booking.phone}</a>
                        </div>
                      )}
                      {booking.email && (
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                          <Mail size={12} className="text-gray-400" />
                          <a href={`mailto:${booking.email}`} className="hover:underline">{booking.email}</a>
                        </div>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="font-medium text-gray-800">{booking.service || 'General Service'}</div>
                      {booking.vehicle_details && (
                        <div className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                          <Car size={13} className="text-gray-400" /> {booking.vehicle_details}
                        </div>
                      )}
                      {booking.notes && (
                        <div className="text-xs text-gray-400 mt-1 max-w-[220px] truncate" title={booking.notes}>
                          "{booking.notes}"
                        </div>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="font-medium text-gray-900 flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        {booking.date ? new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </div>
                      {booking.time && <div className="text-xs text-gray-500 mt-0.5">{booking.time}</div>}
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
                            className="appearance-none text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow cursor-pointer hover:bg-gray-100"
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
