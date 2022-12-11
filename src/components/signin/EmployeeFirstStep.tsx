import {VStack} from "native-base";
import InputAutocomplete from "@components/form/autocomplete/InputAutocomplete";
import {TSalon} from "../../types/salon.type";
import React, {useState} from "react";
import {TSignInSteps} from "../../types/signin.type";
import {useSalonsLazyQuery} from "@modules/salon/salon.graphql.generated";

interface IEmployeeFirstStep {
    handleStep(step: TSignInSteps): void;

    setSelectedSalon(salon: TSalon): void;
}

const EmployeeFirstStep: React.FC<IEmployeeFirstStep> = ({handleStep, setSelectedSalon}) => {
    const [salons, setSalons] = useState<TSalon[]>([])

    const [searchSalons] = useSalonsLazyQuery()

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
        <VStack width='100%'>
            <InputAutocomplete
                onEndEditing={({nativeEvent: {text}}) => getSalons(text)}
                suggestionItemLabel='name'
                onItemClick={(item: TSalon) => {
                    setSelectedSalon(item);
                    handleStep('second');
                    setSalons([])

                }}
                name='salon'
                options={salons}
                placeholder='Procure pelo salão associdado'
                width='100%'/>
        </VStack>
    )
}

export default EmployeeFirstStep