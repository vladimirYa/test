import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.delegateHour = this.delegateHour.bind(this);
    }

    // funciton for event handling on every hourElem
    delegateHour(event) {
        let target = event.target;

        if (target.classList.contains('choosed')) {
            target.classList.remove('choosed');
        } else {
            target.classList.add('choosed');
        }
    }

    // let hourElemsSections = {
    //   mo:[]
    //   su:[]
    //   ...
    // }
    render() {
        let calendarData = this.props.store[0];
        let daysElems = [];
        let numberOfhours = 24;
        let hourElemsSections = {};

        for (let key in calendarData) {
            hourElemsSections[key] = [];
        }
        function ischoosed(currentIndex) {
            let resultArr = [];
            let startPoint = 0;
            for (let item in calendarData) {
                for (let i = 0; i < calendarData[item].length; i++) {
                    let beginPoint = Math.floor(calendarData[item][i].beginTime / 60);
                    let endPoint = Math.ceil(calendarData[item][i].endTime / 60);
                    if(currentIndex == beginPoint){
                      return(<div className='calendar__hour choosed'></div>);
                    }else{
                      return(<div className='calendar__hour'></div>);
                    }
                }

            }
            console.log(resultArr);
            return resultArr;
          }

            for (let key in hourElemsSections){
              for(let i = 0;i<24;i++){
              hourElemsSections[key].push(ischoosed(i));

            }

          }

            console.log(hourElemsSections);
            for (let key in hourElemsSections) {
                daysElems.push(
                    <div className='calendar__item' key={key}>
                        <div className='calendar__day'>{key}</div>
                        <div className='calendar__choose-all'></div>
                        <div className='calendar__hours' onClick={this.delegateHour}>
                            {hourElemsSections[key]}
                        </div>
                    </div>

                );
            }
            return (
                <div className='conten-main'>
                    <h1 className='heading-main'>Set schedule</h1>
                    <div className='calendar'>
                        <div className='calendar__labels'></div>
                        {daysElems}
                    </div>
                </div>
            );
        }

    }

    export default connect(state => ({store: state}), dispatch => ({}))(Calendar);
