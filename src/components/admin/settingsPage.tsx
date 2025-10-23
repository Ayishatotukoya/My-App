// import { Save } from "lucide-react";
// import { useEffect, useState } from "react";



// type Category = {
//    id:number;
//    name:string;
//    slug?: string;
//    parentId?: number | null;
// }

// const API = "http://localhost:4000/categories";

// export default function CategoryPage(){
//    const [categories, setCategories] = useState<Category[] | null>(null);
//    const [loading, setLoading] = useState<boolean>(false);
//    const [error, setError] = useState<string | null>(null);
 


// const [editing, setEditing] = useState<Category | null>(null);

// // load categories
// async function loadCategories()  {
//    setLoading(true);
//    setError(null)

//    try {
//       const res= await fetch(API);
//       if(!res.ok) throw new Error(`failed to fetch(${res.status}) `);
//       const data:Category[] = await res.json();
//       setCategories(data);
//    } catch (err:any) {
//       setError(err.message || "unknown error");
//       setCategories(null)
//    } finally{
//       setLoading(false)
//    }
// }

// useEffect(() => {
//    loadCategories();
// }, []);











//    return (
//      <div className="max-w-4xl mx-auto p-4">
//        <h1 className="text-2xl font-semibold mb-4 ">Categories</h1>

//        <section className="mb-6">
//          <form
//            //  onSubmit={}
//            className="flex gap-2"
//          >
//            <input
//              type="text"
//              placeholder="category name"
//              className=" border rounded px-3 py-2 flex-1"
//              aria-label="category name"
//            />

//            <button
//              type="submit"
//              className="px-4 py-2 bg-indigo-600 text-white rounded"
//            >
//              {editing ? "save" : "create"}
//            </button>
//            {editing && (
//              <button
//                type="button"
//                className="px-3 py-2 text-black border rounded"
//              >
//                Cancel
//              </button>
//            )}
//          </form>
//        </section>

//        <section>
//          <div>
//            <ul>
//              <li className="flex items-center justify-between border rounded p-3">

//                <div>
//                   <div className="font-semibold">name</div>
//                   <div>id:slug-name</div>
//                </div>

//                <div>
//                   <button className="px-3 py-1 border rounded text-sm mr-2">
//                      Edit
//                   </button>

//                   <button className="px-3 py-1 border rounded text-sm mr-2 text-red-600">
//                      Delete
//                   </button>

//                   <button className="px-3 py-1 border rounded text-sm mr-2">
//                      View
//                   </button>
//                </div>
//              </li>
//            </ul>
//          </div>
//        </section>
//      </div>
//    );

// }