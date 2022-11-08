import PocketBase, { BaseAuthStore, Admin, User } from 'pocketbase';
import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage, RESET } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PB_URL } from '@env';

const TOKEN_KEY = "@pb_token";
const MODEL_KEY = "@pb_model";

class AsyncStorageAuthStore extends BaseAuthStore {
  constructor() {
    super();
  }

  save(token: string, model: Admin|User|null) {
    super.save(token, model);

    const save = async () => {
      console.log('pocketbase::save', token, model);
        await AsyncStorage.setItem(TOKEN_KEY, token)
        await AsyncStorage.setItem(MODEL_KEY, JSON.stringify(model))
    }
    save();
  }

  clear() {
    super.clear(); // this will reset the local baseToken and baseModel props

    const clear = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(MODEL_KEY);
    }
    clear();
  }
}

const pocketbase = new PocketBase(PB_URL);

const storage = createJSONStorage(() => AsyncStorage);
storage.delayInit = true;

export const tokenAtom = atomWithStorage<string>(TOKEN_KEY, '', storage);
export const userAtom = atomWithStorage<Admin|User|null>(MODEL_KEY, null, storage);

export const usePocketbase = () => {
    return pocketbase;
}
