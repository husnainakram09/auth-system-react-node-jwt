import * as React from 'react';
import { useEffect, useState } from 'react';
import { AuthenticatedContext } from '../../Context/AuthenticatedContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { JSONForm, Navbar } from '../../components';

function Dashboard() {
  const { isAuthenticated, setIsAuthenticated } = React.useContext<any>(AuthenticatedContext);
  const [config, setConfig] = useState<any>()
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const Logout = () => {
    setIsAuthenticated(false);
    navigate("/");
    toast.success('User has been logged out!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('login'))
    console.log(token.token)
    const headers = {
      'token':token.token
    }
    axios.get(`${process.env.REACT_APP_API_URL}/dashboard-config`,{
      headers:headers
    }).then((res: any) => {
      console.log('res',res)
      setTimeout(() => {
        setConfig(res.data)
      }, 2000);
    }).catch((err: Error) => {
      console.log(err.message)
      setIsAuthenticated(false)
      localStorage.removeItem('login')
      navigate("/");
    })
  }, [])

  return (
    <div style={{ height: '92%' }} className="dashboardPage d-flex flex-column justify-content-between">

      {/* <div className="row" style={{ position: 'fixed', left: '20px', top: '20px' }}>
          <div className="col">
            <button onClick={Logout} className="btn  btn-danger h3" >
              Logout
            </button>
          </div>
        </div> */}

      <div className="pt-5 pb-2" style={{ flex: 1 }}>
        <div className="d-flex align-items-start justify-content-center">
          {
            !config ?
              <h2 className="text-center">Loading...</h2>
              :
              <JSONForm config={config} />
          }
        </div>
      </div>
      <div style={{ backgroundColor: '#f5f5f5' }} className="py-3 px-4 d-flex align-items-center justify-content-between">
        <div>
          <h6 className='m-0'><small>Please contact us on 6999 696969</small></h6>
          <h6 className='m-0'><small>*For call charges contact your service provider</small></h6>
        </div>
        <div>
          <h6 className='m-0'><small>Ⓒ {year} EXUS Ltd. All rights reserved</small></h6>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
