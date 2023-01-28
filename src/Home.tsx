import Product from './Product';

const style = {
	wrapper: `flex justify-center mx-auto w-full`,
	container: ``,
	banner: `w-full z-[-1] mb-[-280px] gradient-mask-b-20`,
	row: `flex z-[1] mx-[5px]`,
};

function Home() {
	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				<img
					className={style.banner}
					src="https://m.media-amazon.com/images/I/71JNUAnWHTL._SX3000_.jpg"
					alt="banner"
				/>

				<div className={style.row}>
					<Product
						id="00000001"
						title="The Power of Discipline: How to Use Self Control and Mental Toughness to Achieve Your Goals"
						price={24.99}
						image="https://m.media-amazon.com/images/I/414TzYFkpSL._SX322_BO1,204,203,200_.jpg"
						rating={4}
					/>
					<Product
						id="00000002"
						title='Samsung 32" FHD 75Hz LED FreeSync Monitor (LS32B300NWNXGO) - Black'
						price={329.99}
						image="https://m.media-amazon.com/images/I/61SOdB7s9cL._AC_UY327_FMwebp_QL65_.jpg"
						rating={5}
					/>
				</div>
				<div className={style.row}>
					<Product
						id="00000003"
						title="Manlin Movie Props That Looks Real, Fake Dollar Bills 100PCS Totally $10000 Full Print 2 Sided , for Magic/Movie/Videos/TIK Tok, for Birthday Christmas Party Decoration"
						price={19.35}
						image="https://m.media-amazon.com/images/I/61Cl6c-J-EL._AC_SX425_.jpg"
						rating={3}
					/>
					<Product
						id="00000004"
						title='Plastic Chess Pieces RomanLegion 3 3/4", 9,6 cm Black & Gold - Weighted, Felted - Board not included - pieces ONLY'
						price={34.75}
						image="https://m.media-amazon.com/images/I/71SCB7UErdL._AC_SX425_.jpg"
						rating={4}
					/>
					<Product
						id="00000005"
						title="Casio Men's Silver Tone 25 Memory Calculator Databank Watch, Gold, Quartz Watch"
						price={123.99}
						image="https://m.media-amazon.com/images/I/61maGEzFczL._AC_UL1102_.jpg"
						rating={5}
					/>
				</div>
				<div className={style.row}>
					<Product
						id="00000006"
						title="Donald Trump Gold Coin, Gold Plated Collectable Coin and Case Included, 45th President, Certificate of Authenticity Official"
						price={34.19}
						image="https://m.media-amazon.com/images/I/71zkn4UyOPL._AC_SX425_.jpg"
						rating={4}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
