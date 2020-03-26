import React from 'react'
import AppNav from './AppNav'

export default class Category extends React.Component{

    state = {
        isLoading: true,
        Categories: []
    }

    async componentDidMount(){
        const response = await fetch('/api/categories')
        const body = await response.json()
        this.setState({ isLoading: false, Categories: body})
    }

    render(){
        const {isLoading, Categories} = this.state;
        console.log(Categories)
        // const myarr = Categories.map(category => category.id)
        // console.log(myarr)
        if(isLoading)
            return <div>Loading ......,,,,,,,,,,,,</div>

        return(
            <div>
                <AppNav />
                
                <h2>Categories</h2>
                {
                Categories.map(category => 
                
                <div id={category.id}>
                    {category.name}
                </div>)
                }
            </div>

        )

    }


}