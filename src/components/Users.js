import React, { useState, useEffect } from 'react';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';

function Users() {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [authorized, setAuthorized] = useState(
    localStorage.token ? true : false
  );

  useEffect(() => {
    request
      .get("https://emphasoft-test-assignment.herokuapp.com/api/v1/users/")
      .set("authorization", `Token ${localStorage.token}`)
      .end((err, res) => {
        if (err) {
          setAuthorized(false);
          localStorage.removeItem("token");
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
    <React.Fragment>
      { authorized ? (
        <React.Fragment>
          { users.length > 0 ? (
            <div className = "table">
              <h1>Список пользователей</h1>
              <form>
                <label>Фильтровать пользователей по логину:
                  <input type="text"
                         onChange={event => setFilter(event.target.value)}/>
                </label>
              </form>
              <br/>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Логин</th>
                    <th>Имя</th>
                  </tr>
                </thead>
                <tbody>
                  { users.map((user, index) => (
                    <React.Fragment>
                      { user.username.startsWith(filter) ? (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.first_name + " " + user.last_name}</td>
                        </tr>
                      ) : null }
                    </React.Fragment>
                  )) }
                </tbody>
              </table>
            </div>
          ) : null }
        </React.Fragment>
      ) : <Redirect to="/" /> }
    </React.Fragment>
  );
}

export default Users;
