// "use client";

// import  { useEffect, useMemo, useState } from "react";
// import { Link } from "@tanstack/react-router";

// /**
//  * DashboardPage
//  * - Expects json-server running at http://localhost:4000 (adjust API_BASE if different)
//  * - Endpoints used: /products, /orders, /categories
//  */

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

// type Product = {
//   id: number | string;
//   title?: string;
//   price?: number;
//   stock?: number;
//   images?: string[];
// };

// type Order = {
//   id: number | string;
//   createdAt?: string;
//   total?: number;
//   items?: Array<{ productId: number | string; qty: number; price?: number }>;
//   status?: string;
//   customerName?: string;
// };

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [products, setProducts] = useState<Product[] | null>(null);
//   const [orders, setOrders] = useState<Order[] | null>(null);
//   const [categories, setCategories] = useState<any[] | null>(null);

//   // fetch summary + recent orders
//   useEffect(() => {
//     const ac = new AbortController();
//     async function loadAll() {
//       setLoading(true);
//       setError(null);
//       try {
//         // parallel fetches
//         const [pRes, oRes, cRes] = await Promise.all([
//           fetch(`${API_BASE}/products`, { signal: ac.signal }),
//           fetch(`${API_BASE}/orders?_sort=createdAt&_order=desc&_limit=10`, {
//             signal: ac.signal,
//           }),
//           fetch(`${API_BASE}/categories`, { signal: ac.signal }),
//         ]);

//         if (!pRes.ok) throw new Error(`Products fetch failed (${pRes.status})`);
//         if (!oRes.ok) throw new Error(`Orders fetch failed (${oRes.status})`);
//         if (!cRes.ok)
//           throw new Error(`Categories fetch failed (${cRes.status})`);

//         const [pJson, oJson, cJson] = await Promise.all([
//           pRes.json(),
//           oRes.json(),
//           cRes.json(),
//         ]);
//         setProducts(pJson);
//         setOrders(oJson);
//         setCategories(cJson);
//       } catch (err: any) {
//         if (err.name !== "AbortError") setError(err.message || "Unknown error");
//       } finally {
//         if (!ac.signal.aborted) setLoading(false);
//       }
//     }

//     loadAll();
//     return () => ac.abort();
//   }, []);

//   // Derived KPIs
//   const kpis = useMemo(() => {
//     const totalProducts = products ? products.length : 0;
//     const totalOrders = orders
//       ? Array.isArray(orders)
//         ? orders.length
//         : 0
//       : 0;
//     const revenue = orders
//       ? orders.reduce((s, o) => s + (Number(o.total) || 0), 0)
//       : 0;
//     const lowStockCount = products
//       ? products.filter((p) => typeof p.stock === "number" && p.stock <= 5)
//           .length
//       : 0;
//     return { totalProducts, totalOrders, revenue, lowStockCount };
//   }, [products, orders]);

//   // Sparkline data: totals per order (simple)
//   const sparklinePoints = useMemo(() => {
//     if (!orders || orders.length === 0) return [];
//     // map to last 10 totals, oldest -> newest
//     const arr = orders
//       .slice()
//       .reverse()
//       .map((o) => Number(o.total) || 0);
//     return arr;
//   }, [orders]);

//   // small helper: format currency
//   function fmt(n: number) {
//     return n.toLocaleString(undefined, {
//       style: "currency",
//       currency: "USD",
//       maximumFractionDigits: 2,
//     });
//   }

//   // recent orders (first 8)
//   const recentOrders = useMemo(
//     () => (orders ? orders.slice(0, 8) : []),
//     [orders]
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Dashboard</h1>
//           <p className="text-sm text-slate-500">
//             Overview of store performance
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Link
//             to="/admin/product"
//             className="px-3 py-1 border rounded text-sm"
//           >
//             Products
//           </Link>
//           <Link to="/admin/orders" className="px-3 py-1 border rounded text-sm">
//             Orders
//           </Link>
//         </div>
//       </div>

//       {loading && (
//         <div className="text-sm text-slate-500">Loading dashboard…</div>
//       )}
//       {error && <div className="text-sm text-red-600">Error: {error}</div>}

//       {!loading && !error && (
//         <>
//           {/* KPI cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div className="p-4 bg-white border rounded">
//               <div className="text-xs text-slate-500">Products</div>
//               <div className="text-2xl font-semibold">{kpis.totalProducts}</div>
//               <div className="text-sm text-slate-400 mt-2">
//                 Categories: {categories ? categories.length : "—"}
//               </div>
//             </div>

//             <div className="p-4 bg-white border rounded">
//               <div className="text-xs text-slate-500">Orders (recent)</div>
//               <div className="text-2xl font-semibold">{kpis.totalOrders}</div>
//               <div className="text-sm text-slate-400 mt-2">
//                 Last {orders ? orders.length : 0} orders loaded
//               </div>
//             </div>

//             <div className="p-4 bg-white border rounded">
//               <div className="text-xs text-slate-500">Revenue (loaded)</div>
//               <div className="text-2xl font-semibold">{fmt(kpis.revenue)}</div>
//               <div className="text-sm text-slate-400 mt-2">
//                 Based on loaded orders
//               </div>
//             </div>

//             <div className="p-4 bg-white border rounded">
//               <div className="text-xs text-slate-500">Low stock</div>
//               <div className="text-2xl font-semibold">{kpis.lowStockCount}</div>
//               <div className="text-sm text-slate-400 mt-2">
//                 Items with ≤ 5 units
//               </div>
//             </div>
//           </div>

//           {/* Sales sparkline + Recent orders */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 bg-white border rounded p-4">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h2 className="font-semibold">Recent Orders</h2>
//                   <p className="text-sm text-slate-500">
//                     Latest orders (most recent first)
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs text-slate-500">Revenue (shown)</div>
//                   <div className="font-semibold">{fmt(kpis.revenue)}</div>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="text-left text-slate-500">
//                       <th className="py-2">Order</th>
//                       <th className="py-2">Customer</th>
//                       <th className="py-2">Total</th>
//                       <th className="py-2">Date</th>
//                       <th className="py-2">Status</th>
//                       <th className="py-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentOrders.length === 0 && (
//                       <tr>
//                         <td colSpan={6} className="py-4 text-slate-500">
//                           No orders found
//                         </td>
//                       </tr>
//                     )}
//                     {recentOrders.map((o) => (
//                       <tr key={o.id} className="border-t">
//                         <td className="py-2">#{o.id}</td>
//                         <td className="py-2">{o.customerName ?? "Guest"}</td>
//                         <td className="py-2 font-medium">
//                           {fmt(Number(o.total) || 0)}
//                         </td>
//                         <td className="py-2">
//                           {o.createdAt
//                             ? new Date(o.createdAt).toLocaleString()
//                             : "—"}
//                         </td>
//                         <td className="py-2">
//                           <span
//                             className={`px-2 py-1 rounded text-xs ${o.status === "paid" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}
//                           >
//                             {o.status ?? "pending"}
//                           </span>
//                         </td>
//                         <td className="py-2">
//                           <Link
//                           to ="/admin/orders"
//                             // to ={`/admin/orders/${o.id}`}
//                             className="text-indigo-600 underline text-sm"
//                           >
//                             View
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="bg-white border rounded p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <div>
//                   <h3 className="font-semibold">Sales (sparkline)</h3>
//                   <p className="text-xs text-slate-500">
//                     Last {sparklinePoints.length} points
//                   </p>
//                 </div>
//                 <div className="text-right text-sm font-medium">
//                   {fmt(kpis.revenue)}
//                 </div>
//               </div>

//               <div className="mt-3">
//                 {/* Simple SVG sparkline */}
//                 <Sparkline data={sparklinePoints} width={300} height={80} />
//               </div>

//               <div className="mt-4">
//                 <h4 className="text-sm font-medium">Top categories</h4>
//                 <ul className="mt-2 text-sm text-slate-600">
//                   {categories &&
//                     categories.slice(0, 6).map((c: any) => (
//                       <li key={c.id} className="py-1">
//                         {c.name}
//                       </li>
//                     ))}
//                   {!categories && <li className="py-1">No categories</li>}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /**
//  * Sparkline component (tiny, zero deps)
//  * Accepts array of numbers (0..n)
//  */
// function Sparkline({
//   data,
//   width = 300,
//   height = 80,
// }: {
//   data: number[];
//   width?: number;
//   height?: number;
// }) {
//   if (!data || data.length === 0) {
//     return <div className="text-sm text-slate-500">No data</div>;
//   }
//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const range = max - min || 1;
//   const stepX = width / (data.length - 1);

//   // build points string
//   const points = data
//     .map((v, i) => {
//       const x = Math.round(i * stepX);
//       const y = Math.round((1 - (v - min) / range) * (height - 10)) + 5; // inset 5px
//       return `${x},${y}`;
//     })
//     .join(" ");

//   // area path (optional subtle fill)
//   const areaPath = `M0,${height} L${points} L${width},${height} Z`;

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       className="block"
//     >
//       <path d={areaPath} fill="rgba(99,102,241,0.06)" stroke="none" />
//       <polyline
//         points={points}
//         fill="none"
//         stroke="#6366f1"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       {/* dots */}
//       {data.map((v, i) => {
//         const x = Math.round(i * stepX);
//         const y = Math.round((1 - (v - min) / range) * (height - 10)) + 5;
//         return <circle key={i} cx={x} cy={y} r={2} fill="#6366f1" />;
//       })}
//     </svg>
//   );
// }
