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
    teams: boolean;
}

export interface Store {
    state: StateContext;
    dispatch?: React.Dispatch<Action>;
}

export type Action =
    { type: 'edit_map' } & PVPMap
    | { type: 'add_player' }
    | { type: 'edit_player' } & Player & { index: number }
    | { type: 'remove_player' } & { index: number }
    | { type: 'edit_teams' } & { selected: boolean };

export const reducer = (state: StateContext, action: Action): StateContext => {
    switch (action.type) {
        case 'edit_map': {
            const mapIndex = state.maps.findIndex(map => map.name === action.name);
            state.maps[mapIndex].selected = action.selected;
            return { ...state };
        }
        case 'add_player': {
            state.players.push({ name: '', selectedClass: 'hunter' });
            return { ...state };
        }
        case 'edit_player': {
            state.players[action.index] = { name: action.name, selectedClass: action.selectedClass };
            return { ...state };
        }
        case 'remove_player': {
            state.players.splice(action.index, 1);
            return { ...state };
        }
        case 'edit_teams': {
            state.teams = action.selected;
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

const defaultState: StateContext = { maps: [], players: [], teams: true };
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
