import React, {Component} from 'react';
import {connect} from 'react-redux';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

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
        // let daysElems = [];
        // let numberOfhours = 24;
        // let hourElemsSections = {};

        // for (let key in calendarData) {
        //     hourElemsSections[key] = [];
        // }
        // function ischoosed(currentIndex) {
        //     let resultArr = [];
        //     let startPoint = 0;
        //     for (let item in calendarData) {
        //         for (let i = 0; i < calendarData[item].length; i++) {
        //             let beginPoint = Math.floor(calendarData[item][i].beginTime / 60);
        //             let endPoint = Math.ceil(calendarData[item][i].endTime / 60);
        //             console.log(beginPoint, endPoint);
        //         }
        //     }
        //   }
        //   ischoosed();

            // console.log(hourElemsSections);
            // for (let key in hourElemsSections) {
            //     daysElems.push(
            //         <div className='calendar__item' key={key}>
            //             <div className='calendar__day'>{key}</div>
            //             <div className='calendar__choose-all'></div>
            //             <div className='calendar__hours' onClick={this.delegateHour}>
            //                 {hourElemsSections[key]}
            //             </div>
            //         </div>

            //     );
            // }

        const results = []

        for (let day in calendarData) {
            const dayData = calendarData[day]
            const indexes = []

            dayData.forEach((interval, index) => {

                const beginTime = interval['beginTime']
                const endTime = interval['endTime']

                // console.log(interval, beginTime, endTime, 'wtf')

                const intervalLength = Math.round((endTime - beginTime)/MINUTES_IN_HOUR);
                const intervalStart = beginTime / MINUTES_IN_HOUR;

                // console.log(intervalLength, intervalStart)

                for(let i = 0; i < intervalLength; ++i) {
                    indexes.push(intervalStart + i);
                }

            })

            results.push(indexes)
        }

        const daysElems = []

        results.forEach((indexes, index) => {
                daysElems.push(
                    <div className='calendar__item' key={index}>
                        <div className='calendar__day'>{index}</div>
                        <div className='calendar__choose-all'></div>
                        <div className='calendar__hours'>
                            { renderHours(indexes) }
                        </div>
                    </div>

                );

        })

        function renderHours(indexes) {
            const hours = []
            for(let i=0; i < HOURS_IN_DAY; ++i) {

                hours.push(
                    <div className={ 'calendar__hour ' + (indexes.indexOf(i) >= 0 ? 'choosed' : '')  } >
                    </div>
                )
            }

            return hours
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
