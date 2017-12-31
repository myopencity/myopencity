import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class EmailResetPassword extends Component {
    render() {

        const {username} = this.props

        return (
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta name="viewport" content="width=device-width" />
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>Demande de nouveau mot de passe</title>
                    <link href="styles.css" media="all" rel="stylesheet" type="text/css" />
                </head>

                <body itemscope itemtype="http://schema.org/EmailMessage">
                    <table>
                        <tr>
                            <td></td>
                            <td width="600">
                                <table width="100%">
                                    <tr>
                                        <th>Demande de nouveau mot de passe</th>
                                        <td>{username}</td>
                                    </tr>
                                    <tr>
                                        <th>UN BOUTON</th>
                                        <td><Button href="https://jeuxvideo.com" target="_blank" content="GO"/></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        );
    }
}