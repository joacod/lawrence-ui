import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header';
import { Chat } from './pages/Chat/index';
import { NotFound } from './pages/_404';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<div className="flex flex-col h-screen overflow-hidden">
				<Header />
				<main className="flex-1 min-h-0">
					<Router>
						<Route path="/" component={Chat} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</div>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
