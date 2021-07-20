import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';

const mapStateToProps = (state) => ({ auth: state.auth });

const AppRouter = (props) =>
{
  const loggedIn = props.auth.email !== null;

  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/order" exact>
              {
                  !loggedIn ? <Redirect to="/login" /> : <OrderForm/>
              }
          </Route>
          <Route path="/view-orders" exact>
              {
                  !loggedIn ? <Redirect to="/login" /> : <ViewOrders />
              }
      </Route>
    </Router>
  );
}

export default connect(mapStateToProps)(AppRouter);