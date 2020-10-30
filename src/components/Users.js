import React, { useState, useEffect } from 'react';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';

import UserTable from './UserTable';

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
            <div>
              <h1>Список пользователей</h1><br/>
              <form>
                <div className="form-group row">
                  <label htmlFor="filter" className="col-sm-2 col-form-label control-label">
                    Фильтровать пользователей по логину:
                  </label>
                  <div class="col-sm-2 lower">
                    <input type="text" id="filter" className="form-control"
                            onChange={event => setFilter(event.target.value)}/>
                  </div>
                </div>
              </form>
              <br/>
              <UserTable users={users} filter={filter}/>
            </div>
          ) : null }
        </React.Fragment>
      ) : <Redirect to="/" /> }
    </React.Fragment>
  );
}

export default Users;
