// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "@tanstack/react-router";

// type Product = {
//   id: number;
//   sku?: string;
//   title: string;
//   description?: string;
//   price: number;
//   compareAtPrice?: number | null;
//   categoryId?: number | null;
//   brandId?: number | null;
//   images?: string[];
//   colors?: string[];
//   sizes?: string[];
//   tags?: string[];
//   stock?: number;
//   rating?: number;
//   createdAt?: string;
// };

// type Category = { id: number; name: string; slug?: string };
// type Brand = { id: number; name: string };

// const API = "http://localhost:4000";

// export default function ProductsPage() {
//   // data states
//   const [products, setProducts] = useState<Product[] | null>(null);
//   const [categories, setCategories] = useState<Category[] | null>(null);
//   const [brands, setBrands] = useState<Brand[] | null>(null);

//   // UI / control states
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // pagination & filters & search
//   const [page, setPage] = useState<number>(1);
//   const [limit, setLimit] = useState<number>(12);
//   const [totalCount, setTotalCount] = useState<number | null>(null);

//   const [search, setSearch] = useState<string>("");
//   const [categoryFilter, setCategoryFilter] = useState<number | "">("");
//   const [brandFilter, setBrandFilter] = useState<number | "">("");
//   const [priceMin, setPriceMin] = useState<string>("");
//   const [priceMax, setPriceMax] = useState<string>("");

//   // create/edit states
//   const [editing, setEditing] = useState<Product | null>(null);
//   const [form, setForm] = useState<Partial<Product>>({ title: "", price: 0 });

//   // helper to build querystring for json-server
//   function buildQuery() {
//     const params = new URLSearchParams();
//     // pagination with _page & _limit
//     params.set("_page", String(page));
//     params.set("_limit", String(limit));

//     // search: q param searches across fields
//     if (search.trim()) params.set("q", search.trim());

//     // filters
//     if (categoryFilter !== "") params.set("categoryId", String(categoryFilter));
//     if (brandFilter !== "") params.set("brandId", String(brandFilter));

//     if (priceMin.trim()) params.set("price_gte", priceMin.trim());
//     if (priceMax.trim()) params.set("price_lte", priceMax.trim());

//     // sort newest first
//     params.set("_sort", "createdAt");
//     params.set("_order", "desc");

//     return params.toString();
//   }

//   // load categories and brands once
//   useEffect(() => {
//     async function loadMeta() {
//       try {
//         const [cRes, bRes] = await Promise.all([
//           fetch(`${API}/categories`),
//           fetch(`${API}/brands`),
//         ]);
//         if (!cRes.ok || !bRes.ok) throw new Error("Failed to load meta");
//         setCategories(await cRes.json());
//         setBrands(await bRes.json());
//       } catch (err: any) {
//         console.error(err);
//       }
//     }
//     loadMeta();
//   }, []);

//   // load products whenever filters/pagination/search change
//   useEffect(() => {
//     let aborted = false;
//     async function loadProducts() {
//       setLoading(true);
//       setError(null);
//       try {
//         const query = buildQuery();
//         // include X-Total-Count header for pagination; json-server returns this header
//         const res = await fetch(`${API}/products?${query}`);
//         if (!res.ok)
//           throw new Error(`Failed to fetch products (${res.status})`);
//         const data: Product[] = await res.json();
//         if (aborted) return;
//         setProducts(data);

//         // json-server gives total count in header
//         const total = res.headers.get("X-Total-Count");
//         setTotalCount(total ? parseInt(total, 10) : null);
//       } catch (err: any) {
//         if (!aborted) setError(err.message || "Unknown error");
//       } finally {
//         if (!aborted) setLoading(false);
//       }
//     }

//     loadProducts();
//     return () => {
//       aborted = true;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, search, categoryFilter, brandFilter, priceMin, priceMax]);

//   // pagination helpers
//   const totalPages = useMemo(() => {
//     if (!totalCount) return null;
//     return Math.ceil(totalCount / limit);
//   }, [totalCount, limit]);

//   function goToPage(p: number) {
//     if (p < 1) p = 1;
//     if (totalPages && p > totalPages) p = totalPages;
//     setPage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   // Create / Edit handlers
//   function startCreate() {
//     setEditing(null);
//     setForm({ title: "", price: 0, categoryId: null, brandId: null, stock: 0 });
//   }

//   function startEdit(p: Product) {
//     setEditing(p);
//     setForm({ ...p });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   async function handleSave(e: React.FormEvent) {
//     e.preventDefault();
//     // basic validation
//     if (!form.title || !form.title.toString().trim()) {
//       alert("Title is required");
//       return;
//     }
//     if (!form.price && form.price !== 0) {
//       alert("Price is required");
//       return;
//     }

