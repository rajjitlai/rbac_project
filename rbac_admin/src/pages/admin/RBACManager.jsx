import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import apiService from "../../api/rbac";

const RBACManagement = () => {
    const { token } = useContext(AuthContext);
    const [roleName, setRoleName] = useState('');
    const [permissionName, setPermissionName] = useState('');
    const [userId, setUserId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [permissionId, setPermissionId] = useState('');

    const handleCreateRole = async () => {
        try {
            await apiService.createRole(token, roleName);
            alert('Role created successfully');
        } catch (error) {
            console.error('Failed to create role:', error);
        }
    };

    const handleCreatePermission = async () => {
        try {
            await apiService.createPermission(token, permissionName);
            alert('Permission created successfully');
        } catch (error) {
            console.error('Failed to create permission:', error);
        }
    };

    const handleAssignRole = async () => {
        try {
            await apiService.assignRole(token, userId, roleId);
            alert('Role assigned successfully');
        } catch (error) {
            console.error('Failed to assign role:', error);
        }
    };

    const handleAssignPermission = async () => {
        try {
            await apiService.assignPermission(token, roleId, permissionId);
            alert('Permission assigned successfully');
        } catch (error) {
            console.error('Failed to assign permission:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold mb-4">RBAC Management</h3>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        placeholder="Role Name"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleCreateRole}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Role
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        placeholder="Permission Name"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleCreatePermission}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Permission
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        placeholder="Role ID"
                        className="w-full p-2 border rounded mt-2"
                    />
                    <button
                        onClick={handleAssignRole}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Assign Role
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        placeholder="Role ID"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        value={permissionId}
                        onChange={(e) => setPermissionId(e.target.value)}
                        placeholder="Permission ID"
                        className="w-full p-2 border rounded mt-2"
                    />
                    <button
                        onClick={handleAssignPermission}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Assign Permission
                    </button>
                </div>
            </div>
        </div>
    );
};


export default RBACManagement