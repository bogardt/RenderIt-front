import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();
cookies.set('jwt', '');

const Logout = () => <Redirect to="/login" />;

export default Logout;
