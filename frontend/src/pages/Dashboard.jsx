import { useState } from 'react'
import './Dashboard.css'
import { Icon } from '@mdi/react'
import {
  mdiMenu,
  mdiClose,
  mdiViewDashboardOutline,
  mdiShoppingOutline,
  mdiAccountGroupOutline,
  mdiPackageVariantClosed,
  mdiChartLine,
  mdiCogOutline,
  mdiBellOutline,
  mdiMagnify,
  mdiTrendingUp,
  mdiTrendingDown,
  mdiCurrencyUsd,
} from '@mdi/js'

const salesData = [
  { month: 'Jan', sales: 18000, goal: 22000 },
  { month: 'Feb', sales: 24000, goal: 22000 },
  { month: 'Mar', sales: 21000, goal: 25000 },
  { month: 'Apr', sales: 28000, goal: 26000 },
  { month: 'May', sales: 32000, goal: 30000 },
  { month: 'Jun', sales: 36000, goal: 32000 },
  { month: 'Jul', sales: 34000, goal: 33000 },
]

const revenueByChannel = [
  { name: 'Website', value: 42000 },
  { name: 'Marketplace', value: 28000 },
  { name: 'Physical Store', value: 19000 },
  { name: 'WhatsApp', value: 12000 },
]

const categoryData = [
  { name: 'Electronics', value: 35, colorClass: 'blue' },
  { name: 'Fashion', value: 25, colorClass: 'green' },
  { name: 'Home', value: 18, colorClass: 'orange' },
  { name: 'Beauty', value: 12, colorClass: 'purple' },
  { name: 'Others', value: 10, colorClass: 'slate' },
]

const recentOrders = [
  {
    id: '#10458',
    customer: 'Gabriel Albuquerque',
    product: 'Gaming Laptop',
    status: 'Paid',
    amount: '$4,890.00',
  },
  {
    id: '#10459',
    customer: 'Mariana Costa',
    product: 'Smartphone Pro',
    status: 'Processing',
    amount: '$2,799.00',
  },
  {
    id: '#10460',
    customer: 'Lucas Lima',
    product: 'Bluetooth Headphones',
    status: 'Shipped',
    amount: '$399.00',
  },
  {
    id: '#10461',
    customer: 'Fernanda Souza',
    product: 'Office Chair',
    status: 'Pending',
    amount: '$1,149.00',
  },
  {
    id: '#10462',
    customer: 'Ricardo Alves',
    product: '27" Monitor',
    status: 'Paid',
    amount: '$1,899.00',
  },
]

