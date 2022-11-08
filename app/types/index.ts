import type { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
    Dashboard: undefined,
    Signin: undefined,
    Signup: undefined,
}


export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, 'Signin'>;
