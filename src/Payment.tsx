import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { IItem } from './Product';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState(false);

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(null);
	const [clientSecret, setClientSecret] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		//generate stripe secret which enables to charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',
				// Stripe expects the total in a currency's smallest subunit
				url: `/payments/create?total=${
					// Subunit value must be greater than 0 (Stripe requirement)
					(getBasketTotal(basket) > 0 ? getBasketTotal(basket) : 1) * 100
				}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	const handleSubmit = async (event: any) => {
		// Stripe payment processing
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			?.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements?.getElement(CardElement)!, // "!" -> Non-null assertion operator
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				const dbRef = doc(db, 'users', user?.uid, 'orders', paymentIntent!.id);

				setDoc(dbRef, {
					basket: basket,
					amount: paymentIntent?.amount,
					created: paymentIntent?.created,
				});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: 'EMPTY_BASKET',
				});

				navigate('/orders');
			});
	};

	const handleChange = (event: any) => {
		/**
		 * Listen for all changes in the Card Element
		 * and display any errors as the customer types their card details
		 */
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const style = {
		wrapper: `bg-white`,
		container: ``,
		container__title: `text-4xl text-center p-[10px] font-[600] bg-[#eaeded]`,
		section: `flex p-[20px] mx-[20px] gap-4 border-y-[1px] border-solid border-gray-200`,
		title: `flex-[0.25] text-xl font-[700]`,
		address: `flex-[0.75]`,
		items: `flex-[0.75]`,
		details: `flex-[0.75]`,
		details__form: `max-w-[400px]`,
		details__title: `text-xl font-semibold pb-[20px]`,
		buyBtn: `w-full border-[1px] border-solid px-4 py-[0.1rem] rounded-lg bg-[#f0c14b] border-t-[#a88734] border-b-[#9c7e31] border-x-[#846a29] disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 active:scale-95 transition transform duration-100 ease-in`,
		priceContainer: ``,
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
						<form
							className={style.details__form}
							onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className={style.priceContainer}>
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h4 className={style.details__title}>
												Order Total: {value}
											</h4>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button
									className={style.buyBtn}
									disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>
							</div>

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Payment;