function MetricCard({ title, value, subtitle, trend, trendType = 'up' }) {
  return (
    <div className="metric-card">
      <div className="metric-card__top">
        <span className="metric-card__title">{title}</span>
        <div className="metric-card__mini-icon">
          <Icon path={mdiCurrencyUsd} size={0.8} />
        </div>
      </div>

      <h3 className="metric-card__value">{value}</h3>

      <div className="metric-card__bottom">
        <span
          className={`metric-card__trend ${
            trendType === 'up' ? 'positive' : 'negative'
          }`}
        >
          <Icon
            path={trendType === 'up' ? mdiTrendingUp : mdiTrendingDown}
            size={0.7}
          />
          {trend}
        </span>
        <span className="metric-card__subtitle">{subtitle}</span>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const statusMap = {
    Paid: 'success',
    Shipped: 'info',
    Pending: 'warning',
    Processing: 'processing',
  }

  return (
    <span className={`status-badge ${statusMap[status] || 'default'}`}>
      {status}
    </span>
  )
}

function SalesBars() {
  const maxValue = Math.max(...salesData.map((item) => Math.max(item.sales, item.goal)))

  return (
    <div className="sales-chart">
      {salesData.map((item) => {
        const salesHeight = (item.sales / maxValue) * 100
        const goalHeight = (item.goal / maxValue) * 100

        return (
          <div className="sales-chart__item" key={item.month}>
            <div className="sales-chart__bars">
              <div
                className="sales-chart__bar goal"
                style={{ height: `${goalHeight}%` }}
              />
              <div
                className="sales-chart__bar sales"
                style={{ height: `${salesHeight}%` }}
              />
            </div>
            <span className="sales-chart__label">{item.month}</span>
          </div>
        )
      })}
    </div>
  )
}

function ChannelBars() {
  const maxValue = Math.max(...revenueByChannel.map((item) => item.value))

  return (
    <div className="channel-list">
      {revenueByChannel.map((item) => {
        const width = (item.value / maxValue) * 100

        return (
          <div className="channel-item" key={item.name}>
            <div className="channel-item__top">
              <span>{item.name}</span>
              <strong>${item.value.toLocaleString('en-US')}</strong>
            </div>
            <div className="channel-item__bar">
              <div className="channel-item__fill" style={{ width: `${width}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CategoryBlock() {
  return (
    <div className="category-block">
      <div className="category-donut">
        <div className="category-donut__center">
          <strong>100%</strong>
          <span>Mix</span>
        </div>
      </div>

      <div className="category-legend">
        {categoryData.map((item) => (
          <div className="category-legend__item" key={item.name}>
            <span className={`dot ${item.colorClass}`}></span>
            <span>{item.name}</span>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-header">
            <div className="brand">
              <div className="brand__logo">CB</div>
              <div>
                <h2>CommerceBoard</h2>
                <p>Sales overview</p>
              </div>
            </div>

            <button
              className="sidebar-close"
              onClick={() => setSidebarOpen(false)}
            >
              <Icon path={mdiClose} size={0.9} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <a href="#" className="active">
              <Icon path={mdiViewDashboardOutline} size={0.85} />
              <span>Dashboard</span>
            </a>

            <a href="#">
              <Icon path={mdiShoppingOutline} size={0.85} />
              <span>Orders</span>
            </a>

            <a href="#">
              <Icon path={mdiAccountGroupOutline} size={0.85} />
              <span>Customers</span>
            </a>

            <a href="#">
              <Icon path={mdiPackageVariantClosed} size={0.85} />
              <span>Products</span>
            </a>

            <a href="#">
              <Icon path={mdiChartLine} size={0.85} />
              <span>Reports</span>
            </a>

            <a href="#">
              <Icon path={mdiCogOutline} size={0.85} />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-goal">
            <span className="sidebar-goal__label">Monthly goal</span>
            <strong>$120,000.00</strong>
            <p>82% completed</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon path={mdiMenu} size={0.95} />
            </button>

            <div>
              <h1>Sales Dashboard</h1>
              <p>Overview of commercial performance</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Icon path={mdiMagnify} size={0.8} />
              <input type="text" placeholder="Search..." />
            </div>

            <button className="icon-button">
              <Icon path={mdiBellOutline} size={0.85} />
            </button>

            <div className="user-profile">
              <div className="user-avatar">GA</div>
              <div>
                <strong>Gabriel</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <section className="metrics-grid">
          <MetricCard
            title="Total revenue"
            value="$126,450.00"
            subtitle="Compared to previous month"
            trend="+12.8%"
            trendType="up"
          />
          <MetricCard
            title="Orders placed"
            value="1,284"
            subtitle="Last 30 days"
            trend="+8.3%"
            trendType="up"
          />
          <MetricCard
            title="Average ticket"
            value="$98.48"
            subtitle="Based on paid orders"
            trend="+3.1%"
            trendType="up"
          />
          <MetricCard
            title="Operating expenses"
            value="$24,180.00"
            subtitle="Logistics and operational costs"
            trend="-4.2%"
            trendType="down"
          />
        </section>

        <section className="dashboard-content-grid">
          <div className="dashboard-panel panel-large">
            <div className="panel-header">
              <div>
                <h3>Sales growth</h3>
                <p>Monthly sales vs goal</p>
              </div>
            </div>

            <SalesBars />

            <div className="chart-legend">
              <div><span className="legend-box sales"></span> Sales</div>
              <div><span className="legend-box goal"></span> Goal</div>
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h3>Sales by category</h3>
                <p>Product mix distribution</p>
              </div>
            </div>

            <CategoryBlock />
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h3>Revenue by channel</h3>
                <p>Channel comparison</p>
              </div>
            </div>

            <ChannelBars />
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h3>Operational summary</h3>
                <p>Period indicators</p>
              </div>
            </div>

            <div className="summary-list">
              <div className="summary-item">
                <span>Sales conversion</span>
                <strong>4.8%</strong>
              </div>
              <div className="summary-item">
                <span>Returning customers</span>
                <strong>62%</strong>
              </div>
              <div className="summary-item">
                <span>Cart abandonment</span>
                <strong>18.4%</strong>
              </div>
              <div className="summary-item">
                <span>On-time deliveries</span>
                <strong>93.1%</strong>
              </div>
              <div className="summary-item">
                <span>Net margin</span>
                <strong>21.7%</strong>
              </div>
              <div className="summary-item">
                <span>Customer satisfaction</span>
                <strong>4.9/5</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-bottom-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h3>Recent orders</h3>
                <p>Latest activity</p>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                      <td>{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-panel goals-panel">
            <div className="panel-header">
              <div>
                <h3>Goals and progress</h3>
                <p>Monthly tracking</p>
              </div>
            </div>

            <div className="goal-card">
              <div className="goal-card__header">
                <span>Revenue goal</span>
                <strong>82%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '82%' }} />
              </div>
              <p>$98,400.00 out of $120,000.00</p>
            </div>

            <div className="goal-card">
              <div className="goal-card__header">
                <span>Orders goal</span>
                <strong>74%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill green" style={{ width: '74%' }} />
              </div>
              <p>950 out of 1,280 orders</p>
            </div>

            <div className="goal-card">
              <div className="goal-card__header">
                <span>New customer goal</span>
                <strong>67%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill purple" style={{ width: '67%' }} />
              </div>
              <p>201 out of 300 new customers</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}