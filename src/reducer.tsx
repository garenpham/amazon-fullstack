import { IItem } from './Product';

export const initialState = {
	basket: [],
	user: null,
};

/**
 * Selecter
 */

export interface IState {
	basket: IItem[];
}

export interface IAction {
	type: string;
	id: string;
	item: IItem;
	user: {};
}

export interface IReducer {
	(state: IState, action: IAction): IState;
}

export const getBasketTotal = (basket: []) =>
	basket?.reduce((amount: number, item: IItem) => item.price + amount, 0);
const reducer = (state: IState, action: IAction) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case 'REMOVE_FROM_BASKET':
			const idx = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id,
			);
			let newBasket = [...state.basket];

			if (idx >= 0) {
				newBasket.splice(idx, 1);
			} else {
				console.warn(
					`Can't remove (id:${action.id}). Please reload the browser!`,
				);
			}

			return { ...state, basket: newBasket };

		case 'EMPTY_BASKET':
			return {
				...state,
				basket: [],
			};

		case 'SET_USER':
			return { ...state, user: action.user };

		default:
			return state;
	}
};

export default reducer;
