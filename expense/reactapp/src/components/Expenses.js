import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import '../App.css'
import 'react-datepicker/dist/react-datepicker.css'
import { Container, Form, FormGroup, Label, Input, Button, Table, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default class Expenses extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            // date: new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            itemtoPost: this.emptyItem,
            alert: true,
            message: ""
        }

        // U Bind this .. becuase event handlers .. context of this ... when called via any event
        // so ... if you wanna access this.state ... from such an event .. u need to bind the function
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)

        // this.globId = 1

    }
    
    
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


    emptyItem = {
        // id: 1, 
        expensedate: '',
        descript: '',
        location: '',
        // category: {id: 1, name: "Travel"}
        // category: [id: 1, name: "Travel"]
        category: {id: 1, name: "Travel"}
    }


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
            // SPREAD OPERATOR
            //  HERE both will work .. becoz filter func is on array ... and both are array
            // Here we need to make the SPREAD OPERATOR .. .becoz it will assign new ADDRESS to our variable
            // see geeks4geeks SPREAD operator .. sometimes it can be an issue 
            // here i think filter function itself should create a new instance ... so both should work fine
            let updateExpenses = [...this.state.expenses].filter(i => i.id !== id)
            // let updateExpenses = this.state.expenses.filter(i => i.id !== id)
            this.setState({expenses: updateExpenses})
        }
        )
    }



    async handleSubmit(event){
        // preventdefault ... very imp ...
        // will save from submitting on its own ... and rerendering the list again .. withou submitting-----VIP
        // this.globId += 1
        // let itemtoPost = {...this.state.itemtoPost}
        // itemtoPost["id"] = this.globId
        // event.preventDefault();
        const {itemtoPost} = this.state;                   /// dont directly access state  body

        console.log(this.state.itemtoPost)
        await fetch(`/api/expenses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemtoPost)
        })
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            console.info("Success")
            this.setState({alert:false, message:"Vishwarajsinh is king"})
            // return (
            //     <Alert color="primary">
            //         This is a primary alert with 
            //     </Alert>
            // )
            // return 
            // this.props.history.push("/expenses")


            // this.setState({ postId: data.id })
        })
        .catch(error => {
            this.setState({ errorMessage: error });
            console.error('There was an error!', error);
        });
        
        
        
        
        // event.preventDefault();
        // console.log(this.props.history)
        // this.props.history.replace("/expenses");
        // .then(() => console.log("bhai submit to kiya"))

        // debugger      


        // this will redirect you to ... the expense Page ------------------- VIP
        // this.props.history.push("/expenses")
        // this.props.history.push("/expenses");
        // console.log("Sumbit works")
        
    }



    handleChange(event){


        const target = event.target
        const namvar = target.name
        const value = target.value
        let item = {... this.state.itemtoPost}
        const idval = target.selectedIndex + 1
        if(namvar === "category"){      
            console.log("category mein aay gaya")  
            // debugger


            item[namvar] = {id: idval, name: value}
            // console.log(this.state.itemtoPost.category)  
            this.setState({itemtoPost: item})
        }
        else{
            item[namvar] = value
            this.setState({itemtoPost: item})

        }

        // let {itemtoPost} = this.state
        // let item = {... this.state.itemtoPost}
        


        // console.log("I am trying to remove - "+ id)
        // // debugger
        // console.log(this)
    }

    handleDateChange(date){
        // Datepicker directly sends selected date instead of event
        let itemtoPost = {...this.state.itemtoPost} 
        itemtoPost.expensedate = date
        this.setState({itemtoPost: itemtoPost})
        console.log(itemtoPost)
        console.log(this.state.itemtoPost.expensedate+"            dfjsdflskfdlsjf" )

        // console.log(event)
        // console.log("ab to date change hogi .................")
    }

    render(){
        const title = <h3> Add Expense </h3>
        // here the variables name have to match in state ... then only possible to assign below way .. otherwise undefined
        // const {date, isLoading, expenses} = this.state
        const {categories} = this.state
        let {expenses, isLoading} = this.state

        // console.log(this.state.date, " sdfsdf")
        // console.log(isLoading)
        // console.log(categories)
        // console.log(expenses[0]+"          sdfdsf")

        // console.log(expenses[0].expensedate+"        .........  alsdkjfaf")

        if(isLoading) return( <h2>Loading ... </h2>)
        console.log("vishwaraj starts here")
        console.log(expenses[0]+"          sdfdsf")

        let rows = expenses.map(expense =>
            <tr key={expense.id}>
                <td>{expense.descript}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category? expense.category.name: ''}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                {/* Line 1 */}
                {/* <td><Button onClick={this.remove(expense.id)}></Input></td> */}
                {/* Line 2 */}
                {/* <td><Button onClick={this.remove}></Input></td> */}
                {/* Line 2 will work ... line 1 wont work .. .becuae we can't call a function ... we can simply assign 
                a function or a property .... 
                But if we simply assign a function like in line 2 ... it will pass an event property .. nd not any property that we want
                So if we want to call from here itself ... do like I have done in working line of code... u can also pass any property ... example expense.id
                */}


            </tr>

        )



        return(
            <div>
                <AppNav />
                {/* <Alert color="primary" hidden={this.state.alert}>{this.state.message}</Alert> */}
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="descript">Title</Label>
                            <Input type="text" id="title" name="descript" onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select name="category" onChange={this.handleChange}>
                                {
                                    categories.map( category =>
                                        <option id={category.id} key={category.id}>
                                            {category.name}
                                        </option>
                                        
                                        )
                                }

                            </select>
                            
                            {/* <Input type="text" name="cat" id="cat" onChange={this.handleChange}></Input> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="expDate">Expense Date</Label>{':  '}
                            <DatePicker id="expDate" name="expDate" selected={this.state.itemtoPost.expensedate} onChange={this.handleDateChange}/>
                            {/* <Input type="text" name="expDate" id="expDate" onChange={this.handleChange}></Input> */}
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location" onChange={this.handleChange}></Input>
                            </FormGroup>
                        </div>
                        
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{'      '}
                            <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
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