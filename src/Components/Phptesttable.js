import React from 'react';
import {useSelector} from 'react-redux';
import { delItems, editItems } from '../store/tableSlice';
import { useDispatch } from 'react-redux';

const Phptesttable = () => {
const dispatch=useDispatch();

const tableData= useSelector((state)=> state.table.data)
  return (
    <div className='tabParent'>
      <table className=" table-bordered">
                        <thead> 
                            <tr>
                            <th scope="col">Test Id</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Test Type</th>
                            <th scope="col">Tester Email id</th>
                            <th scope="col">Tester Mobile no</th>
                            <th scope="col">Alternative no</th>
                            <th scope="col">Creation date</th>
                            <th scope="col">Last Updation date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {
                            tableData?.map((elem, ind)=>{
                            const {id, name, email, type, mobno, altmob, created, lastupdate}= elem;
                            let backgroundColor;
                            let color;
                                switch (type.toLowerCase()) {
                                case 'php':
                                    backgroundColor = 'green';
                                    color= '#fff';
                                    break;
                                case 'node js':
                                    backgroundColor = 'yellow';
                                    break;
                                default:
                                    backgroundColor = 'orange';
                                }
                            return (
                                <tr style={{backgroundColor, color}} >
                                    <th scope="row" key={elem} className='text-center'>

                                        {ind}
                                    </th>
                                    <td>{name}</td>
                                    <td>{type}</td>
                                    <td>{email}</td>
                                    <td>{mobno}</td>
                                    <td>{altmob} </td>
                                    <td>{created} </td>
                                    <td>{lastupdate} </td>
                                    <td className='text-center'>
                                        <img src="./delete.png" width="15px"  onClick={()=> dispatch(delItems(elem.id))}/>
                                        <img src="./edit.png" width="15px" className='ms-2' onClick={()=> dispatch(editItems(elem))}/>
                                    </td>
                                </tr>
                            )
                            })
                        }
                            
                        </tbody>
                    </table>
        </div>
  )
}

export default Phptesttable
