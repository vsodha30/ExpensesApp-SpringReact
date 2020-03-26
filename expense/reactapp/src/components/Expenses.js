import React from 'react'
import AppNav from './AppNav'

export default class Expenses extends React.Component{
    state = { }


    render(){
        return(
            <div>
                <AppNav />
                <h1>
                    Expenses
                </h1>
            </div>
        )

    }
}