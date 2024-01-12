import React, {useEffect, useState, useRef} from 'react'
import {Button, Col, Form} from 'react-bootstrap';
import Modaladdtype from './Modaladdtype';
import {addItems}  from '../store/tableSlice';
import {useDispatch, useSelector} from 'react-redux';

const Formcomp = () => {
      const [val, setval]= useState({
            id: null,
            name: '',
            email: '',
            type: 'PHP',
            mobno: '',
            altmob: '',
            created: '',
            lastupdate: ''
    });

    const [show, setShow] = useState(false);
    const [newtype, setNewtype]= useState(['PHP','Node js', 'React js']);
    const form= useRef(0);

    //=====fetching data in form for from table=====//
    const dataToUpdate= useSelector(state=> state.table.dataToUpdate)
    const dispatch= useDispatch();

    //daclared arrays to get form's childnodes and input elements on autofill//
    let formChild= [];
    let inputArr=  [];

    useEffect(()=>{

      //====fetching data in state to update====//
      if(dataToUpdate!= null) {
          setval(dataToUpdate)
      }
      else{
        //====creating array of inputs elements on form autofill====/
        formChild= form.current.childNodes
        inputArr= Array.from(formChild)?.map(( ele, ind)=>{
            if(ind>=1 && ind <=5) 
              return ele.childNodes[1] ;
        }).filter((_, ind)=> (ind>=1 && ind <=5))

        //====updating values of input fields on form autofill====//
        inputArr.forEach(ele=> {
          setval((prevVal)=>  ({...prevVal, [ele.name]: ele.value }))
        })
      }

      
    }, [dataToUpdate])
    
    //======handling modal=====//
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //====handling input values onchange=====//
    const valChange=(e)=>  {
      setval((prevVal)=>{
        return { ...prevVal,
            [e.target.name]: e.target.value        
          }
    })
    }

    //=====validating form on blur=====//
    const validateForm= (e) =>{  
        if(e.target.name == "name"){
          if(!/^[A-Za-z]{4,}(?: [A-Za-z]+)*$/.test(e.target.value))
          {
            e.target.nextElementSibling.classList.add("active")
          }else{
            e.target.nextElementSibling.classList.remove("active")
          }
        }

        if(e.target.name == "email"){
          if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value))
          {
            e.target.nextElementSibling.classList.add("active")
          }else{
            e.target.nextElementSibling.classList.remove("active")
          }
        }

        if(e.target.name == "mobno"){
        if(! /^[0-9]{10,}$/.test(e.target.value))
          {
            e.target.nextElementSibling.classList.add("active")
          }else{
            e.target.nextElementSibling.classList.remove("active")
          }
        }

        if(e.target.name == "altmob"){
            if(!/^[0-9]{10,}$/.test(e.target.value) || e.target.value == val.mobno)
            {
              e.target.nextElementSibling.classList.add("active")
            }else{
              e.target.nextElementSibling.classList.remove("active")
            }
          }
         
    } 

    //=====creating new type=====/
    let createType = (e, val)=>{
      e.preventDefault();
      const existingType= newtype.find((ele)=>{
            return  ele.match(new RegExp(`\\b${val}\\b`, "i"));
      })

        if(!existingType){ 
          setNewtype((prevEle)=> [...prevEle, val])
        }else{
          alert(val + " " + "is already exist")
        }
    }

    //=====Add data to table on submit=====//
    const submitVal= (e) =>{
        e.preventDefault();

          if( /^[A-Za-z]{4,}(?: [A-Za-z]+)*$/.test(val.name) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.email)
          &&  /^[0-9]{10,}$/.test(val.mobno)  && /^[0-9]{10,}$/.test(val.altmob) && val.altmob != val.mobno)
          {
            dispatch(addItems(val));
              setval({
                id: null,
                name: '',
                email: '',
                type: 'PHP',
                mobno: '',
                altmob: '',
                created: '',
                lastupdate: ''
          })
          }
          else if(val.name == "" || val.email == "" || val.mobno == "" || val.altmob == ""){
              alert("Please fill the All fields")
          }

        
    }


  return (

  <>
    <Form onSubmit={submitVal} 
    style={{
      margin: "auto", 
      backdropFilter: "opacity(50%)", 
      background:"#223e39",

    }}
    className='p-4 rounded-4'
    ref={form}
    >
      <h2>Form</h2>
        <Form.Group as={Col} controlId="formGridName"  className='mt-4'>
          <Form.Label>Test Name</Form.Label>
          <Form.Control type="text" 
          placeholder="Enter name" 
          onChange={valChange}
          onBlur={validateForm} 
          name="name" 
          value={val.name} 
          />
          <small className='prompt'>Please enter correct name, it should only contian letters with at leat "3" characters</small>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmailid"  className='mt-4'>
          <Form.Label>Tester email id</Form.Label>
          <Form.Control type="text" 
          placeholder="Password" 
          onChange={valChange} 
          onBlur={validateForm}
          name="email" 
          value={val.email}
          />
          <small className='prompt'>Please enter a valid email address," "Invalid email format," "Missing '@' symbol," and "Invalid domain name.</small>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTesttype" className='mt-4'>
          <Form.Label>Test type</Form.Label>
          <Form.Select value={val.type} name="type" onChange={valChange}>
            <option value="--Select--" disabled>--Select--</option>
            {
              newtype?.map((ele)=> <option value={ele}>{ele}</option>)
            }
            
          </Form.Select>
          <small style={{cursor: "pointer", textDecoration: "underline", color:"#fff"}} onClick={handleShow}>Create Test Type</small>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridMobno" className='mt-4'>
          <Form.Label>Tester Mobile no</Form.Label>
          <Form.Control type="text" onChange={valChange} onBlur={validateForm} name="mobno" value={val.mobno}/>
          <small className='prompt'>Number Should be of atleast 10 digits</small>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAltno" className='mt-4'>
          <Form.Label>Alternative no</Form.Label>
          <Form.Control type="text" onChange={valChange} onBlur={validateForm} name="altmob" value={val.altmob}/>
          <small className='prompt'>Alternate Number Should be of atleast 10 digits and not exactly same as of mobile no</small>
        </Form.Group>
        <Form.Control type="hidden" onChange={valChange} name="created" value={val.created}/>
        <Form.Control type="hidden" onChange={valChange} name="lastupdate" value={val.lastupdate}/>

      <Button variant="primary" type="submit" className='mt-4'>
        Submit
      </Button>
    </Form>
    <Modaladdtype handleClose={handleClose} show={show} createType={createType}/>
  </>
  );

}
export default Formcomp
