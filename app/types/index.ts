import type { NativeStackScreenProps } from "@react-navigation/native-stack"

type RootStackParamList = {
    Home: undefined,
    Signin: undefined,
    Signup: undefined,
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, 'Signin'>;
