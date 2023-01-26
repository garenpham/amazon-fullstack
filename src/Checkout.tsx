import CheckoutProduct from './CheckoutProduct';
import { IItem } from './Product';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

const style = {
	wrapper: `flex p-[20px] bg-white h-max`,
	ad: `w-full mb-[10px]`,
	title: `mr-[10px] p-[10px] border-b border-solid border-[#d3d3d3] font-bold text-xl md:text-3xl`,
	left: ``,
	right: ``,
};

function Checkout() {
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className={style.wrapper}>
			<div className={style.left}>
				<img
					className={style.ad}
					src="https://images-na.ssl-images-amazon.com/images/G/15/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Amazon_Outlet_Banner_Desktop_1500x150_CA_EN.jpg"
					alt="advertisement"
				/>

				<div>
					<h2 className={style.title}>Your shopping Basket</h2>
					{basket.map(({ id, title, image, price, rating }: IItem) => (
						<CheckoutProduct
							id={id}
							title={title}
							image={image}
							price={price}
							rating={rating}
						/>
					))}
				</div>
			</div>

			<div className={style.right}>
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
