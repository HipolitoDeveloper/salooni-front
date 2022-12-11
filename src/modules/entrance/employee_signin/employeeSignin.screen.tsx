import React, {useCallback, useState} from "react";
import Layout from "@components/layout/Layout";
import {VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useForm} from "react-hook-form";
import {SEmployeeSignin, TEmployeeSignin} from "@modules/entrance/employee_signin/employeeSignin.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import InputAutocomplete from "@components/form/autocomplete/InputAutocomplete";
import {useSalonsLazyQuery} from "@modules/salon/salon.graphql.generated";
import {TAutocompleteOptions} from "../../../types/form.type";
import {TSalon} from "../../../types/salon.type";


const EmployeeSigninScreen: React.FC = () => {
    const [step, setStep] = useState<'first' | 'second' | 'third'>('first')
    const [salons, setSalons] = useState<TSalon[]>([])
    const [selectedSalon, setSelectedSalon] = useState<TSalon>(null)

    const {control, handleSubmit, formState: {errors}} = useForm<TEmployeeSignin>({
        resolver: zodResolver(SEmployeeSignin)
    });

    const [searchSalons] = useSalonsLazyQuery()
    const sigIn = (formData: TEmployeeSignin) => {
        console.log("formData", formData)
    }

    const getSalons = async (searchTerm: string) => {
        await searchSalons({
            variables: {
                "where": {
                    "name": {
                        "matchesRegex": searchTerm.toLowerCase()
                    }
                }
            },
            onCompleted({salons: {edges}}) {
                setSalons(edges?.map(({node: {name, objectId}}) => ({name, objectId})) ?? [])

            }
        })
    }

    const handleStep = (step: ) => {

    }

    const renderSteps = useCallback(() => {
        const steps = {
            'first': (
                <VStack width='100%'>
                    <InputAutocomplete
                                       onEndEditing={({nativeEvent: {text}}) => getSalons(text)}
                                       suggestionItemLabel='name'
                                       onItemClick={(item) => console.log("item", item)}
                                       name='salon'
                                       options={salons}
                                       placeholder='Procure pelo salão associdado'
                                       width='100%'/>
                </VStack>)
        }

        return steps[step]
    }, [step, salons])

    return (
        <Layout>
            <VStack space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                {renderSteps()}

                <Button variant={'rounded'} size='lg' onPress={handleSubmit(sigIn)}>
                    {signin.VERIFY}
                </Button>

            </VStack>
        </Layout>
    )
}

export default EmployeeSigninScreen