//     try {
//       const payload = {
//         ...form,
//         price: Number(form.price),
//         compareAtPrice: form.compareAtPrice
//           ? Number(form.compareAtPrice)
//           : null,
//         categoryId: form.categoryId ?? null,
//         brandId: form.brandId ?? null,
//         images: form.images ?? [],
//         colors: form.colors ?? [],
//         sizes: form.sizes ?? [],
//         stock: form.stock ?? 0,
//         createdAt: new Date().toISOString(),
//       };

//       let res: Response;
//       if (editing) {
//         res = await fetch(`${API}/products/${editing.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ ...editing, ...payload }),
//         });
//       } else {
//         // generate a simple SKU server-side / here
//         payload["sku"] = `SKU-${Date.now()}`;
//         res = await fetch(`${API}/products`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!res.ok) throw new Error("Save failed");
//       // refresh list
//       setForm({});
//       setEditing(null);
//       await reloadCurrentPage();
//     } catch (err: any) {
//       alert(err?.message || "Save error");
//     }
//   }

//   async function handleDelete(id: number) {
//     if (!confirm("Delete this product?")) return;
//     try {
//       const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       // if deleting last item on page, go back one page (if possible)
//       if (products && products.length === 1 && page > 1) {
//         goToPage(page - 1);
//       } else {
//         await reloadCurrentPage();
//       }
//     } catch (err: any) {
//       alert(err?.message || "Delete error");
//     }
//   }

//   // reload current page data
//   async function reloadCurrentPage() {
//     // trigger effect by forcing same deps: easiest is to re-run by setting page to same value briefly
//     setLoading(true);
//     try {
//       const query = buildQuery();
//       const res = await fetch(`${API}/products?${query}`);
//       if (!res.ok) throw new Error("Reload failed");
//       const data: Product[] = await res.json();
//       setProducts(data);
//       const total = res.headers.get("X-Total-Count");
//       setTotalCount(total ? parseInt(total, 10) : null);
//     } catch (err: any) {
//       setError(err?.message || "Reload error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // helper: reset filters
//   function clearFilters() {
//     setSearch("");
//     setCategoryFilter("");
//     setBrandFilter("");
//     setPriceMin("");
//     setPriceMax("");
//     setPage(1);
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-semibold">Products</h1>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={startCreate}
//             className="px-3 py-2 bg-green-600 text-white rounded"
//           >
//             New product
//           </button>
//         </div>
//       </div>

//       {/* Create / Edit form */}
//       {(editing || form.title !== undefined) && (
//         <section className="mb-6 border rounded p-4 bg-white">
//           <h2 className="text-lg font-medium mb-3">
//             {editing ? "Edit product" : "Create product"}
//           </h2>
//           <form
//             onSubmit={handleSave}
//             className="grid grid-cols-1 md:grid-cols-2 gap-3"
//           >
//             <input
//               placeholder="Title"
//               value={form.title ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, title: e.target.value }))
//               }
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={form.price ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, price: Number(e.target.value) }))
//               }
//               className="border rounded px-3 py-2"
//             />

//             <input
//               placeholder="Compare at price (optional)"
//               value={form.compareAtPrice ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({
//                   ...f,
//                   compareAtPrice: e.target.value
//                     ? Number(e.target.value)
//                     : null,
//                 }))
//               }
//               className="border rounded px-3 py-2"
//             />

//             <select
//               value={form.categoryId ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({
//                   ...f,
//                   categoryId: e.target.value ? Number(e.target.value) : null,
//                 }))
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">Choose category</option>
//               {categories?.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={form.brandId ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({
//                   ...f,
//                   brandId: e.target.value ? Number(e.target.value) : null,
//                 }))
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">Choose brand</option>
//               {brands?.map((b) => (
//                 <option key={b.id} value={b.id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               placeholder="Stock"
//               type="number"
//               value={form.stock ?? 0}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, stock: Number(e.target.value) }))
//               }
//               className="border rounded px-3 py-2"
//             />

//             <input
//               placeholder="Image URL (comma separated)"
//               value={(form.images ?? []).join(",")}
//               onChange={(e) =>
//                 setForm((f) => ({
//                   ...f,
//                   images: e.target.value
//                     ? e.target.value.split(",").map((s) => s.trim())
//                     : [],
//                 }))
//               }
//               className="border rounded px-3 py-2 md:col-span-2"
//             />

//             <textarea
//               placeholder="Description"
//               value={form.description ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, description: e.target.value }))
//               }
//               className="border rounded px-3 py-2 md:col-span-2"
//             />

