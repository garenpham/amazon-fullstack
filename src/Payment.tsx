import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { IItem } from './Product';
import { useStateValue } from './StateProvider';

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();

	const style = {
		wrapper: `bg-white`,
		container: ``,
		container__title: `text-4xl text-center p-[10px] font-[600] bg-[#eaeded]`,
		section: `flex p-[20px] mx-[20px] gap-4 border-y-[1px] border-solid border-gray-200`,
		title: `flex-[0.25] text-xl font-[700]`,
		address: `flex-[0.75]`,
		items: `flex-[0.75]`,
		details: ``,
	};
	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				<h1 className={style.container__title}>
					Checkout (
					<Link
						to="/checkout"
						className="text-purple-900">
						{basket?.length} items
					</Link>
					)
				</h1>
				{/**
				 * Review items
				 */}
				<div className={style.section}>
					<div className={style.title}>
						<h3>Review items and delivery</h3>
					</div>
					<div className={style.items}>
						{basket.map(({ id, image, title, price, rating }: IItem) => (
							<CheckoutProduct
								id={id}
								image={image}
								title={title}
								price={price}
								rating={rating}
							/>
						))}
					</div>
				</div>
				{/**
				 * Payment section: Delivery address
				 */}
				<div className={[style.section, 'border-t-0'].join(' ')}>
					<div className={style.title}>
						<h3>Delivery Address</h3>
					</div>
					<div className={style.address}>
						<p>{user?.email}</p>
						<p>555 Seymour St</p>
						<p>Vancouver, BC</p>
					</div>
				</div>
				{/**
				 * Payment method
				 */}
				<div className={[style.section, 'border-b-0'].join(' ')}>
					<div className={style.title}>
						<h3>Payment Method</h3>
					</div>
					<div className={style.details}>
						{/**
						 * Stripe integration
						 */}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Payment;
