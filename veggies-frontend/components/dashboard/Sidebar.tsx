import Link from "next/link";

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }: AdminSidebarProps) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:translate-x-0 md:relative w-64 z-40`}
        >
            <Link href="/dashboard" className="text-2xl font-bold mb-6 items-center justify-center w-full flex">
                Dashboard
            </Link>
            <ul className="flex flex-col gap-4 my-6 justify-center items-center">
                <li>
                    <Link className="text-white text-xl font-bold " href={'/dashboard-products'}>Products</Link>
                </li>
                <li>
                    <Link className="text-white text-xl font-bold " href={'/dashboard-users'}>Users</Link>
                </li>
                <li>
                    <Link className="text-white text-xl font-bold " href={'/dashboard-orders'}>Orders</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
