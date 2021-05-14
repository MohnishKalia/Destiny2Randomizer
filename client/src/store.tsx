import { createContext, useContext, useReducer } from 'react';
import { maps, classes } from './data';

export interface PVPMap {
    name: keyof typeof maps;
    selected: boolean;
}

export interface Player {
    name: string;
    selectedClass: keyof typeof classes;
}

export interface StateContext {
    maps: PVPMap[];
    players: Player[];
}

export interface Store {
    state: StateContext;
    dispatch?: React.Dispatch<Action>;
}

export type Action =
    { type: 'edit_map' } & PVPMap
    | { type: 'add_player' } & Player
    | { type: 'remove_player' } & Pick<Player, 'name'>;

export const reducer = (state: StateContext, action: Action): StateContext => {
    switch (action.type) {
        case 'edit_map': {
            const mapIndex = state.maps.findIndex(map => map.name === action.name);
            state.maps[mapIndex].selected = action.selected;
            return { ...state };
        }
        case 'add_player': {
            state.players.push({ name: action.name, selectedClass: action.selectedClass });
            return { ...state };
        }
        case 'remove_player': {
            const mapIndex = state.players.findIndex(player => player.name === action.name);
            state.players.splice(mapIndex, 1);
            return { ...state };
        }
        default:
            throw new Error('Not among actions');
    }
};

const startingMaps: (keyof typeof maps)[] = [
    'Distant Shore',
    'Endless Vale',
    'Javelin-4',
    'The Anomaly',
    'The Burnout',
    'Wormhaven',
];

const defaultState: StateContext = { maps: [], players: [] };
(Object.keys(maps) as (keyof typeof maps)[]).forEach(map => {
    const obj = { name: map, selected: false };
    if (startingMaps.includes(map))
        obj.selected = true;
    defaultState.maps.push(obj);
});


const myContext = createContext<Store>({ state: defaultState });

export const useStateContext = () => useContext(myContext);

export const StateProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <myContext.Provider value={{ state, dispatch }} children={props.children} />;
};
