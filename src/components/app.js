import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Gateway from '../routes/gateway';
import Detail from '../routes/detail';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<Home path="/home" />
			<Detail path="/detail/:_id" />
			<Gateway path="/gateway/" action="create"/>
			<Gateway path="/gateway/:action" />
		</Router>
	</div>
)

export default App;
