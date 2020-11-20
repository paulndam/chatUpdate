import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Join.css';

const Join = () => {
  const [name, setname] = useState ('');
  const [room, setroom] = useState ('');

  return (
    <div className="container-fluid">

      <div className="containerjoin">
        <h3 className="header">
          Join <span className="typing">
            Bluechat
          </span>
        </h3>

        <div>
          <input
            placeholder="Name"
            className="join"
            type="text"
            onChange={e => setname (e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Room"
            className="join"
            type="text"
            onChange={e => setroom (e.target.value)}
          />
        </div>;

        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>

          <button className="btn btn-warning btn-md mt-20" type="submit">
            sign in
          </button>

        </Link>

        <footer>
          <span>
            Created By
            {' '}
            <a href="#">Paul Ndam</a>
            {' '}
            |
            {' '}
            <span className="far fa-copyright"> 2020 All Rights Reserved.</span>
            {' '}
          </span>
        </footer>

      </div>

    </div>
  );
};

export default Join;
