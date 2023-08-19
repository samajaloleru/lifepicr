import React from 'react';
import { createRoot } from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { BrowserRouter as Router } from 'react-router-dom';

import { config } from './utils/config';

import App from './App';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <GoogleOAuthProvider clientId={config.google.token}>
        <Router>
            <App />
        </Router>,
    </GoogleOAuthProvider>
);