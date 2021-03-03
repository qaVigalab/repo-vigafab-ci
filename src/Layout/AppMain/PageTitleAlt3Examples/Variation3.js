import React, {Component, Fragment} from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class TitleComponent3 extends Component {
    render() {
        let {
            empresa,
            menues,
            menu_actual
        } = this.props;
        return (
            <Fragment>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/"><FontAwesomeIcon icon={faHome}/></a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="/">{empresa}</a>
                    </BreadcrumbItem>{
                        menues.map(x=>(
                            <BreadcrumbItem >{x}</BreadcrumbItem>
                        ))
                    }<BreadcrumbItem active>{menu_actual}</BreadcrumbItem>
                </Breadcrumb>
            </Fragment>
        );
    }
}