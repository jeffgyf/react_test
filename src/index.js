import React from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import './index.css';

class Logo extends React.Component {
  render() {
    return <div className="logo">
                <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" alt="Logo" />
              </div>
  }
}


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  
  render() {
    return (
      <div className='LoginPanel'>
        <Logo/>
        <form>
          <TextField placeholder="Username" />
          <TextField type="password" placeholder="Password" />
          <PrimaryButton>Login</PrimaryButton>
        </form>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <LoginPage />,
  document.getElementById('root')
);

