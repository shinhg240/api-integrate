import React from "react";
import { useAsync } from "react-async";
import axios from "axios";
import { jsonplaceholder } from "./Users";

async function getUser({ id }) {
    const response = await axios.get(`${jsonplaceholder}${id}`)
    return response.data;
}

function User({ id }) {
    const { data: user, error, isLoading } = useAsync({ promiseFn: getUser, id, watch: id });

    if (isLoading) return <div>로딩중...</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email: </b> {user.email}
            </p>
        </div>
    )
}

export default User;