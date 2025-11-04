import React, { useEffect } from "react";
import { getUser, useUsersDispatch, useUsersState } from "./UsersContext";

function User({ id }) {
    // const { data: user, error, isLoading } = useAsync({ promiseFn: getUser, id, watch: id });

    const state = useUsersState();
    const dispatch = useUsersDispatch();

    useEffect(() => {
        getUser(dispatch, id);
    }, [])

    const { loading, data: user, error } = state.user;
    debugger;

    if (loading) return <div>로딩중...</div>
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