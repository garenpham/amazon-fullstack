import { useStateValue } from './StateProvider';

const style = {
	wrapper: `flex flex-col items-center justify-end m-[16px] p-[20px] w-full max-h-[400px] min-w-[100px] bg-white z-[1] hover:scale-[101%] hover:shadow-xl transition transform duration-200 ease-in-out`,
	productImg: `max-h-[200px] w-full object-contain mb-[15px]`,
	price: `mt-[5px]`,
	rating: `flex`,
	info: `h-[100px] mb-[15px]`,
	btn: `bg-[#f0c14b] mt-[10px] border border-solid border-t-[#a88734] border-x-[#9c7e31] border-b-[#846a29] text-[#111] px-[8px] active:scale-95 transform transition duration-100 ease-in`,
};

export interface IItem {
	id: string;
	title: string;
	image: string;
	price: number;
	rating: number;
}

function Product({ id, title, image, price, rating }: IItem) {
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		/**
		 * Dispatch items into the data layer
		 */
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};

	return (
		<div className={style.wrapper}>
			<div className={style.info}>
				<p>{title}</p>
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
			</div>

			<img
				className={style.productImg}
				src={image}
				alt=""
			/>

			<button
				onClick={addToBasket}
				className={style.btn}>
				Add to Basket
			</button>
		</div>
	);
}

export default Product;
