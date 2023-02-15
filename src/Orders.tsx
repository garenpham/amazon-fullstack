import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
	const [{ basket, user }, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			const dbRef = collection(db, 'users', user?.uid, 'orders');
			const q = query(dbRef, orderBy('created', 'desc'));

			const snapshot = onSnapshot(q, (querySnapShot: any) => {
				setOrders(
					querySnapShot.docs.map((doc: any) => ({
						id: doc.id,
						data: doc.data(),
					})),
				);
			});
		} else {
			setOrders([]);
		}
	}, [user]);

	const style: any = {
		wrapper: `pt-[20px] px-[80px]`,
		title: `text-4xl font-bold my-[30px]`,
	};
	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Your Orders</h1>
			<div className={style.order}>
				{orders?.map((order) => (
					<Order order={order} />
				))}
			</div>
		</div>
	);
}
export default Orders;
