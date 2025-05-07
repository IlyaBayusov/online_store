"use client";

import { getUsersAdmin, putUserRoleAdmin } from "@/api";
import Loader from "@/components/Loader/Loader";
import { IGetUsersAdmin, IPagination } from "@/interfaces";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function UsersAdmin() {
  const [users, setUsers] = useState<IGetUsersAdmin[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await getUsersAdmin();
      if (data) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
      setLoading(false);
    };

    getUsers();
  }, [role]);

  const handleClickIsRole = async (userId: number, userRole: string) => {
    const newRole = userRole === "ADMIN" ? "USER" : "ADMIN";
    const data = await putUserRoleAdmin(userId, newRole);
    if (data) {
      setRole(newRole);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full px-3 bg-white">
      <div className="mt-3 w-full flex justify-center items-center gap-1">
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>

        <p className="text-black text-sm">
          {pagination
            ? `${pagination.currentItems * pagination.currentPage + 1}-${
                pagination.currentItems * pagination.currentPage +
                pagination.currentItems
              } из ${pagination.totalItems}`
            : "Загрузка..."}
        </p>

        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
      </div>

      {users.length > 0 ? (
        <div className="w-[115vw] overflow-x-auto">
          <table className="mt-3 min-w-[115vw] text-black uppercase text-xs text-center border-collapse">
            <thead>
              <tr className="text-black border-b border-gray-300">
                <th>ID</th>
                <th>Имя Фамилия</th>
                <th>Логин</th>
                <th>Email</th>
                <th>Роль</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b border-gray-300" key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleClickIsRole(user.id, user.role)}
                    >
                      {user.role}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
