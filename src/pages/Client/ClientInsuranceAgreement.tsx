import * as React from 'react';
import {observer} from "mobx-react";
import {Box, Flex, Grid, Heading, Link, Stack, Tag, TagLabel, Text} from "@chakra-ui/react";
import {useService} from "../../core/decorators/service";
import {AuthService} from "../../services/AuthService";
import {InsuranceAgreements} from "../../services/InsuranceAgreements";
import {InsuranceOfferProcess} from "../../services/InsuranceOfferProcess";
import {useTransaction} from "../../hooks/tx";
import {InsLogo} from "../../components/InsLogos";
import {Button} from "../../ui/Button";
import {useHistory} from "react-router-dom";

export const ClientInsuranceAgreement = observer(() => {
    const authService = useService(AuthService)
    const insuranceAgreements = useService(InsuranceAgreements)

    React.useEffect(() => {
        insuranceAgreements.getList()
    }, [])

    const policiesToAccept = insuranceAgreements.list.filter(i => i.status === 'WAIT_CLIENT' || i.status === 'ACTIVE')

    return (
        <Stack width={'100%'} padding={8} spacing={'36px'} align={'center'}>
            <Flex maxW={'850px'} justify={'flex-start'} width={'100%'}>
                <Link onClick={() => authService.clear()}>Выход</Link>

            </Flex>

            <Stack width={'100%'} maxW={'850px'} spacing={'16px'}>
                <Heading>Ожидайте ответа от страховых компаний</Heading>

                <Text>Это может занять несколько часов</Text>
            </Stack>


            <Stack width={'100%'} maxW={'850px'} spacing={'16px'}>
                <Stack spacing={'24px'}>
                    <Text fontWeight={700} fontSize={18}>
                        <Flex>
                            <Box padding={'3px 16px 3px 0'}><Icon type={'PROPERTY'}/></Box>

                            Страхование недвижимости
                        </Flex>
                    </Text>

                    <Stack spacing={'24px'}>
                        {policiesToAccept.filter(r => r.risk === 'PROPERTY').map(p => {
                            return <InsuranceCard {...p as any}/>
                        })}
                    </Stack>
                </Stack>

                <Stack spacing={'24px'}>
                    <Text fontWeight={700} fontSize={18}>
                        <Flex>
                            <Box padding={'3px 16px 3px 0'}><Icon type={'LIFE'}/></Box>

                            Страхование жизни
                        </Flex>
                    </Text>

                    <Stack spacing={'24px'}>
                        {policiesToAccept.filter(r => r.risk === 'LIFE').map(p => {
                            return <InsuranceCard {...p as any}/>
                        })}
                    </Stack>
                </Stack>


            </Stack>
        </Stack>

    );
})


const MAPPING_ICON = {
    TITUL: () => '*',
    PROPERTY: DomIcon,
    LIFE: HeartIcon
}

function Icon({type}: { type: string }) {
    const Cmp = MAPPING_ICON[type]
    return <Cmp/>
}

function DomIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.780536 9.95391C0.950417 10.0378 1.1531 10.0184 1.30404 9.90391L2.00404 9.37891V16.5039C2.00404 17.0562 2.45175 17.5039 3.00404 17.5039H15.004C15.5563 17.5039 16.004 17.0562 16.004 16.5039V9.37891L16.704 9.90391C16.8555 10.0175 17.0583 10.0358 17.2276 9.95112C17.397 9.86642 17.504 9.69329 17.504 9.50391V7.00391C17.504 6.84653 17.4299 6.69833 17.304 6.60391L9.30404 0.603906C9.12626 0.470573 8.88181 0.470573 8.70404 0.603906L5.00404 3.37891V2.50391C5.00404 1.95162 4.55632 1.50391 4.00404 1.50391H3.00404C2.45175 1.50391 2.00404 1.95162 2.00404 2.50391V5.62891L0.704036 6.60391C0.578133 6.69833 0.504036 6.84653 0.504036 7.00391V9.50391C0.502996 9.69432 0.610201 9.86879 0.780536 9.95391ZM7.00404 16.5039V12.5039C7.00404 11.3993 7.89947 10.5039 9.00404 10.5039C10.1086 10.5039 11.004 11.3993 11.004 12.5039V16.5039H7.00404ZM15.004 16.5039H12.004V12.5039C12.004 10.8471 10.6609 9.50391 9.00404 9.50391C7.34718 9.50391 6.00404 10.8471 6.00404 12.5039V16.5039H3.00404V8.62891L9.00404 4.12891L15.004 8.62891V16.5039ZM3.00404 2.50391H4.00404V4.12891L3.00404 4.87891V2.50391ZM1.50404 7.25391L9.00404 1.62891L16.504 7.25391V8.50391L9.30404 3.10391C9.12626 2.97057 8.88181 2.97057 8.70404 3.10391L1.50404 8.50391V7.25391Z"
                fill="#072833"/>
        </svg>
    )
}

