import React, {
    useState,
    useEffect
} from "react";
import { v4 as uuidv4 } from 'uuid';
//utils
import utilsLS from "../utils/utilsLS";

export default function useUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let cacheUsers;
        if (utilsLS.getItem("users")) {
            cacheUsers = utilsLS.getItem("users");
            setUsers(cacheUsers);
        } 
    }, []);

    const addUser = (newUser) => {
        const newUserList = [...users, { ...newUser, id: uuidv4() }];
        utilsLS.setItem('users', newUserList);
        setUsers(newUserList);
    };

    const deleteUser = (userId) => {
        const filteredUsers = users.filter((user) => user.id !== userId);
        utilsLS.setItem('users', filteredUsers);
        setUsers(filteredUsers);
    }

    const updateUser = (userId, newValues) => {
        console.log('newValues', newValues)
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, ...newValues } : user
        );
        console.log('updatedUsers', updatedUsers)
        utilsLS.setItem('users', updatedUsers);
        setUsers(updatedUsers);
    };

    const findUserById = (id) => {
        return users.find((user) => user.id === id);
    };

    return { users, addUser, deleteUser, updateUser, findUserById }
}