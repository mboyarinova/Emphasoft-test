import React, { useState, useEffect } from 'react';
import * as request from 'superagent';

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    request
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
  }, []);

  if (users) {
    users.sort((a, b) => {
      return a.id - b.id;
    });
    console.log(users);
  }

  return (
    <div>
      <h1>Список пользователей</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users ? users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.first_name + " " + user.last_name}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
