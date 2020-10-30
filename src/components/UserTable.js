import React from 'react';

function UserTable(props) {

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Логин</th>
          <th>Имя пользователя</th>
        </tr>
      </thead>
      <tbody>
        { props.users.map((user, index) => (
          <React.Fragment>
            { user.username.startsWith(props.filter) ? (
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
  );
}

export default UserTable;
