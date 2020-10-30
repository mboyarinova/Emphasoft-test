import React, { useState } from 'react';
import superagent from 'superagent';

function Users() {

  const [users, setUsers] = useState([]);

  superagent
    .get("https://emphasoft-test-assignment.herokuapp.com/api/v1/users/")
    .set("authorization", `Token ${localStorage.token}`)
    .end((err, res) => {
      if (err) {
        alert("Не получилось войти!");
        //todo: change alert msg
        return;
      }
      setUsers(res.body);
    });

  return (
    <div>
      {users ? users.map((user, index) => (
        <div key={index}>
          {user.username}
        </div>
      )) : null}
    </div>
  );
}

export default Users;
