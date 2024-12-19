import { Product } from "@/types/Types";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

const ProductTable = ({ products, onEdit, onDelete, onAdd }: ProductTableProps) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 overflow-auto flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <button
                    onClick={onAdd}
                    className="bg-mainBg text-white px-4 py-2 rounded mb-4">Add Product</button>
            </div>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="px-4 py-2">
                                <img src={product.photo} alt={product.name}
                                    className="w-16 h-16  rounded-full"
                                />
                            </td>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">₹{product.price}</td>
                            <td className="px-4 py-2">₹{product.stock}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => onEdit(product)} className="bg-mainBg text-white px-2 py-1 rounded mr-2">
                                    Update
                                </button>
                                <button onClick={() => onDelete(product._id)} className="bg-mainBg text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
