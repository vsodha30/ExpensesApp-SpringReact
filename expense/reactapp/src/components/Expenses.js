import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import '../App.css'
import 'react-datepicker/dist/react-datepicker.css'
import { Container, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default class Expenses extends React.Component{
    // {
    //     "id": 100,
    //     "expensedate": "2019-06-16T17:00:00Z",
    //     "descript": "New York Business Trip",
    //     "location": "New York",
    //     "category": {
    //         "id": 1,
    //         "name": "Travel"
    //     }
    // }

    constructor(props){
        super(props)
        this.state = { 
            date: new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            itemtoPost: this.emptyItem
        }

    }

    emptyItem = {
        id: 1099,
        expenseDate: '',
        descript: '',
        location: '',
        // category: {id: 1, name: "Travel"}
        // category: [id: 1, name: "Travel"]
        category: [1, "Travel"]
    }




    

    // handleChange(){
    //     console.log("I am triggered")
    // }

    async componentDidMount(){
        const response = await fetch('/api/categories')
        const body = await response.json()
        this.setState({ isLoading: false, categories: body})

        const responseExp = await fetch('/api/expenses')
        const bodyExp = await responseExp.json()
        this.setState({ isLoading: false, expenses: bodyExp})

    }

    async remove(id){
        //  keep in mind the below apostrophe in fetch is different becoz of $ used inside
        await fetch(`/api/expenses/${id}`,{ 
            method: "DELETE",
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        ).then(() => {
            let updateExpenses = [...this.state.expenses].filter(i => i.id !== id)
            console.log("Hog ayag a bhai apnaaa  ....")
            this.setState({expenses: updateExpenses})
        }

        )
        // console.log("I am trying to remove - "+ id)

    }
    // handleChange(id){
    //     console.log("I am trying to remove - "+ id)

    // }

    render(){
        const title = <h3> Add Expense </h3>
        // here the variables name have to match in state ... then only possible to assign below way .. otherwise undefined
        // const {date, isLoading, expenses} = this.state
        const {categories} = this.state
        const {expenses, isLoading} = this.state

        // console.log(this.state.date, " sdfsdf")
        // console.log(isLoading)
        // console.log(categories)
        // console.log(expenses[0]+"          sdfdsf")

        // console.log(expenses[0].expenseDate+"        .........  alsdkjfaf")

        if(isLoading) return( <h2>Loading ... </h2>)
        console.log("vishwaraj starts here")
        console.log(expenses[0]+"          sdfdsf")

        let rows = expenses.map(expense =>
            <tr>
                <td>{expense.descript}</td>
                <td>{expense.location}</td>
                <td>{expense.expensedate}</td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                {/* <td><Input onChange={this.handleChange(expense.id)}></Input></td> */}
                {/* the above line would work since handlechange is not async ... 
                but the same onChange wont work if it is async */}


                {/* <td><Button size="sm" color="danger" onClick={this.remove(expense.id)}>Delete</Button></td> */}
            </tr>

        )



        return(
            <div>
                <AppNav />
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" id="title" name="title" onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cat">Category</Label>
                            <select name="cat">
                                {
                                    categories.map( category =>
                                        <option id={category.id}>
                                            {category.name}
                                        </option>
                                        
                                        )
                                }

                            </select>
                            
                            {/* <Input type="text" name="cat" id="cat" onChange={this.handleChange}></Input> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="expDate">Expense Date</Label>{':  '}
                            <DatePicker id="expDate" name="expDate" selected={this.state.date} onChange={this.handleChange}/>
                            {/* <Input type="text" name="expDate" id="expDate" onChange={this.handleChange}></Input> */}
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location" onChange={this.handleChange}></Input>
                            </FormGroup>
                        </div>
                        
                        <FormGroup>
                            <Button id="save" color="primary" type="submit">Save</Button>{'      '}
                            <Button id="cancel" color="secondary" tag={Link} to="/categories">Cancel</Button>
                        </FormGroup>


                    </Form>
                </Container>

                {''}

                <Container>
                    <h3> List of Expenses </h3>
                    <Table>
                        <thead>
                            <tr>
                                <th size="20%">Description</th>
                                <th size="10%">Location</th>
                                <th size="10%">Date</th>
                                <th size="30%">Category</th>
                                <th size="10%">Action</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>


                </Container>


            </div>
        )

    }
}