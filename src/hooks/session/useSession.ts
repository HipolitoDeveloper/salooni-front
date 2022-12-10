import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageKeys} from "@common/asyncstorage.constants";
import {TUser} from "@interfaces/User";
import {TEmployee} from "@interfaces/Employee";
import {TSalon} from "@interfaces/Salon";
import Reactotron from "reactotron-react-native";
import {useEffect, useState} from "react";
import {LogInMutation} from "@modules/entrance/entrance.graphql.generated";

interface ISession {
    user: TUser;
    salon: TSalon;
    employee: TEmployee
    sessionToken: string;
}


const useSession = () => {
    const [session, setSession] = useState<ISession>(null)

    useEffect(() => {
        (async () => {
            setSession({
                user: JSON.parse(await AsyncStorage.getItem(StorageKeys.user)),
                salon: JSON.parse(await AsyncStorage.getItem(StorageKeys.salon)),
                employee: JSON.parse(await AsyncStorage.getItem(StorageKeys.user)),
                sessionToken: await AsyncStorage.getItem(StorageKeys.sessionToken)
            })
        })()

    }, [])

    const handleSession = ({viewer: {user, sessionToken}}: LogInMutation['logIn']) => {
        (async () => {
            await AsyncStorage.setItem('session_storage', sessionToken)
            await AsyncStorage.setItem('user', JSON.stringify({
                id: user.objectId,
                email: user.email,
                accType: user.acc_type,
                username: user.username,
                firstAcces: user.first_access
            }))

            const {employee_id: employee} = user;
            await AsyncStorage.setItem('employee', JSON.stringify({
                id: employee.objectId,
                email: employee.email,
                cnpj: employee.cnpj,
                tel: employee.tel,
                name: employee.name
            }))

            const {salon_id: salon} = employee;
            await AsyncStorage.setItem('salon', JSON.stringify({
                id: employee.objectId,
                cnpj: salon.cnpj,
                name: salon.name
            }))
        })();
    }


    return {handleSession , session}
}

export default useSession

