import {Center, Heading, HStack, Text, VStack} from "native-base";
import InputAutocomplete from "@components/form/autocomplete/InputAutocomplete";
import {TSalon} from "../../../types/salon.type";
import React, {useState} from "react";
import {useSalonsLazyQuery} from "@modules/salon/salon.graphql.generated";
import {signin, signup} from "@common/typograph";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {useForm} from "react-hook-form";
import {
    SEmployeeSignin, SEmployeeSignup,
    TEmployeeSignin,
    TEmployeeSignup
} from "@modules/entrance/employee_signin/employeeSignin.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {TUserSignin} from "@modules/entrance/entrance.schema";

interface IEmployeeSignup {
}

const EmployeeSignup: React.FC<IEmployeeSignup> = () => {
    const [salons, setSalons] = useState<TSalon[]>([])
    const [selectedSalon, setSelectedSalon] = useState<TSalon>({name: "teste", objectId: "123"})

    const {control, handleSubmit, formState: {errors}} = useForm<TEmployeeSignup>({
        resolver: zodResolver(SEmployeeSignup)
    });

    const [searchSalons] = useSalonsLazyQuery()

    const sigIn = (formData: TUserSignin) => {
        console.log("formData", formData)
    }
    const getSalons = async (searchTerm: string) => {
        await searchSalons({
            variables: {
                "where": {
                    "name": {
                        "matchesRegex": searchTerm === "" ? "-" : searchTerm.toLowerCase()
                    }
                }
            },
            onCompleted({salons: {edges}}) {
                setSalons(edges?.map(({node: {name, objectId}}) => ({name, objectId})) ?? [])

            }
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
                    <Input control={control} name='email' placeholder='E-mail'/>

                    <Input control={control} name='tel' placeholder='Telefone'/>

                    <Input control={control} name='email' placeholder='Senha'/>

                    <Center>
                        <Button variant='rounded'>
                            {signup.SIGNUP}
                        </Button>
                    </Center>
                </VStack>

            )}


        </VStack>
    )
}

export default EmployeeSignup