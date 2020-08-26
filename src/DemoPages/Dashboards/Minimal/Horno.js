import React,  {Component, Fragment} from 'react';

export default class Horno extends Component {

    applyCallback(startDate, endDate) {
        this.setState({
                start: startDate,
                end: endDate
            }
        )
    }


    constructor(props) {
        super(props);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            modo: 0
        }
        this.onDismiss = this.onDismiss.bind(this);
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    onDismiss() {
        this.setState({visible: false});
    }

    render() {

        return (
            <Fragment>
              hola ++++
            </Fragment>
        )
    }
}
