import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(
	'pk_test_51MaYh4IsNf8V7rUEnSyjqIVvjpeaoUhbxUAK0l9hMcMaC2BYbId1h842XqXy3nSkgS9JF0WjspOzDoUPFFtb2Kt200PSjP09lm',
);

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log(authUser);
				dispatch({ type: 'SET_USER', user: authUser });
			} else {
				dispatch({ type: 'SET_USER', user: null });
			}
		});
	}, []);

	return (
		// BEM naming convention
		<Router>
			<div className="app">
				<Routes>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="checkout"
						element={[<Header />, <Checkout />]}
					/>
					<Route
						path="payment"
						element={[
							<Header />,
							<Elements stripe={promise}>
								<Payment />
							</Elements>,
						]}
					/>
					<Route
						path="orders"
						element={[<Header />, <Orders />]}
					/>
					<Route
						path="/"
						element={[<Header />, <Home />]}
						// use <></> for multiple elements
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
