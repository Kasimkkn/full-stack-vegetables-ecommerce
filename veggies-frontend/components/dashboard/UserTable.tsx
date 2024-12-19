import { Users } from "@/types/Types";

interface UserTableProps {
    users: Users[];
    onEdit: (user: Users) => void;
    onDelete: (id: string) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
    console.log("users", users);
    return (
        <div className="bg-white shadow rounded-lg p-4 overflow-auto flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
            </div>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.length > 0 && users?.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="bg-mainBg text-white px-2 py-1 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => onDelete(user._id)}
                                    className="bg-mainBg text-white px-2 py-1 rounded"
                                >
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

export default UserTable;