//             <div className="md:col-span-2 flex items-center gap-2">
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-indigo-600 text-white rounded"
//               >
//                 {editing ? "Save" : "Create"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditing(null);
//                   setForm({});
//                 }}
//                 className="px-3 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Filters */}
//       <section className="mb-4 flex flex-col md:flex-row gap-3 items-start md:items-end">
//         <div className="flex items-center gap-2">
//           <input
//             placeholder="Search title or description"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="border rounded px-3 py-2"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <select
//             value={categoryFilter ?? ""}
//             onChange={(e) => {
//               setCategoryFilter(e.target.value ? Number(e.target.value) : "");
//               setPage(1);
//             }}
//             className="border rounded px-3 py-2"
//           >
//             <option value="">All categories</option>
//             {categories?.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={brandFilter ?? ""}
//             onChange={(e) => {
//               setBrandFilter(e.target.value ? Number(e.target.value) : "");
//               setPage(1);
//             }}
//             className="border rounded px-3 py-2"
//           >
//             <option value="">All brands</option>
//             {brands?.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>

//           <input
//             placeholder="Min price"
//             value={priceMin}
//             onChange={(e) => {
//               setPriceMin(e.target.value);
//               setPage(1);
//             }}
//             className="border rounded px-3 py-2 w-24"
//           />
//           <input
//             placeholder="Max price"
//             value={priceMax}
//             onChange={(e) => {
//               setPriceMax(e.target.value);
//               setPage(1);
//             }}
//             className="border rounded px-3 py-2 w-24"
//           />

//           <button
//             onClick={() => clearFilters()}
//             className="px-3 py-2 border rounded"
//           >
//             Clear
//           </button>
//         </div>

//         <div className="ml-auto flex items-center gap-2">
//           <label className="text-sm">Per page</label>
//           <select
//             value={limit}
//             onChange={(e) => {
//               setLimit(Number(e.target.value));
//               setPage(1);
//             }}
//             className="border rounded px-2 py-1"
//           >
//             {[6, 12, 24, 48].map((n) => (
//               <option key={n} value={n}>
//                 {n}
//               </option>
//             ))}
//           </select>
//         </div>
//       </section>

//       {/* List */}
//       <section>
//         {loading && (
//           <div className="text-sm text-slate-600">Loading products…</div>
//         )}
//         {error && <div className="text-sm text-red-600">Error: {error}</div>}

//         {!loading && products && (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {products.map((p) => (
//                 <div
//                   key={p.id}
//                   className="border rounded bg-white p-3 flex flex-col"
//                 >
//                   <div className="h-40 w-full bg-slate-100 mb-3 flex items-center justify-center overflow-hidden">
//                     {p.images && p.images.length > 0 ? (
//                       <img
//                         src={p.images[0]}
//                         alt={p.title}
//                         className="object-cover h-full w-full"
//                       />
//                     ) : (
//                       <div className="text-slate-400">No image</div>
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <div className="font-medium">{p.title}</div>
//                     <div className="text-sm text-slate-500">
//                       {p.description?.slice(0, 80)}
//                     </div>
//                     <div className="mt-2 font-semibold">
//                       ${p.price.toFixed(2)}
//                     </div>
//                     <div className="text-xs text-slate-400">
//                       Stock: {p.stock ?? 0}
//                     </div>
//                   </div>

//                   <div className="mt-3 flex items-center gap-2">
//                     <button
//                       onClick={() => startEdit(p)}
//                       className="px-3 py-1 border rounded text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="px-3 py-1 border rounded text-sm text-red-600"
//                     >
//                       Delete
//                     </button>
//                     <Link
//                      //  to={`/admin/products/${p.id}`}
//                      to="/"
//                       className="px-3 py-1 border rounded text-sm ml-auto"
//                     >
//                       View
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-6 flex items-center justify-between">
//               <div className="text-sm text-slate-600">
//                 {totalCount !== null ? `${totalCount} products` : ""}
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => goToPage(page - 1)}
//                   disabled={page === 1}
//                   className="px-3 py-1 border rounded"
//                 >
//                   Prev
//                 </button>
//                 <div className="px-3 py-1 border rounded">
//                   {page}
//                   {totalPages ? ` / ${totalPages}` : ""}
//                 </div>
//                 <button
//                   onClick={() => goToPage(page + 1)}
//                   disabled={totalPages ? page >= totalPages : false}
//                   className="px-3 py-1 border rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </section>
//     </div>
//   );
// }

export default function ProductsPage() {
   return(
      <div>
         products
      </div>
   )
   }