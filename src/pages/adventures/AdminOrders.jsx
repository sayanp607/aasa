import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import './AdminAdventure.css';
import { FaUserShield, FaSatellite, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdmintripOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      toast.error('Access Denied: Intelligence Clearance Level 4 Required.');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/triporder/all-orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [role]);

  if (role !== 'admin') {
    return (
      <div className="admin-adventure-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#ef4444' }}>Unauthorized Access: Restricted Mission Data</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-adventure-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader">Decrypting Mission Logs...</div>
      </div>
    );
  }

  return (
    <div className="admin-adventure-container animate-fade-in">
      <header className="admin-header">
        <div>
          <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Logistics Intelligence</span>
          <h2>Mission Control</h2>
        </div>
        <button className="adm-btn-submit" onClick={() => navigate('/admin')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
          <FaArrowLeft /> Back to Command
        </button>
      </header>

      <section className="admin-stats-grid">
        <div className="stat-card">
          <span className="label">Total Deployments</span>
          <div className="value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <span className="label">Confirmed Crew</span>
          <div className="value">{orders.reduce((acc, o) => acc + (o.item?.totalGuests || 0), 0)}</div>
        </div>
        <div className="stat-card">
            <span className="label">Gross Revenue</span>
            <div className="value">₹{orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
            <span className="label">Uptime</span>
            <div className="value" style={{ color: '#10b981' }}>99.9%</div>
        </div>
      </section>

      <div className="admin-section-card" style={{ padding: '0', overflowX: 'auto' }}>
        <table className="admin-order-table">
          <thead>
            <tr>
              <th>Mission ID</th>
              <th>Expedition</th>
              <th>Intelligence (User)</th>
              <th>Deployment Date</th>
              <th>Crew Size</th>
              <th>Investment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: '#94a3b8' }}>No active missions detected.</td></tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: '#10b981', fontStyle: 'monospace' }}>#{order._id.slice(-6).toUpperCase()}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{order.item?.activity || 'N/A'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CID: {order.userId?.slice(-6).toUpperCase()}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{order.billingInfo?.firstName} {order.billingInfo?.lastName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{order.billingInfo?.email}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{order.item?.date ? new Date(order.item.date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div className="extra-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        {order.item?.totalGuests || 0} Members
                    </div>
                  </td>
                  <td style={{ fontWeight: 900, color: '#10b981' }}>₹{order.totalAmount?.toLocaleString()}</td>
                  <td><span className="status-badge status-confirmed">Confirmed</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmintripOrders;
