import React from 'react'
import AppNav from './AppNav'

export default class Home extends React.Component{
    state = {

    }

    render(){
        return(
            <div>
                <AppNav />
                <h2 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>Welcome to Simple Expenses Management React SpringBoot Application</h2>
            </div>


        )

    }
}