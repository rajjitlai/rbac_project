import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../api/rbac";

const AdminPanel = () => {
    const { logout } = useContext(AuthContext);
    const [roleName, setRoleName] = useState('');
    const [permissionName, setPermissionName] = useState('');
    const [userId, setUserId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [permissionId, setPermissionId] = useState('');
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const navigate = useNavigate();

    const handleCreateRole = async () => {
        try {
            await apiService.createRole(roleName);
            alert('Role created successfully');
            setRoleName('');
            setError('');
        } catch (error) {
            setError(`Failed to create role: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCreatePermission = async () => {
        try {
            await apiService.createPermission(permissionName);
            alert('Permission created successfully');
            setPermissionName('');
            setError('');
        } catch (error) {
            setError(`Failed to create permission: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAssignRole = async () => {
        try {
            await apiService.assignRole(parseInt(userId), parseInt(roleId));
            alert('Role assigned successfully');
            setUserId('');
            setRoleId('');
            setError('');
        } catch (error) {
            setError(`Failed to assign role: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAssignPermission = async () => {
        try {
            await apiService.assignPermission(parseInt(roleId), parseInt(permissionId));
            alert('Permission assigned successfully');
            setRoleId('');
            setPermissionId('');
            setError('');
        } catch (error) {
            setError(`Failed to assign permission: ${error.response?.data?.message || error.message}`);
        }
    };

    const fetchData = async () => {
        try {
            const rolesRes = await apiService.getRoles();
            const permissionsRes = await apiService.getPermissions();
            setRoles(rolesRes.data);
            setPermissions(permissionsRes.data);
        } catch (err) {
            setError('Failed to load roles or permissions', err);
        }
    };
    fetchData();


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <div className="flex justify-between gap-4 items-center">
                    <Link to="/shopping" className="bg-green-500 text-white p-2 rounded hover:bg-red-600">Shopping</Link>
                    <Link to="/todo" className="bg-blue-500 text-white p-2 rounded hover:bg-red-600">Todo</Link>
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold mb-4">Manage Roles</h3>
                    <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        placeholder="Role Name (e.g., admin)"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleCreateRole}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Role
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold mb-4">Manage Permissions</h3>
                    <input
                        type="text"
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        placeholder="Permission Name (e.g., todo:read)"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleCreatePermission}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Permission
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold mb-4">Assign Role to User</h3>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        placeholder="Role ID"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleAssignRole}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Assign Role
                    </button>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold mb-4">Assign Permission to Role</h3>
                    <input
                        type="number"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        placeholder="Role ID"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        value={permissionId}
                        onChange={(e) => setPermissionId(e.target.value)}
                        placeholder="Permission ID"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleAssignPermission}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Assign Permission
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Existing Roles</h3>
                {roles.length > 0 ? (
                    <ul className="list-disc pl-5 mb-6">
                        {roles.map(role => (
                            <li key={role.id} className="text-gray-800">{role.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No roles found.</p>
                )}

                <h3 className="text-xl font-bold mb-4">Existing Permissions</h3>
                {permissions.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {permissions.map(permission => (
                            <li key={permission.id} className="text-gray-800">{permission.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No permissions found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel