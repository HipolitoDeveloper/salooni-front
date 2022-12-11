import {Center, Heading, HStack, Text, VStack} from "native-base";
import InputAutocomplete from "@components/form/autocomplete/InputAutocomplete";
import {TSalon} from "../../../types/salon.type";
import React, {useState} from "react";
import {useSalonsLazyQuery} from "@modules/salon/salon.graphql.generated";
import {signin, signup, successMessages} from "@common/typograph";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {useForm} from "react-hook-form";
import {SEmployeeSignup, TEmployeeSignup} from "@modules/entrance/employee_signin/employeeSignin.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallCloudCodeMutation} from "@modules/cloud/cloud.graphql.generated";
import {TGraphQLError} from "../../../types/graphQL.type";
import {useLayout} from "@hooks/layout/useLayout";
import {CloudCodeFunction} from "../../../schema";
import {EUserAccType} from "../../../types/user.type";

interface IEmployeeSignup {
}

const defaultValue =  {
    "email": "Teste@gmail.com",
    "employeeName": "Teste",
    "password": "Jsjsjsj",
    "tel": "17727273",
}


const EmployeeSignup: React.FC<IEmployeeSignup> = () => {
    const {handleGraphQLError, handleSuccessDialog, handleLoading} = useLayout();
    const [salons, setSalons] = useState<TSalon[]>([])
    const [selectedSalon, setSelectedSalon] = useState<TSalon>()

    const {control, handleSubmit, formState: {errors}} = useForm<TEmployeeSignup>({
        resolver: zodResolver(SEmployeeSignup),
        defaultValues: defaultValue
    });

    const [callCloud] = useCallCloudCodeMutation({
        onCompleted({callCloudCode: {result: {data}}}) {
            handleSuccessDialog(successMessages.SIGNUP_SUCCESS)
            handleLoading(false)
        },
        onError(error) {
            handleGraphQLError(JSON.parse(JSON.stringify(error)) as TGraphQLError)
            handleLoading(false)
        }
    })

    const [searchSalons] = useSalonsLazyQuery()

    const getSalons = async (searchTerm: string) => {
        await searchSalons({
            variables: {
                "where": {
                    "name": {
                        "matchesRegex": searchTerm === "" ? "-" : searchTerm.toLowerCase().trim()
                    }
                }
            },
            onCompleted({salons: {edges}}) {
                setSalons(edges?.map(({node: {name, objectId}}) => ({name, objectId})) ?? [])

            }
        })
    }

    const signUp = async (formData: TEmployeeSignup) => {
        handleLoading(true)
        await callCloud({
            variables: {
                input: {
                    functionName: CloudCodeFunction.Signup,
                    params: {
                        ...formData,
                        salonName: formData.salon.name,
                        salonObjectID: formData.salon.objectId,
                        acctype: EUserAccType.EMP
                    }
                }
            },
        })
    }
    return (
        <VStack width='100%' space='20px'>
            {!selectedSalon ? (
                <InputAutocomplete
                    onEndEditing={({nativeEvent: {text}}) => getSalons(text)}
                    suggestionItemLabel='name'
                    onItemClick={(item: TSalon) => {
                        setSelectedSalon(item);
                        setSalons([])
                    }}
                    control={control}
                    name='salon'
                    options={salons}
                    placeholder='Procure pelo salão associdado'
                    width='100%'/>
            ) : (
                <VStack space='20px'>
                    <HStack>
                        <Heading fontSize='sm'>{signin.SELECTED_SALON}</Heading>
                        <Text color='purple.1000' fontWeight='bold'>{selectedSalon.name}</Text>
                    </HStack>

                    <Input control={control} name='employeeName' placeholder='Nome'/>

                    <Input control={control} name='email' placeholder='E-mail'/>

                    <Input control={control} name='tel' placeholder='Telefone'/>

                    <Input control={control} name='password' placeholder='Senha'/>

                    <Center>
                        <Button variant='rounded' onPress={handleSubmit(signUp)}>
                            {signup.SIGNUP}
                        </Button>
                    </Center>
                </VStack>

            )}


        </VStack>
    )
}

export default EmployeeSignup
