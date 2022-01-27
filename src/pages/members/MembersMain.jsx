import React from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import checkPermissions from '../../auth/checkperm';

export default function MembersMain() {
  const navigate = useNavigate()
    
  // calling the fetch method on mount
  useEffect(() => {
      !checkPermissions("view-sub") && navigate("/permdenied")
  }, []);

  return  <div>
        <h1>subscriptions management</h1>
        <Link to="add">add member</Link>
        <Link to="list">subscriptions list</Link>
        <Outlet/>

</div>
}
