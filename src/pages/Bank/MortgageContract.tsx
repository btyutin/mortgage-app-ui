import * as React from 'react';
import {observer} from "mobx-react";
import {Box, Flex, Link, Spinner, Stack, Text} from "@chakra-ui/react";
import {ContractCardFull} from "../../components/ContractCardFull";
import {InsurancePolicies} from "../../components/InsurancePolicies";
import {Link as RouterLink} from 'react-router-dom';
import {RouteChildrenProps} from "react-router";
import {useService} from "../../core/decorators/service";
import {MortgageAgreement} from "../../services/MortgageAgreement";

export const MortgageContract = observer(function MortgageContract(props: RouteChildrenProps<{ id: string }>) {
    const mortgageAgreement = useService(MortgageAgreement)


    React.useEffect(() => {
        const id = props.match.params.id.replace('|', '/')

        mortgageAgreement.getMortgage(id)
    }, [])

    if (mortgageAgreement.requestStatus === 'pending') {
        return (
            <Flex>
                <Spinner/>
            </Flex>
        )
    }

    if (!mortgageAgreement.mortgage) {
        return (
            <Flex>
                <Text fontWeight={600} fonsSize={18}>Ипотечный договор не найден</Text>
            </Flex>
        )
    }


    return (
        <Stack width={'100%'} spacing={'30px'}>
            <Link as={RouterLink} to={'/contracts'}>
                <Flex align={'center'}>
                    <Box marginRight={'18px'}>
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 1.5L1.5 6.5L6.5 11.5" stroke="#170A4A" strokeWidth="2"
                                  strokeLinejoin="round"/>
                        </svg>
                    </Box>
                    К списку договоров
                </Flex>

            </Link>
            <ContractCardFull {...mortgageAgreement.mortgage}/>

            <InsurancePolicies policesList={mortgageAgreement.polices}/>
        </Stack>
    );
})