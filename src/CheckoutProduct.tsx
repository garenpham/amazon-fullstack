import { IItem } from './Product';
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({ id, image, title, price, rating }: IItem) => {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromBasket = () => {
		/**
		 * Remove the item from the basket
		 */
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id,
		});
	};

	const style = {
		wrapper: `flex my-[20px] hover:shadow active:scale-95 transform transition duration-200 ease-in`,
		image: `object-contain w-[180px] h-[180px]`, // object-left
		info: `pl-[20px]`,
		title: `text-[17px] font-[800]`,
		price: ``,
		rating: `flex`,
		btn: `bg-[#f0c14b] mt-[10px] border-[1px] border-solid border-t-[#a88734] border-x-[#9c7e31] border-b-[#846a29] text-[#111] px-[8px] hover:scale-105 hover:bg-[#f4cf71] transform transition duration-200 ease-in`,
	};
	return (
		<div className={style.wrapper}>
			<img
				src={image}
				alt="product image"
				className={style.image}
			/>
			<div className={style.info}>
				<p className={style.title}>{title}</p>
				<p className={style.price}>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className={style.rating}>
					{Array(rating)
						.fill(undefined)
						.map((_, i) => (
							<p key={i}>⭐</p>
						))}
				</div>
				<button
					onClick={removeFromBasket}
					className={style.btn}>
					Remove from Basket
				</button>
			</div>
		</div>
	);
};
export default CheckoutProduct;
