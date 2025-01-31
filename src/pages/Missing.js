import React from 'react'
import { FormattedMessage } from 'react-intl'
import GoBackButton from '../components/ui/GoBackButton'

export default function Missing() {
    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="container round-bordered-subject main-page-message">
                    <h1><FormattedMessage id="missingPage" /></h1>
                </div>
            </div>
            <div className="buttons-container">
                <GoBackButton />
            </div>
        </section>
    )
}
