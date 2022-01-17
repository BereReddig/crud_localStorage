import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Icon, Button } from 'semantic-ui-react';
// components
import UsersModal from './modal/UsersModal';
import useUsers from '../hooks/useUsers.hook';
// context
import { UserProvider } from '../contexts/Users.context';

export default function Users() {
    const [isOpen, setIsOpen] = useState(false);
    const [editUser, setEditUser] = useState('');

    const { users, addUser, deleteUser, updateUser, findUserById } = useUsers();

    return (
        <>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => setIsOpen(true)}
                            >
                                <Icon name='user' /> Add User
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Profile Picture</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map((user) => {
                        return (
                            <Table.Row key={user.id} >
                                <Table.Cell
                                    onClick={(e) => {
                                        return (
                                            e.stopPropagation(),
                                            setEditUser(user),
                                            setIsOpen(true)
                                        )
                                    }}
                                >
                                    <img
                                        src={user.photo}
                                        height='60px'
                                        onLoad={URL.revokeObjectURL(user.photo)}
                                    />
                                </Table.Cell>
                                <Table.Cell
                                    onClick={(e) => {
                                        return (
                                            e.stopPropagation(),
                                            setEditUser(user),
                                            setIsOpen(true)
                                        )
                                    }}
                                >
                                    {user.username}
                                </Table.Cell>
                                <Table.Cell
                                    onClick={(e) => {
                                        return (
                                            e.stopPropagation(),
                                            setEditUser(user),
                                            setIsOpen(true)
                                        )
                                    }}
                                >
                                    {user.name}
                                </Table.Cell>
                                <Table.Cell
                                    onClick={(e) => {
                                        return (
                                            e.stopPropagation(),
                                            setEditUser(user),
                                            setIsOpen(true)
                                        )
                                    }}
                                >
                                    {user.email}
                                </Table.Cell>
                                <Table.Cell
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteUser(user.id)}
                                >
                                    <Icon
                                        name='trash alternate outline'
                                        style={{ color: "red" }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <UserProvider value={{ addUser, editUser, updateUser }}>
                <UsersModal
                    open={isOpen}
                    onClose={() => {
                        return (
                            setIsOpen(false),
                            sessionStorage.clear(),
                            setEditUser('')
                        )
                    }}
                />
            </UserProvider>
        </>
    );
};