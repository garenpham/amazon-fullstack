import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

const style = {
	wrapper: `sticky top-0 h-[60px] flex items-center bg-[#131921] z-[100]`,
	logo: `w-[100px] object-contain mt-[18px] mb-0 mx-[20px]`,
	search: `flex flex-1 items-center rounded-[24px]`,
	searchInput: `h-[12px] w-full border-none p-[10px]`,
	searchIcon: `p-[4px] !h-[20.22px] bg-[#cd9042]`,
	nav: `flex justify-evenly`,
	option: `flex flex-col text-white py-2 px-3 border-[1px] border-transparent hover:border-white hover:rounded-[2px] hover:py-2 hover:px-3"`,
	optionLineOne: `text-[10px] capitalize text-gray-300`,
	optionLineTwo: `text-[13px] font-[800]`,
	basket: `flex items-center text-white mt-4 ml-2`,
	basketCount: `mx-[10px]`,
};

function Header() {
	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<div className={style.wrapper}>
			<Link to="/">
				<img
					className={style.logo}
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="logo"
				/>
			</Link>

			<div className={style.search}>
				<input
					type="text"
					className={style.searchInput}
				/>
				<SearchIcon className={style.searchIcon} />
			</div>

			<div className={style.nav}>
				<Link to="/login">
					<div
						onClick={handleAuthentication}
						className={[style.option, 'ml-3'].join(' ')}>
						<span className={style.optionLineOne}>
							Hello {user ? `${user.email.match(/^.+(?=@)/)}` : 'Guest'}
						</span>
						<span className={style.optionLineTwo}>
							Sign {user ? 'out' : 'in'}
						</span>
					</div>
				</Link>

				<div className={style.option}>
					<span className={style.optionLineOne}>Returns</span>
					<span className={style.optionLineTwo}>& Orders</span>
				</div>
				<div className={style.option}>
					<span className={style.optionLineOne}>Your</span>
					<span className={style.optionLineTwo}>Prime</span>
				</div>

				<Link to="/checkout">
					<div className={style.basket}>
						<ShoppingBasketIcon />
						<span
							className={[style.optionLineTwo, style.basketCount].join(' ')}>
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
