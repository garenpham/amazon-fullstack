import {
	createContext,
	ReducerWithoutAction,
	useContext,
	useReducer,
} from 'react';
import { IItem } from './Product';
import { IReducer, IState } from './reducer';

/**
 * Prepares the data layer
 */
export const StateContext = createContext<any>([]);

/**
 * Wrapping and providing the Data layer
 */

interface StateProvider {
	reducer: IReducer;
	initialState: IState;
	children: React.ReactNode;
}
export const StateProvider = ({
	reducer,
	initialState,
	children,
}: StateProvider) => {
	return (
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</StateContext.Provider>
	);
};

/**
 * Pull information from the data layer
 */
export const useStateValue = () => useContext(StateContext);