function HeartIcon() {
    return (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.583 0.500102C14.7772 0.489187 13.0785 1.35572 12.0273 2.82407C10.976 1.35572 9.2773 0.489187 7.47147 0.500102C4.19142 0.500102 2.15378 2.57888 2.15378 5.92558C2.14519 6.74091 2.28458 7.55103 2.56517 8.31661H0.508197C0.28099 8.31661 0.0968018 8.50079 0.0968018 8.728C0.0968018 8.95521 0.28099 9.1394 0.508197 9.1394H2.94201C3.53591 10.1108 4.29269 10.9727 5.17917 11.6872C5.38981 11.8748 5.59427 12.0574 5.78557 12.2397C7.18431 13.573 11.5821 17.1254 11.7689 17.276C11.9197 17.3976 12.1349 17.3976 12.2856 17.276C12.4724 17.1254 16.8706 13.5734 18.2689 12.2397C18.4602 12.0574 18.6647 11.8748 18.8753 11.6872C19.7618 10.9727 20.5186 10.1108 21.1125 9.1394H23.5463C23.7735 9.1394 23.9577 8.95521 23.9577 8.728C23.9577 8.50079 23.7735 8.31661 23.5463 8.31661H21.4914C21.7713 7.5509 21.91 6.74078 21.9007 5.92558C21.9007 2.57888 19.8631 0.500102 16.583 0.500102ZM2.97657 5.92558C2.97657 3.04335 4.6567 1.32289 7.47147 1.32289C9.21088 1.31738 10.816 2.25703 11.6628 3.77645C11.7408 3.90289 11.8787 3.97988 12.0273 3.97988C12.1758 3.97988 12.3138 3.90289 12.3917 3.77645C13.2385 2.25703 14.8436 1.31738 16.583 1.32289C19.3978 1.32289 21.0779 3.04335 21.0779 5.92558C21.0903 6.74763 20.9269 7.56283 20.5987 8.31661H18.1982C18.0312 8.31667 17.8809 8.4176 17.8176 8.57208L17.3593 6.96764C17.3085 6.79268 17.1487 6.67199 16.9665 6.67103H16.964C16.7823 6.67101 16.622 6.79026 16.5699 6.96435L15.7965 9.54297L14.898 5.35086C14.858 5.16368 14.6942 5.0288 14.5028 5.02546C14.3115 5.02212 14.1431 5.1512 14.0966 5.33687L13.3515 8.31661H11.2045C11.0375 8.31667 10.8872 8.4176 10.8239 8.57208L10.3656 6.96764C10.3148 6.79268 10.1549 6.67199 9.97275 6.67103C9.78751 6.66168 9.62146 6.78449 9.57616 6.96435L8.80274 9.54297L7.90425 5.35086C7.86426 5.1636 7.70036 5.02869 7.5089 5.02545C7.31642 5.01856 7.1461 5.14918 7.10286 5.33687L6.35782 8.31661H3.45584C3.12761 7.56283 2.9642 6.74763 2.97657 5.92558ZM18.3274 11.073C18.1101 11.2671 17.8987 11.4555 17.7008 11.6444C16.5189 12.772 13.0105 15.6292 12.0273 16.4264C11.044 15.6292 7.53606 12.772 6.35371 11.6444C6.15583 11.4555 5.94437 11.2671 5.72715 11.073C5.04172 10.5085 4.43133 9.85875 3.91084 9.1394H6.67912C6.86782 9.13939 7.03232 9.01101 7.07817 8.82797L7.47106 7.25644L8.33498 11.2824C8.3743 11.4661 8.53311 11.5999 8.72087 11.6074C8.9082 11.6131 9.07641 11.4933 9.13227 11.3144L9.96287 8.54616L10.3998 10.0753C10.4493 10.2488 10.6061 10.3697 10.7865 10.3736C10.9651 10.3719 11.124 10.2598 11.1855 10.0922L11.5011 9.1394H13.6728C13.8615 9.13939 14.026 9.01101 14.0719 8.82797L14.4648 7.25644L15.3287 11.2824C15.368 11.4661 15.5268 11.5999 15.7146 11.6074H15.7298C15.9115 11.6074 16.0718 11.4881 16.1239 11.314L16.9545 8.54575L17.3914 10.0749C17.441 10.2484 17.5978 10.3693 17.7781 10.3732C17.9562 10.3698 18.1143 10.2584 18.1772 10.0918L18.4948 9.1394H20.1437C19.6232 9.85875 19.0128 10.5085 18.3274 11.073Z"
                fill="#072833"/>
        </svg>
    )
}


export const InsuranceCard = observer((props: any) => {
    const insuranceOfferProcess = useService(InsuranceOfferProcess)
    const insuranceAgreements = useService(InsuranceAgreements)

    const history = useHistory()

    const tx = useTransaction(() => {
        return insuranceOfferProcess.acceptByClient(props.documentNumber)
    }, {
        onDone: () => {

            insuranceAgreements.updateList()
        }
    })

    function handleClickAccept() {
        // tx.process()

        history.push(`/insurance/police/${props.documentNumber}/confirm`)
    }

    return (
        <Flex bg={'white'} height={'94px'} borderRadius={'4px'}>


            <Flex bg={'lightGray'} width={'164px'} height={'100%'} justify={'center'} align={'center'}>
                <InsLogo
                    keyID={props.risk === 'PROPERTY' ?  `3N5ihzq38ZbHJyHCkFD36nf836BxoenN8Qx` : `3N5xJWrQPrXnZxcvqu9W2xTJ9FgXFJYiaEX`}
                />
            </Flex>

            <Grid templateColumns={'1.5fr 1fr 1fr'} width={'100%'} padding={`0 24px`}>
                <Stack justify={'center'}>
                    <Link textDecoration={'underline'}>Пример полиса</Link>
                    <Link textDecoration={'underline'}>Правила страхования</Link>
                </Stack>


                <Stack justify={'center'} align={'center'}>
                    <Text fontWeight={600} fontSize={18}>
                        {props.payAmount} ₽ <Text as={'span'} fontWeight={400} fontSize={14}>/ год</Text>
                    </Text>
                </Stack>

                <Stack justify={'center'} align={'flex-end'} spacing={'10px'}>
                    {props.status === 'ACTIVE' && (
                        <Tag variant={'accepted'}>
                            <TagLabel>Активен</TagLabel>
                        </Tag>
                    )}


                    {props.status === 'WAIT_CLIENT' && (
                        <Button onClick={handleClickAccept}>
                            Подтвердить
                        </Button>
                    )}
                </Stack>
            </Grid>
        </Flex>
    );
})