import React, { useState } from "react";
import axios from "axios";
// import useAsync from "./useAsync";
import { useAsync } from "react-async";
import User from "./User";

export const jsonplaceholder = 'https://jsonplaceholder.typicode.com/users/';

async function getUsers() {
    const response = await axios.get(jsonplaceholder);
    return response.data;
}

function Users() {
    // const { data: users, error, isLoading, reload } = useAsync({ promiseFn: getUsers });
    const { data: users, error, isLoading, reload, run } = useAsync({ deferFn: getUsers });
    // const [state, refetch] = useAsync(getUsers, [], true);
    const [userId, setUserId] = useState(null);

    // const { loading, error, data: users } = state;
    if (isLoading) return <div>로딩중입니다.</div>;
    if (error) return <div>에러가 발생했습니다!</div>;
    if (!users) return <button onClick={run}>불러오기</button>;
    
    return (
        <>
            <div>
                {users.map(user => {
                    return (
                        <li key={user.id} onClick={() => setUserId(user.id)}>{user.username} ({user.name})</li>
                    )
                })}
            </div>
            <button onClick={reload}>다시 불러오기</button>

            {userId &&
                <User id={userId} />
            }
        </>
    )
}

export default Users;