import React from "react";
import Layout from "@components/layout/Layout";
import ActionHeader from "@components/form/ActionHeader";
import {entrance} from "@common/typograph";

const UserSignup = () => {

    return (
        <Layout>
            <ActionHeader onConfirm={() => console.log("confirmado")} onCancel={() => console.log("cancelado")} title={entrance.WELCOME} color={'purple.1000'} />
        </Layout>
    )
}

export default UserSignup
