import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function UserParameters({ user }) {

    return (
        <>
            <h1><FormattedMessage id="loginLocale" />: {user?.login}</h1>
            <p><FormattedMessage id="firstName" />: {user?.firstName}</p>
            <p><FormattedMessage id="lastName" />: {user?.lastName}</p>
            <p>
                <FormattedMessage id="role" />: {user?.role && <FormattedMessage id={user?.role} />}
            </p>
            <p>
                <FormattedMessage id="blocked" />: {typeof user?.blocked !== typeof undefined && <FormattedMessage id={user?.blocked?.toString()} />}
            </p>
        </>
    )
}
