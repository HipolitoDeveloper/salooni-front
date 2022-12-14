import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageKeys} from "@common/asyncstorage.constants";
import {TUser} from "../../types/user.type";
import {TEmployee} from "../../types/employee.type";
import {TSalon} from "../../types/salon.type";
import {useEffect, useState} from "react";
import {LogInMutation} from "@modules/entrance/entrance.graphql.generated";

type TSession = {
    user: TUser;
    salon: TSalon;
    employee: TEmployee
    sessionToken: string;
    logged: boolean
}


const useSession = () => {
    const [session, setSession] = useState<TSession>(null)

    useEffect(() => {
        (async () => {
            // await AsyncStorage.removeItem(StorageKeys.sessionToken)
            await sessionSetter();
        })()

    }, [])

    const handleSession = ({viewer: {user, sessionToken}}: LogInMutation['logIn']) => {
        (async () => {
            const newSessionToken = sessionToken;
            const newUser ={
                id: user.objectId,
                email: user.email,
                accType: user.acc_type,
                username: user.username,
                firstAcces: user.first_access
            }

            const {employee_id: employee} = user;
            const newEmployee = {
                id: employee.objectId,
                tel: employee.tel,
                name: employee.name
            }

            const {salon_id: salon} = employee;
            const newSalon ={
                id: employee.objectId,
                name: salon.name
            }

            await AsyncStorage.setItem(StorageKeys.user, JSON.stringify(newUser))
            await AsyncStorage.setItem(StorageKeys.salon, JSON.stringify(newSalon))
            await AsyncStorage.setItem(StorageKeys.employee, JSON.stringify(newEmployee))
            await AsyncStorage.setItem(StorageKeys.sessionToken, sessionToken)

            await sessionSetter(newSessionToken, newUser, newEmployee, newSalon)
        })();
    }

    const sessionSetter = async (sessionToken?, user?, employee?, salon?) => {
        setSession({
            user: user ?? JSON.parse(await AsyncStorage.getItem(StorageKeys.user)),
            salon: salon ?? JSON.parse(await AsyncStorage.getItem(StorageKeys.salon)),
            employee: employee ?? JSON.parse(await AsyncStorage.getItem(StorageKeys.user)),
            sessionToken: sessionToken ?? await AsyncStorage.getItem(StorageKeys.sessionToken),
            logged: sessionToken ? !!sessionToken : !!await AsyncStorage.getItem(StorageKeys.sessionToken)
        })
    }


    return {handleSession, session}
}

export default useSession

