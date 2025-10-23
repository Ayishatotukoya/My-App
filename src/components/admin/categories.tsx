"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

type Category = {
  id: number;
  name: string;
  slug?: string;
  parentId?: number | null;
};



export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form / edit state
  const [editing, setEditing] = useState<Category | null>(null);
  const [nameInput, setNameInput] = useState<string>("");

  // load categories
  async function loadCategories() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
      .from("Category")
      .select("*"); // selects all categories

      if (error) throw error;
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setCategories(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  // create
  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    const name = nameInput.trim();
    if (!name) return;
    try {
      const payload = {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };

      const {  error } = await supabase
        .from("Category")
        .insert([payload]); // <-- array required

      if (error) throw new Error("Create failed");

      setNameInput("");
      await loadCategories();
    } catch (err: any) {
      alert(err.message || "Create error");
    }
  }


  // start editing
  function startEdit(c: Category) {
    setEditing(c);
    setNameInput(c.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // save edit
  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const name = nameInput.trim();
    if (!name) return;
    try {
      const payload = {
        ...editing,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };
      const{ error} = await supabase
      .from("Category")
      .update([payload])
      .eq("id", editing.id);

      if (error) throw new Error("Update failed");
      setEditing(null);
      setNameInput("");
      await loadCategories();
    } catch (err: any) {
      alert(err?.message || "Update error");
    }
  }

  // delete
  async function handleDelete(id: number) {
    if (!confirm("Delete this category?")) return;
    try {
      const { error} = await supabase
       .from("categories")
      .delete()
      .eq("id", id);
      
      if (error) throw new Error("Delete failed");
      await loadCategories();
    } catch (err: any) {
      alert(err?.message || "Delete error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>

      <section className="mb-6">
        <form
          onSubmit={editing ? saveEdit : handleCreate}
          className="flex gap-2"
        >
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Category name"
            className="border rounded px-3 py-2 flex-1"
            aria-label="Category name"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
            aria-disabled={loading}
          >
            {editing ? "Save" : "Create"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setNameInput("");
              }}
              className="px-3 py-2 border rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section>
        {loading && (
          <div className="text-sm text-slate-600">Loading categories…</div>
        )}
        {error && <div className="text-sm text-red-600">Error: {error}</div>}

        {!loading && categories && (
          <ul className="space-y-3">
            {categories.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between border rounded p-3"
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-500">
                    id: {c.id} {c.slug ? `— ${c.slug}` : ""}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="px-3 py-1 border rounded text-sm"
                    title="Edit"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 border rounded text-sm text-red-600"
                    title="Delete"
                  >
                    Delete
                  </button>

                  <Link
                    // to={`/admin/categories/${c.id}`}
                    to="/admin/admin"
                    className="px-3 py-1 border rounded text-sm"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-sm text-slate-500">No categories found</li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
