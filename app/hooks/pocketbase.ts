import PocketBase, { Admin, User } from 'pocketbase';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PB_URL } from '@env';

const TOKEN_KEY = "@pb_token";
const MODEL_KEY = "@pb_model";

const pocketbase = new PocketBase(PB_URL);
const storage = createJSONStorage(() => AsyncStorage);

export const tokenAtom = atomWithStorage<string>(TOKEN_KEY, '', storage);
export const userAtom = atomWithStorage<Admin|User|null>(MODEL_KEY, null, storage);

export const usePocketbase = () => {
    return pocketbase;
}
