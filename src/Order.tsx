import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import { IItem } from './Product';

function Order({ order }: any) {
	const style: any = {
		wrapper: `p-[40px] my-[20px] border-[1px] border-solid border-gray-200 bg-white relative`,
		id: `absolute top-[40px] right-[20px]`,
		total: `text-xl font-[600] text-right`,
	};
	return (
		<div className={style.wrapper}>
			<h2 className="text-2xl font-bold">Order Placed:</h2>
			<p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
			<p className={style.id}>
				<small>ORDER # {order.id}</small>
			</p>
			{order.data.basket?.map(({ id, title, image, price, rating }: IItem) => (
				<CheckoutProduct
					id={id}
					title={title}
					image={image}
					price={price}
					rating={rating}
					hideButton
				/>
			))}
			<CurrencyFormat
				renderText={(value) => (
					<h3 className={style.total}>Order Total: {value}</h3>
				)}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
		</div>
	);
}
export default Order;
